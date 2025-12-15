import Image from "next/image"
import Link from "next/link"
import {
  ArrowsLeftRight as ArrowsLeftRightIcon,
  ChartLineUp as ChartLineUpIcon,
  ShieldCheck as ShieldCheckIcon,
  Vault as VaultIcon,
} from "@phosphor-icons/react/dist/ssr"

import Hero from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BentoGridShowcase } from "@/components/ui/bento-grid"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { brokeragePartners, custodyPartners, logoDevUrl } from "@/lib/partners"

const capabilities = [
  {
    title: "Safe custody",
    description: "Secure, segregated safekeeping with top-tier global partners.",
    href: "/what-we-do/safe-custody",
    icon: VaultIcon,
    partners: custodyPartners.slice(0, 3),
  },
  {
    title: "Asset management",
    description: "Open-architecture access to public and private opportunities.",
    href: "/what-we-do/asset-management",
    icon: ChartLineUpIcon,
    image: "/Gemini_Generated_Image_ivc5x4ivc5x4ivc5.jpg",
  },
  {
    title: "Brokerage",
    description: "Global execution with APAC and emerging market coverage.",
    href: "/what-we-do/brokerage",
    icon: ArrowsLeftRightIcon,
    partners: brokeragePartners.slice(0, 3),
  },
] as const

type Capability = (typeof capabilities)[number] & {
  image?: string
  partners?: typeof custodyPartners | typeof brokeragePartners
}

function CapabilityTile({ capability }: { capability: Capability }) {
  const Icon = capability.icon
  const hasImage = Boolean(capability.image)
  const hasPartners = Boolean(capability.partners && capability.partners.length > 0)
  return (
    <Card
      variant="glass"
      className="relative h-full overflow-hidden"
    >
      {capability.image ? (
        <>
          <Image
            src={capability.image}
            alt={`${capability.title} background`}
            fill
            className="object-cover opacity-80"
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/75 to-background/55 backdrop-saturate-125" />
        </>
      ) : null}
      <div className="relative z-10 h-full">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-md">
            <Icon className="size-5" />
          </div>
          <CardTitle className="text-base">{capability.title}</CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            "flex h-full flex-col gap-4 text-sm leading-relaxed",
            hasImage ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <p>{capability.description}</p>
          {hasPartners && (
            <div className="flex flex-wrap items-center gap-3">
              {capability.partners?.map((partner) => (
                <Image
                  key={partner.domain}
                  src={logoDevUrl(partner.domain)}
                  alt={`${partner.name} logo`}
                  width={100}
                  height={40}
                  className="h-4 w-auto opacity-60"
                />
              ))}
            </div>
          )}
          <div className="mt-auto flex justify-end">
            <Button asChild variant={hasImage ? "secondary" : "ghost"}>
              <Link href={capability.href}>Learn more</Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function BuiltOnTrustCard() {
  return (
    <Card variant="glass" className="h-full bg-primary/5">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary grid size-12 shrink-0 place-items-center rounded-xl">
            <ShieldCheckIcon className="size-6" />
          </div>
          <div className="space-y-2">
            <Badge variant="outline" className="w-fit">
              Built on trust
            </Badge>
            <CardTitle className="text-xl">Licensed custodian, client-first stewardship.</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-between gap-6 text-sm leading-relaxed text-muted-foreground">
        <div className="space-y-3">
          <p>
            We maintain segregated custody arrangements and robust operational controls to keep client assets
            ring-fenced.
          </p>
          <p>We operate with transparent oversight so you always know how your assets are safeguarded.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/contacts">Get in touch</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/who-we-are">Who we are</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


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
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              Safe custody, brokerage, and asset management —
              designed for institutional and private clients.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/what-we-do">Explore what we do</Link>
          </Button>
        </div>

        <Separator className="my-10" />

        <BentoGridShowcase
          className="mt-10"
          item1={<CapabilityTile capability={capabilities[0]} />}
          item2={<CapabilityTile capability={capabilities[1]} />}
          item3={<CapabilityTile capability={capabilities[2]} />}
          item4={<BuiltOnTrustCard />}
        />
      </section>
    </main>
  )
}
