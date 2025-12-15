import { Metadata } from "next"
import {
  ArrowsLeftRight as ArrowsLeftRightIcon,
  Bank as BankIcon,
  ChartLineUp as ChartLineUpIcon,
  Coins as CoinsIcon,
  ShieldCheck as ShieldCheckIcon,
  Vault as VaultIcon,
} from "@phosphor-icons/react/dist/ssr"

import { PartnerLogoCloud } from "@/components/site/partner-logo-cloud"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { brokeragePartners, custodyPartners } from "@/lib/partners"

export const metadata: Metadata = {
  title: "What we do | CWB Hong Kong",
  description:
    "Safe custody, asset management, brokerage access, banking services, and robust risk management controls.",
}

export default function WhatWeDoPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="space-y-3">
        <Badge variant="outline">Capabilities</Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          What we do
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          We deliver a private banking–style experience, combining
          institutional-level security with personalised investment insight.
        </p>
      </div>

      <Separator className="my-10" />

      <Tabs defaultValue="custody" className="w-full">
        <TabsList className="flex w-full flex-wrap justify-start">
          <TabsTrigger value="custody" className="gap-2">
            <VaultIcon className="size-4" />
            Safe custody
          </TabsTrigger>
          <TabsTrigger value="asset-management" className="gap-2">
            <ChartLineUpIcon className="size-4" />
            Asset management
          </TabsTrigger>
          <TabsTrigger value="brokerage" className="gap-2">
            <ArrowsLeftRightIcon className="size-4" />
            Brokerage
          </TabsTrigger>
          <TabsTrigger value="banking" className="gap-2">
            <BankIcon className="size-4" />
            Banking services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="custody" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-base">Segregated safekeeping</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                Our custodians include leading international financial
                institutions, providing secure, segregated safekeeping of client
                assets across major global markets.
              </CardContent>
            </Card>
            <PartnerLogoCloud
              title="Custody partners"
              badge="Examples"
              description="Selected global and regional custodians."
              partners={custodyPartners}
            />
          </div>
        </TabsContent>

        <TabsContent value="asset-management" className="mt-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Open architecture platform</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              Our investment platform provides access to a diverse selection of
              premier investment opportunities, both public and private:
              <ul className="mt-3 list-disc pl-5">
                <li>Public or privately subscribed funds</li>
                <li>IPOs / pre-IPO opportunities</li>
                <li>Private equity / VC / private debt</li>
                <li>APAC tech sector</li>
                <li>Non-traditional assets</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brokerage" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-base">Global markets</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                Tier 1 execution with broad developed markets coverage.
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-base">Electronic & access</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                Direct market access via electronic and access platforms.
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-base">APAC / regional</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                Specialist coverage across APAC and emerging markets
                opportunities.
              </CardContent>
            </Card>
            <PartnerLogoCloud
              title="Brokerage & market access"
              badge="Examples"
              description="Selected execution and market access partners."
              partners={brokeragePartners}
              className="md:col-span-3"
            />
            <Card variant="glass" className="md:col-span-3">
              <CardHeader>
                <CardTitle className="text-base">Coverage</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                Seamless access to our network of market-makers provides global
                developed markets coverage as well as APAC and emerging markets
                opportunities, both public and private.
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="banking" className="mt-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-base">Payments & currencies</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm leading-relaxed">
              Streamlined payment services for personal, business, or corporate
              purposes across all major currencies, linked to each client’s
              account.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheckIcon className="text-primary size-6" />
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
            <CoinsIcon className="text-primary size-6" />
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
    </main>
  )
}
