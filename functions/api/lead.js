/**
 * Cloudflare Pages Function: принимает заявку с формы и шлёт её в Telegram.
 * Переменные окружения (Pages → Settings → Environment variables):
 *   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID   — id чата/группы, куда слать заявки
 */

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Анти-спам в памяти воркера: лимит по IP + дедупликация повторных заявок
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const DEDUPE_TTL_MS = 10 * 60_000;
const hitLog = new Map();
const seen = new Map();

const hash = (s) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return String(h);
};

export async function onRequestPost({ request, env }) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ ok: false, error: 'not_configured' }, 503);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  const { name = '', contact = '', message = '', company = '', lang = '', page = '' } = data;

  // Honeypot: боты заполняют скрытое поле — отвечаем «ок» и молча выбрасываем
  if (company) return json({ ok: true });

  if (
    typeof contact !== 'string' ||
    !contact.trim() ||
    String(name).length > 200 ||
    contact.length > 200 ||
    String(message).length > 3000
  ) {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  const now = Date.now();
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // Повторные клики с тем же содержимым: отвечаем «ок», дубль не шлём
  const dedupeKey = hash([ip, name, contact, message].join('|'));
  for (const [k, ts] of seen) if (now - ts > DEDUPE_TTL_MS) seen.delete(k);
  if (seen.has(dedupeKey)) return json({ ok: true, deduped: true });

  // Лимит частоты по IP
  const hits = (hitLog.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) return json({ ok: false, error: 'rate_limited' }, 429);
  hits.push(now);
  hitLog.set(ip, hits);
  if (hitLog.size > 5000) hitLog.clear();

  seen.set(dedupeKey, now);

  const api = (method) => `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`;
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

  let res = await post(api('sendRichMessage'), {
    chat_id: env.TELEGRAM_CHAT_ID,
    rich_message: { blocks },
    link_preview_options: { is_disabled: true },
  });

  // Фолбэк на обычное HTML-сообщение, если Rich Message не прошёл
  if (!res.ok) {
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

    res = await post(api('sendMessage'), {
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    });
  }

  if (!res.ok) {
    seen.delete(dedupeKey); // отправка не удалась — даём пользователю повторить
    return json({ ok: false, error: 'telegram_error' }, 502);
  }

  return json({ ok: true });
}
