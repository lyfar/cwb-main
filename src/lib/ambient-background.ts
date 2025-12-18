export const AMBIENT_BACKGROUND_STORAGE_KEY = "cwb-ambient"
export const AMBIENT_BACKGROUND_EVENT = "cwb:ambient-background"

export function getAmbientBackgroundEnabled() {
  if (typeof window === "undefined") return true

  try {
    return window.localStorage.getItem(AMBIENT_BACKGROUND_STORAGE_KEY) !== "off"
  } catch {
    return true
  }
}

export function setAmbientBackgroundEnabled(enabled: boolean) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(
      AMBIENT_BACKGROUND_STORAGE_KEY,
      enabled ? "on" : "off"
    )
  } catch {
    // ignore
  }

  try {
    document.documentElement.classList.toggle("no-ambient", !enabled)
  } catch {
    // ignore
  }

  window.dispatchEvent(new Event(AMBIENT_BACKGROUND_EVENT))
}

