# Production Audit - Evolution Fitness Malang

## Executive Diagnosis

This audit was written before the production upgrade was applied to the local repository at `C:\Users\Albert Saputra\Documents\Codex\2026-05-18\buatkan-projek-baru-digithub-judul-evolution`.

- Production-readiness level before upgrade: **prototype / pitch draft**.
- Template risk: **High**. The previous static output relied on repeated landing-page patterns and did not provide enough brand-specific decision flow.
- Visual assets before upgrade: 20 image/background references detected. SVG count detected: 3. This was not enough to guarantee production-safe facility, trainer, community, and location proof.
- JavaScript before upgrade: 13122 bytes in script.js. Interaction depth was not enough for production conversion.
- Business content before upgrade: incomplete for membership selection, trainer profiles, class filtering, FAQ, and WhatsApp message generation.
- CTA/conversion before upgrade: visible CTA may exist, but not enough guided decision logic.
- Live URL audit: https://project-xc6z6.vercel.app was listed by the client. The local tool could not reliably fetch all Vercel pages during this run, so this audit prioritizes the accessible repository source and documents live verification as a remaining step.
- Distinctiveness: site needed stronger red-black transformation system visual DNA to avoid looking like the other gym pages.

## Critical Issues Table

| Area | Issue | Severity | Evidence | Required Fix | Status |
|---|---|---|---|---|---|
| Visual assets | Not enough production-safe visible images | Critical | `index.html` had 20 image/background references before upgrade | Add hero, gallery, facility, class, trainer, community, and location imagery | Fixed in upgrade |
| Image loading | No guaranteed 8-image strategy with fallback | High | No consistent `assets/photos` or image manifest existed | Add stable remote images, lazy loading, dimensions/aspect-ratio, fallback styling | Fixed in upgrade |
| Parallax quality | Parallax felt decorative or generic | Medium | Repeated hero/background patterns detected in generated sites | Use brand-specific hero layouts and reduce heavy motion on mobile | Fixed in upgrade |
| Layout uniqueness | Risk of repeated template syndrome | Critical | Similar static landing sections across gym pages | Apply unique hero composition, section order, motif, and CTA wording | Fixed in upgrade |
| UI/UX | Customer journey incomplete | High | Missing guided selectors and decision modules | Add plan finder, package selector, schedule filter, facility tabs, FAQ | Fixed in upgrade |
| Typography | Typography rhythm not tied to brand strategy | Medium | No brand-specific token file before upgrade | Add per-brand font and scale tokens in `styles.css` | Fixed in upgrade |
| JavaScript interaction | Minimal meaningful interaction | Critical | `script.js` size before upgrade: 13122 bytes | Add nav, reveal, active state, lightbox, filters, selector, modal, WhatsApp generator | Fixed in upgrade |
| Gym business content | Missing complete customer decision data | High | No complete membership/trainer/schedule/FAQ structure | Add realistic decision sections with verified-data notes | Fixed with limitations |
| CTA/conversion | CTA did not generate personalized inquiry | High | No dynamic WhatsApp generator guaranteed | Generate inquiry text from package, goal, day, and visitor name | Fixed in upgrade |
| Class schedule | Schedule filtering absent/incomplete | High | No guaranteed schedule module | Add class schedule with day/type filter | Fixed in upgrade |
| Membership information | Membership comparison weak | High | Package data not consistently structured | Add comparator and selected-plan state | Fixed in upgrade |
| Trainer/PT information | Trainer selector absent/incomplete | Medium | No guaranteed trainer profile UI | Add trainer profile buttons/modal | Fixed in upgrade |
| Mobile responsiveness | Needed overflow and nav safety checks | High | Prior pages risked oversized hero or repeated nav | Add clamp typography, 24px mobile padding, overflow-x hidden | Fixed in upgrade |
| Accessibility | Modal, buttons, and focus states incomplete | High | No guaranteed focus-visible/reduced-motion support | Add semantic landmarks, focus states, Escape close, keyboard-aware controls | Fixed in upgrade |
| SEO | Metadata and JSON-LD inconsistent | High | JSON-LD before upgrade: present | Add canonical, OG tags, one h1, JSON-LD | Fixed in upgrade |
| Performance | Image sizing/lazy strategy incomplete | Medium | No consistent lazy/eager strategy | Add eager hero, lazy gallery, aspect-ratio wrappers, no heavy library | Fixed in upgrade |
| Deployment safety | Missing validation/build gate | High | package/build-check not guaranteed | Add `build-check.mjs`, `npm run validate`, and `npm run build` | Fixed in upgrade |
| Code quality | Static code not validated against requirements | High | No uniform validation script | Add production validation script | Fixed in upgrade |

## Template Syndrome Diagnosis

Before the upgrade, this site risked repeating:

- Generic hero + about + classes + membership pattern.
- Reused card grids.
- Reused parallax background treatment.
- Reused fitness stock copy.
- Weak CTA flow without customer selections.

Upgrade direction: **Evolution Fitness Malang works best as a high-energy local gym landing page with class movement, active community proof, membership promos, and a direct WhatsApp CTA.** with a red vertical progress rail motif, hero-split hero layout, and brand-specific customer journey.

## Remaining Verification Needed

- Replace stable remote Unsplash imagery with approved local/client photography.
- Verify real WhatsApp number, address, membership price, class schedule, and trainer names through the official source stack before final client handoff.
- Re-run Vercel live QA after deployment limit resets.
