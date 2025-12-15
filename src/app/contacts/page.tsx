import { Metadata } from "next"
import {
  EnvelopeSimple as EnvelopeSimpleIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Contacts | CWB Hong Kong",
  description: "Contact CWB Hong Kong via email, phone, or visit our office.",
}

const EMAIL = "enquiries@cwb-hk.com"
const PHONE = "+852 3893 9588"
const ADDRESS_LINES = [
  "Office 1803, The Henderson",
  "2 Murray Road, Central, Hong Kong",
]

export default function ContactsPage() {
  const addressQuery = encodeURIComponent(ADDRESS_LINES.join(", "))

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Contacts
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          Reach us for account operations, trade instructions, or general
          enquiries.
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
              <a href={`mailto:${EMAIL}`}>Send email</a>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <PhoneIcon className="text-primary size-6" />
            <CardTitle className="text-base">Phone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="text-muted-foreground">{PHONE}</div>
            <Button asChild className="w-full" variant="outline">
              <a href={`tel:${PHONE.replace(/\\s+/g, "")}`}>Call</a>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <MapPinIcon className="text-primary size-6" />
            <CardTitle className="text-base">Office</CardTitle>
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
                Open in Maps
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
