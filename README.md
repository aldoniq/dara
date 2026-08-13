# Dara — лендинг студии веб-разработки

Трёхъязычный лендинг (рус / қаз / eng) на Astro + Tailwind CSS 4 + anime.js v4.
«Дара» — по-казахски «единственный в своём роде».

Дизайн: «поп» — светлый фон, цветные скруглённые блоки (фиолет / оранж / мята / лимон),
шрифт Rubik, мозаика со статистикой в hero, дружелюбный и энергичный стиль.
Выбран из прототипов в `design-variants/` (вариант 4).
Анимации: заголовки собираются по буквам, плитки появляются с пружинкой, счётчики тикают,
карточки подпрыгивают при скролле — всё в `src/scripts/main.ts`,
при `prefers-reduced-motion` отключается.

## Запуск

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # прод-сборка в dist/
```

## Структура

- `src/i18n/` — весь текст сайта. `ru.ts` — эталон, `kk.ts` и `en.ts` типизированы по нему:
  забыл перевести строку — TypeScript подскажет.
- `src/components/` — секции лендинга (Hero, Services, Cases, …).
- `src/pages/` — `/` (рус), `/kk/`, `/en/`.
- `functions/api/lead.js` — Cloudflare Pages Function: форма → Telegram.

## Деплой (Cloudflare Pages)

1. Залить репозиторий на GitHub и подключить в Cloudflare Pages
   (build command: `npm run build`, output: `dist`). Папка `functions/` подхватится автоматически.
2. Создать бота через [@BotFather](https://t.me/BotFather), получить токен.
3. Узнать `chat_id` (написать боту и открыть `https://api.telegram.org/bot<TOKEN>/getUpdates`).
4. В Pages → Settings → Environment variables добавить `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.

Без настроенных переменных форма показывает ошибку с прямыми контактами — сайт при этом работает.

## Что заменить перед запуском (плейсхолдеры)

- **Кейсы** (`cases` в словарях) — сейчас выдуманные демо-проекты с демо-цифрами.
- **Отзывы** (`testimonials`) — тоже демо, заменить на реальные.
- **Статистика в hero** (40+ проектов, 6 лет, 92%) — поставить свои цифры.
- **Цены** (`pricing`) — ориентировочные вилки, проверить.
- **Контакты** в `src/components/Contact.astro` — email, Telegram, телефон.
- Домен: после покупки добавить `site` в `astro.config.mjs` и sitemap.
