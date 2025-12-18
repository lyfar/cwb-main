export type SelectPayload = { id: string; contractType?: "options" | "futures" }

export type TradeLine = {
  key: string
  itemId: string
  amountInput: string
  countInput: string
  contractType: "options" | "futures"
  contractsInput: string
  rateOverrideInput: string
}

