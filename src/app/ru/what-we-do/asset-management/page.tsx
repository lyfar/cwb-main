import type { Metadata } from "next"
import { ChartLineUp, Compass } from "@phosphor-icons/react/dist/ssr"

import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Управление активами | CWB Hong Kong",
  description:
    "Инвестиционная платформа с открытой архитектурой и доступом к публичным и частным возможностям.",
}

export default function RuAssetManagementPage() {
  return (
    <WhatWeDoShell
      badge="Что мы делаем"
      title="Управление активами"
      description="Доступ к публичным и частным возможностям через открытую архитектуру — с учётом целей клиента и контроля рисков."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Compass className="text-primary size-6" />
            <CardTitle className="text-base">Открытая архитектура</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Доступ к широкому набору стратегий по рынкам и управляющим — с
            возможностью гибко корректировать аллокации при изменении условий.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ChartLineUp className="text-primary size-6" />
            <CardTitle className="text-base">Построение портфеля</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Поддержка в стратегической аллокации, диверсификации и мониторинге —
            с учётом ликвидности, горизонта и риск-предпочтений.
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Инвестиционный универсум</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Публичные или приватные фонды</li>
              <li>IPO / pre-IPO возможности</li>
              <li>Private equity / VC / private debt</li>
              <li>Темы технологического сектора АТР</li>
              <li>Нетрадиционные активы</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </WhatWeDoShell>
  )
}
