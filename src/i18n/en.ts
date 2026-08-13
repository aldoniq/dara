import type { Dict } from './ru';

const en: Dict = {
  meta: {
    title: 'Dara | web studio: websites, e-commerce, web apps',
    description:
      'We build websites, online stores and web apps end to end: strategy, design, code, launch and support.',
  },
  nav: {
    services: 'Services',
    cases: 'Work',
    process: 'Process',
    pricing: 'Pricing',
    faq: 'FAQ',
    contact: 'Contact',
    cta: 'Start a project',
  },
  hero: {
    badge: 'web development studio',
    titlePre: 'Websites that',
    titleAccent: 'sell',
    titlePost: 'and get remembered',
    meaning: 'In Kazakh, "dara" means one of a kind. That is how we build every project.',
    sub: 'We take care of everything: strategy, design, code, launch. You run the business and we make the website work for it.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'See our work',
    stats: [
      { n: 40, suffix: '+', label: 'projects launched' },
      { n: 6, suffix: '', label: 'years building the web' },
      { n: 92, suffix: '%', label: 'of clients come back' },
    ],
  },
  marquee: [
    'landing pages',
    'online stores',
    'web apps',
    'UI/UX design',
    'SEO and speed',
    'support',
  ],
  services: {
    title: 'What we do',
    sub: 'Four services, one outcome: a website that brings in leads instead of just existing online.',
    items: [
      {
        title: 'Websites and landing pages',
        desc: 'High-converting landing pages and corporate websites: from messaging and copy to launch and analytics.',
        tags: ['design', 'copywriting', 'SEO basics'],
      },
      {
        title: 'Online stores',
        desc: 'Catalog, cart, payments and delivery. Kaspi, 1C and CRM integrations. A store that is ready to sell.',
        tags: ['e-commerce', 'Kaspi Pay', 'integrations'],
      },
      {
        title: 'Web applications',
        desc: 'Customer portals, internal tools, process automation. For when templates are no longer enough.',
        tags: ['portals', 'API', 'automation'],
      },
      {
        title: 'Support and growth',
        desc: 'Updates, analytics, A/B tests and performance. Your website keeps living and growing instead of aging.',
        tags: ['SLA', 'analytics', 'A/B testing'],
      },
    ],
  },
  cases: {
    title: 'Selected work',
    sub: 'Three projects we are proud of. Numbers are from the first quarter after launch.',
    items: [
      {
        name: 'Aruana Coffee',
        type: 'online store',
        metric: '+140%',
        metricLabel: 'online orders',
        desc: 'Freshly roasted coffee store: catalog, bean subscriptions, Kaspi payments.',
        tags: ['e-commerce', 'Kaspi Pay', 'subscriptions'],
      },
      {
        name: 'MedCheck',
        type: 'web application',
        metric: '12,000',
        metricLabel: 'clinic bookings',
        desc: 'Online booking service: doctor schedules, reminders, patient dashboard.',
        tags: ['web app', 'dashboard', 'integrations'],
      },
      {
        name: 'Qurylys Group',
        type: 'corporate website',
        metric: 'x2.3',
        metricLabel: 'leads from ads',
        desc: 'Real estate developer website: project catalog, floor plans, mortgage calculator, CRM export.',
        tags: ['real estate', 'calculator', 'CRM'],
      },
    ],
  },
  process: {
    title: 'How we work',
    sub: 'A transparent process with no surprises: you always know what is happening and what comes next.',
    steps: [
      {
        title: 'Brief and estimate',
        desc: 'A 30-minute call: we agree on goals, timeline and budget. Free, no strings attached.',
        time: '1-2 days',
      },
      {
        title: 'Prototype and design',
        desc: 'We shape the structure and design concept. We iterate until you say "that is it".',
        time: '~1 week',
      },
      {
        title: 'Development',
        desc: 'We write the code and share progress on a live demo link. No "you will see it at the end".',
        time: '1-3 weeks',
      },
      {
        title: 'Content and QA',
        desc: 'We fill in content, proofread and test on every screen and browser. Lighthouse scores stay above 90.',
        time: '3-5 days',
      },
      {
        title: 'Launch and support',
        desc: 'We ship, hook up analytics and train your team. We stay around after the launch.',
        time: '1 day',
      },
    ],
  },
  pricing: {
    title: 'Pricing',
    sub: 'We prepare an exact estimate after the brief, free of charge. These are honest ballparks so you know the range.',
    popular: 'most popular',
    items: [
      {
        name: 'Landing page',
        price: 'from $900',
        time: '1-2 weeks',
        features: [
          'design tailored to your brand',
          'copy and structure',
          'responsive on every screen',
          'SEO basics and analytics',
          'lead form wired to Telegram',
        ],
      },
      {
        name: 'Website or store',
        price: 'from $2,000',
        time: '3-6 weeks',
        features: [
          'catalog and payments',
          'integrations: Kaspi, 1C, CRM',
          'easy-to-use admin panel',
          'training for your team',
          'one month of free support',
        ],
      },
      {
        name: 'Web application',
        price: 'custom quote',
        time: '6+ weeks',
        features: [
          'user accounts and roles',
          'API and integrations',
          'staged delivery',
          'technical documentation',
          'SLA support',
        ],
      },
    ],
    cta: 'Estimate my project',
  },
  testimonials: {
    title: 'What clients say',
    items: [
      {
        text: 'They delivered in three weeks what our previous contractor could not finish in six months. Leads started coming in on day one.',
        author: 'Aigerim',
        role: 'Aruana Coffee',
      },
      {
        text: 'A rare studio that thinks about the business, not just pretty pictures. Every decision was backed by numbers.',
        author: 'Daulet',
        role: 'Qurylys Group',
      },
      {
        text: 'Their support replies faster than our own team. Funny, but true.',
        author: 'Maria',
        role: 'MedCheck',
      },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'How much does a website cost?',
        a: 'A landing page starts at $900, a website or store at $2,000, and web apps are quoted individually. The price depends on scope, design and integrations. After the brief you get an exact estimate, fixed in the contract.',
      },
      {
        q: 'How long does it take?',
        a: 'A landing page takes 1-2 weeks, a website or store 3-6 weeks, an app 6+ weeks. Deadlines are fixed in the contract and progress is visible on a demo link every week.',
      },
      {
        q: 'What do you need from us?',
        a: 'The minimum: 2-3 calls, materials about your company and feedback on designs. Copy, structure and design are on us.',
      },
      {
        q: 'Who writes the copy and designs the site?',
        a: 'We do. We work end to end: copywriting, design, development and launch, all in-house, no subcontractors.',
      },
      {
        q: 'What happens after launch?',
        a: 'Bug fixes are guaranteed forever. Beyond that, optionally: support, growth, A/B tests and analytics at a clear monthly rate.',
      },
    ],
  },
  contact: {
    title: 'Let us talk about your project',
    sub: 'Tell us a few words about the task and we will get back with questions and a rough estimate within one business day.',
    directTitle: 'Or reach us directly:',
    form: {
      name: 'Your name',
      namePlaceholder: 'Alex',
      contact: 'Phone or Telegram',
      contactPlaceholder: '+7 700 000 00 00 or @username',
      message: 'A few words about the task',
      messagePlaceholder: 'We need an online store for a cosmetics brand, launching by December',
      submit: 'Send request',
      sending: 'Sending...',
      success: 'Sent!',
      error: 'Something went wrong. Message us directly instead.',
      log: [
        'request received',
        'the team has been notified',
        'we will reply within one business day',
      ],
    },
  },
  footer: {
    tagline: 'One-of-a-kind websites.',
    status: 'Open for new projects',
    rights: '© 2026 Dara Studio',
    langLabel: 'Language',
  },
};

export default en;
