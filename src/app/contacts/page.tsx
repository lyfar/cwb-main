import { Metadata } from "next"

import { ContactSplitCta } from "@/app/contacts/_components/contact-split-cta"

export const metadata: Metadata = {
  title: "Contacts | CWB Hong Kong",
  description:
    "Get in touch with CWB Hong Kong for a confidential consultation and account operations support.",
}

export default function ContactsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <ContactSplitCta locale="en" />
    </main>
  )
}
