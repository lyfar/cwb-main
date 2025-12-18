import type { Metadata } from "next"

import { CalculatorClient } from "@/app/calculator/calculator-client"

export const metadata: Metadata = {
  title: "Калькулятор | CWB Hong Kong",
  description: "Внутренний калькулятор комиссий.",
  robots: { index: false, follow: false },
}

export default function RuCalculatorPage() {
  return <CalculatorClient />
}
