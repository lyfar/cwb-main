"use client"

import { usePathname } from "next/navigation"
import { Plus, Trash } from "@phosphor-icons/react"

import type { FeeScheduleItem } from "@/lib/fee-schedule"
import { getCalculatorCopy } from "@/app/calculator/_lib/copy"
import { formatUSD } from "@/app/calculator/_lib/format"
import { panelShell } from "@/app/calculator/_lib/panel-shell"
import { formatTradeAssetLabel } from "@/app/calculator/_lib/trade-labels"
import type { TradeLine, SelectPayload } from "@/app/calculator/_types"
import type { TradePeriod } from "@/app/calculator/_lib/scenario"
import { getLocaleFromPathname } from "@/lib/locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type TradeLineComputation = {
  line: TradeLine
  item: FeeScheduleItem | null
  count: number
  perTradeUSD: number
  totalUSD: number
  rateLabel?: string
  minApplied: boolean
  isRange: boolean
  isContract: boolean
}

export function TradingExecutionPanel({
  brokerageItems,
  tradeLines,
  computations,
  tradingTotalUSD,
  tradePeriod,
  setTradePeriod,
  addTradeLine,
  removeTradeLine,
  updateTradeLine,
  onSelect,
}: {
  brokerageItems: FeeScheduleItem[]
  tradeLines: TradeLine[]
  computations: TradeLineComputation[]
  tradingTotalUSD: number
  tradePeriod: TradePeriod
  setTradePeriod: (value: TradePeriod) => void
  addTradeLine: () => void
  removeTradeLine: (key: string) => void
  updateTradeLine: (key: string, updater: (line: TradeLine) => TradeLine) => void
  onSelect: (payload: SelectPayload) => void
}) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCalculatorCopy(locale)

  return (
    <section className={panelShell}>
      <header>
        <div className="text-sm font-medium">{copy.tradingPanel.title}</div>
        <div className="text-muted-foreground mt-1 text-xs">
          {copy.tradingPanel.description}
        </div>
      </header>

      <div className="mt-4 rounded-xl border border-border/40 px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs">
            <div className="font-medium">{copy.tradingPanel.tradeListPeriod}</div>
            <div className="text-muted-foreground mt-0.5 text-[11px]">
              {copy.tradingPanel.tradeListPeriodHelp}
            </div>
          </div>
          <Select
            value={tradePeriod}
            onValueChange={(value) => setTradePeriod(value as TradePeriod)}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder={copy.tradingPanel.periodPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">{copy.tradingPanel.periods["one-time"]}</SelectItem>
              <SelectItem value="monthly">{copy.tradingPanel.periods.monthly}</SelectItem>
              <SelectItem value="quarterly">{copy.tradingPanel.periods.quarterly}</SelectItem>
              <SelectItem value="annual">{copy.tradingPanel.periods.annual}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border/40">
        <Table className="min-w-[760px] w-full border-separate border-spacing-0 sm:min-w-[880px]">
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs min-w-[220px] w-[220px] sm:min-w-[260px] sm:w-[260px]">
                {copy.tradingPanel.table.tradeType}
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs min-w-[160px] w-[160px] sm:min-w-[200px] sm:w-[200px]">
                {copy.tradingPanel.table.valueContracts}
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs text-right min-w-[80px] w-[80px] sm:min-w-[96px] sm:w-[96px]">
                {copy.tradingPanel.table.trades}
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs text-right min-w-[110px] w-[110px] sm:min-w-[132px] sm:w-[132px]">
                {copy.tradingPanel.table.feePerTrade}
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs text-right min-w-[120px] w-[120px] sm:min-w-[140px] sm:w-[140px]">
                {copy.tradingPanel.table.total}
              </TableHead>
              <TableHead className="border-border/40 border-b px-3 py-2 text-xs text-right min-w-[44px] w-[44px] sm:min-w-[52px] sm:w-[52px]">
                <span className="sr-only">{copy.tradingPanel.table.actions}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {computations.map((row) => {
              const rateLabel = row.rateLabel
              return (
                <TableRow key={row.line.key} className="hover:bg-muted/40">
                  <TableCell className="border-border/40 border-b border-r px-3 py-3 align-top text-xs whitespace-normal">
                    <Select
                      value={row.line.itemId}
                      onValueChange={(value) => {
                        updateTradeLine(row.line.key, (line) => ({
                          ...line,
                          itemId: value,
                        }))
                        onSelect({ id: value })
                      }}
                    >
                      <SelectTrigger className="w-full min-w-0">
                        <SelectValue
                          placeholder={copy.tradingPanel.selectTradeTypePlaceholder}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {brokerageItems.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {formatTradeAssetLabel(item.asset, locale)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {rateLabel ? (
                      <div className="text-muted-foreground mt-2 text-[11px] leading-relaxed">
                        {rateLabel}
                        {row.minApplied ? ` · ${copy.tradingPanel.minApplied}` : ""}
                      </div>
                    ) : null}
                  </TableCell>

                  <TableCell className="border-border/40 border-b border-r px-3 py-3 align-top text-xs">
                    {row.isContract ? (
                      <div className="grid gap-2">
                        <Select
                          value={row.line.contractType}
                          onValueChange={(value) => {
                            if (value === "options" || value === "futures") {
                              updateTradeLine(row.line.key, (line) => ({
                                ...line,
                                contractType: value,
                              }))
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={copy.tradingPanel.contractTypePlaceholder}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="options">{copy.tradingPanel.options}</SelectItem>
                            <SelectItem value="futures">{copy.tradingPanel.futures}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          inputMode="numeric"
                          type="number"
                          min={0}
                          step="1"
                          value={row.line.contractsInput}
                          onChange={(event) =>
                            updateTradeLine(row.line.key, (line) => ({
                              ...line,
                              contractsInput: event.target.value,
                            }))
                          }
                          className="font-mono tabular-nums"
                          aria-label={copy.tradingPanel.contractsPerTrade}
                        />
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        <Input
                          inputMode="decimal"
                          type="number"
                          min={0}
                          step="any"
                          value={row.line.amountInput}
                          onChange={(event) =>
                            updateTradeLine(row.line.key, (line) => ({
                              ...line,
                              amountInput: event.target.value,
                            }))
                          }
                          className="font-mono tabular-nums"
                          aria-label={copy.tradingPanel.tradeValueUsd}
                        />
                        {row.isRange ? (
                          <div className="flex items-center gap-2">
                            <Input
                              inputMode="decimal"
                              type="number"
                              min={0}
                              step="any"
                              placeholder={copy.tradingPanel.rateOverridePlaceholder}
                              value={row.line.rateOverrideInput}
                              onChange={(event) =>
                                updateTradeLine(row.line.key, (line) => ({
                                  ...line,
                                  rateOverrideInput: event.target.value,
                                }))
                              }
                              className="font-mono tabular-nums"
                              aria-label={copy.tradingPanel.overrideRatePercentAria}
                            />
                            <div className="text-muted-foreground text-xs">%</div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="border-border/40 border-b border-r px-3 py-3 align-top text-xs text-right">
                    <Input
                      inputMode="numeric"
                      type="number"
                      min={0}
                      step="1"
                      value={row.line.countInput}
                      onChange={(event) =>
                        updateTradeLine(row.line.key, (line) => ({
                          ...line,
                          countInput: event.target.value,
                        }))
                      }
                      className="font-mono tabular-nums text-right"
                      aria-label={copy.tradingPanel.numberOfTradesAria}
                    />
                  </TableCell>

                  <TableCell className="border-border/40 border-b border-r px-3 py-3 align-top text-xs text-right font-mono tabular-nums">
                    {formatUSD(row.perTradeUSD)}
                  </TableCell>

                  <TableCell className="border-border/40 border-b border-r px-3 py-3 align-top text-xs text-right font-mono tabular-nums">
                    {formatUSD(row.totalUSD)}
                  </TableCell>

                  <TableCell className="border-border/40 border-b px-3 py-3 align-top text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTradeLine(row.line.key)}
                      aria-label={copy.tradingPanel.removeLineAria}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}

            {tradeLines.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground px-3 py-6 text-center text-sm"
                >
                  {copy.tradingPanel.table.empty}
                </TableCell>
              </TableRow>
            ) : null}

            <TableRow
              onClick={addTradeLine}
              className="cursor-pointer bg-background hover:bg-muted/40"
            >
              <TableCell colSpan={6} className="border-border/40 px-3 py-3 text-xs">
                <div className="flex items-center gap-2">
                  <Plus className="size-4" />
                  <span className="font-medium">{copy.tradingPanel.table.addLine}</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 rounded-xl border border-border/40 bg-secondary px-4 py-3 text-secondary-foreground">
        <div className="text-xs font-medium">{copy.tradingPanel.tradingTotal}</div>
        <div className="font-mono tabular-nums mt-1 text-xl">
          {formatUSD(tradingTotalUSD)}
        </div>
      </div>
    </section>
  )
}
