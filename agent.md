# Project Rules

## Components

- Prefer composing existing shadcn/ui components from `src/components/ui/*`.
- If we need to adjust a shadcn component, modify the existing component instead of creating a duplicate.
- Adding components via `npx shadcn@latest add …` is allowed.
- New custom components should compose existing shadcn/ui components (avoid reinventing UI primitives).
- Keep newly created component files under ~500–600 LOC; if they exceed that, refactor into smaller files.

## Icons

- Use `@phosphor-icons/react` for cards/feature icons and other marketing visuals.

## Logos

- Use `img.logo.dev` for partner logos; the token + helpers live in `src/lib/partners.ts`.
- Only surface logos for verified CWB partners (custodians, brokers, etc) and label them as examples where appropriate.

See `AGENTS.md` for the full agent instruction set.
