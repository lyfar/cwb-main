import type { Locale } from "@/lib/locale"

export type WhatWeDoItemId =
  | "overview"
  | "safe-custody"
  | "asset-management"
  | "brokerage"
  | "banking-services"

export type WhatWeDoItem = {
  id: WhatWeDoItemId
  title: string
  href: string
  description: string
}

type Localized = {
  en: string
  ru: string
}

const WHAT_WE_DO_ITEMS: Array<{
  id: WhatWeDoItemId
  title: Localized
  href: string
  description: Localized
}> = [
  {
    id: "overview",
    title: { en: "Overview", ru: "Обзор" },
    href: "/what-we-do",
    description: { en: "All capabilities at a glance.", ru: "Все возможности — кратко." },
  },
  {
    id: "safe-custody",
    title: { en: "Safe custody", ru: "Безопасное хранение" },
    href: "/what-we-do/safe-custody",
    description: {
      en: "Segregated safekeeping with top-tier global custodians.",
      ru: "Сегрегированное хранение у ведущих глобальных кастодианов.",
    },
  },
  {
    id: "asset-management",
    title: { en: "Asset management", ru: "Управление активами" },
    href: "/what-we-do/asset-management",
    description: {
      en: "Open-architecture access to public and private opportunities.",
      ru: "Доступ к публичным и частным возможностям через открытую архитектуру.",
    },
  },
  {
    id: "brokerage",
    title: { en: "Brokerage", ru: "Брокерское обслуживание" },
    href: "/what-we-do/brokerage",
    description: {
      en: "Execution and market access across global + APAC venues.",
      ru: "Исполнение и доступ к рынкам по всему миру, включая АТР.",
    },
  },
  {
    id: "banking-services",
    title: { en: "Banking services", ru: "Банковские услуги" },
    href: "/what-we-do/banking-services",
    description: {
      en: "Payments and multi-currency services connected to your account.",
      ru: "Платежи и мультивалютные операции, привязанные к вашему счёту.",
    },
  },
]

export function getWhatWeDoItems(locale: Locale): WhatWeDoItem[] {
  return WHAT_WE_DO_ITEMS.map((item) => ({
    id: item.id,
    title: item.title[locale],
    href: item.href,
    description: item.description[locale],
  }))
}

export const whatWeDoItems = getWhatWeDoItems("en")
