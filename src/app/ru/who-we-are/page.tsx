import type { Metadata } from "next"

import { WhoWeAreSplit } from "@/app/who-we-are/_components/who-we-are-split"

export const metadata: Metadata = {
  title: "Кто мы | CWB Hong Kong",
  description:
    "CWB Hong Kong — независимая лицензированная кастодианская и управляющая компания, регулируемая SFC (код CE AFQ783).",
}

export default function RuWhoWeArePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <WhoWeAreSplit locale="ru" />
    </main>
  )
}
