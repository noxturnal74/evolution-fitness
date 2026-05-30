# Direktori Landing Page Gym Malang

Static website untuk direktori landing page gym Indonesia dengan fokus halaman Malang yang rapi, informatif, dan siap dipresentasikan ke calon klien.

## Isi Website

- Homepage direktori: `/`
- Hub semua halaman: `/gyms/`
- 27 halaman gym individual, tersedia sebagai root slug dan alias `/gyms/[slug]/`
- Shared visual system: `gyms/shared/site.css`
- Shared interaction script: `gyms/shared/site.js`

## Prinsip Konten

- Bahasa Indonesia profesional.
- CTA mengikuti kanal yang tersedia: WhatsApp, website resmi, Linktree, Instagram, atau Google Maps.
- Tidak memakai coach, rating, harga, atau testimoni yang belum terverifikasi.
- Jika foto resmi belum tersedia di project, visual diberi konteks sebagai ilustrasi suasana latihan.
- Canonical, Open Graph URL, dan JSON-LD memakai domain produksi `https://project-xc6z6.vercel.app`.

## Run Locally

```bash
npm run dev
```

Buka:

```text
http://127.0.0.1:4173/
```

## Validate

```bash
npm run validate
npm run build
```

## Generate Pages

```bash
node scripts/generate-20-gym-sites.mjs
```

Generator membaca `gyms/gyms.config.json`, lalu menulis ulang homepage, hub, halaman `/gyms/[slug]/`, dan alias root `/[slug]/`.

## Local Route Check

```powershell
powershell -ExecutionPolicy Bypass -File ".\scripts\verify-malang-expansion.ps1"
```

Script ini mengecek homepage, hub, tujuh halaman gym Malang baru, dan alias `/gyms/...`.
