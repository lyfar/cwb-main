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

import { brokeragePartners, custodyPartners, logoDevUrl } from "@/lib/partners"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const PALETTES = {
  light: ["#fad2ad", "#a8bacf", "#86aedd", "#f7e5d3", "#ffffff"],
  dark: ["#0b1425", "#272c2f", "#5a87be", "#fad2ad", "#86aedd"],
} as const

const HERO_PARTNERS = [...custodyPartners, ...brokeragePartners].slice(0, 8)

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [meshVisible, setMeshVisible] = React.useState(false)
  const ready = mounted && (resolvedTheme === "light" || resolvedTheme === "dark")
  const isDark = resolvedTheme === "dark"
  const showMesh = ready

  React.useEffect(() => {
    setMounted(true)
    if (reduceMotion) {
      setMeshVisible(true)
      return
    }

    const id = requestAnimationFrame(() => setMeshVisible(true))
    return () => cancelAnimationFrame(id)
  }, [reduceMotion])
  const palette =
    resolvedTheme === "dark" ? PALETTES.dark : PALETTES.light

  return (
    <section className="bg-background bg-brand-soft relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {showMesh ? (
          <MeshGradient
            className={`absolute inset-0 h-full w-full saturate-[1.15] brightness-[1.1] transition-opacity duration-500 ${
              meshVisible ? (isDark ? "opacity-45" : "opacity-22") : "opacity-0"
            }`}
            colors={[...palette]}
            speed={reduceMotion ? 0 : 0.18}
          />
        ) : null}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-background/0 ${
            isDark ? "via-background/20" : "via-background/60"
          } to-background`}
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-3xl"
        >
          <Badge variant="outline">
            Licensed custodian · SFC CE code AFQ783
          </Badge>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground opacity-100 md:text-6xl">
            Built on trust. Driven by vision.
          </h1>

          <p
            className={`mt-5 text-base leading-relaxed md:text-lg ${
              isDark ? "text-muted-foreground" : "text-foreground/75"
            }`}
          >
            CWB Hong Kong is an independent licensed custodian and investment
            management firm specialising in safe custody, brokerage, and asset
            management for institutional and private clients.
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
              <Link href="/contacts">
                Contact us <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/what-we-do">Explore capabilities</Link>
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
                <div className="text-sm font-medium">Safe custody</div>
                <div
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-muted-foreground" : "text-foreground/75"
                  }`}
                >
                  Segregated safekeeping with top-tier global custodians.
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
                <div className="text-sm font-medium">Open architecture</div>
                <div
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-muted-foreground" : "text-foreground/75"
                  }`}
                >
                  Access to public and private opportunities across markets.
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
                <div className="text-sm font-medium">Robust controls</div>
                <div
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-muted-foreground" : "text-foreground/75"
                  }`}
                >
                  Ring-fenced assets, segregation checks, and clean oversight.
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
