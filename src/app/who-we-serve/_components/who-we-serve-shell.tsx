import { WhoWeServeMenu } from "@/components/site/who-we-serve-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function WhoWeServeShell({
  badge = "Who we serve",
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
            <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
        <WhoWeServeMenu mode="current" triggerVariant="outline" align="end" />
      </header>

      <Separator className="my-10" />

      {children}
    </main>
  )
}

