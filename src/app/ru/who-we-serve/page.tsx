import type { Metadata } from "next"
import Link from "next/link"
import {
  Briefcase as BriefcaseIcon,
  GlobeHemisphereWest as GlobeHemisphereWestIcon,
  UserCircleGear as UserCircleGearIcon,
  UsersThree as UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr"

import type { Locale } from "@/lib/locale"
import { localizeHref } from "@/lib/locale"
import { getWhoWeServeItems } from "@/lib/who-we-serve"
import { WhoWeServeShell } from "@/app/who-we-serve/_components/who-we-serve-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Кому мы помогаем | CWB Hong Kong",
  description:
    "Институциональные и частные клиенты, которым важны сегрегированное хранение, доступ к рынкам и индивидуальные решения.",
}

const locale: Locale = "ru"

export default function RuWhoWeServePage() {
  const items = getWhoWeServeItems("en")
  const institutionalHref =
    items.find((item) => item.id === "institutional-clients")?.href ??
    "/who-we-serve/institutional-clients"
  const privateClientsHref =
    items.find((item) => item.id === "private-clients")?.href ??
    "/who-we-serve/private-clients"
  const familyOfficesHref =
    items.find((item) => item.id === "family-offices")?.href ??
    "/who-we-serve/family-offices"

  return (
    <WhoWeServeShell
      badge="В интересах клиента"
      title="Кому мы помогаем"
      description="Мы работаем с институциональными и частными клиентами, которым важны сегрегированное хранение, надёжное исполнение и партнёрство на основе прозрачности и доверия."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UsersThreeIcon className="text-primary size-6" />
            <CardTitle className="text-base">Институциональные клиенты</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2 text-sm leading-relaxed">
            <div>
              Для организаций, которым нужны строгие операционные контроли и
              масштабируемый доступ к глобальным рынкам.
            </div>
            <ul className="list-disc pl-5">
              <li>Фонды, управляющие активами и корпоративные казначейства</li>
              <li>Исполнение и брокерский доступ: развитые рынки + АТР</li>
              <li>Хранение у ведущих международных финансовых институтов</li>
            </ul>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href={localizeHref(institutionalHref, locale)}>
                Подробнее
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <UserCircleGearIcon className="text-primary size-6" />
            <CardTitle className="text-base">Частные клиенты</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2 text-sm leading-relaxed">
            <div>
              Для частных клиентов и семей, которым нужен сервис в стиле private
              banking с институциональными гарантиями.
            </div>
            <ul className="list-disc pl-5">
              <li>Состоятельные клиенты и семьи</li>
              <li>Открытая архитектура: публичные + частные возможности</li>
              <li>Поддержка на основе долгосрочных отношений</li>
            </ul>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href={localizeHref(privateClientsHref, locale)}>Подробнее</Link>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <BriefcaseIcon className="text-primary size-6" />
            <CardTitle className="text-base">Семейные офисы</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-2 text-sm leading-relaxed">
            <div>
              Для команд, которым важны контроль, отчётность и доступ к
              возможностям на разных рынках.
            </div>
            <ul className="list-disc pl-5">
              <li>Кастодиальные решения с сильными контролями</li>
              <li>Операционная дисциплина и понятный ритм отчётности</li>
              <li>Открытая архитектура: публичные + частные возможности</li>
            </ul>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href={localizeHref(familyOfficesHref, locale)}>Подробнее</Link>
            </Button>
          </CardContent>
        </Card>

        <Card variant="glass" className="md:col-span-3">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <GlobeHemisphereWestIcon className="text-primary size-6" />
            <CardTitle className="text-base">Глобальное покрытие</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Наша кастодиальная и торговая сеть рассчитана на поддержку клиентов
            на основных мировых рынках, с сильным фокусом на АТР и возможностями
            на развивающихся рынках.
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">
            Нужен разговор перед тем, как принять решение?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed md:flex-row md:items-center md:justify-between">
          <div>
            Мы направим вас к специалисту по хранению, исполнению или доступу к
            инвестиционным возможностям.
          </div>
          <Button asChild className="w-fit">
            <Link href={localizeHref("/contacts", locale)}>Связаться</Link>
          </Button>
        </CardContent>
      </Card>
    </WhoWeServeShell>
  )
}

