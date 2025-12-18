import type { Metadata } from "next"
import { Bank, CurrencyCircleDollar, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr"

import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Банковские услуги | CWB Hong Kong",
  description:
    "Платежи и мультивалютные операции, связанные с клиентским счётом.",
}

export default function RuBankingServicesPage() {
  return (
    <WhatWeDoShell
      badge="Что мы делаем"
      title="Банковские услуги"
      description="Платежи и мультивалютные операции, связанные с клиентским счётом — с фокусом на прозрачность и контроль."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <PaperPlaneTilt className="text-primary size-6" />
            <CardTitle className="text-base">Платежи</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Платежные сервисы для личных, бизнес- или корпоративных целей в
            основных валютах.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <CurrencyCircleDollar className="text-primary size-6" />
            <CardTitle className="text-base">Мультивалютные операции</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Поддержка мультивалютного cash management и операций по счёту — с
            отчётностью, настроенной под нужды клиента.
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Bank className="text-primary size-6" />
            <CardTitle className="text-base">Операции по счёту</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Операции поддерживаются контролируемыми процессами передачи
            инструкций. Свяжитесь с командой по вопросам расчётов, переводов или
            онбординга.
          </CardContent>
        </Card>
      </div>
    </WhatWeDoShell>
  )
}
