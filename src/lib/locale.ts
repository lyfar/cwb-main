export const LOCALES = ["en", "ru"] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"

export function trimTrailingSlash(pathname: string) {
  if (!pathname || pathname === "/") return "/"
  return pathname.replace(/\/+$/, "")
}

export function getLocaleFromPathname(pathname?: string | null): Locale {
  const normalized = trimTrailingSlash(pathname ?? "/")
  return normalized === "/ru" || normalized.startsWith("/ru/") ? "ru" : "en"
}

export function stripLocalePrefix(pathname: string) {
  const normalized = trimTrailingSlash(pathname)
  if (normalized === "/ru") return "/"
  if (normalized.startsWith("/ru/")) return normalized.slice(3) || "/"
  return normalized || "/"
}

export function localizeHref(href: string, locale: Locale) {
  if (locale === "en") return href
  if (href === "/") return "/ru"
  if (href.startsWith("/ru/") || href === "/ru") return href
  return `/ru${href}`
}

export function switchLocalePathname(pathname: string, locale: Locale) {
  const base = stripLocalePrefix(pathname)
  return localizeHref(base, locale)
}

