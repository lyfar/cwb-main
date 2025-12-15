"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type BadgeTagProps = {
  leading?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function BadgeTag({ leading, children, className }: BadgeTagProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-2 py-1 text-xs text-foreground/85 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70 md:text-sm",
        className
      )}
    >
      {leading ? (
        <span className="rounded-full border border-border/60 bg-background px-3 py-1 font-medium text-foreground">
          {leading}
        </span>
      ) : null}
      <span className="pr-2 text-foreground/80">{children}</span>
    </div>
  )
}

export default BadgeTag

