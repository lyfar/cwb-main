"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Sparkle } from "@phosphor-icons/react"
import { toast } from "sonner"

import type { ComponentDemo } from "./types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const interactiveCoreDemos: ComponentDemo[] = [
  {
    id: "hero",
    title: "Hero",
    description: "Used on the home page.",
    element: (
      <div className="flex items-center justify-between gap-3">
        <div className="text-muted-foreground text-sm">
          Preview the marketing hero on the home page.
        </div>
        <Button asChild variant="outline">
          <Link href="/">Open home</Link>
        </Button>
      </div>
    ),
  },
  {
    id: "accordion",
    title: "Accordion",
    description: "Investment policy (sample).",
    element: (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="risk">
          <AccordionTrigger>Risk profile</AccordionTrigger>
          <AccordionContent>
            Define objectives, liquidity needs, and downside tolerance.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="allocation">
          <AccordionTrigger>Strategic allocation</AccordionTrigger>
          <AccordionContent>
            Diversified mix across global equities, rates, credit, and
            alternatives.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    id: "alert",
    title: "Alert",
    description: "Market + risk notice.",
    element: (
      <Alert>
        <AlertTitle>Risk disclosure</AlertTitle>
        <AlertDescription>
          Markets can move rapidly and past performance is not indicative of
          future results.
        </AlertDescription>
      </Alert>
    ),
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    description: "Confirm cancelling a trade.",
    element: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Cancel order</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep</AlertDialogCancel>
            <AlertDialogAction>Cancel order</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  {
    id: "aspect-ratio",
    title: "Aspect Ratio",
    description: "Statement preview placeholder.",
    element: (
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
        <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
          Monthly statement preview
        </div>
      </AspectRatio>
    ),
  },
  {
    id: "avatar",
    title: "Avatar",
    description: "Relationship manager (example).",
    element: (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="RM" />
          <AvatarFallback>RM</AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <div className="font-medium leading-none">Relationship Manager</div>
          <div className="text-muted-foreground mt-1">Dedicated support</div>
        </div>
      </div>
    ),
  },
  {
    id: "button",
    title: "Button",
    description: "Actions (trade ticket style).",
    element: (
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => toast("Instruction submitted (demo)")}>
          Submit instruction
        </Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    ),
  },
  {
    id: "button-group",
    title: "Button Group",
    description: "Buy / Sell toggle.",
    element: (
      <div className="flex flex-col gap-3">
        <ButtonGroup>
          <Button variant="outline">Buy</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Sell</Button>
        </ButtonGroup>
        <ButtonGroupText>
          <Sparkle className="size-4" />
          Order type
        </ButtonGroupText>
      </div>
    ),
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "Select settlement date.",
    element: <Calendar />,
  },
  {
    id: "carousel",
    title: "Carousel",
    description: "Market insights (sample).",
    element: (
      <div className="mx-auto w-full max-w-xs">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {["Rates", "Credit", "Equities"].map((topic) => (
              <CarouselItem key={topic}>
                <div className="bg-muted flex aspect-square items-center justify-center rounded-md text-sm">
                  {topic} note
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    ),
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "Compliance attestation.",
    element: (
      <div className="flex items-center gap-2">
        <Checkbox id="bo" defaultChecked />
        <Label htmlFor="bo">I confirm beneficial ownership details</Label>
      </div>
    ),
  },
  {
    id: "collapsible",
    title: "Collapsible",
    description: "Fee breakdown.",
    element: (
      <Collapsible defaultOpen className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Fees</div>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              Toggle
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="text-muted-foreground rounded-md border p-3 text-sm">
          Custody, execution, and service fees vary by product and market.
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    id: "command",
    title: "Command",
    description: "Instrument search (mock).",
    element: (
      <div className="rounded-md border">
        <Command>
          <CommandInput placeholder="Search tickers, ISINs, funds..." />
          <CommandList>
            <CommandEmpty>No instruments found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Check className="size-4" />
                ACWI
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
              <CommandItem>UST10</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>New order</CommandItem>
              <CommandItem>Export statement</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    ),
  },
  {
    id: "context-menu",
    title: "Context Menu",
    description: "Right-click the transaction.",
    element: (
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="bg-muted flex h-20 items-center justify-center rounded-md text-sm">
            Transaction row
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem onSelect={() => toast("Copied reference")}>
            Copy reference
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => toast("Exported PDF")}>
            Export PDF
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onSelect={() => toast("Flagged")}>
            Flag for review
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    id: "dialog",
    title: "Dialog",
    description: "Update investor profile (sample).",
    element: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Update profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Investor profile</DialogTitle>
            <DialogDescription>
              Update details used for suitability and risk settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="investor-name">Name</Label>
            <Input id="investor-name" defaultValue="Chan Family Office" />
          </div>
          <DialogFooter>
            <Button onClick={() => toast.success("Saved (demo)")}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    id: "drawer",
    title: "Drawer",
    description: "Quick transfer (sample).",
    element: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open transfer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Transfer</DrawerTitle>
            <DrawerDescription>
              Provide instructions via recorded line or email in production.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 text-sm">
            Demo drawer content for cash movement instructions.
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
  },
]

