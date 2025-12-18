"use client"

import { usePathname } from "next/navigation"

import { getCalculatorCopy } from "@/app/calculator/_lib/copy"
import { formatUSD } from "@/app/calculator/_lib/format"
import { panelShell } from "@/app/calculator/_lib/panel-shell"
import type { TradePeriod } from "@/app/calculator/_lib/scenario"
import { getLocaleFromPathname } from "@/lib/locale"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

export function ScenarioSummaryPanel({
  quarterlyRecurringUSD,
  annualRecurringUSD,
  annualServiceUSD,
  transactionalTotalUSD,
  annualisedTransactionUSD,
  oneOffServiceUSD,
  tradePeriod,
}: {
  quarterlyRecurringUSD: number
  annualRecurringUSD: number
  annualServiceUSD: number
  transactionalTotalUSD: number
  annualisedTransactionUSD: number | null
  oneOffServiceUSD: number
  tradePeriod: TradePeriod
}) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCalculatorCopy(locale)

  const annualisedAllInUSD =
    annualRecurringUSD +
    annualServiceUSD +
    (annualisedTransactionUSD ?? 0)

  return (
    <section className={panelShell}>
      <header className="space-y-2">
        <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
          {copy.summaryPanel.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {copy.summaryPanel.description}
        </p>
      </header>

      <div className="mt-4 overflow-hidden rounded-xl border border-border/40">
        <Table className="w-full table-fixed border-separate border-spacing-0">
          <TableBody>
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
                {copy.summaryPanel.quarterlyRecurring}
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-36">
                {formatUSD(quarterlyRecurringUSD)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
                {copy.summaryPanel.annualRecurring}
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-36">
                {formatUSD(annualRecurringUSD + annualServiceUSD)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
                {copy.summaryPanel.transactionalTotal}
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-36">
                {formatUSD(transactionalTotalUSD)}
              </TableCell>
            </TableRow>
            {annualisedTransactionUSD != null ? (
              <TableRow>
                <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
                  {copy.summaryPanel.annualisedTransactional(
                    copy.tradingPanel.periods[tradePeriod] ?? tradePeriod
                  )}
                </TableCell>
                <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-36">
                  {formatUSD(annualisedTransactionUSD)}
                </TableCell>
              </TableRow>
            ) : null}
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs whitespace-normal">
                {copy.summaryPanel.oneOffAtCost}
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-36">
                {formatUSD(oneOffServiceUSD)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-secondary/25 hover:bg-secondary/25">
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs font-medium whitespace-normal">
                {copy.summaryPanel.annualisedAllIn}
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums font-semibold w-36">
                {formatUSD(annualisedAllInUSD)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground mt-4 text-xs leading-relaxed">
        {copy.summaryPanel.footerNote}
      </div>
    </section>
  )
}
