import type { Dict } from './ru';

const en: Dict = {
  meta: {
    title: 'Dara | web studio: websites, e-commerce, web apps',
    description:
      'Websites, online stores and web apps. Full cycle from brief to launch, with support after.',
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
    meaning: 'In Kazakh, “dara” means one of a kind. That is how we build every project.',
    sub: 'We plan the structure, write the copy, design and ship. You bring the brief and feedback, we handle the rest.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'See our work',
    stats: [
      { n: 40, suffix: '+', label: 'projects launched' },
      { n: 6, suffix: '', label: 'years building the web' },
      { n: 92, suffix: '%', label: 'of clients come back' },
    ],
  },
  services: {
    title: 'What we do',
    sub: 'From landing pages to web apps. We call a project done when it starts bringing in leads.',
    items: [
      {
        title: 'Websites and landing pages',
        desc: 'Landing pages and corporate websites. We start with messaging and copy, and finish with launch and analytics.',
        tags: ['design', 'copywriting', 'SEO basics'],
      },
      {
        title: 'Online stores',
        desc: 'A store with catalog, payments and delivery. We wire up Kaspi, 1C and your CRM.',
        tags: ['Kaspi Pay', '1C and CRM'],
      },
      {
        title: 'Web applications',
        desc: 'Customer portals, internal tools and automation built around your actual process.',
        tags: ['portals', 'API', 'automation'],
      },
      {
        title: 'Support and growth',
        desc: 'Updates, analytics, A/B tests, performance. We keep the website up to speed with the business.',
        tags: ['analytics', 'A/B testing'],
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
        desc: 'We built a fresh-roast coffee store with bean subscriptions and Kaspi payments.',
        tags: ['e-commerce', 'Kaspi Pay', 'subscriptions'],
      },
      {
        name: 'MedCheck',
        type: 'web application',
        metric: '12,000',
        metricLabel: 'clinic bookings',
        desc: 'Booking a doctor by phone takes forever. MedCheck does it in a minute, with reminders and a patient dashboard.',
        tags: ['web app', 'dashboard'],
      },
      {
        name: 'Qurylys Group',
        type: 'corporate website',
        metric: '×2.3',
        metricLabel: 'leads from ads',
        desc: 'Real estate developer website: project catalog, floor plans, mortgage calculator, CRM export.',
        tags: ['real estate', 'calculator', 'CRM'],
      },
    ],
  },
  process: {
    title: 'How we work',
    sub: 'Five steps from brief to launch. At every step you can see what is done and what comes next.',
    steps: [
      {
        title: 'Brief and estimate',
        desc: 'A 30-minute call: we agree on goals, timeline and budget. Free, no strings attached.',
        time: '1-2 days',
      },
      {
        title: 'Prototype and design',
        desc: 'We shape the structure and design concept, then refine it with your feedback.',
        time: '~1 week',
      },
      {
        title: 'Development',
        desc: 'We write the code and share progress on a live demo link as we go.',
        time: '1-3 weeks',
      },
      {
        title: 'Content and QA',
        desc: 'We fill in content, proofread and test on phones, tablets and every major browser.',
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
        price: 'from $750',
        time: '1-2 weeks',
        features: [
          'Design tailored to your brand',
          'Copy and structure',
          'Responsive on every screen',
          'SEO basics and analytics',
          'Lead form wired to Telegram',
        ],
      },
      {
        name: 'Website or store',
        price: 'from $1,700',
        time: '3-6 weeks',
        features: [
          'Catalog and payments',
          'Integrations: Kaspi, 1C, CRM',
          'Easy-to-use admin panel',
          'Training for your team',
          'One month of free support',
        ],
      },
      {
        name: 'Web application',
        price: 'custom quote',
        time: '6+ weeks',
        features: [
          'User accounts and roles',
          'API and integrations',
          'Staged delivery',
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
        text: 'They delivered in three weeks what our previous contractor could not finish in six months. We made it before the season and leads started on day one. The only downside: strict content deadlines on our side.',
        author: 'Aigerim N.',
        role: 'founder, Aruana Coffee',
      },
      {
        text: 'Every design decision came with numbers behind it. We had not seen that before.',
        author: 'Daulet S.',
        role: 'marketing director, Qurylys Group',
      },
      {
        text: 'Support tickets get closed the same day, usually within a couple of hours.',
        author: 'Maria',
        role: 'product manager, MedCheck',
      },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'How much does a website cost?',
        a: 'A landing page starts at $750, a website or store at $1,700, and web apps are quoted individually. The price depends on scope, design and integrations. After the brief you get an exact estimate, fixed in the contract.',
      },
      {
        q: 'How long does it take?',
        a: 'A landing page takes 1-2 weeks, a store 3-6 weeks, an app 6+ weeks. Every week you get a link to the current build.',
      },
      {
        q: 'What do you need from us?',
        a: 'The minimum: 2-3 calls, materials about your company and feedback on designs. Copy, structure and design are on us.',
      },
      {
        q: 'Who writes the copy and designs the site?',
        a: 'We do. A copywriter, a designer and developers on one team, no subcontractors.',
      },
      {
        q: 'What happens after launch?',
        a: 'Bugs found after launch are fixed for free within a year. Beyond that, optionally: support, growth, A/B tests and analytics.',
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
      messagePlaceholder: 'need a website for a coffee shop, budget around $1,500, launch by October',
      submit: 'Send request',
      sending: 'Sending your request',
      success: 'Thanks, we got your request. We will reply today or tomorrow morning.',
      error: 'Something went wrong. Message us directly instead.',
    },
  },
  footer: {
    tagline: 'One-of-a-kind websites.',
    status: 'Open for new projects',
    rights: 'Dara Studio',
    langLabel: 'Language',
  },
};

export default en;
