export type WhoWeServeItem = {
  id: "overview" | "institutional-clients" | "private-clients" | "family-offices"
  title: string
  href: string
  description: string
}

export const whoWeServeItems: WhoWeServeItem[] = [
  {
    id: "overview",
    title: "Overview",
    href: "/who-we-serve",
    description: "Client segments we support.",
  },
  {
    id: "institutional-clients",
    title: "Institutional clients",
    href: "/who-we-serve/institutional-clients",
    description: "Funds, asset managers, and treasuries needing robust controls.",
  },
  {
    id: "private-clients",
    title: "Private clients",
    href: "/who-we-serve/private-clients",
    description: "HNW individuals and families seeking a private banking–style experience.",
  },
  {
    id: "family-offices",
    title: "Family offices",
    href: "/who-we-serve/family-offices",
    description: "Governance, reporting, and open-architecture access across markets.",
  },
]

