import type { Metadata } from "next"
import { ContactSplitCta } from "@/app/contacts/_components/contact-split-cta"

export const metadata: Metadata = {
  title: "Контакты | CWB Hong Kong",
  description:
    "Свяжитесь с CWB Hong Kong для конфиденциальной консультации и поддержки по операциям.",
}

export default function RuContactsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <ContactSplitCta locale="ru" />
    </main>
  )
}
