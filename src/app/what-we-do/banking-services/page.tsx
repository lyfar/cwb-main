import type { Metadata } from "next"
import {
  Bank,
  CurrencyCircleDollar,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr"

import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Banking services | CWB Hong Kong",
  description:
    "Streamlined payments and multi-currency services connected to client accounts.",
}

export default function BankingServicesPage() {
  return (
    <WhatWeDoShell
      title="Banking services"
      description="Streamlined payments and multi-currency services connected to client accounts, designed for clarity and control."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <PaperPlaneTilt className="text-primary size-6" />
            <CardTitle className="text-base">Payments</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Streamlined payment services for personal, business, or corporate
            purposes across major currencies.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <CurrencyCircleDollar className="text-primary size-6" />
            <CardTitle className="text-base">Multi-currency handling</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Support for multi-currency cash management and account operations,
            with reporting aligned to client needs.
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Bank className="text-primary size-6" />
            <CardTitle className="text-base">Account operations</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Account operations are supported by controlled instruction
            workflows. Reach the team for settlement, transfers, or onboarding
            support.
          </CardContent>
        </Card>
      </div>
    </WhatWeDoShell>
  )
}

