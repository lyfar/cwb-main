"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Sparkle } from "@phosphor-icons/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { ComponentDemo } from "./types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  Form,
  FormControl,
  FormDescription as FormDescriptionText,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const requestSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Tell us a bit more (10+ chars)."),
})

function RequestIntroCallForm() {
  const form = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  function onSubmit(values: z.infer<typeof requestSchema>) {
    toast.success("Request sent (demo)", { description: values.email })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="What can we help you with?" {...field} />
              </FormControl>
              <FormDescriptionText>
                Demo only — this doesn’t submit anywhere yet.
              </FormDescriptionText>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Request intro call</Button>
      </form>
    </Form>
  )
}

export const interactiveFormDemos: ComponentDemo[] = [
  {
    id: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Account actions.",
    element: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Account actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => toast("Statement requested")}>
            Request statement
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => toast("Export started")}>
            Export holdings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    id: "empty",
    title: "Empty",
    description: "No transactions state.",
    element: (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Sparkle className="size-6" />
          </EmptyMedia>
          <EmptyTitle>No activity yet</EmptyTitle>
          <EmptyDescription>
            Once trades and transfers settle, they’ll show up here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => toast("New instruction (demo)")}>
            Create instruction
          </Button>
        </EmptyContent>
      </Empty>
    ),
  },
  {
    id: "field",
    title: "Field",
    description: "KYC fields layout helpers.",
    element: (
      <FieldSet>
        <FieldLegend>Suitability</FieldLegend>
        <FieldGroup>
          <Field orientation="responsive">
            <FieldLabel htmlFor="investment-horizon">Investment horizon</FieldLabel>
            <FieldContent>
              <Select defaultValue="mid">
                <SelectTrigger id="investment-horizon">
                  <SelectValue placeholder="Pick horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">0–2 years</SelectItem>
                  <SelectItem value="mid">3–5 years</SelectItem>
                  <SelectItem value="long">5+ years</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>Used for risk profiling (demo).</FieldDescription>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    ),
  },
  {
    id: "form",
    title: "Form",
    description: "Request an intro call (demo).",
    element: <RequestIntroCallForm />,
  },
  {
    id: "hover-card",
    title: "Hover Card",
    description: "Custodian context (sample).",
    element: (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Custody partner</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <div className="text-sm font-medium">Segregated custody</div>
            <div className="text-muted-foreground text-sm">
              Assets are held in segregated accounts with top-tier custodians.
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    id: "input",
    title: "Input + Textarea",
    description: "Client details.",
    element: (
      <div className="grid gap-3">
        <Input placeholder="Client name" />
        <Textarea placeholder="Instruction notes…" />
      </div>
    ),
  },
  {
    id: "input-group",
    title: "Input Group",
    description: "Amount entry (currency + value).",
    element: (
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput inputMode="decimal" placeholder="100,000.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={() => toast("Saved (demo)")}>
            Save
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    ),
  },
  {
    id: "input-otp",
    title: "Input OTP",
    description: "2FA code (demo).",
    element: (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
  },
  {
    id: "item",
    title: "Item",
    description: "Transaction list row (sample).",
    element: (
      <ItemGroup className="rounded-md border">
        <Item size="sm">
          <ItemMedia variant="icon">
            <Check className="size-4" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Buy ACWI</ItemTitle>
            <ItemDescription>Executed · T+2 settlement</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Details
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator />
        <Item size="sm" variant="muted">
          <ItemContent>
            <ItemTitle>Wire transfer (HKD)</ItemTitle>
            <ItemDescription>Queued</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    ),
  },
  {
    id: "kbd",
    title: "Kbd",
    description: "Keyboard hints.",
    element: (
      <div className="text-sm">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search instruments
      </div>
    ),
  },
  {
    id: "label",
    title: "Label",
    element: (
      <div className="grid gap-2">
        <Label htmlFor="label-demo">Account nickname</Label>
        <Input id="label-demo" placeholder="e.g., Chan Holdings" />
      </div>
    ),
  },
  {
    id: "popover",
    title: "Popover",
    description: "Inline detail disclosure.",
    element: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Fees & charges</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-2">
            <div className="text-sm font-medium">Fee summary</div>
            <div className="text-muted-foreground text-sm">
              Demo content — fees depend on market, product, and size.
            </div>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    id: "radio-group",
    title: "Radio Group",
    description: "Risk tolerance (sample).",
    element: (
      <RadioGroup defaultValue="balanced" className="grid gap-2">
        {[
          { id: "r1", value: "conservative", label: "Conservative" },
          { id: "r2", value: "balanced", label: "Balanced" },
          { id: "r3", value: "growth", label: "Growth" },
        ].map((o) => (
          <div key={o.id} className="flex items-center gap-2">
            <RadioGroupItem id={o.id} value={o.value} />
            <Label htmlFor={o.id}>{o.label}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  },
  {
    id: "select",
    title: "Select",
    description: "Settlement currency (demo).",
    element: (
      <Select defaultValue="hkd">
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Pick currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hkd">HKD</SelectItem>
          <SelectItem value="usd">USD</SelectItem>
          <SelectItem value="eur">EUR</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: "sheet",
    title: "Sheet",
    description: "Trade ticket (sample).",
    element: (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open trade ticket</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>New order</SheetTitle>
            <SheetDescription>
              Demo UI — trade instructions should be confirmed via approved
              channels.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input id="symbol" defaultValue="ACWI" />
            <Label htmlFor="qty">Quantity</Label>
            <Input id="qty" inputMode="numeric" defaultValue="100" />
          </div>
        </SheetContent>
      </Sheet>
    ),
  },
  {
    id: "sonner",
    title: "Sonner (Toasts)",
    description: "Toaster is mounted in RootLayout.",
    element: (
      <div className="flex items-center gap-2">
        <Button onClick={() => toast("Instruction received (demo)")}>
          Show toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Completed", { description: "Settlement confirmed" })
          }
        >
          Success
        </Button>
      </div>
    ),
  },
  {
    id: "slider",
    title: "Slider",
    description: "Risk score (demo).",
    element: <Slider defaultValue={[40]} max={100} step={1} />,
  },
  {
    id: "switch",
    title: "Switch",
    description: "Trade confirmations setting.",
    element: (
      <div className="flex items-center gap-2">
        <Switch id="confirmations" defaultChecked />
        <Label htmlFor="confirmations">Email trade confirmations</Label>
      </div>
    ),
  },
  {
    id: "toggle",
    title: "Toggle + Toggle Group",
    description: "Time horizon controls (demo).",
    element: (
      <div className="flex flex-col gap-3">
        <Toggle aria-label="Mark as priority">Priority</Toggle>
        <ToggleGroup type="single" defaultValue="mid">
          <ToggleGroupItem value="short">0–2y</ToggleGroupItem>
          <ToggleGroupItem value="mid">3–5y</ToggleGroupItem>
          <ToggleGroupItem value="long">5y+</ToggleGroupItem>
        </ToggleGroup>
      </div>
    ),
  },
]

