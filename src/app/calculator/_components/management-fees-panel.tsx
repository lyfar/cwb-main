"use client"

import type { TieringMode } from "@/lib/fee-schedule"
import { usePathname } from "next/navigation"

import { formatCompactNumber, formatUSD } from "@/app/calculator/_lib/format"
import { getCalculatorCopy } from "@/app/calculator/_lib/copy"
import { panelShell } from "@/app/calculator/_lib/panel-shell"
import { parseNumberInput } from "@/app/calculator/_lib/scenario"
import { getLocaleFromPathname } from "@/lib/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

type ManagementFeeRow = {
  id: "discretionary-mandate" | "custodian" | "advisory"
  label: string
  included: boolean
  setIncluded: (value: boolean) => void
  perQuarterUSD: number
}

export function ManagementFeesPanel({
  portfolioValueInput,
  setPortfolioValueInput,
  tieringMode,
  setTieringMode,
  rows,
  quarterlyRecurringUSD,
  annualRecurringUSD,
}: {
  portfolioValueInput: string
  setPortfolioValueInput: (value: string) => void
  tieringMode: TieringMode
  setTieringMode: (mode: TieringMode) => void
  rows: ManagementFeeRow[]
  quarterlyRecurringUSD: number
  annualRecurringUSD: number
}) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCalculatorCopy(locale)
  const maxPortfolioValueUSD = 1_000_000_000
  const portfolioValueUSD = Math.min(
    maxPortfolioValueUSD,
    Math.max(0, parseNumberInput(portfolioValueInput))
  )

  const formatFinancialInput = (value: number) =>
    Math.round(value).toLocaleString("en-US")

  const commitPortfolioValue = (value: number) => {
    const clamped = Math.min(maxPortfolioValueUSD, Math.max(0, value))
    setPortfolioValueInput(formatFinancialInput(clamped))
  }

  const quickAdds = [
    { label: "+1M", delta: 1_000_000 },
    { label: "+10M", delta: 10_000_000 },
    { label: "+50M", delta: 50_000_000 },
    { label: "+100M", delta: 100_000_000 },
  ] as const

  return (
    <section className={panelShell}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium">{copy.managementPanel.title}</div>
          <div className="text-muted-foreground mt-1 text-xs">
            {copy.managementPanel.description}
          </div>
        </div>
        <Badge variant="outline">{copy.managementPanel.badge}</Badge>
      </header>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <div className="flex items-end justify-between gap-3">
            <Label htmlFor="portfolio-value">{copy.managementPanel.portfolioValue}</Label>
            <div className="text-muted-foreground text-xs">
              {copy.managementPanel.upTo(
                formatCompactNumber(maxPortfolioValueUSD)
              )}
            </div>
          </div>
          <Input
            id="portfolio-value"
            inputMode="numeric"
            type="text"
            value={portfolioValueInput}
            onChange={(event) =>
              setPortfolioValueInput(
                event.target.value.replaceAll(/[^0-9.,\s]/g, "")
              )
            }
            onBlur={() => commitPortfolioValue(portfolioValueUSD)}
            placeholder="10,000,000"
            className="font-mono tabular-nums"
          />
          <Slider
            value={[portfolioValueUSD]}
            min={0}
            max={maxPortfolioValueUSD}
            step={1_000_000}
            onValueChange={(value) => commitPortfolioValue(value[0] ?? 0)}
            aria-label={copy.managementPanel.portfolioSliderAria}
          />
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <span className="font-mono tabular-nums">0</span>
            <span className="font-mono tabular-nums">
              {formatCompactNumber(maxPortfolioValueUSD)}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickAdds.map((item) => (
              <Button
                key={item.label}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => commitPortfolioValue(portfolioValueUSD + item.delta)}
              >
                {item.label}
              </Button>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => commitPortfolioValue(maxPortfolioValueUSD)}
            >
              {copy.managementPanel.max}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-border/40 px-4 py-3">
          <div className="space-y-0.5">
            <div className="text-sm font-medium">{copy.managementPanel.blendedTitle}</div>
            <div className="text-muted-foreground text-xs">
              {copy.managementPanel.blendedDescription}
            </div>
          </div>
          <Checkbox
            checked={tieringMode === "progressive"}
            onCheckedChange={(checked) =>
              setTieringMode(checked ? "progressive" : "bracket")
            }
            aria-label={copy.managementPanel.blendedAria}
          />
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/40 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={row.included}
                  onCheckedChange={(checked) => row.setIncluded(Boolean(checked))}
                  aria-label={`Toggle ${row.label}`}
                />
                <div className="text-sm font-medium">{row.label}</div>
              </div>
              <div className="text-right">
                <div className="font-mono tabular-nums text-sm">
                  {formatUSD(row.perQuarterUSD)}
                </div>
                <div className="text-muted-foreground text-xs">{copy.managementPanel.perQuarter}</div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-secondary px-4 py-3 text-secondary-foreground">
            <div className="text-xs font-medium">{copy.managementPanel.quarterlyRecurring}</div>
            <div className="font-mono tabular-nums mt-1 text-xl">
              {formatUSD(quarterlyRecurringUSD)}
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-secondary px-4 py-3 text-secondary-foreground">
            <div className="text-xs font-medium">{copy.managementPanel.annualisedRecurring}</div>
            <div className="font-mono tabular-nums mt-1 text-xl">
              {formatUSD(annualRecurringUSD)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
