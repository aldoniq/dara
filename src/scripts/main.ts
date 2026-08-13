import { animate, stagger, onScroll, utils } from 'animejs';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Мобильное меню ---------- */

const burger = document.getElementById('burger');
const menu = document.getElementById('mobile-menu');
if (burger && menu) {
  const toggle = (open?: boolean) => {
    const next = open ?? menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !next);
    burger.setAttribute('aria-expanded', String(next));
  };
  burger.addEventListener('click', () => toggle());
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
}

/* ---------- Полоса прогресса страницы в шапке ---------- */

const progress = document.querySelector<HTMLElement>('[data-progress]');
if (progress) {
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
}

/* ---------- Форма заявки → /api/lead → Telegram ---------- */

/* ---------- Умное поле контакта: маска телефона или @username ---------- */

const contactInput = document.getElementById('lead-contact') as HTMLInputElement | null;
contactInput?.addEventListener('input', () => {
  const value = contactInput.value.trimStart();
  if (!value) return;

  if (/^[+\d]/.test(value)) {
    let digits = value.replace(/\D/g, '');
    if (!digits) return; // остался один «+» — даём стереть поле
    // Иностранный номер (не +7…) не трогаем
    if (value.startsWith('+') && !/^[78]/.test(digits)) return;
    // 8 700… → 7 700…, локальный без кода получает 7
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (!digits.startsWith('7')) digits = '7' + digits;
    const rest = digits.slice(1, 11);
    let out = '+7';
    if (rest.length > 0) out += ' ' + rest.slice(0, 3);
    if (rest.length > 3) out += ' ' + rest.slice(3, 6);
    if (rest.length > 6) out += ' ' + rest.slice(6, 8);
    if (rest.length > 8) out += ' ' + rest.slice(8, 10);
    contactInput.value = out;
  } else if (!value.startsWith('@')) {
    // Просто текст — считаем ником в Telegram, добавляем собачку (если её ещё нет)
    contactInput.value = '@' + value;
  }
});

const SENT_AT_KEY = 'dara-lead-sent-at';
const RESUBMIT_COOLDOWN_MS = 60_000;

const form = document.getElementById('lead-form') as HTMLFormElement | null;
form?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  if (form.dataset.state === 'sending') return; // защита от двойного клика
  // Недавно уже отправляли — не создаём дубль, просто показываем «успех»
  const sentAt = Number(localStorage.getItem(SENT_AT_KEY) ?? 0);
  if (Date.now() - sentAt < RESUBMIT_COOLDOWN_MS) {
    form.dataset.state = 'success';
    return;
  }
  const data = Object.fromEntries(new FormData(form));
  if (data.company) return; // honeypot: боты заполняют скрытое поле
  form.dataset.state = 'sending';
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, lang: document.documentElement.lang, page: location.href }),
    });
    if (!res.ok) throw new Error(String(res.status));
    form.dataset.state = 'success';
    localStorage.setItem(SENT_AT_KEY, String(Date.now()));
    form.reset();
    if (!reduced) {
      animate('[data-log-line]', {
        opacity: [0, 1],
        x: [-14, 0],
        delay: stagger(350),
        duration: 450,
        ease: 'outCubic',
      });
    }
  } catch {
    form.dataset.state = 'error';
  }
});

/* ---------- Анимации (пропускаем при prefers-reduced-motion) ---------- */

if (!reduced) {
  // Заголовок и вордмарк в футере собираются по буквам
  utils.$('[data-split-rise]').forEach((el) => {
    const chars = el.querySelectorAll('[data-char]');
    if (!chars.length) return;
    animate(chars, {
      y: ['115%', '0%'],
      duration: 750,
      delay: stagger(24, { start: 120 }),
      ease: 'out(3)',
      autoplay: onScroll({ target: el, enter: 'bottom top', leave: 'top bottom' }),
    });
  });

  // Плитки мозаики появляются с пружинкой
  const tiles = utils.$('[data-tile]');
  if (tiles.length) {
    animate(tiles, {
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [-4, 0],
      duration: 700,
      delay: stagger(140, { start: 350 }),
      ease: 'outBack',
    });
  }

  // Счётчики статистики
  utils.$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count ?? '0');
    const state = { v: 0 };
    el.textContent = '0';
    animate(state, {
      v: target,
      duration: 1500,
      delay: 800,
      ease: 'out(4)',
      onUpdate: () => {
        el.textContent = String(Math.round(state.v));
      },
      onComplete: () => {
        el.textContent = String(target);
      },
    });
  });

  // Мягкое появление блоков
  utils.$('[data-fade]').forEach((el) => {
    animate(el, {
      opacity: [0, 1],
      y: [28, 0],
      duration: 700,
      ease: 'outCubic',
      autoplay: onScroll({ target: el, enter: 'bottom top', leave: 'top bottom' }),
    });
  });

  // Карточки подпрыгивают при входе в кадр
  utils.$('[data-build]').forEach((el) => {
    animate(el, {
      opacity: [0, 1],
      y: [36, 0],
      duration: 650,
      ease: 'outCubic',
      autoplay: onScroll({ target: el, enter: 'bottom top', leave: 'top bottom' }),
    });
  });
}
