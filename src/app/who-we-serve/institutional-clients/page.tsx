import type { Metadata } from "next"
import Link from "next/link"
import {
  Buildings,
  ChartLineUp,
  ClipboardText,
  ShieldCheck,
  Swap,
} from "@phosphor-icons/react/dist/ssr"

import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Institutional clients | CWB Hong Kong",
  description:
    "Custody, brokerage access, and operational controls for funds, asset managers, and corporate treasuries.",
}

export default function InstitutionalClientsPage() {
  return (
    <WhoWeServeShell
      title="Institutional clients"
      description="For organisations that need robust operational controls, segregated custody, and scalable market access."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Buildings className="text-primary size-6" />
            <CardTitle className="text-base">Who it’s for</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Funds, asset managers, corporates, and institutions that require
            disciplined operating controls and transparent custody arrangements
            for client assets.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ClipboardText className="text-primary size-6" />
            <CardTitle className="text-base">Typical needs</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Segregated custody with clear asset ownership records.</li>
              <li>Reliable execution workflows and timely settlement support.</li>
              <li>Controls that scale with volumes and multiple markets.</li>
              <li>Consistent reporting for operations and oversight.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        What we provide
      </h2>
      <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
        A private banking–style experience, delivered with institutional-grade
        operational discipline.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Segregated custody</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Client securities and collateral are held in segregated accounts
            with top-tier custodians, supporting ring-fencing and transparency.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Swap className="text-primary size-6" />
            <CardTitle className="text-base">Market access</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Execution routes across developed markets with strong APAC and
            emerging market coverage, supported by controlled workflows.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ChartLineUp className="text-primary size-6" />
            <CardTitle className="text-base">Open architecture</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Access to public and private investment opportunities via an
            open-architecture platform.
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
            <li>Initial scoping (markets, asset types, operating needs).</li>
            <li>Onboarding and account setup with custody arrangements.</li>
            <li>Trading / settlement workflows and reporting cadence agreed.</li>
            <li>Ongoing operations support and periodic reviews.</li>
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Talk to the team</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            Share your custody and market access requirements — we’ll propose a
            structure aligned with your operating model.
          </div>
          <Button asChild className="w-fit">
            <Link href="/contacts">Get in touch</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}

