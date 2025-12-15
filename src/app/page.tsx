import Link from "next/link"
import {
  ArrowsLeftRight as ArrowsLeftRightIcon,
  Bank as BankIcon,
  ChartLineUp as ChartLineUpIcon,
  Vault as VaultIcon,
} from "@phosphor-icons/react/dist/ssr"

import Hero from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const capabilities = [
  {
    title: "Safe custody",
    description: "Secure, segregated safekeeping with top-tier global partners.",
    href: "/what-we-do/safe-custody",
    icon: VaultIcon,
  },
  {
    title: "Asset management",
    description: "Open-architecture access to public and private opportunities.",
    href: "/what-we-do/asset-management",
    icon: ChartLineUpIcon,
  },
  {
    title: "Brokerage",
    description: "Global execution with APAC and emerging market coverage.",
    href: "/what-we-do/brokerage",
    icon: ArrowsLeftRightIcon,
  },
  {
    title: "Banking services",
    description: "Streamlined payments across major currencies.",
    href: "/what-we-do/banking-services",
    icon: BankIcon,
  },
] as const

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge variant="outline">Our capabilities</Badge>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Institutional-grade custody. Personalised guidance.
            </h2>
            <p className="text-muted-foreground dark:text-foreground/90 max-w-2xl text-sm leading-relaxed">
              Safe custody, brokerage, asset management, and banking services —
              designed for institutional and private clients.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/what-we-do">Explore what we do</Link>
          </Button>
        </div>

        <Separator className="my-10" />

        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((capability) => (
            <Card key={capability.title} variant="glass" className="group">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <capability.icon className="text-primary size-6" />
                <CardTitle className="text-base">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
                {capability.description}
                <div className="mt-4">
                  <Button asChild variant="ghost" className="px-0">
                    <Link href={capability.href}>Learn more</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-10" />

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-base">Built on trust</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 grid gap-3 text-sm leading-relaxed md:grid-cols-2">
            <div>
              We maintain segregated custody arrangements and robust operational
              controls to keep client assets ring-fenced.
            </div>
            <div>
              Ready to talk? Reach our team for onboarding, custody, or trading
              support.
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 md:flex-row">
              <Button asChild>
                <Link href="/contacts">Get in touch</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/who-we-are">Who we are</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
