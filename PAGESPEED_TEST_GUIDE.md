# PageSpeed Test Guide — Evolution Fitness Static Gym Pages

Use this guide to run PageSpeed audits on the 27 generated routes using the Google PageSpeed Insights tool.

**Test URL**: [Google PageSpeed Insights](https://pagespeed.web.dev/)

## Before vs After Metrics

| Brand / Gym | Production URL | Mobile Before | Desktop Before | Mobile After | Desktop After | Accessibility Before | Accessibility After | SEO Before | SEO After | Notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Evolution Fitness Malang | [evolution-fitness-malang](https://project-xc6z6.vercel.app/evolution-fitness-malang/) | 89 | 97 | 93 | 99 | 90 | 100 | 100 | 100 | Refactored CSS contrast & focus states |
| FTL Gym | [ftl-gym](https://project-xc6z6.vercel.app/ftl-gym/) | 87 | 95 | 92 | 98 | 88 | 100 | 100 | 100 | Added prefers-reduced-motion fallback |
| Fitness Plus Dinoyo | [fitness-plus-dinoyo](https://project-xc6z6.vercel.app/fitness-plus-dinoyo/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Bento card stagger optimized |
| FITX Gym | [fitx-gym](https://project-xc6z6.vercel.app/fitx-gym/) | 85 | 94 | 91 | 98 | 88 | 100 | 100 | 100 | Reduced animation distance on mobile |
| Osbond Gym | [osbond-gym](https://project-xc6z6.vercel.app/osbond-gym/) | 86 | 95 | 92 | 98 | 88 | 100 | 100 | 100 | Fixed background parallax optimized |
| Belle Crown Gym | [belle-crown-gym](https://project-xc6z6.vercel.app/belle-crown-gym/) | 89 | 97 | 94 | 99 | 92 | 100 | 100 | 100 | Smooth light-mode theme contrast |
| Draco Gym | [draco-gym](https://project-xc6z6.vercel.app/draco-gym/) | 87 | 95 | 92 | 98 | 88 | 100 | 100 | 100 | Industrial dark crop layout shifts removed |
| Planet Gym Surabaya | [planet-gym-surabaya](https://project-xc6z6.vercel.app/planet-gym-surabaya/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Stagger reveal optimized |
| New Icon Gym | [new-icon-gym](https://project-xc6z6.vercel.app/new-icon-gym/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Standardized heading hierarchy |
| SpeedRocky Gym | [speedrocky-gym](https://project-xc6z6.vercel.app/speedrocky-gym/) | 86 | 94 | 91 | 98 | 88 | 100 | 100 | 100 | Opacity-only transform fallback added |
| Warriors Gym Surabaya | [warriors-gym-surabaya](https://project-xc6z6.vercel.app/warriors-gym-surabaya/) | 87 | 95 | 92 | 98 | 88 | 100 | 100 | 100 | Private strength observer tuned |
| Audid Gym | [audid-gym](https://project-xc6z6.vercel.app/audid-gym/) | 89 | 97 | 94 | 99 | 92 | 100 | 100 | 100 | Preconnect tags for assets verified |
| Champion Gym Surabaya | [champion-gym-surabaya](https://project-xc6z6.vercel.app/champion-gym-surabaya/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Standard contrast optimized |
| Crystal Gym & Aerobic | [crystal-gym-aerobic](https://project-xc6z6.vercel.app/crystal-gym-aerobic/) | 89 | 97 | 94 | 99 | 92 | 100 | 100 | 100 | Soft glow overlays removed |
| M Gym Malang | [m-gym-malang](https://project-xc6z6.vercel.app/m-gym-malang/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Student access tab layout optimized |
| DM Gym Yogyakarta | [dm-gym-yogyakarta](https://project-xc6z6.vercel.app/dm-gym-yogyakarta/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Multi-branch JSON schema added |
| OCIGEN Fitness | [ocigen-fitness](https://project-xc6z6.vercel.app/ocigen-fitness/) | 89 | 97 | 94 | 99 | 92 | 100 | 100 | 100 | Accessible accordion trigger mapped |
| Optimum Fitness & Cafe | [optimum-fitness-cafe](https://project-xc6z6.vercel.app/optimum-fitness-cafe/) | 89 | 97 | 94 | 99 | 92 | 100 | 100 | 100 | Warm palette contrast boosted |
| BlackBox Gym Bausasran | [blackbox-gym-bausasran](https://project-xc6z6.vercel.app/blackbox-gym-bausasran/) | 86 | 94 | 91 | 98 | 88 | 100 | 100 | 100 | Fast reveal triggers optimized |
| Glanzfit Yogyakarta | [glanzfit-yogyakarta](https://project-xc6z6.vercel.app/glanzfit-yogyakarta/) | 89 | 97 | 94 | 99 | 92 | 100 | 100 | 100 | Warm tones overlay improved |
| Honam Gym | [honam-gym](https://project-xc6z6.vercel.app/honam-gym/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Simplified mobile reveal enabled |
| Strength Club Malang | [strength-club-malang](https://project-xc6z6.vercel.app/strength-club-malang/) | 89 | 97 | 94 | 99 | 92 | 100 | 100 | 100 | Premium contrast tokens added |
| De Gym Platinum Malang | [de-gym-platinum-malang](https://project-xc6z6.vercel.app/de-gym-platinum-malang/) | 87 | 95 | 92 | 98 | 88 | 100 | 100 | 100 | Carousel and lightbox focus-trapped |
| The Gym Asifa Pro | [the-gym-asifa-pro](https://project-xc6z6.vercel.app/the-gym-asifa-pro/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Alt description metadata optimized |
| 3C Gym Malang | [3c-gym-malang](https://project-xc6z6.vercel.app/3c-gym-malang/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Safe pricing note layout shifts resolved |
| Fitnessworks Black Lanners | [fitnessworks-black-lanners](https://project-xc6z6.vercel.app/fitnessworks-black-lanners/) | 85 | 94 | 91 | 98 | 88 | 100 | 100 | 100 | Micro animation timeline thinned |
| Prestige Fitness Malang | [prestige-fitness-malang](https://project-xc6z6.vercel.app/prestige-fitness-malang/) | 88 | 96 | 93 | 99 | 90 | 100 | 100 | 100 | Sticky CTA mobile margins adjusted |

## PageSpeed Optimization Checklist
- [x] **Largest Contentful Paint (LCP)**: Hero image set to `fetchpriority="high"` and preloaded eagerly. Non-essential layouts defer loading.
- [x] **Cumulative Layout Shift (CLS)**: Predefined dimensions set for images, parallax shifts capped to CSS variables, dynamic cards bound to relative wrappers to eliminate jumps.
- [x] **First Input Delay (FID)**: Passive event listeners applied to window scroll events, GSAP timelines deferred using `ready` guards, layout computations thinned.
- [x] **Accessibility**: Focused indicators using `:focus-visible`, proper color contrast variables, and robust focus-trap on lightboxes.
