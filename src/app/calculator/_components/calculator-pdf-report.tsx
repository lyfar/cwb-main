import type { ReactNode } from "react"

import type { TieringMode } from "@/lib/fee-schedule"
import type { Locale } from "@/lib/locale"

import { getCalculatorCopy } from "@/app/calculator/_lib/copy"
import { formatUSD } from "@/app/calculator/_lib/format"
import type { TradePeriod } from "@/app/calculator/_lib/scenario"
import type { TradeLineComputation } from "@/app/calculator/_components/trading-execution-panel"
import { formatTradeAssetLabel } from "@/app/calculator/_lib/trade-labels"
import {
  AnnualManagementFeesTable,
  OperationalServiceFeesTable,
  TradingExecutionCostsTable,
} from "@/app/calculator/_components/fee-tables"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

type ManagementRow = {
  label: string
  included: boolean
  perQuarterUSD: number
}

function formatOnOff(locale: Locale, value: boolean) {
  if (locale === "ru") return value ? "Включено" : "Выключено"
  return value ? "On" : "Off"
}

function formatDate(locale: Locale, date: Date) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date)
}

function ReportCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border/40 bg-card/60 p-6">
      <h2 className="font-serif text-2xl leading-tight tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function CalculatorPdfReport({
  locale,
  generatedAt,
  selectedId,
  tieringMode,
  portfolioValueUSD,
  managementRows,
  quarterlyRecurringUSD,
  annualRecurringUSD,
  tradePeriod,
  tradeLineComputations,
  tradingTotalUSD,
  annualisedTradingUSD,
  cashTransfersCount,
  cashTransferTotalUSD,
  depositValueUSD,
  depositCount,
  administrationCount,
  onboardingCount,
  passThroughCostUSD,
  annualServiceUSD,
  oneOffServiceUSD,
  transactionalTotalUSD,
  annualisedTransactionUSD,
}: {
  locale: Locale
  generatedAt: Date
  selectedId: string
  tieringMode: TieringMode
  portfolioValueUSD: number
  managementRows: ManagementRow[]
  quarterlyRecurringUSD: number
  annualRecurringUSD: number
  tradePeriod: TradePeriod
  tradeLineComputations: TradeLineComputation[]
  tradingTotalUSD: number
  annualisedTradingUSD: number | null
  cashTransfersCount: number
  cashTransferTotalUSD: number
  depositValueUSD: number
  depositCount: number
  administrationCount: number
  onboardingCount: number
  passThroughCostUSD: number
  annualServiceUSD: number
  oneOffServiceUSD: number
  transactionalTotalUSD: number
  annualisedTransactionUSD: number | null
}) {
  const copy = getCalculatorCopy(locale)
  const annualisedAllInUSD =
    annualRecurringUSD + annualServiceUSD + (annualisedTransactionUSD ?? 0)

  const reportTitle = locale === "ru" ? "Оценка комиссий" : "Fee estimate"
  const reportSubtitle =
    locale === "ru"
      ? "Оценка основана на опубликованной таблице максимальных комиссий и применяется для внутреннего расчёта и подготовки предложения."
      : "Indicative estimate based on the published maximum fee schedule, for internal scoping and proposal preparation."

  const tieringEnabled = tieringMode === "progressive"

  return (
    <div className="space-y-10">
      <header className="flex items-start justify-between gap-8">
        <div>
          <div className="font-serif text-3xl font-semibold tracking-tight">
            CWB
          </div>
          <div className="text-muted-foreground mt-1 text-sm">
            {locale === "ru"
              ? "Хранение активов и управление инвестициями"
              : "Custody & investment management"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground text-xs">
            {locale === "ru" ? "Дата" : "Date"}
          </div>
          <div className="font-mono tabular-nums text-sm">
            {formatDate(locale, generatedAt)}
          </div>
          <div className="text-muted-foreground mt-3 text-xs">
            {locale === "ru" ? "Валюта" : "Currency"}
          </div>
          <div className="font-mono text-sm">USD</div>
        </div>
      </header>

      <section className="rounded-2xl border border-border/40 bg-secondary/20 p-8">
        <h1 className="font-serif text-5xl leading-[1.02] tracking-tight">
          {reportTitle}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed">
          {reportSubtitle}
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReportCard title={copy.managementPanel.title}>
          <Table className="w-full table-fixed border-separate border-spacing-0">
            <TableBody>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.managementPanel.portfolioValue}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatUSD(portfolioValueUSD)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.managementPanel.blendedTitle}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatOnOff(locale, tieringEnabled)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 overflow-hidden rounded-xl border border-border/30">
            <Table className="w-full table-fixed border-separate border-spacing-0">
              <TableBody>
                {managementRows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs whitespace-normal">
                      {row.label}
                    </TableCell>
                    <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-mono tabular-nums w-40">
                      {formatUSD(row.included ? row.perQuarterUSD : 0)}
                    </TableCell>
                    <TableCell className="border-border/30 border-b px-4 py-3 text-xs text-right w-28">
                      {row.included
                        ? locale === "ru"
                          ? "Включено"
                          : "Included"
                        : locale === "ru"
                          ? "Исключено"
                          : "Excluded"}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-secondary/25">
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs font-medium">
                    {copy.managementPanel.quarterlyRecurring}
                  </TableCell>
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-mono tabular-nums font-semibold">
                    {formatUSD(quarterlyRecurringUSD)}
                  </TableCell>
                  <TableCell className="border-border/30 border-b px-4 py-3 text-xs text-right">
                    {copy.managementPanel.perQuarter}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-secondary/15">
                  <TableCell className="border-border/30 border-r px-4 py-3 text-xs font-medium">
                    {copy.managementPanel.annualisedRecurring}
                  </TableCell>
                  <TableCell className="border-border/30 border-r px-4 py-3 text-xs text-right font-mono tabular-nums font-semibold">
                    {formatUSD(annualRecurringUSD)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-right">
                    {locale === "ru" ? "в год" : "per year"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ReportCard>

        <ReportCard title={copy.tradingPanel.title}>
          <Table className="w-full table-fixed border-separate border-spacing-0">
            <TableBody>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.tradingPanel.tradeListPeriod}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {copy.tradingPanel.periods[tradePeriod] ?? tradePeriod}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {locale === "ru"
                    ? "Денежные переводы (кол-во)"
                    : "Cash transfers (count)"}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {Math.max(0, cashTransfersCount).toLocaleString("en-US")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 overflow-hidden rounded-xl border border-border/30">
            <Table className="w-full border-separate border-spacing-0">
              <TableBody>
                <TableRow className="bg-secondary/20">
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs font-medium">
                    {copy.tradingPanel.table.tradeType}
                  </TableCell>
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-medium">
                    {copy.tradingPanel.table.trades}
                  </TableCell>
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-medium">
                    {copy.tradingPanel.table.feePerTrade}
                  </TableCell>
                  <TableCell className="border-border/30 border-b px-4 py-3 text-xs text-right font-medium">
                    {copy.tradingPanel.table.total}
                  </TableCell>
                </TableRow>

                {tradeLineComputations.length > 0 ? (
                  tradeLineComputations.map((row) => (
                    <TableRow key={row.line.key}>
                      <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs whitespace-normal">
                        {row.item
                          ? formatTradeAssetLabel(row.item.asset, locale)
                          : "—"}
                        {row.rateLabel ? (
                          <div className="text-muted-foreground mt-1 text-[11px] leading-relaxed">
                            {row.rateLabel}
                            {row.minApplied ? ` · ${copy.tradingPanel.minApplied}` : ""}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-mono tabular-nums">
                        {Math.max(0, row.count).toLocaleString("en-US")}
                      </TableCell>
                      <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-mono tabular-nums">
                        {formatUSD(row.perTradeUSD)}
                      </TableCell>
                      <TableCell className="border-border/30 border-b px-4 py-3 text-xs text-right font-mono tabular-nums">
                        {formatUSD(row.totalUSD)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-muted-foreground px-4 py-5 text-center text-sm"
                    >
                      {copy.tradingPanel.table.empty}
                    </TableCell>
                  </TableRow>
                )}

                <TableRow className="bg-secondary/25">
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs font-medium">
                    {copy.tradingPanel.tradingTotal}
                  </TableCell>
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-mono tabular-nums font-semibold">
                    —
                  </TableCell>
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs text-right font-mono tabular-nums font-semibold">
                    —
                  </TableCell>
                  <TableCell className="border-border/30 border-b px-4 py-3 text-xs text-right font-mono tabular-nums font-semibold">
                    {formatUSD(tradingTotalUSD)}
                  </TableCell>
                </TableRow>

                {annualisedTradingUSD != null ? (
                  <TableRow>
                    <TableCell className="border-border/30 border-r px-4 py-3 text-xs font-medium">
                      {locale === "ru" ? "Трейдинг (год)" : "Trading (annualised)"}
                    </TableCell>
                    <TableCell className="border-border/30 border-r px-4 py-3 text-xs text-right font-mono tabular-nums">
                      —
                    </TableCell>
                    <TableCell className="border-border/30 border-r px-4 py-3 text-xs text-right font-mono tabular-nums">
                      —
                    </TableCell>
                    <TableCell className="px-4 py-3 text-xs text-right font-mono tabular-nums">
                      {formatUSD(annualisedTradingUSD)}
                    </TableCell>
                  </TableRow>
                ) : null}

                <TableRow>
                  <TableCell className="border-border/30 border-r px-4 py-3 text-xs font-medium">
                    {locale === "ru" ? "Переводы (итого)" : "Transfers (total)"}
                  </TableCell>
                  <TableCell className="border-border/30 border-r px-4 py-3 text-xs text-right font-mono tabular-nums">
                    —
                  </TableCell>
                  <TableCell className="border-border/30 border-r px-4 py-3 text-xs text-right font-mono tabular-nums">
                    —
                  </TableCell>
                  <TableCell className="px-4 py-3 text-xs text-right font-mono tabular-nums">
                    {formatUSD(cashTransferTotalUSD)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ReportCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReportCard title={copy.operationalPanel.title}>
          <Table className="w-full table-fixed border-separate border-spacing-0">
            <TableBody>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.operationalPanel.depositsValue}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatUSD(depositValueUSD)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.operationalPanel.depositAccounts}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {depositCount.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.operationalPanel.administrationAccounts}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {administrationCount.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.operationalPanel.onboardingCount}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {onboardingCount.toLocaleString("en-US")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.operationalPanel.passThroughExpenses}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatUSD(passThroughCostUSD)}
                </TableCell>
              </TableRow>
              <TableRow className="bg-secondary/20">
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs font-medium">
                  {copy.operationalPanel.annualServiceFees}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums font-semibold w-44">
                  {formatUSD(annualServiceUSD)}
                </TableCell>
              </TableRow>
              <TableRow className="bg-secondary/15">
                <TableCell className="border-border/30 border-r px-4 py-3 text-xs font-medium">
                  {copy.operationalPanel.oneOffAtCost}
                </TableCell>
                <TableCell className="border-border/30 border-r px-4 py-3 text-right text-xs font-mono tabular-nums font-semibold w-44">
                  {formatUSD(oneOffServiceUSD)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ReportCard>

        <ReportCard title={copy.summaryPanel.title}>
          <Table className="w-full table-fixed border-separate border-spacing-0">
            <TableBody>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.summaryPanel.quarterlyRecurring}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatUSD(quarterlyRecurringUSD)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.summaryPanel.annualRecurring}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatUSD(annualRecurringUSD + annualServiceUSD)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.summaryPanel.transactionalTotal}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatUSD(transactionalTotalUSD)}
                </TableCell>
              </TableRow>
              {annualisedTransactionUSD != null ? (
                <TableRow>
                  <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                    {copy.summaryPanel.annualisedTransactional(
                      copy.tradingPanel.periods[tradePeriod] ?? tradePeriod
                    )}
                  </TableCell>
                  <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                    {formatUSD(annualisedTransactionUSD)}
                  </TableCell>
                </TableRow>
              ) : null}
              <TableRow>
                <TableCell className="border-border/30 border-b border-r px-4 py-3 text-xs">
                  {copy.summaryPanel.oneOffAtCost}
                </TableCell>
                <TableCell className="border-border/30 border-b px-4 py-3 text-right text-xs font-mono tabular-nums w-44">
                  {formatUSD(oneOffServiceUSD)}
                </TableCell>
              </TableRow>
              <TableRow className="bg-secondary/25">
                <TableCell className="border-border/30 border-r px-4 py-3 text-xs font-medium">
                  {copy.summaryPanel.annualisedAllIn}
                </TableCell>
                <TableCell className="border-border/30 border-r px-4 py-3 text-right text-xs font-mono tabular-nums font-semibold w-44">
                  {formatUSD(annualisedAllInUSD)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="text-muted-foreground mt-4 text-xs leading-relaxed">
            {copy.summaryPanel.footerNote}
          </div>
        </ReportCard>
      </div>

      <div className="print-break-after-page" />

      <AnnualManagementFeesTable selectedId={selectedId} onSelect={() => {}} />
      <div className="print-break-after-page" />
      <TradingExecutionCostsTable selectedId={selectedId} onSelect={() => {}} />
      <div className="print-break-after-page" />
      <OperationalServiceFeesTable selectedId={selectedId} onSelect={() => {}} />
    </div>
  )
}
