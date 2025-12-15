import type { Metadata } from "next"
import { ShieldCheck, Vault } from "@phosphor-icons/react/dist/ssr"

import { custodyPartners, logoDevUrl } from "@/lib/partners"
import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Safe custody | CWB Hong Kong",
  description:
    "Secure, segregated safekeeping with top-tier global custodians and robust operational controls.",
}

export default function SafeCustodyPage() {
  return (
    <WhatWeDoShell
      title="Safe custody"
      description="Secure, segregated safekeeping with top-tier global custodians and robust operational controls."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Vault className="text-primary size-6" />
            <CardTitle className="text-base">Segregated safekeeping</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            Client securities and collateral are held in segregated accounts at
            custodians, designed to keep assets ring-fenced and transparent.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Operational controls</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            Daily reconciliation, segregation checks, and controlled workflows
            for settlements, corporate actions, and reporting.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="space-y-3">
        <Badge variant="outline">Selected partners</Badge>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Custody network (examples)
        </h2>
        <p className="text-muted-foreground dark:text-foreground/90 max-w-3xl text-sm leading-relaxed">
          Logos shown are examples of custody counterparties. We only present
          verified partners.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
        {custodyPartners.map((partner) => (
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

