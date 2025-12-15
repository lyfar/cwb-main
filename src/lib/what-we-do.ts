export type WhatWeDoItem = {
  id: "overview" | "safe-custody" | "asset-management" | "brokerage"
  title: string
  href: string
  description: string
}

export const whatWeDoItems: WhatWeDoItem[] = [
  {
    id: "overview",
    title: "Overview",
    href: "/what-we-do",
    description: "All capabilities at a glance.",
  },
  {
    id: "safe-custody",
    title: "Safe custody",
    href: "/what-we-do/safe-custody",
    description: "Segregated safekeeping with top-tier global custodians.",
  },
  {
    id: "asset-management",
    title: "Asset management",
    href: "/what-we-do/asset-management",
    description: "Open-architecture access to public and private opportunities.",
  },
  {
    id: "brokerage",
    title: "Brokerage",
    href: "/what-we-do/brokerage",
    description: "Execution and market access across global + APAC venues.",
  },
]

