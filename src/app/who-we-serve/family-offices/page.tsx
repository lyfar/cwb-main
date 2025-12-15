import type { Metadata } from "next"
import Link from "next/link"
import {
  ChartPieSlice,
  ClipboardText,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"

import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Family offices | CWB Hong Kong",
  description:
    "Custody, reporting, and open-architecture access designed for single and multi-family offices.",
}

export default function FamilyOfficesPage() {
  return (
    <WhoWeServeShell
      title="Family offices"
      description="For families and family offices that want governance, reporting, and institutional-grade custody with open-architecture access."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UsersThree className="text-primary size-6" />
            <CardTitle className="text-base">Who it’s for</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Single- and multi-family offices coordinating custody, market access,
            and investment opportunities across multiple accounts and
            jurisdictions.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ClipboardText className="text-primary size-6" />
            <CardTitle className="text-base">Typical needs</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Governance, approvals, and clean operational workflows.</li>
              <li>Consolidated visibility across assets and counterparties.</li>
              <li>Secure custody with ring-fenced segregation.</li>
              <li>Access to public and private opportunities.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        What we provide
      </h2>
      <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
        A structured setup built for multi-account oversight, disciplined
        execution, and flexible investment access.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Custody & controls</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Segregated custody arrangements, reconciliations, and controls
            designed to keep assets ring-fenced and transparent.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ChartPieSlice className="text-primary size-6" />
            <CardTitle className="text-base">Open-architecture access</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Access to curated public and private opportunities across markets,
            aligned with governance preferences.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ClipboardText className="text-primary size-6" />
            <CardTitle className="text-base">Reporting rhythm</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            A clear reporting cadence and operational support for settlements,
            transfers, and oversight requirements.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Typical engagement model</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm leading-relaxed">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Define governance, approvals, and reporting expectations.</li>
            <li>Onboarding and custody structure setup.</li>
            <li>Agree execution workflows and counterparties.</li>
            <li>Operate with ongoing support and periodic reviews.</li>
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Coordinate your setup</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            Tell us about your operating model — we’ll propose a custody,
            reporting, and access structure that supports it.
          </div>
          <Button asChild className="w-fit">
            <Link href="/contacts">Get in touch</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}

