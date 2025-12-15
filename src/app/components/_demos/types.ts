import type { ReactNode } from "react"

export type ComponentDemo = {
  id: string
  title: string
  description?: string
  fullWidth?: boolean
  element: ReactNode
}
