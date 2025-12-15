import { WhatWeDoMenu } from "@/components/site/what-we-do-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function WhatWeDoShell({
  badge = "What we do",
  title,
  description,
  children,
}: {
  badge?: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pt-24 pb-14 md:pt-28 md:pb-16">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="text-muted-foreground dark:text-foreground/90 max-w-3xl text-base leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        <WhatWeDoMenu mode="current" triggerVariant="outline" align="end" />
      </header>

      <Separator className="my-10" />

      {children}
    </main>
  )
}

