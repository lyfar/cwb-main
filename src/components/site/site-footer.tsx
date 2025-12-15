import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { href: "/who-we-are", label: "Who we are" },
  { href: "/who-we-serve", label: "Who we serve" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/contacts", label: "Contacts" },
] as const

const EMAIL = "enquiries@cwb-hk.com"
const PHONE = "+852 3893 9588"
const ADDRESS_LINES = [
  "Office 1803, The Henderson",
  "2 Murray Road, Central, Hong Kong",
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-background/80 supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="font-serif text-xl font-semibold tracking-tight">
              CWB
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Independent custody and investment management in Hong Kong.
            </p>
            <Badge variant="outline">SFC CE AFQ783</Badge>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">Company</div>
            <nav className="text-sm">
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">Contacts</div>
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
            <Button asChild size="sm" className="w-fit">
              <Link href="/contacts">Get in touch</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between">
          <div>© {year} CWB Hong Kong. All rights reserved.</div>
          <div>Built on trust. Driven by vision.</div>
        </div>
      </div>
    </footer>
  )
}

