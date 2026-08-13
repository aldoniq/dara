/**
 * Vercel Serverless Function: принимает заявку с формы и шлёт её в Telegram.
 * Переменные окружения (Vercel → Project → Settings → Environment Variables):
 *   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID   — id чата/группы, куда слать заявки
 */

/**
 * Анти-спам в памяти инстанса (Fluid Compute держит инстанс тёплым между запросами).
 * Это второй эшелон после WAF-правила Vercel: без внешней БД, обнуляется при холодном старте.
 */
const RATE_WINDOW_MS = 60_000; // окно лимита
const RATE_MAX = 3; // не больше заявок с одного IP за окно
const DEDUPE_TTL_MS = 10 * 60_000; // одинаковая заявка не дублируется чаще, чем раз в 10 минут
const hitLog = new Map(); // ip -> таймстампы заявок
const seen = new Map(); // хеш заявки -> таймстамп

const clientIp = (req) =>
  String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '')
    .split(',')[0]
    .trim() || 'unknown';

const hash = (s) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return String(h);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    return res.status(503).json({ ok: false, error: 'not_configured' });
  }

  const { name = '', contact = '', message = '', company = '', lang = '', page = '' } = req.body ?? {};

  // Honeypot: боты заполняют скрытое поле — отвечаем «ок» и молча выбрасываем
  if (company) return res.status(200).json({ ok: true });

  if (
    typeof contact !== 'string' ||
    !contact.trim() ||
    String(name).length > 200 ||
    contact.length > 200 ||
    String(message).length > 3000
  ) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }

  const now = Date.now();
  const ip = clientIp(req);

  // Повторные клики с тем же содержимым: отвечаем «ок», в Telegram дубль не шлём
  const dedupeKey = hash([ip, name, contact, message].join('|'));
  for (const [k, ts] of seen) if (now - ts > DEDUPE_TTL_MS) seen.delete(k);
  if (seen.has(dedupeKey)) return res.status(200).json({ ok: true, deduped: true });

  // Лимит частоты по IP
  const hits = (hitLog.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) return res.status(429).json({ ok: false, error: 'rate_limited' });
  hits.push(now);
  hitLog.set(ip, hits);
  if (hitLog.size > 5000) hitLog.clear(); // страховка от роста памяти

  // Резервируем ключ сразу, чтобы параллельные двойные клики не проскочили;
  // при неудачной отправке освобождаем — пользователь сможет повторить
  seen.set(dedupeKey, now);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const api = (method) => `https://api.telegram.org/bot${token}/${method}`;
  const post = (url, body) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

  // Rich Message (Bot API 10.1+): заголовок, таблица с данными, задача цитатой
  const blocks = [
    { type: 'heading', size: 2, text: '🔥 Новая заявка с сайта' },
    {
      type: 'table',
      cells: [
        [{ text: '👤 Имя', header: true }, { text: String(name) || '—' }],
        [{ text: '📱 Контакт', header: true }, { text: String(contact) }],
        [{ text: '🌐 Язык', header: true }, { text: String(lang) || '—' }],
      ],
    },
    ...(String(message).trim()
      ? [
          { type: 'heading', size: 3, text: '📝 Задача' },
          { type: 'blockquote', blocks: [{ type: 'paragraph', text: String(message) }] },
        ]
      : []),
    ...(page ? [{ type: 'divider' }, { type: 'paragraph', text: String(page) }] : []),
  ];

  let tg = await post(api('sendRichMessage'), {
    chat_id: chatId,
    rich_message: { blocks },
    link_preview_options: { is_disabled: true },
  });

  // Фолбэк на обычное HTML-сообщение, если Rich Message не прошёл
  if (!tg.ok) {
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const text = [
      '🔥 <b>Новая заявка с сайта</b>',
      '',
      `👤 <b>Имя:</b> ${esc(name) || '—'}`,
      `📱 <b>Контакт:</b> <code>${esc(contact)}</code>`,
      ...(String(message).trim()
        ? ['', '📝 <b>Задача:</b>', `<blockquote>${esc(message)}</blockquote>`]
        : []),
      '',
      `🌐 ${esc(lang) || '—'} · ${esc(page)}`,
    ].join('\n');

    tg = await post(api('sendMessage'), {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    });
  }

  if (!tg.ok) {
    seen.delete(dedupeKey); // отправка не удалась — даём пользователю повторить
    return res.status(502).json({ ok: false, error: 'telegram_error' });
  }

  return res.status(200).json({ ok: true });
}
