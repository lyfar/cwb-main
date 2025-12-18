import type { Locale } from "@/lib/locale"
import {
  EnvelopeSimple as EnvelopeSimpleIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
} from "@phosphor-icons/react/dist/ssr"

import { HongKongMapWatermark } from "@/components/site/hong-kong-map-watermark"
import { Button } from "@/components/ui/button"

const EMAIL = "enquiries@cwb-hk.com"
const PHONE = "+852 3893 9588"
const ADDRESS_LINES = [
  "Office 1803, The Henderson",
  "2 Murray Road, Central, Hong Kong",
]

const COPY: Record<
  Locale,
  {
    eyebrow: string
    leftTitle: string
    leftSubtitle: string
    emailCta: string
    mapsCta: string
    rightTitle: string
    addressLabel: string
    emailLabel: string
    phoneLabel: string
  }
> = {
  en: {
    eyebrow: "Contacts",
    leftTitle: "Start\nthe dialogue",
    leftSubtitle:
      "Reach us for custody arrangements, brokerage support, and account operations.",
    emailCta: "Send email",
    mapsCta: "Open in Maps",
    rightTitle: "Get in touch for a confidential consultation",
    addressLabel: "Office",
    emailLabel: "Email",
    phoneLabel: "Phone",
  },
  ru: {
    eyebrow: "Контакты",
    leftTitle: "Начните\nдиалог",
    leftSubtitle:
      "Свяжитесь с нами по вопросам хранения активов, брокерского сопровождения и операций по счёту.",
    emailCta: "Написать",
    mapsCta: "Открыть в картах",
    rightTitle: "Свяжитесь с нами для конфиденциальной консультации",
    addressLabel: "Офис",
    emailLabel: "Имейл",
    phoneLabel: "Телефон",
  },
}

export function ContactSplitCta({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const addressQuery = encodeURIComponent(ADDRESS_LINES.join(", "))

  return (
    <section className="overflow-hidden rounded-3xl border border-border/60 shadow-lg">
      <div className="grid lg:grid-cols-2">
        <div className="bg-background text-foreground dark:bg-secondary dark:text-background">
          <div className="px-7 py-10 sm:px-10 lg:px-12 lg:py-14">
            <div className="text-muted-foreground dark:text-background/70 text-xs font-medium tracking-[0.22em] uppercase">
              {copy.eyebrow}
            </div>
            <h1 className="mt-8 whitespace-pre-line text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {copy.leftTitle}
            </h1>
            <p className="text-muted-foreground dark:text-background/75 mt-6 max-w-md text-sm leading-relaxed sm:text-base">
              {copy.leftSubtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="w-full sm:w-auto">
                <a href={`mailto:${EMAIL}`}>
                  <EnvelopeSimpleIcon className="size-5" />
                  {copy.emailCta}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto dark:border-background/30"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPinIcon className="size-5" />
                  {copy.mapsCta}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative bg-primary text-secondary dark:bg-background dark:text-secondary">
          <HongKongMapWatermark className="text-secondary" />

          <div className="relative px-7 py-10 sm:px-10 lg:px-12 lg:py-14">
            <h2 className="max-w-md text-3xl leading-tight tracking-tight sm:text-4xl">
              {copy.rightTitle}
            </h2>

            <div className="mt-10 grid gap-8 text-sm sm:text-base">
              <div>
                <div className="text-secondary/70 text-xs font-medium tracking-[0.22em] uppercase">
                  {copy.addressLabel}
                </div>
                <a
                  className="mt-3 block leading-relaxed text-secondary/90 underline-offset-4 hover:underline"
                  href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ADDRESS_LINES.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </a>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <div className="text-secondary/70 text-xs font-medium tracking-[0.22em] uppercase">
                    {copy.emailLabel}
                  </div>
                  <a
                    className="mt-3 inline-flex items-center gap-2 text-secondary/90 underline-offset-4 hover:underline"
                    href={`mailto:${EMAIL}`}
                  >
                    <EnvelopeSimpleIcon className="size-5" />
                    {EMAIL}
                  </a>
                </div>

                <div>
                  <div className="text-secondary/70 text-xs font-medium tracking-[0.22em] uppercase">
                    {copy.phoneLabel}
                  </div>
                  <a
                    className="mt-3 inline-flex items-center gap-2 text-secondary/90 underline-offset-4 hover:underline"
                    href={`tel:${PHONE.replace(/\\s+/g, "")}`}
                  >
                    <PhoneIcon className="size-5" />
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

