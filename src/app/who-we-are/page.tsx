import { Metadata } from "next"

import { WhoWeAreSplit } from "@/app/who-we-are/_components/who-we-are-split"

export const metadata: Metadata = {
  title: "Who we are | CWB Hong Kong",
  description:
    "CWB Hong Kong is an independent licensed custodian and investment management firm regulated by the SFC (CE code AFQ783).",
}

export default function WhoWeArePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <WhoWeAreSplit locale="en" />
    </main>
  )
}
