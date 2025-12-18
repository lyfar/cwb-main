import type { Metadata } from "next"
import Link from "next/link"
import { Handshake, LockKeyOpen, ShieldCheck, Sparkle } from "@phosphor-icons/react/dist/ssr"

import type { Locale } from "@/lib/locale"
import { localizeHref } from "@/lib/locale"
import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Частные клиенты | CWB Hong Kong",
  description:
    "Сервис в стиле private banking с сегрегированным хранением, доступом к рынкам и возможностями через открытую архитектуру.",
}

const locale: Locale = "ru"

export default function RuPrivateClientsPage() {
  return (
    <WhoWeServeShell
      badge="Кому мы помогаем"
      title="Частные клиенты"
      description="Для клиентов и семей, которым важны институциональные гарантии и персональная инвестиционная поддержка."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Handshake className="text-primary size-6" />
            <CardTitle className="text-base">Для кого</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Состоятельные клиенты, предприниматели и семьи, которым важны
            прозрачность, конфиденциальность и сервис на основе долгосрочных
            отношений — в хранении и инвестициях.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Sparkle className="text-primary size-6" />
            <CardTitle className="text-base">Типичные задачи</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Сохранение капитала и прозрачные кастодиальные решения.</li>
              <li>Доступ к отобранным публичным и частным возможностям.</li>
              <li>Надёжное исполнение и операционная поддержка.</li>
              <li>Понятная отчётность и оперативная коммуникация.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Что мы предоставляем
      </h2>
      <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
        Сервис в стиле private banking, который помогает сохранять активы в
        безопасности и одновременно получать доступ к возможностям на рынках.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Сегрегированное хранение</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Институциональные кастодиальные решения с чёткой сегрегацией и
            строгими операционными контролями.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <LockKeyOpen className="text-primary size-6" />
            <CardTitle className="text-base">Открытая архитектура</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Доступ к публичным и частным инвестиционным возможностям через
            платформу с открытой архитектурой.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Handshake className="text-primary size-6" />
            <CardTitle className="text-base">Персональная поддержка</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Сервис на основе отношений: онбординг, торговые поручения и
            отчётность — в одном согласованном процессе.
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
            <li>Вводный звонок: цели, ограничения, предпочтения.</li>
            <li>Онбординг и настройка хранения с понятной документацией.</li>
            <li>Определяем инвестиционный подход и требования к доступу.</li>
            <li>Дальнейшая поддержка, отчётность и регулярные обзоры.</li>
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Начать разговор</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            Расскажите, чего вы хотите достичь — мы предложим подходящую
            структуру хранения и доступа.
          </div>
          <Button asChild className="w-fit">
            <Link href={localizeHref("/contacts", locale)}>Связаться</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}
