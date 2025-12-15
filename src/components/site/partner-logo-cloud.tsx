import Image from "next/image"

import { cn } from "@/lib/utils"
import { logoDevUrl, type PartnerLogo } from "@/lib/partners"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PartnerLogoCloud({
  title,
  badge,
  description,
  partners,
  className,
}: {
  title: string
  badge?: string
  description?: string
  partners: PartnerLogo[]
  className?: string
}) {
  return (
    <Card variant="glass" className={className}>
      <CardHeader className="gap-2 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {badge ? <Badge variant="outline">{badge}</Badge> : null}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.domain}
              className={cn(
                "flex min-h-14 items-center justify-center rounded-lg border border-border/40 bg-white/70 p-3",
                "supports-[backdrop-filter]:bg-white/55 backdrop-blur-[8px]",
                "transition-all duration-200 ease-in-out will-change-transform",
                "hover:-translate-y-0.5 hover:border-ring/60 hover:shadow-md",
                "dark:bg-white/5 dark:hover:border-ring/50"
              )}
              title={partner.name}
            >
              <Image
                src={logoDevUrl(partner.domain)}
                alt={`${partner.name} logo`}
                width={180}
                height={72}
                className="h-7 w-auto object-contain opacity-90"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
