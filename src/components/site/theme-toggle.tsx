"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle({
  variant = "ghost",
  size = "icon",
  align = "end",
  showLabel = false,
  className,
}: {
  variant?: React.ComponentProps<typeof Button>["variant"]
  size?: React.ComponentProps<typeof Button>["size"]
  align?: "start" | "center" | "end"
  showLabel?: boolean
  className?: string
}) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const current = mounted ? (theme ?? resolvedTheme ?? "light") : "light"

  const Icon = current === "dark" ? Moon : Sun
  const iconClassName = showLabel ? "size-4" : "size-5"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(showLabel && "gap-2", className)}
          aria-label="Theme"
        >
          <Icon className={iconClassName} />
          {showLabel ? <span>Theme</span> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuItem onSelect={() => setTheme("light")}>
          <Sun className="size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>
          <Moon className="size-4" />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
