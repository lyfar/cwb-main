"use client"

import { formatUSD } from "@/app/calculator/_lib/format"
import { panelShell } from "@/app/calculator/_lib/panel-shell"
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
  return (
    <section className={panelShell}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Operational & service</div>
          <div className="text-muted-foreground mt-1 text-xs">
            Add account and administrative costs.
          </div>
        </div>
        <Badge variant="outline">Mixed</Badge>
      </header>

      <div className="mt-5 space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="deposit-value">Deposits value (USD)</Label>
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
            <Label htmlFor="deposit-count">Deposit accounts</Label>
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
              Administration (annual) · accounts
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
            <Label htmlFor="onboarding-count">Complex onboarding · count</Label>
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
            <Label htmlFor="cash-transfers">Cash transfers (annual) · count</Label>
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
            <Label htmlFor="pass-through">Pass-through expenses (USD)</Label>
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
            <div className="text-xs font-medium">Annual service fees</div>
            <div className="font-mono tabular-nums mt-1 text-xl">
              {formatUSD(annualServiceUSD)}
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-secondary px-4 py-3 text-secondary-foreground">
            <div className="text-xs font-medium">One-off + at cost</div>
            <div className="font-mono tabular-nums mt-1 text-xl">
              {formatUSD(oneOffServiceUSD)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
