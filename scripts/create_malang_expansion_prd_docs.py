from pathlib import Path

from create_gym_prd_docs import build_doc, write_index
import create_gym_prd_docs as base


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "prd-documents-malang-expansion-v1.0"
DOC_DATE = "May 29, 2026"


GYMS = [
    {
        "no": 21,
        "name": "De Gym Platinum Malang",
        "slug": "de-gym-platinum-malang",
        "city": "Malang",
        "archetype": "chain-modern",
        "positioning": "Modern De Gym club presence in Malang with international-standard equipment, certified personal trainers, group classes, and a polished fitness journey.",
        "primary_source": "https://degymplatinum.com/",
        "instagram": "https://www.instagram.com/degym_platinum/",
        "whatsapp": "https://degymplatinum.com/",
        "maps": "https://www.google.com/maps/search/?api=1&query=De+Gym+Platinum+Malang",
        "logo_source": "https://degymplatinum.com/",
        "facts": [
            "Official De Gym site describes De Gym as operating since 2018 with multiple clubs including Malang.",
            "Official source highlights international-standard equipment, certified personal trainers, group classes, functional area, and cardio equipment.",
            "Instagram should be used for current Malang visuals, logo treatment, campaign tone, and latest club updates before commercial launch.",
        ],
        "hero": {
            "headline": "De Gym Platinum Malang",
            "subhead": "A polished Malang gym experience with serious equipment, trainer support, and class energy for members who want structured progress.",
            "cta_primary": "Ask De Gym",
            "cta_secondary": "Open Malang Location",
        },
        "facility_focus": ["international equipment", "functional training area", "group fitness studio", "certified personal trainers"],
        "program_focus": ["strength training", "HIIT", "Zumba", "Body Combat", "Muay Thai"],
    },
    {
        "no": 22,
        "name": "The Gym Asifa Pro",
        "slug": "the-gym-asifa-pro",
        "city": "Malang",
        "archetype": "local-community",
        "positioning": "Affordable Lowokwaru gym with membership options, personal trainer support, and classes such as Zumba, combat art, and Muay Thai.",
        "primary_source": "https://latihanfisik.com/gym-detail/the-gym-asifa-pro/",
        "instagram": "https://the-gym-asifa-pro.business.site/?utm_source=gmb&utm_medium=referral",
        "whatsapp": "https://www.google.com/maps/search/?api=1&query=The+Gym+Asifa+Pro+Malang",
        "maps": "https://www.google.com/maps/search/?api=1&query=The+Gym+Asifa+Pro+Jl+Simpang+Candi+Panggung+Mojolangu+Malang",
        "logo_source": "https://latihanfisik.com/gym-detail/the-gym-asifa-pro/",
        "facts": [
            "LatihanFisik lists The Gym Asifa Pro at Jl. Simpang Candi Panggung, Mojolangu, Lowokwaru, Kota Malang.",
            "Source data includes varied membership options, PT support, and classes.",
            "LatihanFisik lists monthly pricing at Rp165.000, registration at Rp30.000, and incidental visit at Rp30.000; verify again before publishing paid ads.",
        ],
        "hero": {
            "headline": "The Gym Asifa Pro",
            "subhead": "A practical Malang gym for affordable training, classes, and coach-supported progress near Mojolangu.",
            "cta_primary": "Ask Visit Info",
            "cta_secondary": "Open Maps",
        },
        "facility_focus": ["AC training room", "free drinking water", "personal trainer", "class options"],
        "program_focus": ["strength training", "Zumba", "combat art", "Muay Thai", "beginner guidance"],
    },
    {
        "no": 23,
        "name": "3C Gym Malang",
        "slug": "3c-gym-malang",
        "city": "Malang",
        "archetype": "hardcore",
        "positioning": "Coach-led Pisang Candi gym with official Linktree contact flow, location clarity, and direct admin actions.",
        "primary_source": "https://linktr.ee/3cgym.malang",
        "instagram": "https://linktr.ee/3cgym.malang",
        "whatsapp": "https://linktr.ee/3cgym.malang",
        "maps": "https://www.google.com/maps/search/?api=1&query=3C+Gym+Malang+Jl+Puncak+Mandala+42+44+Pisang+Candi",
        "logo_source": "https://linktr.ee/3cgym.malang",
        "facts": [
            "Official Linktree lists 3C Gym Malang at Jl. Puncak Mandala No.42-44, Pisang Candi, Kota Malang.",
            "The Linktree positioning states first-class coaching with qualified hygiene protocol.",
            "Website CTA should prioritize WhatsApp, Instagram, and Location buttons from Linktree instead of inventing contact details.",
        ],
        "hero": {
            "headline": "3C Gym Malang",
            "subhead": "A focused local gym in Pisang Candi built around coaching, clean routines, and a direct admin contact path.",
            "cta_primary": "Open Official Links",
            "cta_secondary": "View Location",
        },
        "facility_focus": ["gym floor", "qualified coaching", "Pisang Candi location", "admin booking"],
        "program_focus": ["strength training", "body transformation", "beginner training", "personal coaching", "functional fitness"],
    },
    {
        "no": 24,
        "name": "Fitnessworks Black Lanners",
        "slug": "fitnessworks-black-lanners",
        "city": "Malang",
        "archetype": "local-community",
        "positioning": "Spacious Malang gym destination with complete equipment, varied classes, professional trainers, and friendly member support.",
        "primary_source": "https://malang.tempat.info/tempat-gym-malang/",
        "instagram": "https://www.instagram.com/fitnessworks.id/",
        "whatsapp": "https://wa.me/6282180838899",
        "maps": "https://www.google.com/maps/search/?api=1&query=Fitnessworks+Black+Lanners+Malang",
        "logo_source": "https://www.instagram.com/fitnessworks.id/",
        "facts": [
            "Local directory source highlights spacious area, complete equipment, varied classes, friendly service, and phone 0821-8083-8899.",
            "Media article describes Fitnessworks Blacklanners Malang as a new healthy lifestyle destination with latest equipment, varied classes, and professional trainers.",
            "Instagram should be used for logo, class visuals, member vibe, and current branch campaign before final production handoff.",
        ],
        "hero": {
            "headline": "Fitnessworks Black Lanners",
            "subhead": "A larger Malang training space with complete equipment, classes, and coach support for consistent everyday progress.",
            "cta_primary": "Chat Fitnessworks",
            "cta_secondary": "Open Maps",
        },
        "facility_focus": ["large gym floor", "complete equipment", "fitness classes", "professional trainers"],
        "program_focus": ["strength training", "group classes", "body transformation", "personal coaching", "functional fitness"],
    },
    {
        "no": 25,
        "name": "Prestige Fitness Malang",
        "slug": "prestige-fitness-malang",
        "city": "Malang",
        "archetype": "premium-wellness",
        "positioning": "Klojen city gym on Jl. Tangkuban Perahu with phone contact, long weekday hours, and premium-practical local positioning.",
        "primary_source": "https://www.waze.com/live-map/directions/id/jawa-timur/prestige-fitness?to=place.ChIJ63q45tMp1i0R3C8eL3Cv2yA",
        "instagram": "https://www.instagram.com/prestigefitness__/",
        "whatsapp": "https://wa.me/6282335133552",
        "maps": "https://www.google.com/maps/search/?api=1&query=Prestige+Fitness+Jl+Tangkuban+Perahu+No.9+Malang",
        "logo_source": "https://www.instagram.com/prestigefitness__/",
        "facts": [
            "Waze listing places Prestige Fitness at Jl. Tangkuban Perahu No.9, Kauman, Klojen, Kota Malang.",
            "Waze listing shows phone 0823-3513-3552 and long weekly operating hours.",
            "WorldPlaces/local listings also connect Prestige Fitness Malang to a gym/physical fitness center profile; verify latest owner-managed links before ads.",
        ],
        "hero": {
            "headline": "Prestige Fitness Malang",
            "subhead": "A polished city training option in Klojen with long opening hours and a simple route from inquiry to visit.",
            "cta_primary": "Chat Prestige",
            "cta_secondary": "Open Maps",
        },
        "facility_focus": ["city gym floor", "long weekday hours", "Klojen access", "membership inquiry"],
        "program_focus": ["strength training", "body transformation", "personal coaching", "functional fitness", "beginner fitness"],
    },
]


def write_expansion_index(generated):
    lines = [
        "# Malang Gym Expansion PRD Documents",
        "",
        f"Generated: {DOC_DATE}",
        "",
        "| No | Gym | PRD File |",
        "|---:|---|---|",
    ]
    for gym, path in generated:
        lines.append(f"| {gym['no']} | {gym['name']} | [{path.name}]({path.name}) |")
    index = OUT_DIR / "PRD_INDEX.md"
    index.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return index


def main():
    base.OUT_DIR = OUT_DIR
    base.DOC_DATE = DOC_DATE
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    generated = []
    for gym in GYMS:
        doc = build_doc(gym)
        path = OUT_DIR / f"{gym['no']:02d}-{gym['slug']}-prd.docx"
        doc.save(path)
        generated.append((gym, path))
    index = write_expansion_index(generated)
    print(f"Generated {len(generated)} DOCX PRDs in {OUT_DIR}")
    print(f"Index: {index}")
    for _, path in generated:
        print(path)


if __name__ == "__main__":
    main()
