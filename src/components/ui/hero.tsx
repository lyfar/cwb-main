"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { MeshGradient } from "@paper-design/shaders-react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  ChartLineUp,
  ShieldCheck,
  Vault,
} from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

import { brokeragePartners, custodyPartners, logoDevUrl } from "@/lib/partners"
import { AMBIENT_BACKGROUND_EVENT, getAmbientBackgroundEnabled } from "@/lib/ambient-background"
import { getCopy } from "@/lib/copy"
import { getLocaleFromPathname, localizeHref } from "@/lib/locale"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const PALETTES = {
  light: ["#f7f3e2", "#fbf8ec", "#e7d4c6", "#d9b1a6", "#99753f"],
  dark: ["#2c351b", "#313b1f", "#3a4524", "#99753f", "#e7d4c6"],
} as const

const OVERLAY_PALETTES = {
  light: ["#e7d4c6", "#d9b1a6", "#99753f", "#ffffff"],
  dark: ["#e7d4c6", "#99753f", "#3a4524", "#2c351b"],
} as const

const HERO_PARTNERS = [...custodyPartners, ...brokeragePartners].slice(0, 8)

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCopy(locale)
  const [mounted, setMounted] = React.useState(false)
  const [meshVisible, setMeshVisible] = React.useState(false)
  const [ambientEnabled, setAmbientEnabled] = React.useState(true)
  const ready = mounted && (resolvedTheme === "light" || resolvedTheme === "dark")
  const isDark = ready && resolvedTheme === "dark"
  const showMesh = ready && ambientEnabled

  React.useEffect(() => {
    setMounted(true)
    if (reduceMotion) {
      setMeshVisible(true)
      return
    }

    const id = requestAnimationFrame(() => setMeshVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])

  React.useEffect(() => {
    const sync = () => setAmbientEnabled(getAmbientBackgroundEnabled())
    sync()

    window.addEventListener(AMBIENT_BACKGROUND_EVENT, sync)
    return () => window.removeEventListener(AMBIENT_BACKGROUND_EVENT, sync)
  }, [])
  const palette = ready
    ? resolvedTheme === "dark"
      ? PALETTES.dark
      : PALETTES.light
    : PALETTES.light
  const overlayPalette = ready
    ? resolvedTheme === "dark"
      ? OVERLAY_PALETTES.dark
      : OVERLAY_PALETTES.light
    : OVERLAY_PALETTES.light

  const baseOpacity = ready
    ? isDark
      ? "opacity-[0.55]"
      : "opacity-[0.55]"
    : "opacity-[0.55]"
  const overlayOpacity = ready
    ? isDark
      ? "opacity-[0.32]"
      : "opacity-[0.38]"
    : "opacity-[0.38]"

  return (
    <section
      className={cn(
        "bg-background relative overflow-hidden min-h-[85vh] md:min-h-[75vh]",
        ambientEnabled && "bg-brand-soft"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {showMesh ? (
          <>
            <MeshGradient
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                isDark
                  ? "saturate-[1.05] brightness-[1.05]"
                  : "saturate-[1.3] brightness-[1.1]"
              } ${meshVisible ? baseOpacity : "opacity-0"}`}
              colors={[...palette]}
              speed={reduceMotion ? 0 : (isDark ? 0.25 : 0.3)}
              distortion={isDark ? 0.55 : 0.75}
              swirl={isDark ? 0.25 : 0.4}
              grainOverlay={isDark ? 0.08 : 0.12}
              style={{ backgroundColor: isDark ? "#2c351b" : "#f7f3e2" }}
            />
            <MeshGradient
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                isDark
                  ? "mix-blend-screen brightness-[1.05]"
                  : "mix-blend-soft-light brightness-[1.2] saturate-[1.3]"
              } ${meshVisible ? overlayOpacity : "opacity-0"}`}
              colors={[...overlayPalette]}
              speed={reduceMotion ? 0 : (isDark ? 0.18 : 0.22)}
              distortion={isDark ? 0.9 : 1.0}
              swirl={isDark ? 0.5 : 0.6}
              grainOverlay={isDark ? 0.12 : 0.15}
              style={{ backgroundColor: "transparent" }}
            />
          </>
        ) : null}
        {ready && ambientEnabled ? (
          <>
            <div
              className={`absolute inset-0 backdrop-blur-[6px] ${
                isDark ? "opacity-90" : "opacity-40"
              }`}
              style={{
                background: isDark
                  ? "radial-gradient(circle at 70% 30%, rgba(153, 117, 63, 0.22), transparent 42%), radial-gradient(circle at 30% 80%, rgba(231, 212, 198, 0.12), transparent 40%)"
                  : "radial-gradient(circle at 24% 24%, rgba(231, 212, 198, 0.6), transparent 55%), radial-gradient(circle at 78% 20%, rgba(217, 177, 166, 0.32), transparent 58%), radial-gradient(circle at 50% 55%, rgba(153, 117, 63, 0.14), transparent 60%)",
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b from-background/0 ${
                isDark ? "via-background/20" : "via-background/10"
              } to-background`}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 backdrop-blur-[6px] opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background" />
          </>
        )}
        {ambientEnabled ? (
          <Image
            src="/henderson.png"
            alt="Henderson"
            width={600}
            height={600}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[15%] opacity-50 mix-blend-soft-light object-contain h-full w-auto max-w-[min(120%,500px)] scale-125 md:scale-100 md:right-0 md:left-auto md:translate-x-[15%] md:translate-y-0 md:max-w-[min(50%,750px)] lg:max-w-[min(45%,850px)] xl:max-w-[min(40%,900px)]"
            priority
          />
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-48 pb-0 md:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl"
        >
          <Badge variant="secondary" className="border-border/60">
            {copy.hero.badge}
          </Badge>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground opacity-100 md:mt-6 md:text-6xl">
            {copy.hero.title}
          </h1>

          <p
            className={`mt-5 text-base leading-relaxed md:text-lg ${
              isDark ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {copy.hero.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            {HERO_PARTNERS.map((partner) => (
              <Image
                key={partner.domain}
                src={logoDevUrl(partner.domain)}
                alt={`${partner.name} logo`}
                width={180}
                height={72}
                className="h-7 w-auto opacity-80"
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href={localizeHref("/contacts", locale)}>
                {copy.hero.ctaPrimary} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={localizeHref("/what-we-do", locale)}>
                {copy.hero.ctaSecondary}
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <Card variant="glass">
            <CardContent className="flex gap-3 p-6">
              <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-md">
                <Vault className="size-5" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  {copy.hero.cards.custody.title}
                </div>
                <div
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {copy.hero.cards.custody.description}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="flex gap-3 p-6">
              <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-md">
                <ChartLineUp className="size-5" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  {copy.hero.cards.architecture.title}
                </div>
                <div
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {copy.hero.cards.architecture.description}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="flex gap-3 p-6">
              <div className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-md">
                <ShieldCheck className="size-5" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  {copy.hero.cards.controls.title}
                </div>
                <div
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {copy.hero.cards.controls.description}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
