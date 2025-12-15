import { Metadata } from "next"
import {
  Buildings as BuildingsIcon,
  Handshake as HandshakeIcon,
  ShieldCheck as ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Who we are | CWB Hong Kong",
  description:
    "CWB Hong Kong is an independent licensed custodian and investment management firm regulated by the SFC (CE code AFQ783).",
}

export default function WhoWeArePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="space-y-3">
        <Badge variant="outline">Worldwide reach</Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Who we are
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          CWB Hong Kong is an independent licensed custodian and investment
          management firm that specialises in the safekeeping of financial
          assets, brokerage, and asset management for institutional and private
          clients.
        </p>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheckIcon className="text-primary size-6" />
            <CardTitle className="text-base">Licensed & regulated</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            CWB Hong Kong is licensed and regulated by the Securities and
            Futures Commission (SFC) under Central Entity (CE) code{" "}
            <span className="text-foreground font-medium">AFQ783</span>.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <HandshakeIcon className="text-primary size-6" />
            <CardTitle className="text-base">
              Private banking–style experience
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            We combine institutional-level security with personalised investment
            insight, tailored to individual goals and market opportunities.
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <BuildingsIcon className="text-primary size-6" />
            <CardTitle className="text-base">Custody network</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            As a licensed custodian, we ensure client assets are held safely
            with top-tier global partners, using segregated safekeeping and
            robust operational controls.
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
