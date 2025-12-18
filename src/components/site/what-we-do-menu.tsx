"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowsLeftRight,
  Bank,
  CaretDown,
  ChartLineUp,
  Check,
  SquaresFour,
  Vault,
} from "@phosphor-icons/react"

import { getCopy } from "@/lib/copy"
import { getLocaleFromPathname, localizeHref, stripLocalePrefix } from "@/lib/locale"
import { cn } from "@/lib/utils"
import { getWhatWeDoItems } from "@/lib/what-we-do"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const itemIcons = {
  overview: SquaresFour,
  "safe-custody": Vault,
  "asset-management": ChartLineUp,
  brokerage: ArrowsLeftRight,
  "banking-services": Bank,
} as const

function normalizePathname(pathname: string) {
  if (!pathname) return "/"
  if (pathname === "/") return pathname
  return pathname.replace(/\/+$/, "")
}

function getCurrentItem(pathname: string, items: ReturnType<typeof getWhatWeDoItems>) {
  const normalized = normalizePathname(pathname)
  const sorted = [...items].sort(
    (a, b) => b.href.length - a.href.length
  )

  return (
    sorted.find((item) => {
      if (normalized === item.href) return true
      return normalized.startsWith(`${item.href}/`)
    }) ?? items[0]
  )
}

export function WhatWeDoMenu({
  mode = "current",
  label = "What we do",
  align = "start",
  triggerVariant = "ghost",
  triggerSize = "sm",
  className,
}: {
  mode?: "current" | "label"
  label?: string
  align?: "start" | "center" | "end"
  triggerVariant?: React.ComponentProps<typeof Button>["variant"]
  triggerSize?: React.ComponentProps<typeof Button>["size"]
  className?: string
}) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCopy(locale)
  const items = React.useMemo(() => getWhatWeDoItems(locale), [locale])
  const basePathname = stripLocalePrefix(pathname ?? "/")
  const current = React.useMemo(() => getCurrentItem(basePathname, items), [basePathname, items])

  const triggerText = mode === "label" ? label : current.title

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={cn("gap-1.5", className)}
        >
          {triggerText}
          <CaretDown className="size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-64">
        <DropdownMenuLabel>{copy.nav.whatWeDo}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => {
          const Icon = itemIcons[item.id]
          const isActive = item.id === current.id

          return (
            <DropdownMenuItem key={item.id} asChild>
              <Link
                href={localizeHref(item.href, locale)}
                className="flex items-start gap-2"
              >
                <Icon className="mt-0.5 size-4 opacity-70" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{item.title}</span>
                    <Check
                      className={cn(
                        "size-4",
                        isActive ? "opacity-90" : "opacity-0"
                      )}
                    />
                  </div>
                  <div className="text-muted-foreground text-xs leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
