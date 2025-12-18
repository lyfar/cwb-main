import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowsLeftRight,
  Bank,
  ChartLineUp,
  Coins,
  ShieldCheck,
  SquaresFour,
  Vault,
} from "@phosphor-icons/react/dist/ssr"

import { whatWeDoItems } from "@/lib/what-we-do"
import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "What we do | CWB Hong Kong",
  description:
    "Safe custody, asset management, brokerage access, banking services, and robust risk management controls.",
}

const SERVICE_ICONS = {
  overview: SquaresFour,
  "safe-custody": Vault,
  "asset-management": ChartLineUp,
  brokerage: ArrowsLeftRight,
  "banking-services": Bank,
} as const

export default function WhatWeDoPage() {
  const services = whatWeDoItems.filter((item) => item.id !== "overview")

  return (
    <WhatWeDoShell
      badge="Capabilities"
      title="What we do"
      description="We deliver a private banking–style experience, combining institutional-level security with personalised investment insight."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = SERVICE_ICONS[service.id]

          return (
            <Card key={service.id} variant="glass">
              <CardHeader className="gap-2">
                <div className="flex items-center gap-3">
                  <Icon className="text-primary size-6" />
                  <CardTitle className="text-base">{service.title}</CardTitle>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link href={service.href}>View details</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Risk management</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc pl-5">
              <li>
                Segregated accounts for client money (cash) with a Hong Kong
                licensed bank within one business day of receipt.
              </li>
              <li>
                Client securities and collateral deposited in safe custody in
                segregated accounts.
              </li>
              <li>
                Client assets are ring-fenced and not part of the estate of CWB
                HK or any other client in the event of liquidation.
              </li>
              <li>
                No proprietary trading; shareholder investments are limited to
                operating cash.
              </li>
              <li>
                No liquidity or leverage provided to clients; balance sheet
                focused on stability.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Coins className="text-primary size-6" />
            <CardTitle className="text-base">Account opening process</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Client opens an account with CWB Hong Kong Limited.</li>
              <li>
                Client transfers cash or securities to CWB HK’s account with its
                custodian.
              </li>
              <li>
                CWB HK segregates the client’s assets into a dedicated
                sub-account at the custodian.
              </li>
              <li>Assets are held by the custodian bank for safekeeping.</li>
            </ol>
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Account operations</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Our global team supports execution and real-time operations. Clients
            may reach us via email, recorded phone line, or Bloomberg chat for
            trade instructions, settlements, and cross-border transfers.
          </CardContent>
        </Card>
      </div>
    </WhatWeDoShell>
  )
}
