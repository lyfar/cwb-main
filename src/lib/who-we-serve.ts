import type { Locale } from "@/lib/locale"

export type WhoWeServeItemId =
  | "overview"
  | "institutional-clients"
  | "private-clients"
  | "family-offices"

export type WhoWeServeItem = {
  id: WhoWeServeItemId
  title: string
  href: string
  description: string
}

type Localized = {
  en: string
  ru: string
}

const WHO_WE_SERVE_ITEMS: Array<{
  id: WhoWeServeItemId
  title: Localized
  href: string
  description: Localized
}> = [
  {
    id: "overview",
    title: { en: "Overview", ru: "Обзор" },
    href: "/who-we-serve",
    description: { en: "Client segments we support.", ru: "Клиентские сегменты, с которыми мы работаем." },
  },
  {
    id: "institutional-clients",
    title: { en: "Institutional clients", ru: "Институциональные клиенты" },
    href: "/who-we-serve/institutional-clients",
    description: {
      en: "Funds, asset managers, and treasuries needing robust controls.",
      ru: "Фонды, управляющие и казначейства, которым важны строгие контроли.",
    },
  },
  {
    id: "private-clients",
    title: { en: "Private clients", ru: "Частные клиенты" },
    href: "/who-we-serve/private-clients",
    description: {
      en: "HNW individuals and families seeking a private banking–style experience.",
      ru: "Состоятельные клиенты и семьи, которым нужен сервис в стиле private banking.",
    },
  },
  {
    id: "family-offices",
    title: { en: "Family offices", ru: "Семейные офисы" },
    href: "/who-we-serve/family-offices",
    description: {
      en: "Governance, reporting, and open-architecture access across markets.",
      ru: "Управление, отчётность и доступ к возможностям на разных рынках.",
    },
  },
]

export function getWhoWeServeItems(locale: Locale): WhoWeServeItem[] {
  return WHO_WE_SERVE_ITEMS.map((item) => ({
    id: item.id,
    title: item.title[locale],
    href: item.href,
    description: item.description[locale],
  }))
}

export const whoWeServeItems = getWhoWeServeItems("en")
