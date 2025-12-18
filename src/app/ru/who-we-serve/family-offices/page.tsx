import type { Metadata } from "next"
import Link from "next/link"
import { ChartPieSlice, ClipboardText, ShieldCheck, UsersThree } from "@phosphor-icons/react/dist/ssr"

import type { Locale } from "@/lib/locale"
import { localizeHref } from "@/lib/locale"
import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Семейные офисы | CWB Hong Kong",
  description:
    "Хранение, отчётность и доступ через открытую архитектуру для single и multi-family office.",
}

const locale: Locale = "ru"

export default function RuFamilyOfficesPage() {
  return (
    <WhoWeServeShell
      badge="Кому мы помогаем"
      title="Семейные офисы"
      description="Для семей и семейных офисов, которым нужны управление, отчётность и институциональное хранение с доступом через открытую архитектуру."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UsersThree className="text-primary size-6" />
            <CardTitle className="text-base">Для кого</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Single- и multi-family office, которые координируют хранение, доступ
            к рынкам и инвестиционные возможности по нескольким счетам и
            юрисдикциям.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ClipboardText className="text-primary size-6" />
            <CardTitle className="text-base">Типичные задачи</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            <ul className="list-disc space-y-2 pl-5">
              <li>Управление, согласования и чистые операционные процессы.</li>
              <li>Консолидированная видимость по активам и контрагентам.</li>
              <li>Безопасное хранение с ограждённой сегрегацией.</li>
              <li>Доступ к публичным и частным возможностям.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Что мы предоставляем
      </h2>
      <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed">
        Структурированная настройка для мульти-аккаунт контроля, дисциплинированного
        исполнения и гибкого инвестиционного доступа.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ShieldCheck className="text-primary size-6" />
            <CardTitle className="text-base">Хранение и контроли</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Сегрегированное хранение, сверки и контроли, рассчитанные на то,
            чтобы активы оставались ограждёнными и прозрачными.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ChartPieSlice className="text-primary size-6" />
            <CardTitle className="text-base">Открытая архитектура</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Доступ к отобранным публичным и частным возможностям на разных рынках
            — с учётом предпочтений по управлению и процессам.
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <ClipboardText className="text-primary size-6" />
            <CardTitle className="text-base">Ритм отчётности</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Понятный график отчётности и операционная поддержка для расчётов,
            переводов и требований по контролю.
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
            <li>Определяем управление, согласования и требования к отчётности.</li>
            <li>Онбординг и настройка кастодиальной структуры.</li>
            <li>Согласуем процессы исполнения и контрагентов.</li>
            <li>Дальнейшая работа с поддержкой и регулярными обзорами.</li>
          </ol>
        </CardContent>
      </Card>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Скоординировать структуру</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            Расскажите о вашей операционной модели — мы предложим структуру хранения,
            отчётности и доступа, которая её поддержит.
          </div>
          <Button asChild className="w-fit">
            <Link href={localizeHref("/contacts", locale)}>Связаться</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}
