"use client"

import { formatUSD } from "@/app/calculator/_lib/format"
import { panelShell } from "@/app/calculator/_lib/panel-shell"
import type { TradePeriod } from "@/app/calculator/_lib/scenario"
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
  const annualisedAllInUSD =
    annualRecurringUSD +
    annualServiceUSD +
    (annualisedTransactionUSD ?? 0)

  return (
    <section className={panelShell}>
      <header>
        <div className="text-sm font-medium">Summary</div>
        <div className="text-muted-foreground mt-1 text-xs">
          Totals are estimates for internal scoping only.
        </div>
      </header>

      <div className="mt-4 overflow-hidden rounded-xl border border-border/40">
        <Table className="w-full border-separate border-spacing-0">
          <TableBody>
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs">
                Quarterly recurring (management)
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums">
                {formatUSD(quarterlyRecurringUSD)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs">
                Annual recurring (management + service)
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums">
                {formatUSD(annualRecurringUSD + annualServiceUSD)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs">
                Transactional total (trades + transfers)
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums">
                {formatUSD(transactionalTotalUSD)}
              </TableCell>
            </TableRow>
            {annualisedTransactionUSD != null ? (
              <TableRow>
                <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs">
                  Annualised transactional ({tradePeriod})
                </TableCell>
                <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums">
                  {formatUSD(annualisedTransactionUSD)}
                </TableCell>
              </TableRow>
            ) : null}
            <TableRow>
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs">
                One-off + at cost
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums">
                {formatUSD(oneOffServiceUSD)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-secondary/25 hover:bg-secondary/25">
              <TableCell className="border-border/40 border-b border-r px-4 py-3 text-xs font-medium">
                Annualised all-in (excl. one-off)
              </TableCell>
              <TableCell className="border-border/40 border-b px-4 py-3 text-right text-xs font-mono tabular-nums font-semibold">
                {formatUSD(annualisedAllInUSD)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="text-muted-foreground mt-4 text-xs leading-relaxed">
        The fee tables on the left are the reference maximum fee schedule. This
        estimator applies minimums where stated and uses the selected trade list
        period to annualise transactional totals.
      </div>
    </section>
  )
}
