import type { Metadata } from "next"

import { CalculatorClient } from "@/app/calculator/calculator-client"

export const metadata: Metadata = {
  title: "Calculator | CWB Hong Kong",
  description: "Internal fee calculator.",
  robots: { index: false, follow: false },
}

export default function CalculatorPage() {
  return <CalculatorClient />
}

