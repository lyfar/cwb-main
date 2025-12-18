import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowsLeftRight as ArrowsLeftRightIcon,
  ChartLineUp as ChartLineUpIcon,
  ShieldCheck as ShieldCheckIcon,
  Vault as VaultIcon,
} from "@phosphor-icons/react/dist/ssr"

import type { Locale } from "@/lib/locale"
import { localizeHref } from "@/lib/locale"
import Hero from "@/components/ui/hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BentoGridShowcase } from "@/components/ui/bento-grid"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { brokeragePartners, custodyPartners, logoDevUrl } from "@/lib/partners"

export const metadata: Metadata = {
  title: "CWB Hong Kong",
  description:
    "Независимая лицензированная кастодианская и управляющая компания в Гонконге (код SFC CE AFQ783).",
}

const locale: Locale = "ru"

const capabilities = [
  {
    title: "Безопасное хранение",
    description:
      "Надёжное сегрегированное хранение у ведущих глобальных кастодианов.",
    href: "/what-we-do/safe-custody",
    icon: VaultIcon,
    partners: custodyPartners.slice(0, 3),
  },
  {
    title: "Управление активами",
    description:
      "Открытая архитектура и доступ к публичным и частным возможностям.",
    href: "/what-we-do/asset-management",
    icon: ChartLineUpIcon,
    image: "/Gemini_Generated_Image_ivc5x4ivc5x4ivc5.jpg",
  },
  {
    title: "Брокерское обслуживание",
    description: "Исполнение и доступ к рынкам с покрытием глобально и в АТР.",
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
    <Link href={localizeHref(capability.href, locale)} className="block h-full">
      <Card
        variant="glass"
        className="relative group h-full cursor-pointer overflow-hidden transition-all hover:shadow-lg"
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
            {hasPartners ? (
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
            ) : null}
            <div className="mt-auto flex justify-end">
              <Button
                variant={hasImage ? "secondary" : "ghost"}
                className="group-hover:bg-primary/10 pointer-events-none"
              >
                Подробнее
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

function BuiltOnTrustCard() {
  return (
    <Card variant="highlight" className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary grid size-12 shrink-0 place-items-center rounded-xl">
            <ShieldCheckIcon className="size-6" />
          </div>
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="bg-secondary-foreground/5 text-secondary-foreground border-secondary-foreground/20 w-fit"
            >
              Основано на доверии
            </Badge>
            <CardTitle className="text-xl">
              Лицензированный кастодиан — приоритет интересов клиента.
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-secondary-foreground/80 flex h-full flex-col justify-between gap-6 text-sm leading-relaxed">
        <div className="space-y-3">
          <p>
            Мы поддерживаем сегрегированное хранение и строгие операционные
            контроли, чтобы активы клиентов оставались ограждёнными.
          </p>
          <p>
            Мы работаем с прозрачным контролем, чтобы вы всегда понимали, как
            защищены ваши активы.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href={localizeHref("/contacts", locale)}>Контакты</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={localizeHref("/who-we-are", locale)}>Кто мы</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function RuHomePage() {
  return (
    <main>
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge variant="outline">Наши возможности</Badge>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Институциональный уровень хранения. Персональный подход.
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              Безопасное хранение, брокерское обслуживание и управление активами —
              для институциональных и частных клиентов.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={localizeHref("/what-we-do", locale)}>
              Посмотреть услуги
            </Link>
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

