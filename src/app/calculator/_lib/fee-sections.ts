import { feeSchedule, type FeeScheduleItem } from "@/lib/fee-schedule"

export type FeeSectionId =
  | "annual-management"
  | "trading-execution"
  | "operational-service"

const managementItemOrder = [
  "discretionary-mandate",
  "custodian",
  "advisory",
] as const

const managementLabelById: Record<string, string> = {
  "discretionary-mandate": "Discretionary mandate",
  custodian: "Custodian fees",
  advisory: "Advisory fees",
}

export const feeSections: Array<{
  id: FeeSectionId
  label: string
  title: string
  description: string
}> = [
  {
    id: "annual-management",
    label: "Annual management fees",
    title: "Annual management fees",
    description:
      "Recurring oversight, custody, and advisory fees for your portfolio. Rates are tiered by total assets under management and billed quarterly.",
  },
  {
    id: "trading-execution",
    label: "Trading & execution costs",
    title: "Trading & execution costs",
    description:
      "Transactional fees applied when buying or selling securities. Rates vary by market, asset class, and trade value tier.",
  },
  {
    id: "operational-service",
    label: "Operational & service fees",
    title: "Operational & service fees",
    description:
      "Fixed and administrative costs for account onboarding, maintenance, transfers, and pass-through third-party charges.",
  },
]

export function getFeeSectionId(item: FeeScheduleItem): FeeSectionId {
  if (managementItemOrder.includes(item.id as (typeof managementItemOrder)[number])) {
    return "annual-management"
  }
  if (item.operation === "Brokerage fees") {
    return "trading-execution"
  }
  return "operational-service"
}

export function getFeeItemsForSection(sectionId: FeeSectionId) {
  if (sectionId === "annual-management") {
    return managementItemOrder
      .map((id) => feeSchedule.find((item) => item.id === id))
      .filter(Boolean) as FeeScheduleItem[]
  }

  if (sectionId === "trading-execution") {
    return feeSchedule.filter(
      (item) => getFeeSectionId(item) === "trading-execution"
    )
  }

  return feeSchedule.filter(
    (item) => getFeeSectionId(item) === "operational-service"
  )
}

export function getFeeItemDisplayLabel(item: FeeScheduleItem) {
  const section = getFeeSectionId(item)
  if (section === "annual-management") {
    return managementLabelById[item.id] ?? item.operation
  }

  if (section === "trading-execution") {
    return item.asset.replace("—", "·")
  }

  switch (item.id) {
    case "fiduciary-deposits":
      return "Fiduciary placement · Deposits"
    case "complex-onboarding":
      return "Onboarding · Complex onboarding fee"
    case "administration":
      return "Administration · Annual administration fee"
    case "cash-transfer":
      return "Transfers · Cash transfer"
    case "expenses-pass-through":
      return "Pass-through · Third-party & governmental fees"
    default:
      return item.operation
  }
}

export function getManagementServiceLabel(itemId: string) {
  return managementLabelById[itemId] ?? itemId
}
