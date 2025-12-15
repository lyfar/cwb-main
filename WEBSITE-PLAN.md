# CWB Website Improvement Plan (Draft)

This plan translates the patterns observed in `context/websites-research.md` into an actionable roadmap for improving CWB’s site structure, messaging, design system, and content depth while staying aligned with our constraints (compose existing shadcn/ui components, keep custom components small and reusable).

---

## 1) Key takeaways from the research

Across top private banks and wealth firms (e.g., LGT, Lombard Odier, UBS, UBP, EFG), the strongest sites consistently:

- **Lead with trust**: regulation/licensing, longevity/heritage, governance, and risk controls are visible and repeated.
- **Use a simple IA**: clear primary navigation + a deep “What we offer” section (often a dropdown/mega menu).
- **Segment by audience**: “Who we serve” is usually broken down by client type (private, institutional, EAMs, entrepreneurs, etc.).
- **Invest in content**: a persistent **Insights** hub (news, perspectives, market updates) keeps the site alive and improves SEO.
- **Localise for Asia**: Hong Kong/Asia presence is explicit (office, regulators, language options, region selector).
- **Support conversion**: contact CTA is always available; onboarding/process is explained with simple steps.

---

## 2) Goals for CWB’s site

### Business goals
- Increase qualified inbound enquiries (institutional + private).
- Communicate “licensed custodian + investment management” clearly in <10 seconds.
- Reinforce credibility with partners, controls, and governance.

### Product goals
- Consistent premium UI using a small set of reusable primitives.
- Fast, accessible, SEO-friendly static site.
- Light theme default with high contrast; dark theme supported.

---

## 3) Proposed information architecture (IA)

### Navigation (v1 – near-term)
- **Who we are**
  - Overview
  - Regulation & governance (SFC CE AFQ783, controls, ring-fencing)
  - Leadership (if/when ready)
- **Who we serve**
  - Institutional clients
  - Private clients / families
  - Family offices
  - External Asset Managers (EAMs) *(only if applicable)*
- **What we do** (dropdown)
  - Safe custody
  - Asset management
  - Brokerage
  - Banking services
- **Insights** *(new)*
  - Market notes
  - Perspectives
  - Company updates
- **Contacts**

### Footer (v1)
- Company links (same as nav)
- Contacts + address
- **Legal**
  - Privacy policy
  - Terms of use
  - Disclosures / disclaimers *(important for regulated services)*

---

## 4) Page-level upgrades (content + layout)

### Home (`/`)
Keep it scannable and trust-first:
- Hero: 1-line promise + 1–2 lines of “what we are” + CTA.
- Trusted network (logos) as a **standalone strip** (no card backgrounds).
- “What we do” capability cards (already present) + link to each service page.
- “Why CWB” (3–5 differentiators): ring-fencing, segregated custody, open architecture, APAC coverage, operational discipline.
- “How onboarding works” (3–5 steps).
- Latest Insights preview (3 cards) + “View all”.
- Strong final CTA with contact options.

### What we do (`/what-we-do` + service pages)
Standardise all service pages into a repeatable template:
- Above-the-fold: short service definition + primary benefits.
- “How it works” section (steps).
- “Controls & safeguards” section (where relevant).
- “Typical clients / use cases” section (wealth-management specific).
- Partner logos **only when verified** (label as examples).
- FAQ (accordion) + CTA.

### Who we serve (`/who-we-serve`)
Convert from a single page into **audience subpages**:
- Each segment page answers: who it’s for, needs, what we provide, typical engagement model, CTA.

### Who we are (`/who-we-are`)
Add credibility blocks that match industry leaders:
- Licensing & regulatory status (SFC CE AFQ783).
- Controls summary (segregation, reconciliations, governance).
- Operating model (how custody + brokerage + advisory work together).
- Optional: timeline, leadership, and values once content is approved.

### Contacts (`/contacts`)
Make it “conversion ready”:
- Contact form (subject presets: onboarding, custody, trading, banking services).
- Fast channels: email + phone + office map/address.
- Compliance disclaimer under the form (non-advice language).

### Insights (`/insights`) *(new)*
Minimum viable content hub:
- List page with filters (category, topic, date).
- Article template with: author/date, reading time, disclosure block, related posts.
- RSS + sitemap integration (for discovery).

---

## 5) Design system + reusable UI patterns

### Brand system
- Finalise a **brand palette** (light/dark) using our existing OKLCH tokens.
- Define 3–5 reusable backgrounds:
  - Hero mesh gradient (light + dark)
  - Subpage subtle gradient background
  - “Glass” surfaces for cards/overlays

### Component patterns (reuse-focused)
- Cards: standardise 2–3 variants (default / glass / soft).
- Section headers: consistent badge + title + description pattern.
- Logo strips: one reusable “trusted network” component.
- Icons: Phosphor-only, consistent sizes and weights.
- Content blocks: FAQ accordion, step list, quote/testimonial (if used), metrics row.

### Quality bar
- Accessibility: contrast checks (especially in light theme), focus states, keyboard nav.
- Performance: avoid heavy client components outside hero; prefer server components for content pages.

---

## 6) SEO, compliance, and trust signals

### SEO foundation
- Page titles/descriptions for all pages.
- OpenGraph/Twitter previews.
- Sitemap + robots.
- Structured data: `Organization`, `LocalBusiness`, `WebSite` (as appropriate).

### Compliance + disclosures
- Site-wide disclosure/footer note (non-advice, jurisdiction, risk statement).
- Dedicated disclosures page (reviewed by compliance).
- Add “Regulated by SFC” language consistently where needed.

### Trust signals
- “SFC CE AFQ783” visible in header/footer and on “Who we are”.
- Verified partner network (logos) + optional short explanation (“examples”).
- Optionally: governance/process snippets (segregation, reconciliations, no prop trading).

---

## 7) Milestones (practical execution plan)

### Phase 1 — Structure + navigation (1–2 weeks)
- Add `/insights` placeholder + routing.
- Split “Who we serve” into segment pages.
- Add footer “Legal” section + placeholder legal pages.
- Align all pages with a consistent section/header pattern.

### Phase 2 — Content depth (1–2 weeks)
- Expand each service page with “How it works”, “Controls”, “FAQ”.
- Add onboarding flow visuals (simple steps first; diagrams optional).
- Improve “Who we are” with governance + operating model.

### Phase 3 — Insights MVP (1–2 weeks)
- MDX-based articles (or another agreed content method).
- List page filters + related content.
- Add disclosures to article template.

### Phase 4 — Localisation + polish (ongoing)
- Language strategy (EN first; add 中文 when copy approved).
- Final brand color calibration + imagery guidelines.
- Lighthouse/performance pass + accessibility audit.

---

## 8) Open questions (needs decisions)

- Do we want **audience segmentation** as a first-class nav item (e.g., “Private / Institutional / EAM”)?
- Is Chinese (繁體中文) required for v1 or v2?
- Which partners/logos are “verified” and safe to display publicly?
- Do we need a secure client area/login link (now or later)?

