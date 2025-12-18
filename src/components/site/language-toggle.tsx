"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import type { Locale } from "@/lib/locale"
import { getLocaleFromPathname, switchLocalePathname } from "@/lib/locale"
import { getCopy } from "@/lib/copy"
import { cn } from "@/lib/utils"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function LanguageToggle({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname() ?? "/"
  const locale = getLocaleFromPathname(pathname)
  const copy = getCopy(locale)

  return (
    <ToggleGroup
      type="single"
      value={locale}
      onValueChange={(next) => {
        if (!next) return
        const nextLocale = next as Locale
        router.push(switchLocalePathname(pathname, nextLocale))
      }}
      variant="outline"
      size="sm"
      aria-label={copy.toggles.language}
      className={cn("w-fit", className)}
    >
      <ToggleGroupItem value="en" aria-label="English">
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="ru" aria-label="Русский">
        RU
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

