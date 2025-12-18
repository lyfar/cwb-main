import type { Metadata } from "next"

import ComponentsPage from "@/app/components/page"

export const metadata: Metadata = {
  title: "Components | CWB Hong Kong",
  description: "Internal component gallery.",
  robots: { index: false, follow: false },
}

export default function RuComponentsPage() {
  return <ComponentsPage />
}

