# AUDIT_BEFORE.md — Pre-Rebuild State
**Date:** 2026-05-31  
**Branch:** kiro-uiux-rebuild  
**Auditor:** Kiro (Senior Frontend Engineer + UI/UX Designer)

---

## 1. UI/UX Issues

### Hero Section
- Hero kicker color (`--accent` green) clashes with the dark hero background on some gym archetypes
- Hero status card has no visual separator between city name and hours text
- Hero actions buttons stack awkwardly on mid-size screens (768–900px)
- `hero-kicker` font size jumps too aggressively between breakpoints (clamp 1.25rem → 2rem)
- Hero grid gap is inconsistent — too wide on desktop, too narrow on tablet

### Cards
- `info-card` has no `margin-top` on the `<span>` label, causing label to merge with card border
- `program-card` image height (220px) is too short — images feel cropped and unbalanced
- `price-card` has no visual distinction between the 3 options except the `featured` class
- `directory-card` hover state only changes border color — no background shift, feels weak
- `support-card` and `map-card` lack a top accent line or visual anchor
- Gallery card caption overlay starts too high (only 52px visible) — feels hidden

### Typography
- `h2` line-height of 0.94 is too tight — descenders clip on Indonesian text
- `h3` line-height of 1.0 is too tight for multi-line headings
- Body text `clamp(1rem, 1.35vw, 1.1rem)` — the 1.35vw step is too aggressive, causes text to shrink on mid-size screens
- `eyebrow` letter-spacing 0.16em is excessive — reduces readability
- Footer `h2` uses heading font but is sized at 1.5rem — inconsistent with section headings

### Spacing
- Section padding `clamp(68px, 8vw, 116px)` — 8vw is too aggressive, creates uneven rhythm
- `section-heading` margin-bottom 34px is too small for large headings
- `info-grid` gap of 14px is too tight for 4-column layout
- `footer-grid` gap of 26px is inconsistent with other grid gaps
- `hero-actions` margin-top 28px — should be larger to breathe from hero-text

### Visual Hierarchy
- All sections use the same card style — no visual differentiation between primary/secondary content
- CTA sections (`#join`, `#reviews`) feel identical — no escalating urgency
- FAQ items have no expand/collapse indicator (no chevron icon)
- Filter buttons have no count badge or active indicator beyond color

---

## 2. Code Quality Issues

### CSS Architecture
- CSS is structured as one monolithic file with 3 appended patches (base + breathable theme + mobile)
- The breathable theme patch overrides many base rules with specificity hacks (`#quick-info`, `#membership`, etc.)
- `color-mix()` used extensively — not supported in older browsers (Safari < 16.2)
- `body::after` fixed overlay uses `z-index: -1` which can cause stacking context issues
- `.nav-shell` uses `position: relative` implicitly but `nav-links` dropdown uses `position: absolute` without explicit parent positioning
- `will-change: transform, opacity` applied to 3 elements globally — should be applied only during animation
- Duplicate `overflow-x: hidden` declarations across multiple selectors

### JavaScript
- `ScrollMotionController` and GSAP block both run independently — potential double-animation on elements
- `initNav()` IntersectionObserver threshold 0.28 is too high — sections don't trigger active state reliably on mobile
- `imageFallback()` uses `document.addEventListener('error', ...)` — this fires for ALL errors, not just images
- `initFaq()` uses `toggle` event which fires on both open and close — the `if (!item.open) return` guard is correct but fragile
- No `DOMContentLoaded` guard — script runs immediately, relies on `defer` attribute
- GSAP `gsap.set('.reveal', { autoAlpha: 0, y: 28 })` conflicts with CSS `.reveal` opacity:0 state — double-hidden elements
- `ScrollTrigger.batch()` `end: 'bottom 8%'` is too aggressive — elements exit animation too early

### Generator
- `buildSharedCss()` and `buildSharedJs()` return inline strings — hard to maintain, no syntax highlighting
- `featuredCopy` only covers 8 of 27 gyms — 19 gyms get generic auto-generated copy
- `headlineText()` for `local` archetype always returns "Gym lokal untuk latihan rutin, kelas, dan pendampingan dasar." — identical for 8+ gyms
- `introText()` fallback is generic and repetitive across gyms
- `buildGallery()` always uses `imgs.slice(0, 4)` — first image is always the hero image, causing duplication
- `programTag()` regex is basic — "boxing" would match "bodybuilding" incorrectly
- No `robots` meta tag generated
- `metaTitle()` format `${gym.name} ${city} | Info Lokasi, Fasilitas, dan Kontak` — city is repeated when gym name already contains city

---

## 3. SEO Issues

- No `<meta name="robots" content="index, follow">` on any page
- No `<meta name="author">` tag
- No `<link rel="alternate" hreflang="id">` for Indonesian language targeting
- JSON-LD `openingHours` field uses free-text Indonesian — should use ISO 8601 format (e.g. `Mo-Su 06:00-21:00`)
- `og:image` always uses the first image from the archetype set — not gym-specific
- No `og:locale` tag (`id_ID`)
- No `twitter:card` meta tags
- Directory pages (`index.html`, `gyms/index.html`) have identical canonical URLs — both point to `https://project-xc6z6.vercel.app/`
- `metaTitle()` for gyms with city in name creates redundancy: "Evolution Fitness Malang Malang | ..."

---

## 4. Accessibility Issues

- FAQ `<summary>` has no expand/collapse indicator — screen readers can't tell state
- Gallery `<button>` elements have no `aria-label` — only contain images and spans
- `<details>` FAQ items: when JS closes them, `open` attribute is removed but no `aria-expanded` equivalent fires
- `nav-links` dropdown: when open on mobile, focus is not trapped — Tab key escapes the menu
- `hero-status` aside has `aria-label` but its content is not structured with proper heading hierarchy
- `filter-bar` buttons have no `aria-pressed` state
- `program-card` articles have no `aria-label` — just `<h3>` inside
- Lightbox `<img data-lightbox-image>` starts with empty `alt=""` — should have descriptive alt before image loads
- Color contrast: `--muted: rgba(248, 250, 252, 0.74)` on dark backgrounds may fail WCAG AA (4.5:1) at small sizes
- `sticky-cta` has no `role="complementary"` or `aria-label`
- Skip link uses `position: fixed` + `transform` — may not work correctly in all screen readers

---

## 5. Mobile Issues

- At 375px, hero h1 `clamp(2.3rem, 11vw, 2.9rem)` = ~41px — still very large, pushes content below fold
- `hero-status` card on mobile appears below hero copy but has no top margin
- `sticky-cta` on mobile switches to `position: sticky` — this means it only sticks within its scroll container, not the viewport
- `nav-links` dropdown on mobile has `position: absolute` but parent `.nav-shell` has no `position: relative` — dropdown may overflow incorrectly
- `gallery-card span` on mobile is always visible (transform: none) — the hover reveal effect is disabled, but the caption takes up significant space
- `footer-grid` at 760px switches to 2-col but at 520px stays 2-col — should go 1-col on very small screens
- `program-card` images at 220px height on mobile feel too tall relative to card width

---

## 6. Animation Issues

- GSAP `gsap.set('.reveal', { autoAlpha: 0, y: 28 })` runs before CSS transitions are set — causes flash of invisible content
- `ScrollTrigger.batch()` and CSS `IntersectionObserver` both observe `.reveal` elements — double observation
- Hero entrance animations (`gsap.from('.hero h1', ...)`) don't account for `prefers-reduced-motion` check at the GSAP level (only checked at block entry)
- `transitionDelay` stagger in `ScrollMotionController` uses `Math.min(i % 4, 3) * 45ms` — max 135ms delay, but with many cards this creates visible lag
- Parallax `--parallax-y` CSS variable update runs in `requestAnimationFrame` but is also triggered by GSAP ScrollTrigger — potential conflict
- Card hover GSAP animations don't reset properly if pointer leaves during animation

---

## 7. Performance Issues

- No `<link rel="preload">` for hero images (only `fetchpriority="high"` on img)
- GSAP loaded from CDN with `defer` — but GSAP enhancement block runs immediately in IIFE, relying on `ready()` wrapper
- `will-change: transform, opacity` on `.hero-media img, .nav-shell, .sticky-cta` — these are always active, consuming GPU memory
- `backdrop-filter: blur(18px)` on nav, cards, lightbox — expensive on mobile GPUs
- `body::after` fixed overlay with gradient — always composited, adds layer
- No image `sizes` attribute on any `<img>` — browser can't optimize responsive image loading
- `color-mix()` computed at paint time — minor but adds style recalculation cost
- `repeating-linear-gradient` on body background — repaints on scroll

---

## 8. Placeholder/Data Risks

- `gyms.config.json` `hours` field for many gyms: "Konfirmasi jam operasional terbaru melalui kanal resmi sebelum berkunjung." — generic, not gym-specific
- `source` field for some gyms: "Instagram" only — weak sourcing
- `fitnessworks-black-lanners` primary color `#111827` (near-black) — brand mark will be invisible on dark nav
- `speedrocky-gym` contactUrl is `tel:+62315932336` — not a valid WhatsApp/web URL, will fail `assertLocalRefs` if treated as local ref (it won't, but UX is poor)
- `blackbox-gym-bausasran` primary color `#ffffff` (white) — brand mark text will be invisible on white background
- `osbond-gym` contactUrl is `https://www.osbondgym.com/contact-us` — external URL, not WhatsApp

---

## Summary Scores (Estimated Pre-Rebuild)

| Category | Score | Notes |
|---|---|---|
| UI/UX Design | 62/100 | Functional but template-like, inconsistent spacing |
| CSS Architecture | 58/100 | Monolithic, patch-based, specificity issues |
| JavaScript Quality | 70/100 | Good patterns but double-animation risk |
| SEO | 72/100 | Good basics, missing robots/hreflang/twitter |
| Accessibility | 65/100 | Skip link present, but many ARIA gaps |
| Mobile Experience | 68/100 | Works but sticky CTA and nav have issues |
| Performance | 64/100 | No preload, always-on will-change, heavy backdrop-filter |
| Generator Quality | 74/100 | Good architecture, but generic copy for 19/27 gyms |

**Overall: 67/100** — Solid foundation, needs systematic improvement.
