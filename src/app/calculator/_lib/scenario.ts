import type { TradeLine } from "@/app/calculator/_types"

export type TradePeriod = "one-time" | "monthly" | "quarterly" | "annual"

export function makeKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`
}

export function parseNumberInput(value: string) {
  const parsed = Number.parseFloat(value.replaceAll(",", "").replaceAll(" ", ""))
  if (!Number.isFinite(parsed)) return 0
  return parsed
}

export function parseIntegerInput(value: string) {
  const parsed = Number.parseInt(value.replaceAll(",", "").replaceAll(" ", ""), 10)
  if (!Number.isFinite(parsed)) return 0
  return Math.max(0, parsed)
}

export function periodMultiplier(period: TradePeriod) {
  switch (period) {
    case "monthly":
      return 12
    case "quarterly":
      return 4
    case "annual":
      return 1
    case "one-time":
    default:
      return null
  }
}

export function defaultTradeLine(
  itemId: string,
  options?: { contractType?: TradeLine["contractType"] }
): TradeLine {
  return {
    key: makeKey(),
    itemId,
    amountInput: "200000",
    countInput: "1",
    contractType: options?.contractType ?? "options",
    contractsInput: "1",
    rateOverrideInput: "",
  }
}
