import type { Locale } from "@/lib/locale"

export function formatTradeAssetLabel(asset: string, locale: Locale) {
  if (locale !== "ru") return asset

  const assetClassMap: Record<string, string> = {
    "Equities & ETFs": "Акции и ETF",
    "Bonds / Fixed income": "Облигации",
  }

  const detailMap: Record<string, string> = {
    "US / EU equities": "Акции США / ЕС",
    "HK equities": "Акции Гонконга",
    "Malaysia / Japan / Taiwan equities": "Акции Малайзии / Японии / Тайваня",
    "China Stock Connect": "China Stock Connect",
    "US treasuries": "Казначейские облигации США",
    "Other bonds": "Прочие облигации",
  }

  const simpleMap: Record<string, string> = {
    "Mutual funds": "Паевые фонды",
    "Money market funds": "Фонды денежного рынка",
    "Alternative funds": "Альтернативные фонды",
    "Options & futures": "Опционы и фьючерсы",
    "Structured products, certificates & other derivatives":
      "Структурные продукты, сертификаты и др. деривативы",
    "Foreign exchange": "FX",
  }

  if (asset.includes("—")) {
    const [assetClassRaw, detailRaw] = asset.split("—")
    const assetClass = assetClassRaw?.trim() ?? asset.trim()
    const detail = detailRaw?.trim() ?? asset.trim()
    return `${assetClassMap[assetClass] ?? assetClass} — ${detailMap[detail] ?? detail}`
  }

  return simpleMap[asset] ?? asset
}

