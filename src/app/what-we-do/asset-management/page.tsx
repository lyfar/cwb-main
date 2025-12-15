import type { Metadata } from "next"
import { ChartLineUp, Compass } from "@phosphor-icons/react/dist/ssr"

import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Asset management | CWB Hong Kong",
  description:
    "Open-architecture investment platform with access to public and private opportunities.",
}

export default function AssetManagementPage() {
  return (
    <WhatWeDoShell
      title="Asset management"
      description="Open-architecture access to public and private opportunities, built around client objectives and risk controls."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Compass className="text-primary size-6" />
            <CardTitle className="text-base">Open architecture</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            Access a broad universe of strategies across markets and managers,
            with the flexibility to adapt allocations as conditions change.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ChartLineUp className="text-primary size-6" />
            <CardTitle className="text-base">Portfolio construction</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            Guidance across strategic allocation, diversification, and ongoing
            monitoring — aligned to liquidity, horizon, and risk preferences.
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Investment universe</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Public or privately subscribed funds</li>
              <li>IPOs / pre-IPO opportunities</li>
              <li>Private equity / VC / private debt</li>
              <li>APAC tech sector themes</li>
              <li>Non-traditional assets</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </WhatWeDoShell>
  )
}

