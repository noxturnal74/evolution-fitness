# Malang Gym Expansion Report

Generated: May 29, 2026

## Scope

This expansion adds seven Malang-area gym landing pages to the existing Evolution Gym website system:

1. Honam Gym
2. Strength Club Malang
3. De Gym Platinum Malang
4. The Gym Asifa Pro
5. 3C Gym Malang
6. Fitnessworks Black Lanners
7. Prestige Fitness Malang

Five new Word PRD documents were created for the five newly researched gyms:

- De Gym Platinum Malang
- The Gym Asifa Pro
- 3C Gym Malang
- Fitnessworks Black Lanners
- Prestige Fitness Malang

Honam Gym and Strength Club Malang were added from user-provided data, with Strength Club also cross-checked against VPT Strength Club sources.

## Source Table

| Gym | Main Sources | Contact / CTA | Maps Strategy | Notes |
|---|---|---|---|---|
| Honam Gym | User-provided Instagram, Google Maps share, and local Malang gym directory | WhatsApp `0813-1888-5875` | Google Maps search URL for reliable web compatibility | Positioned as affordable local Dau gym with direct WA CTA. |
| Strength Club Malang | VPT Strength Club website, LatihanFisik, user-provided Instagram and Maps | WhatsApp `0821-4154-8750` | Google Maps search URL for Villa Puncak Tidar / H-19 | Positioned as premium strength and functional training club. |
| De Gym Platinum Malang | De Gym official website, Instagram, search/listing data | Official website/contact flow | Google Maps search URL | Positioned as modern chain-style gym with equipment, class, and trainer proof. |
| The Gym Asifa Pro | LatihanFisik, FitnesLoka, local address listings | Maps/contact fallback because no verified WA was found | Google Maps search URL | Uses verified address/hours/pricing from directory sources; no invented WA. |
| 3C Gym Malang | Official Linktree | Official Linktree | Google Maps search URL | Uses Linktree for WhatsApp/Instagram/location actions to avoid inventing contact numbers. |
| Fitnessworks Black Lanners | Local gym directory, media article, Instagram | WhatsApp `0821-8083-8899` | Google Maps search URL | Positioned as spacious gym with complete equipment, classes, and professional trainers. |
| Prestige Fitness Malang | Waze, WorldPlaces/local listing, Instagram | WhatsApp `0823-3513-3552` | Google Maps search URL | Positioned as Klojen city gym with long opening hours. |

## Added Website Slugs

| Gym | Local / Vercel URL Path |
|---|---|
| Honam Gym | `/honam-gym/` and `/gyms/honam-gym/` |
| Strength Club Malang | `/strength-club-malang/` and `/gyms/strength-club-malang/` |
| De Gym Platinum Malang | `/de-gym-platinum-malang/` and `/gyms/de-gym-platinum-malang/` |
| The Gym Asifa Pro | `/the-gym-asifa-pro/` and `/gyms/the-gym-asifa-pro/` |
| 3C Gym Malang | `/3c-gym-malang/` and `/gyms/3c-gym-malang/` |
| Fitnessworks Black Lanners | `/fitnessworks-black-lanners/` and `/gyms/fitnessworks-black-lanners/` |
| Prestige Fitness Malang | `/prestige-fitness-malang/` and `/gyms/prestige-fitness-malang/` |

## Data Integrity Notes

- No unverified membership claims were added unless the source snippet clearly included pricing or hours.
- The Gym Asifa Pro uses verified directory/contact fallback instead of a fake phone number.
- 3C Gym Malang uses Linktree as the conversion endpoint because Linktree exposes the official WhatsApp/Instagram/location buttons.
- Google Maps CTAs use `google.com/maps/search` URLs because they are more stable for static deployment and pass automated validation.
- The original user-provided Google share links are kept as research context but not used as primary button URLs because shortened share domains can be less stable in validation.

## Generated Documents

Word PRDs are stored in:

`prd-documents-malang-expansion-v1.0/`

Index file:

`prd-documents-malang-expansion-v1.0/PRD_INDEX.md`
