"use client"

import * as React from "react"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Info } from "@phosphor-icons/react"

import type { ComponentDemo } from "./types"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const holdings = [
  { name: "Global Equity ETF", ticker: "ACWI", allocation: "38%", value: "$1.42M" },
  { name: "US Treasury 10Y", ticker: "UST10", allocation: "22%", value: "$0.82M" },
  { name: "Investment Grade Credit", ticker: "LQD", allocation: "18%", value: "$0.67M" },
  { name: "Alternatives Sleeve", ticker: "ALT", allocation: "12%", value: "$0.45M" },
  { name: "Cash (HKD)", ticker: "HKD", allocation: "10%", value: "$0.37M" },
] as const

const performanceData: Array<{
  month: string
  portfolio: number
  benchmark: number
}> = [
  { month: "Jan", portfolio: 1.8, benchmark: 1.2 },
  { month: "Feb", portfolio: 2.5, benchmark: 1.9 },
  { month: "Mar", portfolio: -0.8, benchmark: -1.1 },
  { month: "Apr", portfolio: 1.1, benchmark: 0.7 },
  { month: "May", portfolio: 2.2, benchmark: 1.6 },
  { month: "Jun", portfolio: 1.4, benchmark: 1.0 },
]

const performanceConfig = {
  portfolio: { label: "Portfolio", color: "var(--chart-1)" },
  benchmark: { label: "Benchmark", color: "var(--chart-2)" },
} satisfies ChartConfig

function SidebarDemo() {
  return (
    <SidebarProvider className="min-h-0 h-[22rem] overflow-hidden rounded-lg border">
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-2">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-medium">Client portal</div>
            <SidebarTrigger aria-label="Toggle sidebar" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Portfolio</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Transactions</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Statements</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Settings</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <div className="text-muted-foreground text-xs">
            Tip: press <span className="font-mono">⌘</span> <span className="font-mono">B</span>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <div className="flex items-center justify-between gap-2 border-b p-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Account</Badge>
            <div className="text-sm font-medium">Chan Family Office</div>
          </div>
          <Button size="sm" variant="outline">
            New instruction
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center p-4 text-sm">
          Main content area
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const foundationDemos: ComponentDemo[] = [
  {
    id: "badge",
    title: "Badge",
    description: "Client + compliance tags.",
    element: (
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Institutional</Badge>
        <Badge variant="secondary">Private client</Badge>
        <Badge variant="outline">SFC CE AFQ783</Badge>
      </div>
    ),
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    element: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/who-we-serve">Clients</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Chan Family Office</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Portfolio</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
  {
    id: "navigation-menu",
    title: "Navigation Menu",
    description: "Example top-level navigation for a client portal.",
    element: (
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Portfolios</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#" className="block w-64">
                <div className="font-medium">Model portfolios</div>
                <div className="text-muted-foreground text-sm">
                  Allocation templates and investment policy.
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Research</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#" className="block w-64">
                <div className="font-medium">Market insights</div>
                <div className="text-muted-foreground text-sm">
                  Notes, themes, and risk indicators.
                </div>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
  },
  {
    id: "menubar",
    title: "Menubar",
    description: "Actions for statements and exports.",
    element: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Reports</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Monthly statement</MenubarItem>
            <MenubarItem>Holdings report</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Export CSV…</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Profile</MenubarItem>
            <MenubarItem>Permissions</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Example transaction pagination.",
    element: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  },
  {
    id: "tabs",
    title: "Tabs",
    description: "Portfolio sections.",
    element: (
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-muted-foreground text-sm">
          Performance snapshot and risk notes.
        </TabsContent>
        <TabsContent value="holdings" className="text-muted-foreground text-sm">
          Allocation and holdings table.
        </TabsContent>
        <TabsContent value="activity" className="text-muted-foreground text-sm">
          Trades, cash movements, and settlements.
        </TabsContent>
      </Tabs>
    ),
  },
  {
    id: "table",
    title: "Table",
    description: "Sample holdings table.",
    element: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Holding</TableHead>
            <TableHead>Ticker</TableHead>
            <TableHead>Allocation</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holdings.map((h) => (
            <TableRow key={h.ticker}>
              <TableCell>{h.name}</TableCell>
              <TableCell className="font-mono">{h.ticker}</TableCell>
              <TableCell>{h.allocation}</TableCell>
              <TableCell>{h.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
  },
  {
    id: "chart",
    title: "Chart",
    description: "Portfolio vs benchmark (demo data).",
    element: (
      <ChartContainer config={performanceConfig} className="h-48 w-full">
        <BarChart data={performanceData} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="portfolio" fill="var(--color-portfolio)" radius={4} />
          <Bar dataKey="benchmark" fill="var(--color-benchmark)" radius={4} />
        </BarChart>
      </ChartContainer>
    ),
  },
  {
    id: "progress",
    title: "Progress",
    description: "Onboarding completion example.",
    element: (
      <div className="space-y-2">
        <div className="text-muted-foreground text-sm">KYC onboarding: 72%</div>
        <Progress value={72} />
      </div>
    ),
  },
  {
    id: "separator",
    title: "Separator",
    element: (
      <div className="space-y-3">
        <div className="text-sm font-medium">Risk controls</div>
        <Separator />
        <div className="text-muted-foreground text-sm">
          Segregated accounts and ring-fenced assets.
        </div>
      </div>
    ),
  },
  {
    id: "scroll-area",
    title: "Scroll Area",
    description: "Recent client instructions.",
    element: (
      <ScrollArea className="h-32 rounded-md border p-3">
        <div className="space-y-2 text-sm">
          {[
            "Wire transfer request (HKD)",
            "Buy order: ACWI",
            "Statement export: May",
            "FX conversion: USD → HKD",
            "Sell order: UST10",
            "Subscription: fund allocation",
          ].map((item) => (
            <div key={item} className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate">{item}</span>
              <Badge variant="outline">Queued</Badge>
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
  },
  {
    id: "resizable",
    title: "Resizable",
    description: "Example split view.",
    element: (
      <div className="h-40 rounded-md border">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={55} minSize={20}>
            <div className="bg-muted flex h-full items-center justify-center text-sm">
              Holdings
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={45} minSize={20}>
            <div className="flex h-full items-center justify-center text-sm">
              Activity
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    ),
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "Explain metrics without clutter.",
    element: (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Info className="size-4" />
            AUM
          </Button>
        </TooltipTrigger>
        <TooltipContent>Assets under management (demo label).</TooltipContent>
      </Tooltip>
    ),
  },
  {
    id: "skeleton",
    title: "Skeleton",
    element: (
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    ),
  },
  {
    id: "spinner",
    title: "Spinner",
    element: (
      <div className="flex items-center gap-2 text-sm">
        <Spinner />
        Syncing custodian feed…
      </div>
    ),
  },
  {
    id: "sidebar",
    title: "Sidebar",
    fullWidth: true,
    element: <SidebarDemo />,
  },
]
