# Hotel Restaurant Web Presentation Upgrade Plan

## Goal
Deliver a faster, clearer, and conversion-focused presentation for hotel + restaurant offers, with strong mobile UX and measurable booking impact.

## Phase 1: Foundation (1 sprint)
- Audit performance: LCP, CLS, image payload, unused scripts, JS bundle size.
- Standardize UI layer:
  - shared card/badge/section patterns
  - shared spacing + typography scale
  - color tokens for light/dark blocks
- Move all page galleries to one data-driven model with reusable component API.
- Add SEO base:
  - per-page metadata + OG images
  - schema.org (`Hotel`, `Restaurant`, `EventVenue`)
  - canonical + sitemap verification

## Phase 2: Conversion UX (1 sprint)
- Replace static contact form with validated booking flow:
  - hall/room type
  - date preference
  - guest count
  - budget range
- Add sticky mobile CTA bar with quick actions:
  - call
  - WhatsApp/Viber
  - send inquiry
- Build package comparison section (weddings, business, family events).
- Add social proof strip:
  - review highlights
  - event testimonials
  - trust badges

## Phase 3: Content Depth (1 sprint)
- Add dedicated pages:
  - weddings
  - business events
  - accommodation packages
  - menu experiences
- Add richer media:
  - 15-30s vertical reels
  - before/after event setup sliders
  - chef special carousel
- Add FAQ knowledge blocks by intent:
  - booking process
  - cancellation terms
  - menu customization
  - guest logistics

## Phase 4: Data + Ops (1 sprint)
- Connect lead events to analytics:
  - CTA click
  - form start
  - form submit
  - phone click
- Add admin content workflow:
  - image ordering
  - package updates
  - seasonal offers
- Build monthly reporting dashboard:
  - lead volume
  - conversion by page
  - highest-performing gallery blocks

## Acceptance Metrics
- Mobile Lighthouse Performance >= 85 on key pages.
- Inquiry completion rate +20% compared to current baseline.
- Time to first meaningful action (call/form start) reduced by 25%.
- Bounce rate on landing pages reduced by 15%.

## Suggested Next Implementation Task
Implement Phase 2 first: production-ready booking inquiry flow with validation, tracking events, and CRM/email handoff.
