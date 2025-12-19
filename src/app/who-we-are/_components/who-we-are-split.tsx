import type { Locale } from "@/lib/locale"
import { MapPin as MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

import { HongKongMapWatermark } from "@/components/site/hong-kong-map-watermark"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { custodyPartners, logoDevUrl } from "@/lib/partners"

const COPY: Record<
  Locale,
  {
    eyebrow: string
    heroTitle: string
    subtitle: string
    badge: string
    locationLabel: string
    locationValue: string
    anchorTitle: string
    anchorCards: Array<{ title: string; subtitle: string; description: string }>
    commitments: {
      kicker: string
      title: string
      subtitle: string
      logosLabel: string
      items: Array<{ title: string; description: string }>
    }
  }
> = {
  en: {
    eyebrow: "Worldwide reach",
    heroTitle: "Who we are",
    subtitle:
      "CWB Hong Kong is an independent licensed custodian and investment management firm. We support institutional and private clients with safekeeping, brokerage access, and disciplined portfolio management.",
    badge: "SFC CE AFQ783",
    locationLabel: "Headquartered",
    locationValue: "Central, Hong Kong",
    anchorTitle: "Anchor point",
    anchorCards: [
      {
        title: "Who we are",
        subtitle: "SFC licences 1, 4, 9",
        description:
          "Licensed SFC broker and asset manager. We combine institutional-grade reliability with modern access to Asian and global markets.",
      },
      {
        title: "Our mission",
        subtitle: "Architect",
        description:
          "Not just a custodian and broker — we act as your financial architect, removing friction between you and global capital markets.",
      },
      {
        title: "Status",
        subtitle: "Independence",
        description:
          "Full independence. We don’t sell proprietary products — we search for the best solutions across the market (open architecture).",
      },
    ],
    commitments: {
      kicker: "Commitments",
      title: "Institutional safety standard",
      subtitle:
        "How we structure custody, execution, and operations to protect client assets and reduce operational risk.",
      logosLabel: "Selected custody counterparties (examples)",
      items: [
        {
          title: "Full segregation",
          description:
            "Client assets are held in segregated accounts, ring-fenced from broker balance sheets.",
        },
        {
          title: "Global custodians",
          description:
            "Assets are placed with top-tier global custodians and brokers, prioritising resilience and market access.",
        },
        {
          title: "No prop trading",
          description:
            "We do not trade against clients and do not run proprietary risk positions.",
        },
        {
          title: "No leverage",
          description:
            "Client assets are not used for lending or margining. Our operating model is built for stability.",
        },
        {
          title: "SFC oversight",
          description:
            "Our activity is regulated by the Hong Kong SFC; we operate under the relevant licences and controls.",
        },
        {
          title: "Independence",
          description:
            "Open architecture. No proprietary products, no hidden retrocessions — aligned with client interest.",
        },
      ],
    },
  },
  ru: {
    eyebrow: "Глобальное присутствие",
    heroTitle: "Кто мы",
    subtitle:
      "CWB Hong Kong — независимая лицензированная кастодианская и управляющая компания. Мы поддерживаем институциональных и частных клиентов: хранение активов, доступ к рынкам и дисциплинированное управление портфелем.",
    badge: "SFC CE AFQ783",
    locationLabel: "Офис",
    locationValue: "Central, Hong Kong",
    anchorTitle: "Точка опоры",
    anchorCards: [
      {
        title: "Кто мы",
        subtitle: "SFC licences 1, 4, 9",
        description:
          "Лицензированный SFC брокер и управляющий активами (Licences 1, 4, 9). Мы объединяем надёжность институционального уровня с современным доступом к рынкам Азии и мира.",
      },
      {
        title: "Наша миссия",
        subtitle: "Архитектор",
        description:
          "Мы не просто кастодиан и брокер. Мы — ваш финансовый архитектор. Мы устраняем барьеры между вами и глобальными рынками капитала.",
      },
      {
        title: "Статус",
        subtitle: "Независимость",
        description:
          "Полная независимость. Мы не продаём собственные продукты — мы ищем лучшее для вас на всём рынке (открытая архитектура).",
      },
    ],
    commitments: {
      kicker: "Обязательства",
      title: "Институциональный стандарт безопасности",
      subtitle:
        "Как мы выстраиваем хранение, исполнение и операции, чтобы защищать активы клиентов и снижать операционные риски.",
      logosLabel: "Примеры кастодиальных контрагентов",
      items: [
        {
          title: "Полная сегрегация",
          description:
            "Активы клиентов хранятся на отдельных счетах и юридически изолированы от баланса брокера.",
        },
        {
          title: "Глобальные кастодианы",
          description:
            "Размещение у ведущих международных кастодианов и брокеров — с приоритетом надёжности и доступа к рынкам.",
        },
        {
          title: "Никакого проп-трейдинга",
          description:
            "Мы не торгуем против клиентов и не держим собственные рискованные позиции на балансе.",
        },
        {
          title: "Отсутствие левериджа",
          description:
            "Мы не используем активы клиентов для кредитования или маржинального финансирования; модель ориентирована на стабильность.",
        },
        {
          title: "Надзор SFC",
          description:
            "Деятельность регулируется Комиссией по ценным бумагам и фьючерсам Гонконга (SFC) и соответствующими контролями.",
        },
        {
          title: "Независимость",
          description:
            "Открытая архитектура: никаких собственных продуктов и скрытых комиссий — интерес клиента в центре.",
        },
      ],
    },
  },
}

export function WhoWeAreSplit({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const custodyLogos = custodyPartners.slice(0, 3)

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/60 backdrop-blur-xl shadow-lg">
        <HongKongMapWatermark className="-z-0 text-primary opacity-[0.055]" />
        <div className="relative z-10 px-7 py-10 sm:px-10 lg:px-12 lg:py-14">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-muted-foreground text-xs font-medium tracking-[0.22em] uppercase">
              {copy.eyebrow}
            </div>
            <Badge variant="outline">{copy.badge}</Badge>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="text-muted-foreground mt-6 max-w-3xl text-sm leading-relaxed sm:text-base">
                {copy.subtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-secondary/20 p-5">
              <div className="flex items-start gap-3">
                <MapPinIcon className="text-primary size-5 shrink-0" />
                <div>
                  <div className="text-sm font-medium">{copy.locationLabel}</div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {copy.locationValue}
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground mt-4 text-xs leading-relaxed">
                {locale === "ru"
                  ? "Независимая компания. Открытая архитектура. Институциональные стандарты исполнения."
                  : "Independent firm. Open architecture. Institutional-grade execution standards."}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-primary text-xs font-medium tracking-[0.22em] uppercase">
          {copy.anchorTitle}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {copy.anchorCards.map((card) => (
            <Card
              key={card.title}
              variant="highlight"
              className="rounded-[28px] py-10"
            >
              <CardHeader className="px-8 text-center">
                <CardTitle className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                  {card.title}
                </CardTitle>
                <div className="mt-3 text-base font-medium text-secondary-foreground/80">
                  {card.subtitle}
                </div>
              </CardHeader>
              <CardContent className="px-8 pt-2">
                <p className="text-center text-sm leading-relaxed text-secondary-foreground/80">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-primary text-secondary shadow-lg">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(231,212,198,0.14),transparent_55%),radial-gradient(circle_at_72%_30%,rgba(153,117,63,0.12),transparent_56%)]" />
        </div>

        <div className="relative px-7 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-secondary/70 text-xs font-medium tracking-[0.22em] uppercase">
              {copy.commitments.kicker}
            </div>
            <div className="flex items-center gap-6">
              {custodyLogos.map((partner) => (
                <div key={partner.domain} className="h-7">
                  <Image
                    src={logoDevUrl(partner.domain)}
                    alt={`${partner.name} logo`}
                    width={180}
                    height={60}
                    className="h-7 w-auto object-contain opacity-90 brightness-0 invert"
                  />
                </div>
              ))}
            </div>
          </div>

          <h2 className="mt-8 max-w-5xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            {copy.commitments.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-secondary/80 sm:text-base">
            {copy.commitments.subtitle}
          </p>

          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-6">
            {copy.commitments.items.map((item) => (
              <div key={item.title} className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-secondary/70" />
                  <div className="text-sm font-medium text-secondary">
                    {item.title}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-secondary/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-xs text-secondary/60">
            {copy.commitments.logosLabel}
          </div>
        </div>
      </section>
    </div>
  )
}
