"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { List as ListIcon } from "@phosphor-icons/react"

import { getCopy } from "@/lib/copy"
import { getLocaleFromPathname, localizeHref, stripLocalePrefix } from "@/lib/locale"
import { cn } from "@/lib/utils"
import { getWhoWeServeItems } from "@/lib/who-we-serve"
import { getWhatWeDoItems } from "@/lib/what-we-do"
import { WhoWeServeMenu } from "@/components/site/who-we-serve-menu"
import { WhatWeDoMenu } from "@/components/site/what-we-do-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
  const normalized = pathname?.replace(/\/+$/, "") ?? "/"
  const isActive = normalized === href || normalized.startsWith(`${href}/`)

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
  const pathname = usePathname() ?? "/"
  const locale = getLocaleFromPathname(pathname)
  const copy = getCopy(locale)
  const basePathname = stripLocalePrefix(pathname)
  const whoWeServeActive =
    basePathname === "/who-we-serve" || basePathname.startsWith("/who-we-serve/")
  const whatWeDoActive =
    basePathname === "/what-we-do" || basePathname.startsWith("/what-we-do/")
  const whoWeServeLinks = React.useMemo(
    () => getWhoWeServeItems(locale).filter((item) => item.id !== "overview"),
    [locale]
  )
  const whatWeDoLinks = React.useMemo(
    () => getWhatWeDoItems(locale).filter((item) => item.id !== "overview"),
    [locale]
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/20 bg-transparent backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-2">
          <Link href={localizeHref("/", locale)} className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <div className="font-serif text-lg font-semibold tracking-tight">
                CWB
              </div>
              <div className="text-muted-foreground mt-1 hidden text-xs leading-none sm:block">
                {copy.header.brandTagline}
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <HeaderNavLink
            href={localizeHref("/who-we-are", locale)}
            label={copy.nav.whoWeAre}
          />
          <WhoWeServeMenu
            mode="label"
            label={copy.nav.whoWeServe}
            triggerVariant={whoWeServeActive ? "secondary" : "ghost"}
            className={cn("justify-start", whoWeServeActive && "font-medium")}
          />
          <WhatWeDoMenu
            mode="label"
            label={copy.nav.whatWeDo}
            triggerVariant={whatWeDoActive ? "secondary" : "ghost"}
            className={cn("justify-start", whatWeDoActive && "font-medium")}
          />
          <HeaderNavLink
            href={localizeHref("/contacts", locale)}
            label={copy.nav.contacts}
          />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
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
                  {copy.header.mobileTagline}
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-1 p-3">
                <SheetClose asChild>
                  <HeaderNavLink
                    href={localizeHref("/who-we-are", locale)}
                    label={copy.nav.whoWeAre}
                    onNavigate={() => setOpen(false)}
                  />
                </SheetClose>
                <SheetClose asChild>
                  <HeaderNavLink
                    href={localizeHref("/who-we-serve", locale)}
                    label={copy.nav.whoWeServe}
                    onNavigate={() => setOpen(false)}
                  />
                </SheetClose>
                <div className="ml-3 flex flex-col gap-1 border-l border-border/40 pl-3">
                  {whoWeServeLinks.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <HeaderNavLink
                        href={localizeHref(item.href, locale)}
                        label={item.title}
                        onNavigate={() => setOpen(false)}
                      />
                    </SheetClose>
                  ))}
                </div>
                <Separator className="my-2" />
                <SheetClose asChild>
                  <HeaderNavLink
                    href={localizeHref("/what-we-do", locale)}
                    label={copy.nav.whatWeDo}
                    onNavigate={() => setOpen(false)}
                  />
                </SheetClose>
                <div className="ml-3 flex flex-col gap-1 border-l border-border/40 pl-3">
                  {whatWeDoLinks.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <HeaderNavLink
                        href={localizeHref(item.href, locale)}
                        label={item.title}
                        onNavigate={() => setOpen(false)}
                      />
                    </SheetClose>
                  ))}
                </div>
                <Separator className="my-2" />
                <SheetClose asChild>
                  <HeaderNavLink
                    href={localizeHref("/contacts", locale)}
                    label={copy.nav.contacts}
                    onNavigate={() => setOpen(false)}
                  />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
