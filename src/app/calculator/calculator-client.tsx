"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { FilePdf } from "@phosphor-icons/react"

import {
  CalculatorWorkspaceWithRef,
  type CalculatorWorkspaceHandle,
} from "@/app/calculator/_components/calculator-workspace"
import { getCalculatorCopy } from "@/app/calculator/_lib/copy"
import { getLocaleFromPathname } from "@/lib/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PASSWORD_STORAGE_KEY = "cwb-calculator-auth"
const CALCULATOR_PASSWORD = "123456"

function PasswordGate({
  onUnlock,
}: {
  onUnlock: () => void
}) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCalculatorCopy(locale)
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (password === CALCULATOR_PASSWORD) {
      setError(null)
      onUnlock()
      return
    }

    setError(copy.passwordGate.incorrectPassword)
  }

  return (
    <main
      data-calculator-page
      className="mx-auto w-full max-w-none px-6 pt-24 pb-14 md:pt-28 md:pb-16 lg:px-10"
    >
      <header className="space-y-3">
        <Badge variant="outline">{copy.badgeInternal}</Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {copy.title}
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          {copy.passwordGate.description}
        </p>
      </header>

      <div className="mt-10 max-w-md rounded-2xl border border-border/40 bg-card/60 supports-[backdrop-filter]:bg-card/40 backdrop-blur-[10px] p-6">
        <div className="text-sm font-medium">{copy.passwordGate.enterPassword}</div>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="calculator-password">
              {copy.passwordGate.passwordLabel}
            </Label>
            <Input
              id="calculator-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            {error ? (
              <div className="text-destructive text-sm">{error}</div>
            ) : null}
          </div>
          <Button type="submit" className="w-full">
            {copy.unlock}
          </Button>
        </form>
      </div>
    </main>
  )
}

export function CalculatorClient() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const copy = getCalculatorCopy(locale)
  const [unlocked, setUnlocked] = React.useState(false)
  const workspaceRef = React.useRef<CalculatorWorkspaceHandle | null>(null)

  React.useEffect(() => {
    setUnlocked(window.localStorage.getItem(PASSWORD_STORAGE_KEY) === "1")
  }, [])

  function unlock() {
    window.localStorage.setItem(PASSWORD_STORAGE_KEY, "1")
    setUnlocked(true)
  }

  function lock() {
    window.localStorage.removeItem(PASSWORD_STORAGE_KEY)
    setUnlocked(false)
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={unlock} />
  }

  return (
    <main
      data-calculator-page
      className="mx-auto w-full max-w-none px-6 pt-24 pb-14 md:pt-28 md:pb-16 lg:px-10"
    >
      <header
        data-calculator-app
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div className="space-y-2">
          <Badge variant="outline">{copy.badgeInternal}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {copy.title}
          </h1>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            {copy.headerDescription}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            onClick={() => workspaceRef.current?.exportPdf()}
          >
            <FilePdf className="size-5" />
            {copy.exportPdf}
          </Button>
          <Button variant="outline" onClick={lock}>
            {copy.lock}
          </Button>
        </div>
      </header>

      <div data-calculator-content className="mt-10">
        <CalculatorWorkspaceWithRef ref={workspaceRef} />
      </div>
    </main>
  )
}
