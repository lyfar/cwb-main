import type { Metadata } from "next"
import Link from "next/link"
import {
  Handshake,
  LockKeyOpen,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr"

import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Private clients | CWB Hong Kong",
  description:
    "Private banking–style experience with segregated custody, market access, and open-architecture investment opportunities.",
}

export default function PrivateClientsPage() {
  return (
    <WhoWeServeShell
      title="Private clients"
      description="For individuals and families seeking institutional-grade safeguards with personalised investment support."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Handshake className="text-primary size-6" />
            <CardTitle className="text-base">Who it’s for</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            High-net-worth individuals, entrepreneurs, and families who value
            clarity, discretion, and a relationship-led approach across custody
            and investments.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Sparkle className="text-primary size-6" />
            <CardTitle className="text-base">Typical needs</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Capital preservation with transparent custody arrangements.</li>
              <li>Access to curated public and private opportunities.</li>
              <li>Trusted execution and operational support.</li>
              <li>Clear reporting and responsive communication.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        What we provide
      </h2>
      <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
        A private banking–style experience, designed to keep your assets secure
        while enabling access to opportunities across markets.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Segregated custody</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Institutional-grade custody arrangements with clear segregation and
            robust operational controls.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <LockKeyOpen className="text-primary size-6" />
            <CardTitle className="text-base">Open architecture</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Access to public and private investment opportunities through an
            open-architecture platform.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Handshake className="text-primary size-6" />
            <CardTitle className="text-base">Dedicated support</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Relationship-driven service with coordinated support for onboarding,
            trading instructions, and reporting.
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
            <li>Introductory call to understand objectives and constraints.</li>
            <li>Onboarding and custody setup with clear documentation.</li>
            <li>Define an investment approach and access requirements.</li>
            <li>Ongoing support, reporting, and periodic reviews.</li>
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Start a conversation</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            Tell us what you’re looking to achieve — we’ll suggest a custody and
            access setup that fits.
          </div>
          <Button asChild className="w-fit">
            <Link href="/contacts">Contact us</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}

