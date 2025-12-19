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
    <section className="pdf-avoid-break rounded-2xl border border-border/40 bg-card p-6">
      <h2 className="font-serif text-2xl leading-tight tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function StatList({ children }: { children: ReactNode }) {
  return (
    <div className="divide-border/30 overflow-hidden rounded-xl border border-border/30 divide-y">
      {children}
    </div>
  )
}

function StatRow({
  label,
  value,
  strong,
}: {
  label: ReactNode
  value: ReactNode
  strong?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-6 px-4 py-3">
      <div className="text-xs leading-relaxed">{label}</div>
      <div
        className={
          strong
            ? "w-44 shrink-0 text-right font-mono tabular-nums text-xs font-semibold"
            : "w-44 shrink-0 text-right font-mono tabular-nums text-xs"
        }
      >
        {value}
      </div>
    </div>
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

  const reportMeta = (
    <div className="text-muted-foreground flex items-center justify-between text-xs">
      <div>
        {locale === "ru"
          ? "CWB Hong Kong · Оценка комиссий"
          : "CWB Hong Kong · Fee estimate"}
      </div>
      <div className="font-mono tabular-nums">{formatDate(locale, generatedAt)}</div>
    </div>
  )

  return (
    <div className="pdf-document">
      <div className="pdf-page space-y-5">
        {reportMeta}

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
              {locale === "ru" ? "Валюта" : "Currency"}
            </div>
            <div className="font-mono text-sm">USD</div>
          </div>
        </header>

        <section className="rounded-2xl border border-border/40 bg-secondary/20 p-6">
          <h1 className="font-serif text-5xl leading-[1.02] tracking-tight">
            {reportTitle}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-relaxed">
            {reportSubtitle}
          </p>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <ReportCard title={copy.summaryPanel.title}>
            <StatList>
              <StatRow
                label={copy.summaryPanel.quarterlyRecurring}
                value={formatUSD(quarterlyRecurringUSD)}
              />
              <StatRow
                label={copy.summaryPanel.annualRecurring}
                value={formatUSD(annualRecurringUSD + annualServiceUSD)}
              />
              <StatRow
                label={copy.summaryPanel.transactionalTotal}
                value={formatUSD(transactionalTotalUSD)}
              />
              {annualisedTransactionUSD != null ? (
                <StatRow
                  label={copy.summaryPanel.annualisedTransactional(
                    copy.tradingPanel.periods[tradePeriod] ?? tradePeriod
                  )}
                  value={formatUSD(annualisedTransactionUSD)}
                />
              ) : null}
              <StatRow
                label={copy.summaryPanel.oneOffAtCost}
                value={formatUSD(oneOffServiceUSD)}
              />
              <div className="bg-secondary/25">
                <StatRow
                  label={copy.summaryPanel.annualisedAllIn}
                  value={formatUSD(annualisedAllInUSD)}
                  strong
                />
              </div>
            </StatList>

            <div className="text-muted-foreground mt-4 text-xs leading-relaxed">
              {copy.summaryPanel.footerNote}
            </div>
          </ReportCard>

          <ReportCard title={locale === "ru" ? "Параметры" : "Inputs"}>
            <StatList>
              <StatRow
                label={copy.managementPanel.portfolioValue}
                value={formatUSD(portfolioValueUSD)}
              />
              <StatRow
                label={copy.managementPanel.blendedTitle}
                value={formatOnOff(locale, tieringEnabled)}
              />
              <StatRow
                label={copy.tradingPanel.tradeListPeriod}
                value={copy.tradingPanel.periods[tradePeriod] ?? tradePeriod}
              />
              <StatRow
                label={
                  locale === "ru"
                    ? "Денежные переводы (кол-во)"
                    : "Cash transfers (count)"
                }
                value={Math.max(0, cashTransfersCount).toLocaleString("en-US")}
              />
            </StatList>
          </ReportCard>
        </div>
      </div>

      <div className="pdf-page space-y-5">
        {reportMeta}

        <div className="grid gap-5 lg:grid-cols-2">
          <ReportCard title={copy.managementPanel.title}>
            <StatList>
              <StatRow
                label={copy.managementPanel.portfolioValue}
                value={formatUSD(portfolioValueUSD)}
              />
              <StatRow
                label={copy.managementPanel.blendedTitle}
                value={formatOnOff(locale, tieringEnabled)}
              />
            </StatList>

            <div className="mt-4">
              <div className="text-muted-foreground text-xs">
                {locale === "ru" ? "Выбранные сервисы" : "Selected services"}
              </div>
              <div className="mt-2 divide-border/30 overflow-hidden rounded-xl border border-border/30 divide-y">
                {managementRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between gap-6 px-4 py-3"
                  >
                    <div className="text-xs leading-relaxed">{row.label}</div>
                    <div className="w-44 shrink-0 text-right">
                      <div className="font-mono tabular-nums text-xs">
                        {formatUSD(row.included ? row.perQuarterUSD : 0)}
                      </div>
                      <div className="text-muted-foreground text-[10px]">
                        {row.included
                          ? locale === "ru"
                            ? "Включено"
                            : "Included"
                          : locale === "ru"
                            ? "Исключено"
                            : "Excluded"}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-secondary/25">
                  <StatRow
                    label={copy.managementPanel.quarterlyRecurring}
                    value={formatUSD(quarterlyRecurringUSD)}
                    strong
                  />
                </div>
                <div className="bg-secondary/15">
                  <StatRow
                    label={copy.managementPanel.annualisedRecurring}
                    value={formatUSD(annualRecurringUSD)}
                    strong
                  />
                </div>
              </div>
            </div>
          </ReportCard>

          <ReportCard title={copy.operationalPanel.title}>
            <StatList>
              <StatRow
                label={copy.operationalPanel.depositsValue}
                value={formatUSD(depositValueUSD)}
              />
              <StatRow
                label={copy.operationalPanel.depositAccounts}
                value={depositCount.toLocaleString("en-US")}
              />
              <StatRow
                label={copy.operationalPanel.administrationAccounts}
                value={administrationCount.toLocaleString("en-US")}
              />
              <StatRow
                label={copy.operationalPanel.onboardingCount}
                value={onboardingCount.toLocaleString("en-US")}
              />
              <StatRow
                label={copy.operationalPanel.passThroughExpenses}
                value={formatUSD(passThroughCostUSD)}
              />
              <div className="bg-secondary/20">
                <StatRow
                  label={copy.operationalPanel.annualServiceFees}
                  value={formatUSD(annualServiceUSD)}
                  strong
                />
              </div>
              <div className="bg-secondary/15">
                <StatRow
                  label={copy.operationalPanel.oneOffAtCost}
                  value={formatUSD(oneOffServiceUSD)}
                  strong
                />
              </div>
            </StatList>
          </ReportCard>
        </div>

        <ReportCard title={copy.tradingPanel.title}>
          <div className="text-muted-foreground text-xs">
            {copy.tradingPanel.description}
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-border/30">
            <Table className="w-full border-separate border-spacing-0">
              <TableBody>
                <TableRow className="bg-secondary/20">
                  <TableCell className="border-border/30 border-b border-r px-4 py-2 text-[10px] font-medium">
                    {copy.tradingPanel.table.tradeType}
                  </TableCell>
                  <TableCell className="border-border/30 border-b border-r px-4 py-2 text-[10px] text-right font-medium w-24">
                    {copy.tradingPanel.table.trades}
                  </TableCell>
                  <TableCell className="border-border/30 border-b border-r px-4 py-2 text-[10px] text-right font-medium w-28">
                    {copy.tradingPanel.table.feePerTrade}
                  </TableCell>
                  <TableCell className="border-border/30 border-b px-4 py-2 text-[10px] text-right font-medium w-28">
                    {copy.tradingPanel.table.total}
                  </TableCell>
                </TableRow>

                {tradeLineComputations.length > 0 ? (
                  tradeLineComputations.map((row) => (
                    <TableRow key={row.line.key}>
                      <TableCell className="border-border/30 border-b border-r px-4 py-2 text-[10px] whitespace-normal">
                        {row.item
                          ? formatTradeAssetLabel(row.item.asset, locale)
                          : "—"}
                        {row.rateLabel ? (
                          <div className="text-muted-foreground mt-1 text-[10px] leading-relaxed">
                            {row.rateLabel}
                            {row.minApplied ? ` · ${copy.tradingPanel.minApplied}` : ""}
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="border-border/30 border-b border-r px-4 py-2 text-[10px] text-right font-mono tabular-nums">
                        {Math.max(0, row.count).toLocaleString("en-US")}
                      </TableCell>
                      <TableCell className="border-border/30 border-b border-r px-4 py-2 text-[10px] text-right font-mono tabular-nums">
                        {formatUSD(row.perTradeUSD)}
                      </TableCell>
                      <TableCell className="border-border/30 border-b px-4 py-2 text-[10px] text-right font-mono tabular-nums">
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
                  <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] font-medium">
                    {copy.tradingPanel.tradingTotal}
                  </TableCell>
                  <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] text-right">
                    —
                  </TableCell>
                  <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] text-right">
                    —
                  </TableCell>
                  <TableCell className="px-4 py-2 text-[10px] text-right font-mono tabular-nums font-semibold">
                    {formatUSD(tradingTotalUSD)}
                  </TableCell>
                </TableRow>
                {annualisedTradingUSD != null ? (
                  <TableRow>
                    <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] font-medium">
                      {locale === "ru" ? "Трейдинг (год)" : "Trading (annualised)"}
                    </TableCell>
                    <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] text-right">
                      —
                    </TableCell>
                    <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] text-right">
                      —
                    </TableCell>
                    <TableCell className="px-4 py-2 text-[10px] text-right font-mono tabular-nums">
                      {formatUSD(annualisedTradingUSD)}
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] font-medium">
                    {locale === "ru" ? "Переводы (итого)" : "Transfers (total)"}
                  </TableCell>
                  <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] text-right">
                    —
                  </TableCell>
                  <TableCell className="border-border/30 border-r px-4 py-2 text-[10px] text-right">
                    —
                  </TableCell>
                  <TableCell className="px-4 py-2 text-[10px] text-right font-mono tabular-nums">
                    {formatUSD(cashTransferTotalUSD)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ReportCard>
      </div>

      <div className="pdf-page space-y-4">
        {reportMeta}
        <div className="pdf-avoid-break">
          <AnnualManagementFeesTable selectedId={selectedId} onSelect={() => {}} />
        </div>
      </div>

      <div className="pdf-page space-y-4">
        {reportMeta}
        <div className="pdf-avoid-break">
          <TradingExecutionCostsTable selectedId={selectedId} onSelect={() => {}} />
        </div>
      </div>

      <div className="pdf-page space-y-4">
        {reportMeta}
        <div className="pdf-avoid-break">
          <OperationalServiceFeesTable selectedId={selectedId} onSelect={() => {}} />
        </div>
      </div>
    </div>
  )
}
