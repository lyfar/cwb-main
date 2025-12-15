import type { Metadata } from "next"
import Link from "next/link"
import {
  Briefcase as BriefcaseIcon,
  GlobeHemisphereWest as GlobeHemisphereWestIcon,
  UserCircleGear as UserCircleGearIcon,
  UsersThree as UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr"

import { whoWeServeItems } from "@/lib/who-we-serve"
import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Who we serve | CWB Hong Kong",
  description:
    "Institutional and private clients seeking secure custody, brokerage access, and tailored investment solutions.",
}

export default function WhoWeServePage() {
  const institutionalHref =
    whoWeServeItems.find((item) => item.id === "institutional-clients")?.href ??
    "/who-we-serve/institutional-clients"
  const privateClientsHref =
    whoWeServeItems.find((item) => item.id === "private-clients")?.href ??
    "/who-we-serve/private-clients"
  const familyOfficesHref =
    whoWeServeItems.find((item) => item.id === "family-offices")?.href ??
    "/who-we-serve/family-offices"

  return (
    <WhoWeServeShell
      badge="Client-first"
      title="Who we serve"
      description="We work with institutional and private clients who value segregated custody, dependable execution, and an advisory partnership built on clarity and trust."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UsersThreeIcon className="text-primary size-6" />
            <CardTitle className="text-base">Institutions</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 space-y-2 text-sm leading-relaxed">
            <div>
              For organisations that need robust operational controls and
              scalable access to global markets.
            </div>
            <ul className="list-disc pl-5">
              <li>Funds, asset managers, and corporate treasuries</li>
              <li>Execution and brokerage access across developed + APAC</li>
              <li>Custody with leading international financial institutions</li>
            </ul>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href={institutionalHref}>Explore institutional</Link>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UserCircleGearIcon className="text-primary size-6" />
            <CardTitle className="text-base">Private clients</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 space-y-2 text-sm leading-relaxed">
            <div>
              For individuals and families seeking a private banking–style
              experience with institutional-grade safeguards.
            </div>
            <ul className="list-disc pl-5">
              <li>High-net-worth individuals and family offices</li>
              <li>Open-architecture investment access (public + private)</li>
              <li>Dedicated relationship-driven support</li>
            </ul>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href={privateClientsHref}>Explore private</Link>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <BriefcaseIcon className="text-primary size-6" />
            <CardTitle className="text-base">Family offices</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 space-y-2 text-sm leading-relaxed">
            <div>
              For teams coordinating multi-account oversight, governance, and
              access to opportunities across markets.
            </div>
            <ul className="list-disc pl-5">
              <li>Custody arrangements with strong controls</li>
              <li>Operational discipline and clear reporting cadence</li>
              <li>Open-architecture access across public + private</li>
            </ul>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href={familyOfficesHref}>Explore family offices</Link>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-3">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <GlobeHemisphereWestIcon className="text-primary size-6" />
            <CardTitle className="text-base">Worldwide reach</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground dark:text-foreground/90 text-sm leading-relaxed">
            Our custody and execution network is designed to support clients
            across major global markets, with strong coverage of APAC and
            emerging market opportunities.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">
            Need a conversation before deciding?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            We’ll route you to the right specialist for custody, execution, or
            investment access.
          </div>
          <Button asChild className="w-fit">
            <Link href="/contacts">Contact us</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}
