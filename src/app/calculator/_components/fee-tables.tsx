"use client"

import * as React from "react"

import { feeSchedule, type FeeScheduleItem, type Tier } from "@/lib/fee-schedule"
import { feeSections, getFeeItemsForSection, getManagementServiceLabel } from "@/app/calculator/_lib/fee-sections"
import { formatCompactNumber, formatPercent, formatUSD } from "@/app/calculator/_lib/format"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SelectPayload = { id: string; contractType?: "options" | "futures" }

function formatTierBand(tiers: Tier[], index: number) {
  const tier = tiers[index]
  if (!tier) return "—"

  const previousCap = index > 0 ? tiers[index - 1]?.upToUSD ?? 0 : 0

  if (tier.upToUSD == null) {
    return `Above ${formatCompactNumber(previousCap)}`
  }

  if (previousCap > 0) {
    return `${formatCompactNumber(previousCap)}–${formatCompactNumber(tier.upToUSD)}`
  }

  return `Up to ${formatCompactNumber(tier.upToUSD)}`
}

function formatTradeTier(tiers: Tier[], index: number) {
  const tier = tiers[index]
  if (!tier) return "—"

  const previousCap = index > 0 ? tiers[index - 1]?.upToUSD ?? 0 : 0

  if (tier.upToUSD == null) {
    return `Above ${Math.round(previousCap).toLocaleString("en-US")}`
  }

  if (previousCap > 0) {
    return `${Math.round(previousCap).toLocaleString("en-US")}–${Math.round(tier.upToUSD).toLocaleString("en-US")}`
  }

  return `Up to ${Math.round(tier.upToUSD).toLocaleString("en-US")}`
}

function parseTradingAsset(asset: string): { assetClass: string; detail: string } {
  if (asset.includes("—")) {
    const [assetClass, detail] = asset.split("—")
    return {
      assetClass: assetClass?.trim() || "Trading",
      detail: detail?.trim() || asset.trim(),
    }
  }

  if (asset === "Foreign exchange") {
    return { assetClass: "Currencies", detail: "Foreign exchange" }
  }

  if (asset === "Options & futures") {
    return { assetClass: "Derivatives", detail: asset }
  }

  if (asset.toLowerCase().includes("fund")) {
    return { assetClass: "Funds", detail: asset }
  }

  if (asset.toLowerCase().includes("structured")) {
    return { assetClass: "Derivatives", detail: asset }
  }

  return { assetClass: "Trading", detail: asset }
}

type TradingRow = {
  itemId: string
  contractType?: "options" | "futures"
  region: string
  tier: string
  rate: string
  minPerTx: string
}

type TradingRegionGroup = {
  region: string
  rows: TradingRow[]
}

type TradingAssetGroup = {
  assetClass: string
  regions: TradingRegionGroup[]
}

function buildTradingGroups(items: FeeScheduleItem[]): TradingAssetGroup[] {
  const assetMap = new Map<string, Map<string, TradingRow[]>>()

  function pushRow(assetClass: string, region: string, row: TradingRow) {
    const regionMap = assetMap.get(assetClass) ?? new Map<string, TradingRow[]>()
    const rows = regionMap.get(region) ?? []
    rows.push(row)
    regionMap.set(region, rows)
    assetMap.set(assetClass, regionMap)
  }

  for (const item of items) {
    const parsed = parseTradingAsset(item.asset)
    const assetClass = parsed.assetClass
    const region = parsed.detail
    const minPerTx = item.minFeeUSD ? formatUSD(item.minFeeUSD) : "—"

    if (item.formula.kind === "tiered_percent") {
      const tiers = item.formula.tiers
      tiers.forEach((tier, index) => {
        pushRow(assetClass, region, {
          itemId: item.id,
          region,
          tier: formatTradeTier(tiers, index),
          rate: formatPercent(tier.rate),
          minPerTx,
        })
      })
      continue
    }

    if (item.formula.kind === "percent") {
      pushRow(assetClass, region, {
        itemId: item.id,
        region,
        tier: "All",
        rate: formatPercent(item.formula.rate),
        minPerTx,
      })
      continue
    }

    if (item.formula.kind === "percent_range") {
      pushRow(assetClass, region, {
        itemId: item.id,
        region,
        tier: "All",
        rate: `${formatPercent(item.formula.minRate)}–${formatPercent(item.formula.maxRate)}`,
        minPerTx,
      })
      continue
    }

    if (item.formula.kind === "per_contract") {
      pushRow(assetClass, "Listed options", {
        itemId: item.id,
        contractType: "options",
        region: "Listed options",
        tier: "All",
        rate: `${formatUSD(item.formula.optionUSD)} / contract`,
        minPerTx,
      })
      pushRow(assetClass, "Futures", {
        itemId: item.id,
        contractType: "futures",
        region: "Futures",
        tier: "All",
        rate: `${formatUSD(item.formula.futureUSD)} / contract`,
        minPerTx,
      })
      continue
    }
  }

  const assetOrder = [
    "Equities & ETFs",
    "Bonds / Fixed income",
    "Funds",
    "Derivatives",
    "Currencies",
    "Trading",
  ] as const

  const regionOrderByAssetClass: Record<string, string[]> = {
    "Equities & ETFs": [
      "US / EU equities",
      "HK equities",
      "Malaysia / Japan / Taiwan equities",
      "China Stock Connect",
    ],
    "Bonds / Fixed income": ["US treasuries", "Other bonds"],
    Funds: ["Mutual funds", "Money market funds", "Alternative funds"],
    Derivatives: [
      "Listed options",
      "Futures",
      "Structured products, certificates & other derivatives",
    ],
    Currencies: ["Foreign exchange"],
  }

  const groups: TradingAssetGroup[] = Array.from(assetMap.entries()).map(
    ([assetClass, regionMap]) => ({
      assetClass,
      regions: Array.from(regionMap.entries())
        .map(([region, rows]) => ({ region, rows }))
        .sort((a, b) => {
          const order = regionOrderByAssetClass[assetClass]
          if (!order) return a.region.localeCompare(b.region)
          const aIndex = order.indexOf(a.region)
          const bIndex = order.indexOf(b.region)
          if (aIndex !== -1 || bIndex !== -1) {
            return (aIndex === -1 ? order.length : aIndex) - (bIndex === -1 ? order.length : bIndex)
          }
          return a.region.localeCompare(b.region)
        }),
    })
  )

  groups.sort((a, b) => {
    const aIndex = assetOrder.indexOf(a.assetClass as (typeof assetOrder)[number])
    const bIndex = assetOrder.indexOf(b.assetClass as (typeof assetOrder)[number])
    if (aIndex !== -1 || bIndex !== -1) {
      return (aIndex === -1 ? assetOrder.length : aIndex) - (bIndex === -1 ? assetOrder.length : bIndex)
    }
    return a.assetClass.localeCompare(b.assetClass)
  })

  return groups
}

function SectionLayout({
  sectionId,
  children,
}: {
  sectionId: (typeof feeSections)[number]["id"]
  children: React.ReactNode
}) {
  const section = feeSections.find((item) => item.id === sectionId)
  if (!section) return null

  return (
    <section className="overflow-hidden rounded-2xl border border-border/40 bg-card/60 supports-[backdrop-filter]:bg-card/40 backdrop-blur-[10px]">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
        <div className="bg-secondary/15 border-border/40 border-b px-6 py-8 lg:border-b-0 lg:border-r">
          <h2 className="font-serif text-4xl leading-tight tracking-tight">
            {section.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {section.description}
          </p>
        </div>
        <div className="min-w-0 p-0">{children}</div>
      </div>
    </section>
  )
}

export function AnnualManagementFeesTable({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (payload: SelectPayload) => void
}) {
  const items = getFeeItemsForSection("annual-management")

  return (
    <SectionLayout sectionId="annual-management">
      <Table className="min-w-[720px] w-full border-separate border-spacing-0 lg:min-w-full">
        <TableHeader>
          <TableRow className="bg-secondary/30 hover:bg-secondary/30">
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
              Service type
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
              Asset / tier (USD)
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs text-right whitespace-normal">
              Annual rate
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs text-right whitespace-normal">
              Minimum fee (USD)
            </TableHead>
            <TableHead className="border-border/40 border-b px-4 py-3 text-xs whitespace-normal">
              Frequency
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.flatMap((item) => {
            if (item.formula.kind !== "tiered_percent") return []
            const tiers = item.formula.tiers
            const rowSpan = tiers.length
            const serviceLabel = getManagementServiceLabel(item.id)
            return tiers.map((tier, index) => (
              <TableRow
                key={`${item.id}-${index}`}
                data-state={item.id === selectedId ? "selected" : undefined}
                onClick={() => onSelect({ id: item.id })}
                className="cursor-pointer hover:bg-muted/40"
              >
                {index === 0 ? (
                  <TableCell
                    rowSpan={rowSpan}
                    className="border-border/40 bg-secondary/20 border-b border-r px-4 py-3 align-top text-xs font-medium whitespace-normal"
                  >
                    {serviceLabel}
                  </TableCell>
                ) : null}
                <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs font-mono tabular-nums">
                  {formatTierBand(tiers, index)}
                </TableCell>
                <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs font-mono tabular-nums text-right">
                  {formatPercent(tier.rate)}
                </TableCell>
                {index === 0 ? (
                  <TableCell
                    rowSpan={rowSpan}
                    className="border-border/40 border-b border-r px-4 py-3 align-top text-xs font-mono tabular-nums text-right"
                  >
                    {item.minFeeUSD ? formatUSD(item.minFeeUSD) : "—"}
                  </TableCell>
                ) : null}
                {index === 0 ? (
                  <TableCell
                    rowSpan={rowSpan}
                    className="border-border/40 border-b px-4 py-3 align-top text-xs"
                  >
                    {item.frequency}
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          })}
        </TableBody>
      </Table>
    </SectionLayout>
  )
}

export function TradingExecutionCostsTable({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (payload: SelectPayload) => void
}) {
  const items = getFeeItemsForSection("trading-execution")
  const groups = React.useMemo(() => buildTradingGroups(items), [items])

  return (
    <SectionLayout sectionId="trading-execution">
      <Table className="min-w-[880px] w-full border-separate border-spacing-0 lg:min-w-full">
        <TableHeader>
          <TableRow className="bg-secondary/30 hover:bg-secondary/30">
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
              Asset class
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
              Region / detail
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
              Trade value tier (USD)
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs text-right whitespace-normal">
              Rate / fee
            </TableHead>
            <TableHead className="border-border/40 border-b px-4 py-3 text-xs text-right whitespace-normal">
              Minimum per tx (USD)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.flatMap((group) => {
            const assetRowCount = group.regions.reduce(
              (total, region) => total + region.rows.length,
              0
            )
            return group.regions.flatMap((regionGroup, regionIndex) => {
              const regionRowCount = regionGroup.rows.length
              return regionGroup.rows.map((row, rowIndex) => {
                const showAssetCell = regionIndex === 0 && rowIndex === 0
                const showRegionCell = rowIndex === 0

                return (
                  <TableRow
                    key={`${group.assetClass}-${regionGroup.region}-${rowIndex}`}
                    data-state={row.itemId === selectedId ? "selected" : undefined}
                    onClick={() =>
                      onSelect({ id: row.itemId, contractType: row.contractType })
                    }
                    className="cursor-pointer hover:bg-muted/40"
                  >
                    {showAssetCell ? (
                      <TableCell
                        rowSpan={assetRowCount}
                        className="border-border/40 bg-secondary/20 border-b border-r px-4 py-3 align-top text-xs font-medium whitespace-normal"
                      >
                        {group.assetClass}
                      </TableCell>
                    ) : null}

                    {showRegionCell ? (
                      <TableCell
                        rowSpan={regionRowCount}
                        className="border-border/40 border-b border-r px-4 py-3 align-top text-xs whitespace-normal"
                      >
                        {regionGroup.region}
                      </TableCell>
                    ) : null}

                    <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs font-mono tabular-nums">
                      {row.tier}
                    </TableCell>
                    <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs font-mono tabular-nums text-right whitespace-normal">
                      {row.rate}
                    </TableCell>
                    <TableCell className="border-border/40 border-b px-4 py-3 text-xs font-mono tabular-nums text-right">
                      {row.minPerTx}
                    </TableCell>
                  </TableRow>
                )
              })
            })
          })}
        </TableBody>
      </Table>
    </SectionLayout>
  )
}

export function OperationalServiceFeesTable({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (payload: SelectPayload) => void
}) {
  const items = getFeeItemsForSection("operational-service")

  const categoryLabel = (item: FeeScheduleItem) => {
    switch (item.id) {
      case "fiduciary-deposits":
        return "Fiduciary placement"
      case "complex-onboarding":
        return "Onboarding"
      case "administration":
        return "Administration"
      case "cash-transfer":
        return "Transfers"
      case "expenses-pass-through":
        return "Pass through"
      default:
        return item.operation
    }
  }

  const rateLabel = (item: FeeScheduleItem) => {
    if (item.formula.kind === "percent") return formatPercent(item.formula.rate)
    if (item.formula.kind === "flat_usd") return "Flat fee"
    if (item.formula.kind === "pass_through") return "At cost"
    return "—"
  }

  const minimumLabel = (item: FeeScheduleItem) => {
    if (item.formula.kind === "flat_usd") return formatUSD(item.formula.amountUSD)
    if (item.formula.kind === "pass_through") return "N/A"
    if (item.minFeeUSD) return formatUSD(item.minFeeUSD)
    return "—"
  }

  const description = (item: FeeScheduleItem) => {
    if (item.id === "expenses-pass-through") return "Expenses / third-party"
    if (item.id === "complex-onboarding") return "Complex onboarding fee"
    if (item.id === "administration") return "Administration fee"
    if (item.id === "cash-transfer") return "Cash transfer"
    return item.asset
  }

  return (
    <SectionLayout sectionId="operational-service">
      <Table className="min-w-[720px] w-full border-separate border-spacing-0 lg:min-w-full">
        <TableHeader>
          <TableRow className="bg-secondary/30 hover:bg-secondary/30">
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
              Fee category
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
              Description
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs text-right whitespace-normal">
              Rate / fee
            </TableHead>
            <TableHead className="border-border/40 border-b border-r px-4 py-3 text-xs text-right whitespace-normal">
              Minimum / flat fee
            </TableHead>
            <TableHead className="border-border/40 border-b px-4 py-3 text-xs whitespace-normal">
              Frequency
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              data-state={item.id === selectedId ? "selected" : undefined}
              onClick={() => onSelect({ id: item.id })}
              className="cursor-pointer hover:bg-muted/40"
            >
              <TableCell className="border-border/40 bg-secondary/20 border-b border-r px-4 py-3 align-top text-xs font-medium whitespace-normal">
                {categoryLabel(item)}
              </TableCell>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 align-top text-xs whitespace-normal">
                {description(item)}
              </TableCell>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 align-top text-xs font-mono tabular-nums text-right whitespace-normal">
                {rateLabel(item)}
              </TableCell>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 align-top text-xs font-mono tabular-nums text-right">
                {minimumLabel(item)}
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 align-top text-xs whitespace-normal">
                {item.frequency}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionLayout>
  )
}

export function FeeScheduleTables({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (payload: SelectPayload) => void
}) {
  const hasSchedule = feeSchedule.length > 0
  if (!hasSchedule) {
    return (
      <div className="rounded-2xl border border-border/40 bg-card/60 supports-[backdrop-filter]:bg-card/40 backdrop-blur-[10px] p-6">
        <div className="text-sm font-medium">Fee schedule</div>
        <div className="text-muted-foreground mt-2 text-sm">
          No schedule data found.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Internal</Badge>
          <div className="text-sm font-medium">Fee schedule</div>
        </div>
        <div className="text-muted-foreground text-xs">
          Click a row to load it in the calculator.
        </div>
      </div>

      <AnnualManagementFeesTable selectedId={selectedId} onSelect={onSelect} />
      <TradingExecutionCostsTable selectedId={selectedId} onSelect={onSelect} />
      <OperationalServiceFeesTable selectedId={selectedId} onSelect={onSelect} />
    </div>
  )
}
