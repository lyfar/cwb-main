import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowsLeftRight,
  Bank,
  ChartLineUp,
  Coins,
  ShieldCheck,
  SquaresFour,
  Vault,
} from "@phosphor-icons/react/dist/ssr"

import type { Locale } from "@/lib/locale"
import { localizeHref } from "@/lib/locale"
import { getWhatWeDoItems } from "@/lib/what-we-do"
import { WhatWeDoShell } from "@/app/what-we-do/_components/what-we-do-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Что мы делаем | CWB Hong Kong",
  description:
    "Безопасное хранение, управление активами, брокерский доступ и строгие контроли управления рисками.",
}

const locale: Locale = "ru"

const SERVICE_ICONS = {
  overview: SquaresFour,
  "safe-custody": Vault,
  "asset-management": ChartLineUp,
  brokerage: ArrowsLeftRight,
  "banking-services": Bank,
} as const

export default function RuWhatWeDoPage() {
  const services = getWhatWeDoItems(locale).filter((item) => item.id !== "overview")

  return (
    <WhatWeDoShell
      badge="Возможности"
      title="Что мы делаем"
      description="Мы предоставляем сервис в стиле private banking, сочетая институциональную безопасность с персональным инвестиционным подходом."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = SERVICE_ICONS[service.id]

          return (
            <Card key={service.id} variant="glass">
              <CardHeader className="gap-2">
                <div className="flex items-center gap-3">
                  <Icon className="text-primary size-6" />
                  <CardTitle className="text-base">{service.title}</CardTitle>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link href={localizeHref(service.href, locale)}>Подробнее</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Управление рисками</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc pl-5">
              <li>
                Сегрегированные счета для клиентских средств (cash) в банке с
                лицензией Гонконга в течение одного рабочего дня после получения.
              </li>
              <li>
                Ценные бумаги и обеспечение клиентов хранятся на сегрегированных
                счетах в safe custody.
              </li>
              <li>
                Активы клиентов ограждены и не входят в конкурсную массу CWB HK
                или любого другого клиента в случае ликвидации.
              </li>
              <li>
                Отсутствие проприетарной торговли; инвестиции акционеров
                ограничены операционными денежными средствами.
              </li>
              <li>
                Не предоставляем клиентам ликвидность или кредитное плечо; баланс
                ориентирован на стабильность.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Coins className="text-primary size-6" />
            <CardTitle className="text-base">Процесс открытия счёта</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Клиент открывает счёт в CWB Hong Kong Limited.</li>
              <li>
                Клиент переводит денежные средства или ценные бумаги на счёт CWB
                HK у кастодиана.
              </li>
              <li>
                CWB HK сегрегирует активы клиента на отдельный субсчёт у
                кастодиана.
              </li>
              <li>Активы хранятся у банка-кастодиана для сохранности.</li>
            </ol>
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Операции по счёту</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Наша глобальная команда поддерживает исполнение и операционные
            процессы в реальном времени. Клиенты могут связаться с нами по email,
            записываемой телефонной линии или через Bloomberg chat для торговых
            поручений, расчётов и трансграничных переводов.
          </CardContent>
        </Card>
      </div>
    </WhatWeDoShell>
  )
}

