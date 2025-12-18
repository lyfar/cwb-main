import type { Metadata } from "next"
import {
  EnvelopeSimple as EnvelopeSimpleIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Контакты | CWB Hong Kong",
  description: "Свяжитесь с CWB Hong Kong по email, телефону или посетите офис.",
}

const EMAIL = "enquiries@cwb-hk.com"
const PHONE = "+852 3893 9588"
const ADDRESS_LINES = [
  "Office 1803, The Henderson",
  "2 Murray Road, Central, Hong Kong",
]

export default function RuContactsPage() {
  const addressQuery = encodeURIComponent(ADDRESS_LINES.join(", "))

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Контакты
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          Пишите или звоните по вопросам операций по счёту, торговых поручений
          или общих запросов.
        </p>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <EnvelopeSimpleIcon className="text-primary size-6" />
            <CardTitle className="text-base">Email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-muted-foreground">{EMAIL}</div>
            <Button asChild className="w-full">
              <a href={`mailto:${EMAIL}`}>Написать</a>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <PhoneIcon className="text-primary size-6" />
            <CardTitle className="text-base">Телефон</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-muted-foreground">{PHONE}</div>
            <Button asChild className="w-full" variant="outline">
              <a href={`tel:${PHONE.replace(/\\s+/g, "")}`}>Позвонить</a>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <MapPinIcon className="text-primary size-6" />
            <CardTitle className="text-base">Офис</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-muted-foreground">
              {ADDRESS_LINES.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            <Button asChild className="w-full" variant="outline">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                Открыть в картах
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

