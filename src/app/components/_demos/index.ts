import type { ComponentDemo } from "./types"
import { foundationDemos } from "./demos-foundation"
import { interactiveCoreDemos } from "./demos-interactive-core"
import { interactiveFormDemos } from "./demos-interactive-forms"

export const componentDemos: ComponentDemo[] = [
  ...foundationDemos,
  ...interactiveCoreDemos,
  ...interactiveFormDemos,
]
