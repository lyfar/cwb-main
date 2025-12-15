export type PartnerLogo = {
  name: string
  domain: string
}

export const LOGO_DEV_TOKEN = "pk_UhIpCl3nSIm1IAiddSLGfA" as const

export function logoDevUrl(domain: string) {
  const normalized = domain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")

  return `https://img.logo.dev/${normalized}?token=${LOGO_DEV_TOKEN}`
}

export const custodyPartners: PartnerLogo[] = [
  { name: "BNY Mellon", domain: "bnymellon.com" },
  { name: "DBS Bank", domain: "dbs.com" },
  { name: "China Construction Bank", domain: "ccb.com" },
  { name: "Maybank", domain: "maybank2u.com.my" },
]

export const brokeragePartners: PartnerLogo[] = [
  { name: "Haitong Securities", domain: "haitongib.com" },
  { name: "BNY Pershing", domain: "pershing.com" },
  { name: "DBS Vickers", domain: "dbsvonline.com" },
  { name: "Interactive Brokers", domain: "interactivebrokers.com" },
  { name: "iFast Financial", domain: "ifastgm.com" },
  { name: "CGS International", domain: "cgs-cimb.com" },
  { name: "CCB International", domain: "ccbintl.com" },
  { name: "China CITIC Bank International", domain: "cncbinternational.com" },
]

