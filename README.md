# Evolution 20 Gym

Premium static landing page for a transformation-focused fitness brand.

## Built From

- `product-spec-scroll-animation-v1.0/01-PRD-bidirectional-scroll-animation.docx`
- `product-spec-scroll-animation-v1.0/02-SRS-bidirectional-scroll-animation.docx`
- `product-spec-scroll-animation-v1.0/03-SDD-bidirectional-scroll-animation.docx`
- `product-spec-scroll-animation-v1.0/04-UI-UX-FLOW-bidirectional-scroll-animation.docx`
- `product-spec-scroll-animation-v1.0/05-TASK-BREAKDOWN-bidirectional-scroll-animation.docx`
- `product-spec-scroll-animation-v1.0/.codex/skills/ui-ux-pro-max/SKILL.md`

## Design Direction

- Dark athletic premium style
- Orange primary, green conversion accent
- Barlow Condensed headings and Barlow body
- Storytelling landing structure with repeatable bidirectional scroll animation
- Progressive reveal, light parallax, gallery lightbox, package selector, trial modal, and WhatsApp booking generator

## Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:4173/
```

The generated 27-gym hub is available at:

```text
http://localhost:4173/gyms/
```

## Validate

```bash
npm run validate
npm run build
```

## 27 Gym Pages

- `http://localhost:4173/evolution-fitness-malang/`
- `http://localhost:4173/ftl-gym/`
- `http://localhost:4173/fitness-plus-dinoyo/`
- `http://localhost:4173/fitx-gym/`
- `http://localhost:4173/osbond-gym/`
- `http://localhost:4173/belle-crown-gym/`
- `http://localhost:4173/draco-gym/`
- `http://localhost:4173/planet-gym-surabaya/`
- `http://localhost:4173/new-icon-gym/`
- `http://localhost:4173/speedrocky-gym/`
- `http://localhost:4173/warriors-gym-surabaya/`
- `http://localhost:4173/audid-gym/`
- `http://localhost:4173/champion-gym-surabaya/`
- `http://localhost:4173/crystal-gym-aerobic/`
- `http://localhost:4173/m-gym-malang/`
- `http://localhost:4173/dm-gym-yogyakarta/`
- `http://localhost:4173/ocigen-fitness/`
- `http://localhost:4173/optimum-fitness-cafe/`
- `http://localhost:4173/blackbox-gym-bausasran/`
- `http://localhost:4173/glanzfit-yogyakarta/`
- `http://localhost:4173/honam-gym/`
- `http://localhost:4173/strength-club-malang/`
- `http://localhost:4173/de-gym-platinum-malang/`
- `http://localhost:4173/the-gym-asifa-pro/`
- `http://localhost:4173/3c-gym-malang/`
- `http://localhost:4173/fitnessworks-black-lanners/`
- `http://localhost:4173/prestige-fitness-malang/`

## Batch System

- `scripts/generate-20-gym-sites.mjs` regenerates the 27 static gym pages.
- `gyms/shared/site.css` contains the shared responsive visual system.
- `gyms/shared/site.js` contains scroll direction animation, reveal states, filters, package selection, lightbox, and WhatsApp join flow.
- `GYMS_20_IMPLEMENTATION_REPORT.md` documents the generated pages and verification results.
- `MALANG_GYM_EXPANSION_REPORT.md` documents the seven new Malang gym records and source strategy.
- `prd-documents-malang-expansion-v1.0/` contains five new Word PRD documents for the researched Malang expansion gyms.

## Notes

Some business details are intentionally marked as placeholders because Evolution 20 Gym is treated as a new brand concept and several gym records still need final verification. Replace unverified pricing, trainer profiles, logos, and branch-specific claims with verified production data before launch.
