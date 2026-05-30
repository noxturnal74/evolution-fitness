# DEPLOYMENT_REPORT.md
**Date:** 2026-05-31  
**Branch:** kiro-uiux-rebuild

---

## Build Status

```
Production content validation passed.
27 generated gym pages validation passed.
```

## GitHub Branch

- Branch: `kiro-uiux-rebuild`
- Remote: `https://github.com/noxturnal74/evolution-fitness`
- Push command: `git push origin kiro-uiux-rebuild`

## Vercel Deployment

- Live URL: `https://project-xc6z6.vercel.app/`
- Deploy command: `npx vercel --prod --yes`
- Vercel auto-deploys from GitHub on push to main/master

## Routes Verified (Post-Build)

All 27 gym pages exist at both:
- `/gyms/[slug]/index.html` (canonical)
- `/[slug]/index.html` (root alias)

Sample routes:
- `/evolution-fitness-malang/` ✅
- `/gyms/evolution-fitness-malang/` ✅
- `/ftl-gym/` ✅
- `/gyms/ftl-gym/` ✅
- `/glanzfit-yogyakarta/` ✅
- `/gyms/glanzfit-yogyakarta/` ✅

## Shared Assets

- `/gyms/shared/site.css` ✅
- `/gyms/shared/site.js` ✅
- `/assets/favicon.svg` ✅

## Post-Deploy Checklist

- [ ] Open `https://project-xc6z6.vercel.app/` — directory loads
- [ ] Open `https://project-xc6z6.vercel.app/evolution-fitness-malang/` — gym page loads
- [ ] Check mobile layout at 375px width
- [ ] Verify mobile nav opens/closes
- [ ] Verify FAQ accordion opens/closes
- [ ] Verify gallery lightbox opens/closes with Escape key
- [ ] Verify sticky CTA appears after scrolling
- [ ] Verify program filter buttons work
- [ ] Check browser console for errors
- [ ] Run PageSpeed Insights on homepage and one gym page
