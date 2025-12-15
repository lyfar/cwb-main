"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Buildings,
  CaretDown,
  Check,
  SquaresFour,
  User,
  UsersThree,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { whoWeServeItems } from "@/lib/who-we-serve"
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
  "institutional-clients": Buildings,
  "private-clients": User,
  "family-offices": UsersThree,
} as const

function normalizePathname(pathname: string) {
  if (!pathname) return "/"
  if (pathname === "/") return pathname
  return pathname.replace(/\/+$/, "")
}

function getCurrentItem(pathname: string) {
  const normalized = normalizePathname(pathname)
  const sorted = [...whoWeServeItems].sort((a, b) => b.href.length - a.href.length)

  return (
    sorted.find((item) => {
      if (normalized === item.href) return true
      return normalized.startsWith(`${item.href}/`)
    }) ?? whoWeServeItems[0]
  )
}

export function WhoWeServeMenu({
  mode = "current",
  label = "Who we serve",
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
  const current = React.useMemo(
    () => getCurrentItem(pathname ?? "/"),
    [pathname]
  )

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
        <DropdownMenuLabel>Who we serve</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {whoWeServeItems.map((item) => {
          const Icon = itemIcons[item.id]
          const isActive = item.id === current.id

          return (
            <DropdownMenuItem key={item.id} asChild>
              <Link href={item.href} className="flex items-start gap-2">
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

