const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 0,
})

export function formatCompactNumber(value: number) {
  return compactNumberFormatter.format(value)
}

export function formatUSD(value: number) {
  const safe = Number.isFinite(value) ? value : 0
  return `USD ${Math.round(safe).toLocaleString("en-US")}`
}

export function formatPercent(rate: number) {
  const safe = Number.isFinite(rate) ? rate : 0
  return `${(safe * 100).toFixed(2)}%`
}

