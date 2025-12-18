import type { Metadata } from "next"
import Image from "next/image"
import { ArrowsLeftRight, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr"

import { brokeragePartners, logoDevUrl } from "@/lib/partners"
import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Брокерское обслуживание | CWB Hong Kong",
  description:
    "Исполнение и доступ к рынкам развитых стран с сильным покрытием АТР.",
}

export default function RuBrokeragePage() {
  return (
    <WhatWeDoShell
      badge="Что мы делаем"
      title="Брокерское обслуживание"
      description="Исполнение и доступ к рынкам развитых стран с сильным покрытием АТР и возможностями на развивающихся рынках."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ArrowsLeftRight className="text-primary size-6" />
            <CardTitle className="text-base">Исполнение</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Исполнение по биржам и площадкам ликвидности, поддержанное
            контролируемыми процессами передачи поручений.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <GlobeHemisphereWest className="text-primary size-6" />
            <CardTitle className="text-base">Покрытие</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Развитые рынки с сильным фокусом на АТР, а также маршруты доступа к
            региональным и развивающимся возможностям.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="space-y-3">
        <Badge variant="outline">Партнёры (примеры)</Badge>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Исполнение и доступ (примеры)
        </h2>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
          Логотипы приведены в качестве примеров контрагентов по исполнению и
          доступу. Мы показываем только проверенных партнёров.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
        {brokeragePartners.slice(0, 8).map((partner) => (
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
