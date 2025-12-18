"use client"

import { usePathname } from "next/navigation"

import { formatUSD } from "@/app/calculator/_lib/format"
import { getCalculatorCopy } from "@/app/calculator/_lib/copy"
import { panelShell } from "@/app/calculator/_lib/panel-shell"
import { getLocaleFromPathname } from "@/lib/locale"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function OperationalServicePanel({
  depositValueInput,
  setDepositValueInput,
  depositCountInput,
  setDepositCountInput,
  administrationCountInput,
  setAdministrationCountInput,
  onboardingCountInput,
  setOnboardingCountInput,
  cashTransfersCountInput,
  setCashTransfersCountInput,
  passThroughCostInput,
  setPassThroughCostInput,
  annualServiceUSD,
  oneOffServiceUSD,
}: {
  depositValueInput: string
  setDepositValueInput: (value: string) => void
  depositCountInput: string
  setDepositCountInput: (value: string) => void
  administrationCountInput: string
  setAdministrationCountInput: (value: string) => void
  onboardingCountInput: string
  setOnboardingCountInput: (value: string) => void
  cashTransfersCountInput: string
  setCashTransfersCountInput: (value: string) => void
  passThroughCostInput: string
  setPassThroughCostInput: (value: string) => void
  annualServiceUSD: number
  oneOffServiceUSD: number
}) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCalculatorCopy(locale)

  return (
    <section className={panelShell}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium">{copy.operationalPanel.title}</div>
          <div className="text-muted-foreground mt-1 text-xs">
            {copy.operationalPanel.description}
          </div>
        </div>
        <Badge variant="outline">{copy.operationalPanel.badge}</Badge>
      </header>

      <div className="mt-5 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="deposit-value">{copy.operationalPanel.depositsValue}</Label>
            <Input
              id="deposit-value"
              inputMode="decimal"
              type="number"
              min={0}
              step="any"
              value={depositValueInput}
              onChange={(event) => setDepositValueInput(event.target.value)}
              className="font-mono tabular-nums"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deposit-count">{copy.operationalPanel.depositAccounts}</Label>
            <Input
              id="deposit-count"
              inputMode="numeric"
              type="number"
              min={0}
              step="1"
              value={depositCountInput}
              onChange={(event) => setDepositCountInput(event.target.value)}
              className="font-mono tabular-nums"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="administration-count">
              {copy.operationalPanel.administrationAccounts}
            </Label>
            <Input
              id="administration-count"
              inputMode="numeric"
              type="number"
              min={0}
              step="1"
              value={administrationCountInput}
              onChange={(event) => setAdministrationCountInput(event.target.value)}
              className="font-mono tabular-nums"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="onboarding-count">{copy.operationalPanel.onboardingCount}</Label>
            <Input
              id="onboarding-count"
              inputMode="numeric"
              type="number"
              min={0}
              step="1"
              value={onboardingCountInput}
              onChange={(event) => setOnboardingCountInput(event.target.value)}
              className="font-mono tabular-nums"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cash-transfers">{copy.operationalPanel.cashTransfersCount}</Label>
            <Input
              id="cash-transfers"
              inputMode="numeric"
              type="number"
              min={0}
              step="1"
              value={cashTransfersCountInput}
              onChange={(event) => setCashTransfersCountInput(event.target.value)}
              className="font-mono tabular-nums"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pass-through">{copy.operationalPanel.passThroughExpenses}</Label>
            <Input
              id="pass-through"
              inputMode="decimal"
              type="number"
              min={0}
              step="any"
              value={passThroughCostInput}
              onChange={(event) => setPassThroughCostInput(event.target.value)}
              className="font-mono tabular-nums"
            />
          </div>
        </div>

        <Separator />

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-secondary px-4 py-3 text-secondary-foreground">
            <div className="text-xs font-medium">{copy.operationalPanel.annualServiceFees}</div>
            <div className="font-mono tabular-nums mt-1 text-xl">
              {formatUSD(annualServiceUSD)}
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-secondary px-4 py-3 text-secondary-foreground">
            <div className="text-xs font-medium">{copy.operationalPanel.oneOffAtCost}</div>
            <div className="font-mono tabular-nums mt-1 text-xl">
              {formatUSD(oneOffServiceUSD)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
