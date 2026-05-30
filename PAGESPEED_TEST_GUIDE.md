# PAGESPEED_TEST_GUIDE.md
**Date:** 2026-05-31

---

## How to Test PageSpeed After Deployment

### 1. Google PageSpeed Insights
URL: https://pagespeed.web.dev/

Test these pages:
- Homepage: `https://project-xc6z6.vercel.app/`
- Priority gym: `https://project-xc6z6.vercel.app/evolution-fitness-malang/`
- Chain gym: `https://project-xc6z6.vercel.app/ftl-gym/`
- Wellness gym: `https://project-xc6z6.vercel.app/ocigen-fitness/`

Test both **Mobile** and **Desktop** tabs.

---

## Expected Scores After Rebuild

| Metric | Before (est.) | After (est.) |
|---|---|---|
| Performance | 72 | 84+ |
| Accessibility | 78 | 90+ |
| Best Practices | 85 | 92+ |
| SEO | 82 | 95+ |

---

## Key Improvements That Affect PageSpeed

### Performance
- `<link rel="preload" as="image">` on hero image → reduces LCP
- `loading="lazy"` on all non-hero images → reduces initial load
- `fetchpriority="high"` on hero img → prioritizes LCP resource
- GSAP loaded with `defer` → non-blocking
- No render-blocking CSS (single stylesheet, no @import)
- `will-change` only applied during animation (via `body.gsap-ready`) → reduces GPU memory

### Accessibility
- Skip link present on all pages
- All images have descriptive `alt` text
- `aria-label` on gallery buttons
- `aria-pressed` on filter buttons
- `aria-expanded` on mobile menu toggle
- `aria-hidden` on lightbox when closed
- Focus management in lightbox (trap + restore)
- `prefers-reduced-motion` disables all animations
- `prefers-contrast` increases text opacity

### SEO
- Unique `<title>` per page
- Unique `<meta name="description">` per page
- `<link rel="canonical">` pointing to production URL
- `<meta name="robots" content="index, follow">`
- `<meta property="og:*">` complete set
- `<meta name="twitter:card">` complete set
- JSON-LD `HealthClub` structured data per gym page
- JSON-LD `ItemList` on directory pages
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<aside>`
- Single `<h1>` per page
- Logical heading hierarchy (h1 → h2 → h3)

---

## Core Web Vitals Targets

| Metric | Target | Notes |
|---|---|---|
| LCP | < 2.5s | Hero image preloaded + fetchpriority=high |
| FID/INP | < 200ms | Minimal JS, deferred GSAP |
| CLS | < 0.1 | Images have explicit width/height attributes |
| FCP | < 1.8s | Single CSS file, no render-blocking resources |
| TTFB | < 600ms | Vercel Edge Network (static files) |

---

## Manual Accessibility Testing

For full WCAG 2.1 AA compliance, also test with:
- **Screen reader**: NVDA (Windows) or VoiceOver (Mac/iOS)
- **Keyboard navigation**: Tab through all interactive elements
- **Color contrast**: Use browser DevTools accessibility panel
- **Zoom**: Test at 200% zoom for text reflow

Note: Full WCAG validation requires manual testing with assistive technologies and expert accessibility review.
