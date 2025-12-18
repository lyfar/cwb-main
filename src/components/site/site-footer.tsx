"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { AmbientBackgroundToggle } from "@/components/site/ambient-background-toggle"
import { LanguageToggle } from "@/components/site/language-toggle"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getCopy } from "@/lib/copy"
import { getLocaleFromPathname, localizeHref } from "@/lib/locale"

const navItems = [
  { href: "/who-we-are", key: "whoWeAre" },
  { href: "/who-we-serve", key: "whoWeServe" },
  { href: "/what-we-do", key: "whatWeDo" },
  { href: "/contacts", key: "contacts" },
] as const

const EMAIL = "enquiries@cwb-hk.com"
const PHONE = "+852 3893 9588"
const ADDRESS_LINES = [
  "Office 1803, The Henderson",
  "2 Murray Road, Central, Hong Kong",
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCopy(locale)

  return (
    <footer
      data-site-footer
      className="bg-background/80 supports-[backdrop-filter]:bg-background/60 border-t"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="font-serif text-xl font-semibold tracking-tight">
              CWB
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {copy.footer.description}
            </p>
            <Badge variant="outline">SFC CE AFQ783</Badge>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">{copy.footer.company}</div>
            <nav className="text-sm">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizeHref(item.href, locale)}
                      className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                    >
                      {copy.nav[item.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">{copy.footer.contacts}</div>
            <div className="text-muted-foreground text-sm leading-relaxed">
              <div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-foreground underline-offset-4 hover:underline"
                >
                  {EMAIL}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${PHONE.replace(/\\s+/g, "")}`}
                  className="hover:text-foreground underline-offset-4 hover:underline"
                >
                  {PHONE}
                </a>
              </div>
              <div className="mt-2">
                {ADDRESS_LINES.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between">
          <div>
            © {year} CWB Hong Kong. {copy.footer.rights}
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <div>{copy.footer.tagline}</div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <AmbientBackgroundToggle />
              <ThemeToggle variant="outline" size="sm" showLabel />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
