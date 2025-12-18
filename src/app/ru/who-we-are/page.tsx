import type { Metadata } from "next"
import {
  Buildings as BuildingsIcon,
  Handshake as HandshakeIcon,
  ShieldCheck as ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Кто мы | CWB Hong Kong",
  description:
    "CWB Hong Kong — независимая лицензированная кастодианская и управляющая компания, регулируемая SFC (код CE AFQ783).",
}

export default function RuWhoWeArePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <div className="space-y-3">
        <Badge variant="outline">Глобальное присутствие</Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Кто мы
        </h1>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          CWB Hong Kong — независимая лицензированная кастодианская и
          управляющая компания, специализирующаяся на хранении финансовых
          активов, брокерском обслуживании и управлении активами для
          институциональных и частных клиентов.
        </p>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheckIcon className="text-primary size-6" />
            <CardTitle className="text-base">Лицензия и регулирование</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            CWB Hong Kong лицензирована и регулируется Комиссией по ценным
            бумагам и фьючерсам (SFC) под кодом Центрального субъекта (CE){" "}
            <span className="text-foreground font-medium">AFQ783</span>.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <HandshakeIcon className="text-primary size-6" />
            <CardTitle className="text-base">
              Сервис в стиле private banking
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Мы объединяем институциональный уровень безопасности с
            персонализированным инвестиционным подходом, учитывая цели и
            рыночные возможности каждого клиента.
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <BuildingsIcon className="text-primary size-6" />
            <CardTitle className="text-base">Кастодиальная сеть</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Как лицензированный кастодиан, мы обеспечиваем безопасное хранение
            активов клиентов у ведущих глобальных партнёров — с сегрегацией,
            прозрачностью и строгими операционными контролями.
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

