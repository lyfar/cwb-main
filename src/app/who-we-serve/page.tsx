import { Metadata } from "next"
import {
  GlobeHemisphereWest as GlobeHemisphereWestIcon,
  UserCircleGear as UserCircleGearIcon,
  UsersThree as UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Who we serve | CWB Hong Kong",
  description:
    "Institutional and private clients seeking secure custody, brokerage access, and tailored investment solutions.",
}

export default function WhoWeServePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="space-y-3">
        <Badge variant="outline">Client-first</Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Who we serve
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          We work with institutional and private clients who value segregated
          custody, dependable execution, and an advisory partnership built on
          clarity and trust.
        </p>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UsersThreeIcon className="text-primary size-6" />
            <CardTitle className="text-base">Institutions</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2 text-sm leading-relaxed">
            <div>
              For organisations that need robust operational controls and
              scalable access to global markets.
            </div>
            <ul className="list-disc pl-5">
              <li>Funds, asset managers, and corporate treasuries</li>
              <li>Execution and brokerage access across developed + APAC</li>
              <li>Custody with leading international financial institutions</li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UserCircleGearIcon className="text-primary size-6" />
            <CardTitle className="text-base">Private clients</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2 text-sm leading-relaxed">
            <div>
              For individuals and families seeking a private banking–style
              experience with institutional-grade safeguards.
            </div>
            <ul className="list-disc pl-5">
              <li>High-net-worth individuals and family offices</li>
              <li>Open-architecture investment access (public + private)</li>
              <li>Dedicated relationship-driven support</li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <GlobeHemisphereWestIcon className="text-primary size-6" />
            <CardTitle className="text-base">Worldwide reach</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Our custody and execution network is designed to support clients
            across major global markets, with strong coverage of APAC and
            emerging market opportunities.
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
