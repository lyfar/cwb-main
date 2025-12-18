import type { Metadata } from "next"
import Image from "next/image"
import { ShieldCheck, Vault } from "@phosphor-icons/react/dist/ssr"

import { custodyPartners, logoDevUrl } from "@/lib/partners"
import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Безопасное хранение | CWB Hong Kong",
  description:
    "Сегрегированное хранение у ведущих глобальных кастодианов и строгие операционные контроли.",
}

export default function RuSafeCustodyPage() {
  return (
    <WhatWeDoShell
      badge="Что мы делаем"
      title="Безопасное хранение"
      description="Сегрегированное хранение у ведущих глобальных кастодианов и строгие операционные контроли."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Vault className="text-primary size-6" />
            <CardTitle className="text-base">Сегрегированное хранение</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Ценные бумаги и обеспечение клиентов хранятся на сегрегированных
            счетах у кастодианов — это помогает ограждать активы и сохранять
            прозрачность владения.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Операционные контроли</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Ежедневные сверки, проверки сегрегации и контролируемые процессы для
            расчётов, корпоративных действий и отчётности.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="space-y-3">
        <Badge variant="outline">Партнёры (примеры)</Badge>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Кастодиальная сеть
        </h2>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
          Логотипы приведены в качестве примеров кастодиальных контрагентов. Мы
          показываем только проверенных партнёров.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
        {custodyPartners.map((partner) => (
          <Image
            key={partner.domain}
            src={logoDevUrl(partner.domain)}
            alt={`${partner.name} logo`}
            width={180}
            height={72}
            className="h-8 w-auto opacity-85"
          />
        ))}
      </div>
    </WhatWeDoShell>
  )
}
