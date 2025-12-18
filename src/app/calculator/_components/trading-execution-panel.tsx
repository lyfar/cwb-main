"use client"

import { Plus, Trash } from "@phosphor-icons/react"

import type { FeeScheduleItem } from "@/lib/fee-schedule"
import { formatUSD } from "@/app/calculator/_lib/format"
import { panelShell } from "@/app/calculator/_lib/panel-shell"
import type { TradeLine, SelectPayload } from "@/app/calculator/_types"
import type { TradePeriod } from "@/app/calculator/_lib/scenario"
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
  return (
    <section className={panelShell}>
      <header>
        <div className="text-sm font-medium">Trading & execution</div>
        <div className="text-muted-foreground mt-1 text-xs">
          Add your trades to estimate transactional costs.
        </div>
      </header>

      <div className="mt-4 rounded-xl border border-border/40 px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs">
            <div className="font-medium">Trade list period</div>
            <div className="text-muted-foreground mt-0.5 text-[11px]">
              Used for annualised totals.
            </div>
          </div>
          <Select
            value={tradePeriod}
            onValueChange={(value) => setTradePeriod(value as TradePeriod)}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 space-y-3 md:hidden">
        {computations.length === 0 ? (
          <div className="text-muted-foreground rounded-xl border border-border/40 px-4 py-6 text-center text-sm">
            Add a trade line to start estimating.
          </div>
        ) : null}

        {computations.map((row) => {
          const rateLabel = row.rateLabel
          return (
            <div
              key={row.line.key}
              className="rounded-xl border border-border/40 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="text-xs font-medium">Trade type</div>
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
                      <SelectValue placeholder="Select trade type" />
                    </SelectTrigger>
                    <SelectContent>
                      {brokerageItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.asset}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {rateLabel ? (
                    <div className="text-muted-foreground text-[11px] leading-relaxed">
                      {rateLabel}
                      {row.minApplied ? " · min applied" : ""}
                    </div>
                  ) : null}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTradeLine(row.line.key)}
                  aria-label="Remove trade line"
                  className="shrink-0"
                >
                  <Trash className="size-4" />
                </Button>
              </div>

              <div className="mt-4 grid gap-3">
                {row.isContract ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <div className="text-xs font-medium">Contract type</div>
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
                          <SelectValue placeholder="Contract type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="options">Options</SelectItem>
                          <SelectItem value="futures">Futures</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-medium">
                        Contracts per trade
                      </div>
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
                        aria-label="Contracts per trade"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <div className="text-xs font-medium">Trade value (USD)</div>
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
                        aria-label="Trade value (USD)"
                      />
                    </div>
                    {row.isRange ? (
                      <div className="space-y-2">
                        <div className="text-xs font-medium">Rate override</div>
                        <div className="flex items-center gap-2">
                          <Input
                            inputMode="decimal"
                            type="number"
                            min={0}
                            step="any"
                            placeholder="Rate %"
                            value={row.line.rateOverrideInput}
                            onChange={(event) =>
                              updateTradeLine(row.line.key, (line) => ({
                                ...line,
                                rateOverrideInput: event.target.value,
                              }))
                            }
                            className="font-mono tabular-nums"
                            aria-label="Override rate percent"
                          />
                          <div className="text-muted-foreground text-xs">%</div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-xs font-medium">Trades</div>
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
                    className="font-mono tabular-nums"
                    aria-label="Number of trades"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/40 bg-secondary/20 px-3 py-2">
                  <div className="text-[11px] font-medium">Fee / trade</div>
                  <div className="mt-1 font-mono tabular-nums text-xs">
                    {formatUSD(row.perTradeUSD)}
                  </div>
                </div>
                <div className="rounded-xl border border-border/40 bg-secondary/20 px-3 py-2">
                  <div className="text-[11px] font-medium">Total</div>
                  <div className="mt-1 font-mono tabular-nums text-xs">
                    {formatUSD(row.totalUSD)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <Button variant="outline" className="w-full" onClick={addTradeLine}>
          <Plus className="size-4" />
          Add line
        </Button>
      </div>

      <div className="mt-4 hidden overflow-hidden rounded-xl border border-border/40 md:block">
        <Table className="min-w-[760px] w-full border-separate border-spacing-0 sm:min-w-[880px]">
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs min-w-[220px] w-[220px] sm:min-w-[260px] sm:w-[260px]">
                Trade type
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs min-w-[160px] w-[160px] sm:min-w-[200px] sm:w-[200px]">
                Value / contracts
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs text-right min-w-[80px] w-[80px] sm:min-w-[96px] sm:w-[96px]">
                Trades
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs text-right min-w-[110px] w-[110px] sm:min-w-[132px] sm:w-[132px]">
                Fee / trade
              </TableHead>
              <TableHead className="border-border/40 border-b border-r px-3 py-2 text-xs text-right min-w-[120px] w-[120px] sm:min-w-[140px] sm:w-[140px]">
                Total
              </TableHead>
              <TableHead className="border-border/40 border-b px-3 py-2 text-xs text-right min-w-[44px] w-[44px] sm:min-w-[52px] sm:w-[52px]">
                <span className="sr-only">Actions</span>
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
                        <SelectValue placeholder="Select trade type" />
                      </SelectTrigger>
                      <SelectContent>
                        {brokerageItems.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.asset}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {rateLabel ? (
                      <div className="text-muted-foreground mt-2 text-[11px] leading-relaxed">
                        {rateLabel}
                        {row.minApplied ? " · min applied" : ""}
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
                            <SelectValue placeholder="Contract type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="options">Options</SelectItem>
                            <SelectItem value="futures">Futures</SelectItem>
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
                          aria-label="Contracts per trade"
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
                          aria-label="Trade value (USD)"
                        />
                        {row.isRange ? (
                          <div className="flex items-center gap-2">
                            <Input
                              inputMode="decimal"
                              type="number"
                              min={0}
                              step="any"
                              placeholder="Rate %"
                              value={row.line.rateOverrideInput}
                              onChange={(event) =>
                                updateTradeLine(row.line.key, (line) => ({
                                  ...line,
                                  rateOverrideInput: event.target.value,
                                }))
                              }
                              className="font-mono tabular-nums"
                              aria-label="Override rate percent"
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
                      aria-label="Number of trades"
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
                      aria-label="Remove trade line"
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
                  Add a trade line to start estimating.
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
                  <span className="font-medium">Add line</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 rounded-xl border border-border/40 bg-secondary px-4 py-3 text-secondary-foreground">
        <div className="text-xs font-medium">Trading total</div>
        <div className="font-mono tabular-nums mt-1 text-xl">
          {formatUSD(tradingTotalUSD)}
        </div>
      </div>
    </section>
  )
}
