import type { Metadata } from "next"
import Link from "next/link"
import { Buildings, ChartLineUp, ClipboardText, ShieldCheck, Swap } from "@phosphor-icons/react/dist/ssr"

import type { Locale } from "@/lib/locale"
import { localizeHref } from "@/lib/locale"
import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Институциональные клиенты | CWB Hong Kong",
  description:
    "Хранение, брокерский доступ и операционные контроли для фондов, управляющих и корпоративных казначейств.",
}

const locale: Locale = "ru"

export default function RuInstitutionalClientsPage() {
  return (
    <WhoWeServeShell
      badge="Кому мы помогаем"
      title="Институциональные клиенты"
      description="Для организаций, которым нужны строгие операционные контроли, сегрегированное хранение и масштабируемый доступ к рынкам."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Buildings className="text-primary size-6" />
            <CardTitle className="text-base">Для кого</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Фонды, управляющие активами, корпоративные клиенты и институты,
            которым нужны дисциплинированные операционные контроли и прозрачные
            кастодиальные решения.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ClipboardText className="text-primary size-6" />
            <CardTitle className="text-base">Типичные задачи</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Сегрегированное хранение с прозрачным учётом владения.</li>
              <li>Надёжные торговые процессы и поддержка расчётов.</li>
              <li>Контроли, которые масштабируются с объёмами и рынками.</li>
              <li>Стабильная отчётность для операций и контроля.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Что мы предоставляем
      </h2>
      <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
        Сервис в стиле private banking — с институциональной операционной
        дисциплиной.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Сегрегированное хранение</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Ценные бумаги и обеспечение клиентов хранятся на сегрегированных
            счетах у ведущих кастодианов, обеспечивая ограждение и прозрачность.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Swap className="text-primary size-6" />
            <CardTitle className="text-base">Доступ к рынкам</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Маршруты исполнения по развитым рынкам с сильным покрытием АТР и
            развивающихся рынков, поддержанные контролируемыми процессами.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ChartLineUp className="text-primary size-6" />
            <CardTitle className="text-base">Открытая архитектура</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Доступ к публичным и частным инвестиционным возможностям через
            платформу с открытой архитектурой.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Типичная модель взаимодействия</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm leading-relaxed">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Первичное обсуждение (рынки, классы активов, операционные нужды).</li>
            <li>Онбординг и настройка кастодиальной структуры.</li>
            <li>Согласование торговых процессов, расчётов и ритма отчётности.</li>
            <li>Операционная поддержка и регулярные обзоры.</li>
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Связаться с командой</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            Расскажите о требованиях к хранению и доступу к рынкам — мы предложим
            структуру, подходящую вашему операционному профилю.
          </div>
          <Button asChild className="w-fit">
            <Link href={localizeHref("/contacts", locale)}>Связаться</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}
