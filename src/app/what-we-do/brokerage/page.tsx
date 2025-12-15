import type { Metadata } from "next"
import { ArrowsLeftRight, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

import { brokeragePartners, logoDevUrl } from "@/lib/partners"
import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Brokerage | CWB Hong Kong",
  description:
    "Execution and market access across global developed markets with strong APAC coverage.",
}

export default function BrokeragePage() {
  return (
    <WhatWeDoShell
      title="Brokerage"
      description="Execution and market access across global developed markets with strong APAC and emerging market coverage."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ArrowsLeftRight className="text-primary size-6" />
            <CardTitle className="text-base">Execution</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            Seamless execution across exchanges and liquidity venues, supported
            by controlled instruction workflows.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <GlobeHemisphereWest className="text-primary size-6" />
            <CardTitle className="text-base">Coverage</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            Developed markets with strong APAC focus, plus access routes for
            regional and emerging market opportunities.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="space-y-3">
        <Badge variant="outline">Selected partners</Badge>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Brokerage & execution (examples)
        </h2>
        <p className="text-muted-foreground dark:text-foreground/90 max-w-3xl text-sm leading-relaxed">
          Logos shown are examples of execution and access counterparties. We
          only present verified partners.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
        {brokeragePartners.slice(0, 8).map((partner) => (
          <Image
            key={partner.domain}
            src={logoDevUrl(partner.domain)}
            alt={`${partner.name} logo`}
            width={180}
            height={72}
            className="h-8 w-auto opacity-85"
          />
        ))}
      </div>
    </WhatWeDoShell>
  )
}

