import type { Locale } from "@/lib/locale"

export const copy = {
  en: {
    nav: {
      whoWeAre: "Who we are",
      whoWeServe: "Who we serve",
      whatWeDo: "What we do",
      contacts: "Contacts",
    },
    header: {
      brandTagline: "Custody & investment management",
      mobileTagline: "Built on trust. Driven by vision.",
    },
    footer: {
      description: "Independent custody and investment management in Hong Kong.",
      company: "Company",
      contacts: "Contacts",
      rights: "All rights reserved.",
      tagline: "Built on trust. Driven by vision.",
    },
    toggles: {
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      ambientBackground: "Ambient background",
      language: "Language",
    },
    hero: {
      badge: "Licensed custodian · SFC CE code AFQ783",
      title: "Built on trust. Driven by vision.",
      description:
        "CWB Hong Kong is an independent licensed custodian and investment management firm specialising in safe custody, brokerage, and asset management for institutional and private clients.",
      ctaPrimary: "Contact us",
      ctaSecondary: "Explore capabilities",
      cards: {
        custody: {
          title: "Safe custody",
          description: "Segregated safekeeping with top-tier global custodians.",
        },
        architecture: {
          title: "Open architecture",
          description: "Access to public and private opportunities across markets.",
        },
        controls: {
          title: "Robust controls",
          description: "Ring-fenced assets, segregation checks, and clean oversight.",
        },
      },
    },
  },
  ru: {
    nav: {
      whoWeAre: "Кто мы",
      whoWeServe: "Кому мы помогаем",
      whatWeDo: "Что мы делаем",
      contacts: "Контакты",
    },
    header: {
      brandTagline: "Кастодиальные услуги и управление активами",
      mobileTagline: "Основано на доверии. Движимо видением.",
    },
    footer: {
      description:
        "Независимые кастодиальные услуги и управление активами в Гонконге.",
      company: "Компания",
      contacts: "Контакты",
      rights: "Все права защищены.",
      tagline: "Основано на доверии. Движимо видением.",
    },
    toggles: {
      theme: "Тема",
      light: "Светлая",
      dark: "Тёмная",
      ambientBackground: "Атмосферный фон",
      language: "Язык",
    },
    hero: {
      badge: "Лицензированный кастодиан · код SFC CE AFQ783",
      title: "Основано на доверии. Движимо видением.",
      description:
        "CWB Hong Kong — независимая лицензированная кастодианская и управляющая компания, специализирующаяся на безопасном хранении активов, брокерском обслуживании и управлении активами для институциональных и частных клиентов.",
      ctaPrimary: "Связаться с нами",
      ctaSecondary: "Изучить возможности",
      cards: {
        custody: {
          title: "Безопасное хранение",
          description: "Сегрегированное хранение у ведущих глобальных кастодианов.",
        },
        architecture: {
          title: "Открытая архитектура",
          description: "Доступ к публичным и частным возможностям на разных рынках.",
        },
        controls: {
          title: "Надёжные контроли",
          description:
            "Ограждённые активы, проверки сегрегации и прозрачный контроль.",
        },
      },
    },
  },
} as const

export function getCopy(locale: Locale) {
  return copy[locale]
}

