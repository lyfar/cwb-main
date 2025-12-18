"use client"

import * as React from "react"

import { CalculatorWorkspace } from "@/app/calculator/_components/calculator-workspace"
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
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (password === CALCULATOR_PASSWORD) {
      setError(null)
      onUnlock()
      return
    }

    setError("Incorrect password.")
  }

  return (
    <main className="mx-auto w-full max-w-none px-6 pt-24 pb-14 md:pt-28 md:pb-16 lg:px-10">
      <header className="space-y-3">
        <Badge variant="outline">Internal</Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Calculator
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Password-protected internal estimate tool. Not intended for public
          sharing.
        </p>
      </header>

      <div className="mt-10 max-w-md rounded-2xl border border-border/40 bg-card/60 supports-[backdrop-filter]:bg-card/40 backdrop-blur-[10px] p-6">
        <div className="text-sm font-medium">Enter password</div>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="calculator-password">Password</Label>
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
            Unlock
          </Button>
        </form>
      </div>
    </main>
  )
}

export function CalculatorClient() {
  const [unlocked, setUnlocked] = React.useState(false)

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
    <main className="mx-auto w-full max-w-none px-6 pt-24 pb-14 md:pt-28 md:pb-16 lg:px-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Badge variant="outline">Internal</Badge>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Calculator
          </h1>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            Fee schedule reference and quick estimates based on the published
            maximum fee table.
          </p>
        </div>
        <Button variant="outline" onClick={lock}>
          Lock
        </Button>
      </header>

      <div className="mt-10">
        <CalculatorWorkspace />
      </div>
    </main>
  )
}
