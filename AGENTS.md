# Agent Instructions

## Components & UI

- Prefer composing existing shadcn/ui components in `src/components/ui/*`.
- If we need to change a shadcn/ui component, modify the existing file rather than duplicating it.
- Adding new shadcn/ui components via `npx shadcn@latest add …` (including third-party registries) is allowed.
- When creating app/site components, build them by composing existing UI components and Tailwind utility classes.
- Keep newly created component files under ~500–600 LOC; if they grow beyond that, refactor into smaller components/modules.

## Icons

- Use `@phosphor-icons/react` for product/marketing icons (cards, feature lists, etc).
- Keep icon sizing consistent (`className="size-5"` / `size-6`) and avoid hardcoding colors; rely on CSS variables / currentColor.

## Logos

- Use `img.logo.dev` for partner logos; token + helpers live in `src/lib/partners.ts`.
- Only surface logos for verified CWB partners and label them as examples where appropriate.
