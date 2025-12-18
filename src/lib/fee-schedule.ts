export type FeeFrequency =
  | "Quarterly"
  | "Annual"
  | "Per transaction"
  | "Flat fee"
  | "As incurred"

export type TieringMode = "bracket" | "progressive"

export type Tier = {
  upToUSD: number | null
  rate: number
}

export type FeeFormula =
  | {
      kind: "tiered_percent"
      basis: "per_annum" | "per_transaction"
      tiers: Tier[]
    }
  | {
      kind: "percent"
      basis: "per_annum" | "per_transaction"
      rate: number
    }
  | {
      kind: "percent_range"
      basis: "per_annum" | "per_transaction"
      minRate: number
      maxRate: number
    }
  | {
      kind: "per_contract"
      optionUSD: number
      futureUSD: number
    }
  | {
      kind: "flat_usd"
      amountUSD: number
    }
  | {
      kind: "pass_through"
      note: string
    }

export type FeeScheduleItem = {
  id: string
  operation: string
  asset: string
  frequency: FeeFrequency
  minFeeUSD?: number
  formula: FeeFormula
}

export const feeSchedule: FeeScheduleItem[] = [
  {
    id: "discretionary-mandate",
    operation: "Discretionary mandate fees (per annum)",
    asset: "All",
    frequency: "Quarterly",
    minFeeUSD: 5_000,
    formula: {
      kind: "tiered_percent",
      basis: "per_annum",
      tiers: [
        { upToUSD: 10_000_000, rate: 0.01 },
        { upToUSD: 25_000_000, rate: 0.0085 },
        { upToUSD: 50_000_000, rate: 0.0065 },
        { upToUSD: null, rate: 0.005 },
      ],
    },
  },
  {
    id: "custodian",
    operation: "Custodian fees",
    asset: "All",
    frequency: "Quarterly",
    minFeeUSD: 10_000,
    formula: {
      kind: "tiered_percent",
      basis: "per_annum",
      tiers: [
        { upToUSD: 10_000_000, rate: 0.005 },
        { upToUSD: 25_000_000, rate: 0.0065 },
        { upToUSD: 50_000_000, rate: 0.004 },
        { upToUSD: null, rate: 0.0025 },
      ],
    },
  },
  {
    id: "advisory",
    operation: "Advisory fees",
    asset: "All",
    frequency: "Quarterly",
    minFeeUSD: 10_000,
    formula: {
      kind: "tiered_percent",
      basis: "per_annum",
      tiers: [
        { upToUSD: 10_000_000, rate: 0.015 },
        { upToUSD: 25_000_000, rate: 0.01 },
        { upToUSD: 50_000_000, rate: 0.008 },
        { upToUSD: null, rate: 0.006 },
      ],
    },
  },
  {
    id: "brokerage-equities-us-eu",
    operation: "Brokerage fees",
    asset: "Equities & ETFs — US / EU equities",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: {
      kind: "tiered_percent",
      basis: "per_transaction",
      tiers: [
        { upToUSD: 200_000, rate: 0.0035 },
        { upToUSD: null, rate: 0.003 },
      ],
    },
  },
  {
    id: "brokerage-equities-hk",
    operation: "Brokerage fees",
    asset: "Equities & ETFs — HK equities",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: {
      kind: "tiered_percent",
      basis: "per_transaction",
      tiers: [
        { upToUSD: 200_000, rate: 0.0045 },
        { upToUSD: null, rate: 0.004 },
      ],
    },
  },
  {
    id: "brokerage-equities-my-jp-tw",
    operation: "Brokerage fees",
    asset: "Equities & ETFs — Malaysia / Japan / Taiwan equities",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: {
      kind: "tiered_percent",
      basis: "per_transaction",
      tiers: [
        { upToUSD: 200_000, rate: 0.0055 },
        { upToUSD: null, rate: 0.005 },
      ],
    },
  },
  {
    id: "brokerage-equities-china-stock-connect",
    operation: "Brokerage fees",
    asset: "Equities & ETFs — China Stock Connect",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: {
      kind: "tiered_percent",
      basis: "per_transaction",
      tiers: [
        { upToUSD: 200_000, rate: 0.0035 },
        { upToUSD: null, rate: 0.003 },
      ],
    },
  },
  {
    id: "brokerage-bonds-us-treasuries",
    operation: "Brokerage fees",
    asset: "Bonds / Fixed income — US treasuries",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: { kind: "percent", basis: "per_transaction", rate: 0.002 },
  },
  {
    id: "brokerage-bonds-other",
    operation: "Brokerage fees",
    asset: "Bonds / Fixed income — Other bonds",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: { kind: "percent", basis: "per_transaction", rate: 0.0025 },
  },
  {
    id: "brokerage-mutual-funds",
    operation: "Brokerage fees",
    asset: "Mutual funds",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: { kind: "percent", basis: "per_transaction", rate: 0.01 },
  },
  {
    id: "brokerage-money-market-funds",
    operation: "Brokerage fees",
    asset: "Money market funds",
    frequency: "Per transaction",
    minFeeUSD: 250,
    formula: { kind: "percent", basis: "per_transaction", rate: 0.003 },
  },
  {
    id: "brokerage-alternative-funds",
    operation: "Brokerage fees",
    asset: "Alternative funds",
    frequency: "Per transaction",
    minFeeUSD: 500,
    formula: {
      kind: "percent_range",
      basis: "per_transaction",
      minRate: 0.01,
      maxRate: 0.02,
    },
  },
  {
    id: "brokerage-options-futures",
    operation: "Brokerage fees",
    asset: "Options & futures",
    frequency: "Per transaction",
    minFeeUSD: 500,
    formula: { kind: "per_contract", optionUSD: 50, futureUSD: 40 },
  },
  {
    id: "brokerage-structured-products",
    operation: "Brokerage fees",
    asset: "Structured products, certificates & other derivatives",
    frequency: "Per transaction",
    minFeeUSD: 500,
    formula: { kind: "percent", basis: "per_transaction", rate: 0.01 },
  },
  {
    id: "brokerage-foreign-exchange",
    operation: "Brokerage fees",
    asset: "Foreign exchange",
    frequency: "Per transaction",
    formula: { kind: "percent", basis: "per_transaction", rate: 0.0025 },
  },
  {
    id: "fiduciary-deposits",
    operation: "Fiduciary placement",
    asset: "Deposits",
    frequency: "Annual",
    minFeeUSD: 200,
    formula: { kind: "percent", basis: "per_annum", rate: 0.0025 },
  },
  {
    id: "complex-onboarding",
    operation: "Complex onboarding fee",
    asset: "Flat fee",
    frequency: "Flat fee",
    formula: { kind: "flat_usd", amountUSD: 10_000 },
  },
  {
    id: "administration",
    operation: "Administration fee",
    asset: "Annual",
    frequency: "Annual",
    formula: { kind: "flat_usd", amountUSD: 2_000 },
  },
  {
    id: "cash-transfer",
    operation: "Cash transfer",
    asset: "Cash (Client money)",
    frequency: "Per transaction",
    formula: { kind: "flat_usd", amountUSD: 50 },
  },
  {
    id: "expenses-pass-through",
    operation: "Expenses / third-party & governmental fees",
    asset: "Pass-through",
    frequency: "As incurred",
    formula: { kind: "pass_through", note: "Pass through at cost." },
  },
] as const

export type FeeInputs = {
  amountUSD?: number
  tieringMode?: TieringMode
  contracts?: number
  contractType?: "options" | "futures"
  rateOverride?: number
}

export type FeeBreakdownLine = {
  label: string
  baseUSD: number
  rate?: number
  feeUSD: number
}

export type FeeComputation =
  | {
      kind: "money"
      frequency: FeeFrequency
      perInvoiceUSD: number
      annualizedUSD?: number
      minApplied: boolean
      rateLabel?: string
      effectiveRate?: number
      breakdown?: FeeBreakdownLine[]
    }
  | {
      kind: "note"
      frequency: FeeFrequency
      note: string
    }

function clampNonNegative(value: number) {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, value)
}

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100
}

function invoicesPerYear(frequency: FeeFrequency) {
  switch (frequency) {
    case "Quarterly":
      return 4
    case "Annual":
      return 1
    default:
      return null
  }
}

function computeTieredPercentFee(
  amountUSD: number,
  tiers: Tier[],
  mode: TieringMode
): { feeUSD: number; rateLabel: string; breakdown?: FeeBreakdownLine[] } {
  if (tiers.length === 0) {
    return { feeUSD: 0, rateLabel: "—" }
  }

  if (mode === "progressive") {
    const breakdown: FeeBreakdownLine[] = []
    let remaining = amountUSD
    let previousCap = 0
    let total = 0

    for (const tier of tiers) {
      if (remaining <= 0) break

      const cap = tier.upToUSD ?? Number.POSITIVE_INFINITY
      const tierSpan = Math.max(0, cap - previousCap)
      const tierBase = Math.min(remaining, tierSpan)
      const tierFee = tierBase * tier.rate

      breakdown.push({
        label:
          tier.upToUSD == null
            ? `Above USD ${previousCap.toLocaleString()}`
            : `USD ${previousCap.toLocaleString()}–${tier.upToUSD.toLocaleString()}`,
        baseUSD: tierBase,
        rate: tier.rate,
        feeUSD: tierFee,
      })

      total += tierFee
      remaining -= tierBase
      previousCap = cap
    }

    const maxRate = tiers.find((tier) => tier.upToUSD == null)?.rate ?? tiers[tiers.length - 1].rate
    return {
      feeUSD: total,
      rateLabel: `Blended (max tier ${formatPercent(maxRate)})`,
      breakdown,
    }
  }

  const selectedIndex = Math.max(
    0,
    tiers.findIndex((tier) => tier.upToUSD == null || amountUSD <= tier.upToUSD)
  )
  const selectedTier = tiers[selectedIndex] ?? tiers[tiers.length - 1]
  const rate = selectedTier.rate
  const previousCap = selectedIndex > 0 ? tiers[selectedIndex - 1]?.upToUSD ?? 0 : 0
  const label =
    selectedTier.upToUSD == null
      ? `Above USD ${formatUSD(previousCap)}`
      : previousCap > 0
        ? `USD ${formatUSD(previousCap)}–${formatUSD(selectedTier.upToUSD)}`
        : `Up to USD ${formatUSD(selectedTier.upToUSD)}`

  return {
    feeUSD: amountUSD * rate,
    rateLabel: `${formatPercent(rate)} (${label})`,
  }
}

function formatUSD(value: number) {
  return Math.round(value).toLocaleString()
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`
}

export function computeFee(
  item: FeeScheduleItem,
  inputs: FeeInputs
): FeeComputation {
  const tieringMode = inputs.tieringMode ?? "bracket"

  if (item.formula.kind === "pass_through") {
    return { kind: "note", frequency: item.frequency, note: item.formula.note }
  }

  let perInvoiceUSD = 0
  let annualizedUSD: number | undefined
  let rateLabel: string | undefined
  let breakdown: FeeBreakdownLine[] | undefined
  let effectiveRate: number | undefined
  let basisAmountUSD: number | undefined

  if (item.formula.kind === "flat_usd") {
    perInvoiceUSD = item.formula.amountUSD
  } else if (item.formula.kind === "per_contract") {
    const contracts = clampNonNegative(inputs.contracts ?? 0)
    const contractType = inputs.contractType ?? "options"
    const perContractUSD =
      contractType === "futures"
        ? item.formula.futureUSD
        : item.formula.optionUSD
    perInvoiceUSD = contracts * perContractUSD
    rateLabel = `USD ${formatUSD(perContractUSD)} / contract (${contractType})`
  } else {
    const amountUSD = clampNonNegative(inputs.amountUSD ?? 0)
    basisAmountUSD = amountUSD

    if (item.formula.kind === "tiered_percent") {
      const computed = computeTieredPercentFee(
        amountUSD,
        item.formula.tiers,
        tieringMode
      )
      rateLabel = computed.rateLabel
      breakdown = computed.breakdown

      if (item.formula.basis === "per_annum") {
        const annualFee = computed.feeUSD
        const perYear = invoicesPerYear(item.frequency)
        if (perYear != null) {
          perInvoiceUSD = annualFee / perYear
          annualizedUSD = annualFee
        } else {
          perInvoiceUSD = annualFee
        }
      } else {
        perInvoiceUSD = computed.feeUSD
      }
    } else if (item.formula.kind === "percent") {
      rateLabel = formatPercent(item.formula.rate)
      const rawFee = amountUSD * item.formula.rate
      if (item.formula.basis === "per_annum") {
        const perYear = invoicesPerYear(item.frequency)
        if (perYear != null) {
          perInvoiceUSD = rawFee / perYear
          annualizedUSD = rawFee
        } else {
          perInvoiceUSD = rawFee
        }
      } else {
        perInvoiceUSD = rawFee
      }
    } else if (item.formula.kind === "percent_range") {
      const overrideRate =
        inputs.rateOverride != null && Number.isFinite(inputs.rateOverride)
          ? inputs.rateOverride
          : undefined
      const clampedRate =
        overrideRate == null
          ? item.formula.maxRate
          : Math.min(
              item.formula.maxRate,
              Math.max(item.formula.minRate, overrideRate)
            )
      rateLabel = `${formatPercent(item.formula.minRate)}–${formatPercent(item.formula.maxRate)} (using ${formatPercent(clampedRate)})`
      const rawFee = amountUSD * clampedRate
      if (item.formula.basis === "per_annum") {
        const perYear = invoicesPerYear(item.frequency)
        if (perYear != null) {
          perInvoiceUSD = rawFee / perYear
          annualizedUSD = rawFee
        } else {
          perInvoiceUSD = rawFee
        }
      } else {
        perInvoiceUSD = rawFee
      }
    }

    effectiveRate = amountUSD > 0 ? perInvoiceUSD / amountUSD : undefined
  }

  perInvoiceUSD = roundCurrency(perInvoiceUSD)

  const minFeeUSD = item.minFeeUSD
  let minApplied = false
  if (minFeeUSD != null && minFeeUSD > 0 && perInvoiceUSD > 0 && perInvoiceUSD < minFeeUSD) {
    perInvoiceUSD = minFeeUSD
    minApplied = true
    perInvoiceUSD = roundCurrency(perInvoiceUSD)
  }

  if (basisAmountUSD != null && basisAmountUSD > 0) {
    effectiveRate = perInvoiceUSD / basisAmountUSD
  }

  const perYear = invoicesPerYear(item.frequency)
  if (perYear != null) {
    annualizedUSD = roundCurrency(perInvoiceUSD * perYear)
  }

  return {
    kind: "money",
    frequency: item.frequency,
    perInvoiceUSD,
    annualizedUSD,
    minApplied,
    rateLabel,
    effectiveRate,
    breakdown,
  }
}
