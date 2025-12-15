"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Desktop as DesktopIcon,
  List as ListIcon,
  Moon as MoonIcon,
  Sun as SunIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { href: "/who-we-are", label: "Who we are" },
  { href: "/who-we-serve", label: "Who we serve" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/contacts", label: "Contacts" },
] as const

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const current = theme === "system" ? resolvedTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label="Theme"
        >
          {current === "dark" ? (
            <MoonIcon className="size-5" />
          ) : (
            <SunIcon className="size-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setTheme("light")}>
          <SunIcon className="size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>
          <MoonIcon className="size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>
          <DesktopIcon className="size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HeaderNavLink({
  href,
  label,
  onNavigate,
}: {
  href: string
  label: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      className={cn("justify-start", isActive && "font-medium")}
      onClick={onNavigate}
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/20 bg-transparent backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <div className="font-serif text-lg font-semibold tracking-tight">
                CWB
              </div>
              <div className="text-muted-foreground mt-1 hidden text-xs leading-none sm:block">
                Custody & investment management
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <HeaderNavLink
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ))}
          <Separator orientation="vertical" className="mx-1 h-6" />
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/contacts">Get in touch</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <ListIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <SheetHeader className="px-4 pt-4">
                <SheetTitle>CWB</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-4">
                <div className="text-muted-foreground text-xs">
                  Built on trust. Driven by vision.
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-1 p-3">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <HeaderNavLink
                      href={item.href}
                      label={item.label}
                      onNavigate={() => setOpen(false)}
                    />
                  </SheetClose>
                ))}
                <Separator className="my-2" />
                <SheetClose asChild>
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link href="/contacts">Get in touch</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
