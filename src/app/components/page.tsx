"use client"

import * as React from "react"
import Link from "next/link"

import { componentDemos } from "./_demos"
import type { ComponentDemo } from "./_demos/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function DemoCard({ demo }: { demo: ComponentDemo }) {
  return (
    <Card className={demo.fullWidth ? "md:col-span-2" : undefined} id={demo.id}>
      <CardHeader>
        <CardTitle className="text-base">{demo.title}</CardTitle>
        {demo.description ? (
          <CardDescription>{demo.description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">{demo.element}</CardContent>
    </Card>
  )
}

export default function ComponentsPage() {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return componentDemos
    return componentDemos.filter((d) => {
      return (
        d.title.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
      )
    })
  }, [query])

  return (
    <div className="bg-background min-h-svh">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Components
              </h1>
              <Badge variant="outline">{filtered.length}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Wealth management UI demo gallery for debugging installed shadcn
              components.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-auto md:items-end">
            <div className="flex w-full gap-2 md:w-[28rem]">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter components…"
              />
              <Button
                variant="outline"
                onClick={() => setQuery("")}
                disabled={!query.trim()}
              >
                Clear
              </Button>
            </div>
            <div className="text-muted-foreground text-xs">
              <Link
                href="/"
                className="hover:text-foreground underline underline-offset-4"
              >
                Home
              </Link>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      </div>
    </div>
  )
}

