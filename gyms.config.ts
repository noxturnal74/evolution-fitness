export type LayoutVariant = "cinematic" | "clean" | "brutalist" | "luxury" | "neon";
export type GymConfig = {
  slug: string;
  name: string;
  city: string;
  province: string;
  tagline: string;
  description: string;
  logo: string;
  heroImage: string;
  gallery: string[];
  primaryColor: string;
  secondaryColor: string;
  fontStyle: string;
  layoutVariant: LayoutVariant;
  parallaxStyle: string;
  ctaText: string;
  links: { whatsapp?: string; instagram?: string; googleMaps?: string };
};

export const gyms: GymConfig[] = [
  {
    "slug": "evolution-fitness-malang",
    "name": "Evolution Fitness Malang",
    "city": "Malang",
    "province": "East Java",
    "tagline": "Fit for life, built for progress.",
    "description": "Evolution Fitness Malang is presented as a premium parallax fitness landing page for Malang, East Java. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/evolution-fitness-malang/logo.png",
    "heroImage": "/gyms/evolution-fitness-malang/hero.jpg",
    "gallery": [
      "/gyms/evolution-fitness-malang/gallery-1.jpg"
    ],
    "primaryColor": "#e11d48",
    "secondaryColor": "#facc15",
    "fontStyle": "Oswald + Poppins",
    "layoutVariant": "cinematic",
    "parallaxStyle": "depth-grid",
    "ctaText": "Start Your Evolution",
    "links": {
      "whatsapp": "https://wa.me/6281217866741",
      "instagram": "https://www.instagram.com/evolution_fitness_malang",
      "googleMaps": "https://maps.app.goo.gl/yt2rtnwbVhL7e5zJA?g_st=ac"
    }
  },
  {
    "slug": "ftl-gym",
    "name": "FTL Gym",
    "city": "Jakarta",
    "province": "Indonesia",
    "tagline": "All-in fitness for every day athletes.",
    "description": "FTL Gym is presented as a premium parallax fitness landing page for Jakarta, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/ftl-gym/logo.png",
    "heroImage": "/gyms/ftl-gym/hero.jpg",
    "gallery": [
      "/gyms/ftl-gym/gallery-1.jpg"
    ],
    "primaryColor": "#c8ff3d",
    "secondaryColor": "#22d3ee",
    "fontStyle": "Archivo + Inter",
    "layoutVariant": "neon",
    "parallaxStyle": "kinetic-panels",
    "ctaText": "Explore All-In Access",
    "links": {
      "whatsapp": "",
      "instagram": "https://www.instagram.com/ftlgym",
      "googleMaps": "https://ftlgym.com/"
    }
  },
  {
    "slug": "fitness-plus",
    "name": "Fitness Plus",
    "city": "Indonesia",
    "province": "Nationwide",
    "tagline": "Clean training spaces with a sharper digital front door.",
    "description": "Fitness Plus is presented as a premium parallax fitness landing page for Indonesia, Nationwide. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/fitness-plus/logo.png",
    "heroImage": "/gyms/fitness-plus/hero.jpg",
    "gallery": [
      "/gyms/fitness-plus/gallery-1.jpg"
    ],
    "primaryColor": "#2563eb",
    "secondaryColor": "#14b8a6",
    "fontStyle": "Sora + Manrope",
    "layoutVariant": "clean",
    "parallaxStyle": "soft-lift",
    "ctaText": "Book a Club Visit",
    "links": {
      "whatsapp": "",
      "instagram": "https://www.instagram.com/fitnessplusindonesia",
      "googleMaps": "https://fitnessplusindonesia.co.id/"
    }
  },
  {
    "slug": "fitx-gym",
    "name": "FITX Gym",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "Energetic strength, cardio, and community workouts.",
    "description": "FITX Gym is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/fitx-gym/logo.png",
    "heroImage": "/gyms/fitx-gym/hero.jpg",
    "gallery": [
      "/gyms/fitx-gym/gallery-1.jpg"
    ],
    "primaryColor": "#f97316",
    "secondaryColor": "#06b6d4",
    "fontStyle": "Barlow Condensed + Inter",
    "layoutVariant": "neon",
    "parallaxStyle": "scanlines",
    "ctaText": "Train With FITX",
    "links": {
      "whatsapp": "",
      "instagram": "https://www.instagram.com/fitxgym.id",
      "googleMaps": "https://fitxgym.id/"
    }
  },
  {
    "slug": "osbond-gym",
    "name": "Osbond Gym",
    "city": "Jakarta",
    "province": "Indonesia",
    "tagline": "Premium facilities for focused transformation.",
    "description": "Osbond Gym is presented as a premium parallax fitness landing page for Jakarta, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/osbond-gym/logo.png",
    "heroImage": "/gyms/osbond-gym/hero.jpg",
    "gallery": [
      "/gyms/osbond-gym/gallery-1.jpg"
    ],
    "primaryColor": "#d6a54c",
    "secondaryColor": "#e5e7eb",
    "fontStyle": "Playfair Display + Source Sans 3",
    "layoutVariant": "luxury",
    "parallaxStyle": "silk-scroll",
    "ctaText": "Request Membership",
    "links": {
      "whatsapp": "",
      "instagram": "https://www.instagram.com/osbondgym",
      "googleMaps": "https://www.osbondgym.com/"
    }
  },
  {
    "slug": "belle-crown-gym",
    "name": "Belle Crown Gym",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "Wellness-led fitness with elevated daily rituals.",
    "description": "Belle Crown Gym is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/belle-crown-gym/logo.png",
    "heroImage": "/gyms/belle-crown-gym/hero.jpg",
    "gallery": [
      "/gyms/belle-crown-gym/gallery-1.jpg"
    ],
    "primaryColor": "#c084fc",
    "secondaryColor": "#fb7185",
    "fontStyle": "Cormorant Garamond + Manrope",
    "layoutVariant": "luxury",
    "parallaxStyle": "glass-layers",
    "ctaText": "Visit The Studio",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "draco-gym",
    "name": "Draco Gym",
    "city": "Surabaya",
    "province": "East Java",
    "tagline": "A bold neighborhood strength club with serious energy.",
    "description": "Draco Gym is presented as a premium parallax fitness landing page for Surabaya, East Java. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/draco-gym/logo.png",
    "heroImage": "/gyms/draco-gym/hero.jpg",
    "gallery": [
      "/gyms/draco-gym/gallery-1.jpg"
    ],
    "primaryColor": "#ef4444",
    "secondaryColor": "#facc15",
    "fontStyle": "Bebas Neue + Inter",
    "layoutVariant": "brutalist",
    "parallaxStyle": "slab-shift",
    "ctaText": "Get Directions",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "planet-gym-surabaya",
    "name": "Planet Gym Surabaya",
    "city": "Surabaya",
    "province": "East Java",
    "tagline": "A high-orbit fitness hub for strength and stamina.",
    "description": "Planet Gym Surabaya is presented as a premium parallax fitness landing page for Surabaya, East Java. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/planet-gym-surabaya/logo.png",
    "heroImage": "/gyms/planet-gym-surabaya/hero.jpg",
    "gallery": [
      "/gyms/planet-gym-surabaya/gallery-1.jpg"
    ],
    "primaryColor": "#8b5cf6",
    "secondaryColor": "#22d3ee",
    "fontStyle": "Space Grotesk + Inter",
    "layoutVariant": "cinematic",
    "parallaxStyle": "orbital-depth",
    "ctaText": "Enter The Orbit",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "new-icon-gym",
    "name": "New Icon Gym",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "Modern training for members who want to become the icon.",
    "description": "New Icon Gym is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/new-icon-gym/logo.png",
    "heroImage": "/gyms/new-icon-gym/hero.jpg",
    "gallery": [
      "/gyms/new-icon-gym/gallery-1.jpg"
    ],
    "primaryColor": "#0ea5e9",
    "secondaryColor": "#f59e0b",
    "fontStyle": "Urbanist + Inter",
    "layoutVariant": "clean",
    "parallaxStyle": "stacked-cards",
    "ctaText": "Become A Member",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "speedrocky-gym",
    "name": "SpeedRocky Gym",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "Fast-paced training with grit, sweat, and momentum.",
    "description": "SpeedRocky Gym is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/speedrocky-gym/logo.png",
    "heroImage": "/gyms/speedrocky-gym/hero.jpg",
    "gallery": [
      "/gyms/speedrocky-gym/gallery-1.jpg"
    ],
    "primaryColor": "#f43f5e",
    "secondaryColor": "#fde047",
    "fontStyle": "Anton + Inter",
    "layoutVariant": "brutalist",
    "parallaxStyle": "speed-stripes",
    "ctaText": "Push Your Pace",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "warriors-gym-surabaya",
    "name": "Warriors Gym Surabaya",
    "city": "Surabaya",
    "province": "East Java",
    "tagline": "Strength culture for people who train like contenders.",
    "description": "Warriors Gym Surabaya is presented as a premium parallax fitness landing page for Surabaya, East Java. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/warriors-gym-surabaya/logo.png",
    "heroImage": "/gyms/warriors-gym-surabaya/hero.jpg",
    "gallery": [
      "/gyms/warriors-gym-surabaya/gallery-1.jpg"
    ],
    "primaryColor": "#dc2626",
    "secondaryColor": "#f97316",
    "fontStyle": "Teko + Inter",
    "layoutVariant": "brutalist",
    "parallaxStyle": "impact-lock",
    "ctaText": "Join The Warriors",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "audid-gym",
    "name": "Audid Gym",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "Accessible fitness with a stronger online first impression.",
    "description": "Audid Gym is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/audid-gym/logo.png",
    "heroImage": "/gyms/audid-gym/hero.jpg",
    "gallery": [
      "/gyms/audid-gym/gallery-1.jpg"
    ],
    "primaryColor": "#10b981",
    "secondaryColor": "#38bdf8",
    "fontStyle": "Plus Jakarta Sans + Inter",
    "layoutVariant": "clean",
    "parallaxStyle": "calm-rise",
    "ctaText": "Plan Your Visit",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "champion-gym-surabaya",
    "name": "Champion Gym Surabaya",
    "city": "Surabaya",
    "province": "East Java",
    "tagline": "Built for daily winners and disciplined training habits.",
    "description": "Champion Gym Surabaya is presented as a premium parallax fitness landing page for Surabaya, East Java. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/champion-gym-surabaya/logo.png",
    "heroImage": "/gyms/champion-gym-surabaya/hero.jpg",
    "gallery": [
      "/gyms/champion-gym-surabaya/gallery-1.jpg"
    ],
    "primaryColor": "#f59e0b",
    "secondaryColor": "#ef4444",
    "fontStyle": "Oswald + Inter",
    "layoutVariant": "cinematic",
    "parallaxStyle": "spotlight-depth",
    "ctaText": "Train Like A Champion",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "crystal-gym-aerobic",
    "name": "Crystal Gym & Aerobic",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "A brighter fitness floor for classes, cardio, and strength.",
    "description": "Crystal Gym & Aerobic is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/crystal-gym-aerobic/logo.png",
    "heroImage": "/gyms/crystal-gym-aerobic/hero.jpg",
    "gallery": [
      "/gyms/crystal-gym-aerobic/gallery-1.jpg"
    ],
    "primaryColor": "#06b6d4",
    "secondaryColor": "#a78bfa",
    "fontStyle": "Cinzel + Lato",
    "layoutVariant": "luxury",
    "parallaxStyle": "crystal-glow",
    "ctaText": "See Class Options",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "m-gym-malang",
    "name": "M Gym Malang",
    "city": "Malang",
    "province": "East Java",
    "tagline": "Local Malang training with a premium member journey.",
    "description": "M Gym Malang is presented as a premium parallax fitness landing page for Malang, East Java. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/m-gym-malang/logo.png",
    "heroImage": "/gyms/m-gym-malang/hero.jpg",
    "gallery": [
      "/gyms/m-gym-malang/gallery-1.jpg"
    ],
    "primaryColor": "#16a34a",
    "secondaryColor": "#f97316",
    "fontStyle": "Montserrat + Inter",
    "layoutVariant": "clean",
    "parallaxStyle": "editorial-lift",
    "ctaText": "Visit M Gym",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "dm-gym-yogyakarta",
    "name": "DM Gym Yogyakarta",
    "city": "Yogyakarta",
    "province": "DI Yogyakarta",
    "tagline": "Disciplined training in the heart of Yogyakarta.",
    "description": "DM Gym Yogyakarta is presented as a premium parallax fitness landing page for Yogyakarta, DI Yogyakarta. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/dm-gym-yogyakarta/logo.png",
    "heroImage": "/gyms/dm-gym-yogyakarta/hero.jpg",
    "gallery": [
      "/gyms/dm-gym-yogyakarta/gallery-1.jpg"
    ],
    "primaryColor": "#f97316",
    "secondaryColor": "#84cc16",
    "fontStyle": "Roboto Condensed + Inter",
    "layoutVariant": "brutalist",
    "parallaxStyle": "concrete-flow",
    "ctaText": "Train In Jogja",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "ocigen-fitness",
    "name": "OCIGEN Fitness",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "Fresh-air energy for modern strength and cardio programs.",
    "description": "OCIGEN Fitness is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/ocigen-fitness/logo.png",
    "heroImage": "/gyms/ocigen-fitness/hero.jpg",
    "gallery": [
      "/gyms/ocigen-fitness/gallery-1.jpg"
    ],
    "primaryColor": "#22c55e",
    "secondaryColor": "#60a5fa",
    "fontStyle": "Exo 2 + Inter",
    "layoutVariant": "neon",
    "parallaxStyle": "oxygen-pulse",
    "ctaText": "Breathe Into Training",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "optimum-fitness-cafe",
    "name": "Optimum Fitness & Cafe",
    "city": "Indonesia",
    "province": "Indonesia",
    "tagline": "Fitness, recovery, and cafe culture in one premium stop.",
    "description": "Optimum Fitness & Cafe is presented as a premium parallax fitness landing page for Indonesia, Indonesia. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/optimum-fitness-cafe/logo.png",
    "heroImage": "/gyms/optimum-fitness-cafe/hero.jpg",
    "gallery": [
      "/gyms/optimum-fitness-cafe/gallery-1.jpg"
    ],
    "primaryColor": "#a16207",
    "secondaryColor": "#14b8a6",
    "fontStyle": "Fraunces + Manrope",
    "layoutVariant": "luxury",
    "parallaxStyle": "warm-lounge",
    "ctaText": "Experience Optimum",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": ""
    }
  },
  {
    "slug": "blackbox-gym-bausasran",
    "name": "BlackBox Gym Bausasran",
    "city": "Yogyakarta",
    "province": "DI Yogyakarta",
    "tagline": "Minimal, intense, and built around focused sessions.",
    "description": "BlackBox Gym Bausasran is presented as a premium parallax fitness landing page for Yogyakarta, DI Yogyakarta. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/blackbox-gym-bausasran/logo.png",
    "heroImage": "/gyms/blackbox-gym-bausasran/hero.jpg",
    "gallery": [
      "/gyms/blackbox-gym-bausasran/gallery-1.jpg"
    ],
    "primaryColor": "#ffffff",
    "secondaryColor": "#ef4444",
    "fontStyle": "Space Grotesk + Inter",
    "layoutVariant": "cinematic",
    "parallaxStyle": "blackout-depth",
    "ctaText": "Enter BlackBox",
    "links": {
      "whatsapp": "",
      "instagram": "",
      "googleMaps": "https://www.blackbox.camp/"
    }
  },
  {
    "slug": "glanzfit-yogyakarta",
    "name": "Glanzfit Yogyakarta",
    "city": "Yogyakarta",
    "province": "DI Yogyakarta",
    "tagline": "Elegant fitness for confidence, posture, and everyday glow.",
    "description": "Glanzfit Yogyakarta is presented as a premium parallax fitness landing page for Yogyakarta, DI Yogyakarta. The page focuses on strong brand presence, clear conversion paths, responsive performance, and local trust signals.",
    "logo": "/gyms/glanzfit-yogyakarta/logo.png",
    "heroImage": "/gyms/glanzfit-yogyakarta/hero.jpg",
    "gallery": [
      "/gyms/glanzfit-yogyakarta/gallery-1.jpg"
    ],
    "primaryColor": "#ec4899",
    "secondaryColor": "#fbbf24",
    "fontStyle": "Playfair Display + Manrope",
    "layoutVariant": "luxury",
    "parallaxStyle": "polished-motion",
    "ctaText": "Discover Glanzfit",
    "links": {
      "whatsapp": "",
      "instagram": "https://www.instagram.com/glanzfit.id",
      "googleMaps": ""
    }
  }
] as GymConfig[];

export const selectedGymSlug = "evolution-fitness-malang";
export const selectedGym = gyms.find((gym) => gym.slug === selectedGymSlug) ?? gyms[0];
