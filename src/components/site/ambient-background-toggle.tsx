"use client"

import * as React from "react"

import {
  AMBIENT_BACKGROUND_EVENT,
  getAmbientBackgroundEnabled,
  setAmbientBackgroundEnabled,
} from "@/lib/ambient-background"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function AmbientBackgroundToggle({
  className,
}: {
  className?: string
}) {
  const [enabled, setEnabled] = React.useState(true)

  React.useEffect(() => {
    const sync = () => setEnabled(getAmbientBackgroundEnabled())
    sync()

    window.addEventListener(AMBIENT_BACKGROUND_EVENT, sync)
    return () => window.removeEventListener(AMBIENT_BACKGROUND_EVENT, sync)
  }, [])

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Switch
        id="ambient-background"
        checked={enabled}
        onCheckedChange={(next) => {
          setEnabled(next)
          setAmbientBackgroundEnabled(next)
        }}
        aria-label="Toggle ambient background"
      />
      <Label
        htmlFor="ambient-background"
        className="text-muted-foreground cursor-pointer text-xs"
      >
        Ambient background
      </Label>
    </div>
  )
}

