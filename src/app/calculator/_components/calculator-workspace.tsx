"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  computeFee,
  feeSchedule,
  type FeeScheduleItem,
  type TieringMode,
} from "@/lib/fee-schedule"
import {
  AnnualManagementFeesTable,
  OperationalServiceFeesTable,
  TradingExecutionCostsTable,
} from "@/app/calculator/_components/fee-tables"
import { CalculatorPdfReport } from "@/app/calculator/_components/calculator-pdf-report"
import { ManagementFeesPanel } from "@/app/calculator/_components/management-fees-panel"
import {
  TradingExecutionPanel,
  type TradeLineComputation,
} from "@/app/calculator/_components/trading-execution-panel"
import { OperationalServicePanel } from "@/app/calculator/_components/operational-service-panel"
import { ScenarioSummaryPanel } from "@/app/calculator/_components/scenario-summary-panel"
import {
  defaultTradeLine,
  parseIntegerInput,
  parseNumberInput,
  periodMultiplier,
  type TradePeriod,
} from "@/app/calculator/_lib/scenario"
import { getManagementServiceLabel } from "@/app/calculator/_lib/fee-sections"
import type { SelectPayload, TradeLine } from "@/app/calculator/_types"
import { getLocaleFromPathname } from "@/lib/locale"

const MANAGEMENT_IDS = [
  "discretionary-mandate",
  "custodian",
  "advisory",
] as const

export type CalculatorWorkspaceHandle = {
  exportPdf: () => void
}

function findItem(id: string) {
  return feeSchedule.find((item) => item.id === id)
}

function isBrokerageItem(item: FeeScheduleItem | undefined | null) {
  return Boolean(item && item.operation === "Brokerage fees")
}

function ensureBrokerageId(id: string) {
  const item = findItem(id)
  return isBrokerageItem(item) ? id : undefined
}

function computeMoney(
  itemId: string,
  inputs: Parameters<typeof computeFee>[1],
  options?: Parameters<typeof computeFee>[2]
) {
  const item = findItem(itemId)
  if (!item) return null
  const result = computeFee(item, inputs, options)
  if (result.kind === "note") return null
  return result
}

function getBrokerageItems() {
  return feeSchedule.filter((item) => item.operation === "Brokerage fees")
}

export function CalculatorWorkspace() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const brokerageItems = React.useMemo(() => getBrokerageItems(), [])
  const [selectedId, setSelectedId] = React.useState(feeSchedule[0]?.id ?? "")

  const [portfolioValueInput, setPortfolioValueInput] = React.useState(
    "10,000,000"
  )
  const [tieringMode, setTieringMode] = React.useState<TieringMode>("bracket")
  const [includeMandate, setIncludeMandate] = React.useState(true)
  const [includeCustodian, setIncludeCustodian] = React.useState(true)
  const [includeAdvisory, setIncludeAdvisory] = React.useState(false)

  const [tradePeriod, setTradePeriod] = React.useState<TradePeriod>("quarterly")
  const [tradeLines, setTradeLines] = React.useState<TradeLine[]>(() => {
    const defaultId = brokerageItems[0]?.id ?? ""
    return defaultId ? [defaultTradeLine(defaultId)] : []
  })

  const [depositValueInput, setDepositValueInput] = React.useState("0")
  const [depositCountInput, setDepositCountInput] = React.useState("1")
  const [administrationCountInput, setAdministrationCountInput] = React.useState("1")
  const [onboardingCountInput, setOnboardingCountInput] = React.useState("0")
  const [cashTransfersCountInput, setCashTransfersCountInput] = React.useState("0")
  const [passThroughCostInput, setPassThroughCostInput] = React.useState("0")

  function handleSelect(payload: SelectPayload) {
    setSelectedId(payload.id)
    const brokerageId = ensureBrokerageId(payload.id)
    if (!brokerageId) return

    setTradeLines((prev) => {
      if (prev.length === 0) {
        return [defaultTradeLine(brokerageId, { contractType: payload.contractType })]
      }

      const lastIndex = prev.length - 1
      return prev.map((line, index) => {
        if (index !== lastIndex) return line
        return {
          ...line,
          itemId: brokerageId,
          contractType: payload.contractType ?? line.contractType,
        }
      })
    })
  }

  function addTradeLine() {
    const nextId = brokerageItems[0]?.id
    if (!nextId) return
    setTradeLines((prev) => [...prev, defaultTradeLine(nextId)])
  }

  function removeTradeLine(key: string) {
    setTradeLines((prev) => prev.filter((row) => row.key !== key))
  }

  function updateTradeLine(key: string, updater: (line: TradeLine) => TradeLine) {
    setTradeLines((prev) => prev.map((row) => (row.key === key ? updater(row) : row)))
  }

  const portfolioValueUSD = parseNumberInput(portfolioValueInput)

  const managementFeeById = React.useMemo(() => {
    const result: Record<(typeof MANAGEMENT_IDS)[number], number> = {
      "discretionary-mandate": 0,
      custodian: 0,
      advisory: 0,
    }

    for (const id of MANAGEMENT_IDS) {
      const money = computeMoney(id, { amountUSD: portfolioValueUSD, tieringMode })
      result[id] = money?.perInvoiceUSD ?? 0
    }

    return result
  }, [portfolioValueUSD, tieringMode])

  const managementRows = React.useMemo(
    () => [
      {
        id: "discretionary-mandate" as const,
        label: getManagementServiceLabel("discretionary-mandate", locale),
        included: includeMandate,
        setIncluded: setIncludeMandate,
        perQuarterUSD: managementFeeById["discretionary-mandate"],
      },
      {
        id: "custodian" as const,
        label: getManagementServiceLabel("custodian", locale),
        included: includeCustodian,
        setIncluded: setIncludeCustodian,
        perQuarterUSD: managementFeeById.custodian,
      },
      {
        id: "advisory" as const,
        label: getManagementServiceLabel("advisory", locale),
        included: includeAdvisory,
        setIncluded: setIncludeAdvisory,
        perQuarterUSD: managementFeeById.advisory,
      },
    ],
    [
      includeAdvisory,
      includeCustodian,
      includeMandate,
      locale,
      managementFeeById,
      setIncludeAdvisory,
      setIncludeCustodian,
      setIncludeMandate,
    ]
  )

  const quarterlyRecurringUSD =
    (includeMandate ? managementFeeById["discretionary-mandate"] : 0) +
    (includeCustodian ? managementFeeById.custodian : 0) +
    (includeAdvisory ? managementFeeById.advisory : 0)

  const annualRecurringUSD = quarterlyRecurringUSD * 4

  const depositValueUSD = parseNumberInput(depositValueInput)
  const depositCount = parseIntegerInput(depositCountInput)
  const administrationCount = parseIntegerInput(administrationCountInput)
  const onboardingCount = parseIntegerInput(onboardingCountInput)
  const cashTransfersCount = parseIntegerInput(cashTransfersCountInput)
  const passThroughCostUSD = parseNumberInput(passThroughCostInput)

  const depositFee = computeMoney("fiduciary-deposits", { amountUSD: depositValueUSD })
  const administrationFee = computeMoney("administration", {})
  const onboardingFee = computeMoney("complex-onboarding", {})
  const cashTransferFee = computeMoney("cash-transfer", {})

  const annualServiceUSD =
    (depositFee?.perInvoiceUSD ?? 0) * depositCount +
    (administrationFee?.perInvoiceUSD ?? 0) * administrationCount

  const cashTransferTotalUSD = (cashTransferFee?.perInvoiceUSD ?? 0) * cashTransfersCount

  const oneOffServiceUSD =
    (onboardingFee?.perInvoiceUSD ?? 0) * onboardingCount +
    (Number.isFinite(passThroughCostUSD) ? passThroughCostUSD : 0)

  const tradeLineComputations: TradeLineComputation[] = React.useMemo(() => {
    return tradeLines.map((line) => {
      const item = findItem(line.itemId)
      const count = parseIntegerInput(line.countInput)
      if (!item) {
        return {
          line,
          item: null,
          count,
          perTradeUSD: 0,
          totalUSD: 0,
          minApplied: false,
          isRange: false,
          isContract: false,
        }
      }

      const isContract = item.formula.kind === "per_contract"
      const isRange = item.formula.kind === "percent_range"

      if (isContract) {
        const contractsPerTrade = parseNumberInput(line.contractsInput)
        const result = computeFee(item, {
          contracts: contractsPerTrade,
          contractType: line.contractType,
        }, { locale })
        const perTradeUSD = result.kind === "money" ? result.perInvoiceUSD : 0
        return {
          line,
          item,
          count,
          perTradeUSD,
          totalUSD: perTradeUSD * count,
          rateLabel: result.kind === "money" ? result.rateLabel : undefined,
          minApplied: result.kind === "money" ? result.minApplied : false,
          isRange,
          isContract,
        }
      }

      const amountUSD = parseNumberInput(line.amountInput)
      const overrideRate =
        isRange && line.rateOverrideInput.trim().length > 0
          ? parseNumberInput(line.rateOverrideInput) / 100
          : undefined

      const result = computeFee(item, {
        amountUSD,
        tieringMode: "bracket",
        rateOverride: overrideRate,
      }, { locale })
      const perTradeUSD = result.kind === "money" ? result.perInvoiceUSD : 0

      return {
        line,
        item,
        count,
        perTradeUSD,
        totalUSD: perTradeUSD * count,
        rateLabel: result.kind === "money" ? result.rateLabel : undefined,
        minApplied: result.kind === "money" ? result.minApplied : false,
        isRange,
        isContract,
      }
    })
  }, [locale, tradeLines])

  const tradingTotalUSD = tradeLineComputations.reduce(
    (total, row) => total + row.totalUSD,
    0
  )

  const transactionalTotalUSD = tradingTotalUSD + cashTransferTotalUSD

  const multiplier = periodMultiplier(tradePeriod)
  const annualisedTradingUSD = multiplier == null ? null : tradingTotalUSD * multiplier
  const annualisedTransactionUSD =
    annualisedTradingUSD == null ? null : annualisedTradingUSD + cashTransferTotalUSD

  return (
    <>
      <div data-calculator-app className="space-y-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <AnnualManagementFeesTable
            selectedId={selectedId}
            onSelect={handleSelect}
          />
          <ManagementFeesPanel
            portfolioValueInput={portfolioValueInput}
            setPortfolioValueInput={setPortfolioValueInput}
            tieringMode={tieringMode}
            setTieringMode={setTieringMode}
            rows={managementRows}
            quarterlyRecurringUSD={quarterlyRecurringUSD}
            annualRecurringUSD={annualRecurringUSD}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <TradingExecutionCostsTable
            selectedId={selectedId}
            onSelect={handleSelect}
          />
          <TradingExecutionPanel
            brokerageItems={brokerageItems}
            tradeLines={tradeLines}
            computations={tradeLineComputations}
            tradingTotalUSD={tradingTotalUSD}
            tradePeriod={tradePeriod}
            setTradePeriod={setTradePeriod}
            addTradeLine={addTradeLine}
            removeTradeLine={removeTradeLine}
            updateTradeLine={updateTradeLine}
            onSelect={handleSelect}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <OperationalServiceFeesTable
            selectedId={selectedId}
            onSelect={handleSelect}
          />
          <div className="space-y-8">
            <OperationalServicePanel
              depositValueInput={depositValueInput}
              setDepositValueInput={setDepositValueInput}
              depositCountInput={depositCountInput}
              setDepositCountInput={setDepositCountInput}
              administrationCountInput={administrationCountInput}
              setAdministrationCountInput={setAdministrationCountInput}
              onboardingCountInput={onboardingCountInput}
              setOnboardingCountInput={setOnboardingCountInput}
              cashTransfersCountInput={cashTransfersCountInput}
              setCashTransfersCountInput={setCashTransfersCountInput}
              passThroughCostInput={passThroughCostInput}
              setPassThroughCostInput={setPassThroughCostInput}
              annualServiceUSD={annualServiceUSD}
              oneOffServiceUSD={oneOffServiceUSD}
            />
            <ScenarioSummaryPanel
              quarterlyRecurringUSD={quarterlyRecurringUSD}
              annualRecurringUSD={annualRecurringUSD}
              annualServiceUSD={annualServiceUSD}
              transactionalTotalUSD={transactionalTotalUSD}
              annualisedTransactionUSD={annualisedTransactionUSD}
              oneOffServiceUSD={oneOffServiceUSD}
              tradePeriod={tradePeriod}
            />
          </div>
        </div>
      </div>

      <div data-calculator-report>
        <CalculatorPdfReport
          locale={locale}
          generatedAt={new Date()}
          selectedId={selectedId}
          tieringMode={tieringMode}
          portfolioValueUSD={portfolioValueUSD}
          managementRows={managementRows}
          quarterlyRecurringUSD={quarterlyRecurringUSD}
          annualRecurringUSD={annualRecurringUSD}
          tradePeriod={tradePeriod}
          tradeLineComputations={tradeLineComputations}
          tradingTotalUSD={tradingTotalUSD}
          annualisedTradingUSD={annualisedTradingUSD}
          cashTransfersCount={cashTransfersCount}
          cashTransferTotalUSD={cashTransferTotalUSD}
          depositValueUSD={depositValueUSD}
          depositCount={depositCount}
          administrationCount={administrationCount}
          onboardingCount={onboardingCount}
          passThroughCostUSD={Number.isFinite(passThroughCostUSD) ? passThroughCostUSD : 0}
          annualServiceUSD={annualServiceUSD}
          oneOffServiceUSD={oneOffServiceUSD}
          transactionalTotalUSD={transactionalTotalUSD}
          annualisedTransactionUSD={annualisedTransactionUSD}
        />
      </div>
    </>
  )
}

export const CalculatorWorkspaceWithRef = React.forwardRef<CalculatorWorkspaceHandle, {}>(
  function CalculatorWorkspaceWithRef(_props, ref) {
    const pathname = usePathname()
    const locale = getLocaleFromPathname(pathname)

    React.useImperativeHandle(
      ref,
      () => ({
        exportPdf() {
          const previousTitle = document.title
          const dateStamp = new Date().toISOString().slice(0, 10)
          document.title =
            locale === "ru"
              ? `CWB — Оценка комиссий — ${dateStamp}`
              : `CWB — Fee estimate — ${dateStamp}`

          window.scrollTo(0, 0)
          window.print()
          document.title = previousTitle
        },
      }),
      [locale]
    )

    return <CalculatorWorkspace />
  }
)
