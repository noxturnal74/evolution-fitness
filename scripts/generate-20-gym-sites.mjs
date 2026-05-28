import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const outDir = path.join(root, 'gyms');
const sharedDir = path.join(outDir, 'shared');

const imageSets = {
  chain: [
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=85&w=1200&auto=format&fit=crop'
  ],
  hardcore: [
    'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598971639058-a6c52630c758?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=85&w=1200&auto=format&fit=crop'
  ],
  wellness: [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609899537878-88d5ba429bdb?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=85&w=1200&auto=format&fit=crop'
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514995669114-6081e934b693?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=85&w=1200&auto=format&fit=crop'
  ],
  local: [
    'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517963628607-235ccdd5476c?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=85&w=1200&auto=format&fit=crop'
  ]
};

const gyms = [
  {
    slug: 'evolution-fitness-malang',
    name: 'Evolution Fitness Malang',
    city: 'Malang',
    archetype: 'local',
    primary: '#e11d48',
    accent: '#f97316',
    headline: 'Fit for life, built in Malang.',
    positioning: 'Energetic local gym with classes, community movement, and direct WhatsApp registration.',
    philosophy: 'Evolution Fitness Malang is positioned as a transformation-focused local club where gym floor discipline meets studio class energy.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/evolution_fitness_malang/',
    whatsapp: 'https://wa.me/6282228862049',
    maps: 'https://www.google.com/maps/search/?api=1&query=Evolution+Fitness+Malang',
    hours: 'Daily 06:00 - 21:00',
    facilities: ['Gym floor', 'Studio classes', 'Personal training', 'Community sessions'],
    programs: ['Strength Training', 'Body Transformation', 'Zumba / Studio Class', 'Personal Coaching', 'Functional Fitness']
  },
  {
    slug: 'ftl-gym',
    name: 'FTL Gym',
    city: 'Indonesia',
    archetype: 'chain',
    primary: '#0ea5e9',
    accent: '#a3ff12',
    headline: 'All-in access for every training rhythm.',
    positioning: 'Modern chain-gym ecosystem with 24/7 access, group classes, Pilates+, and lifestyle facilities.',
    philosophy: 'FTL Gym should feel like a networked fitness ecosystem: clean, app-like, confident, and built for repeat visits.',
    source: 'ftlgym.com + Linktree + Instagram',
    instagram: 'https://www.instagram.com/ftlgym.id/',
    whatsapp: 'https://wa.me/62818687858',
    maps: 'https://www.google.com/maps/search/?api=1&query=FTL+Gym',
    hours: '24/7 access at selected clubs',
    facilities: ['60+ clubs', 'Pilates+', 'Les Mills classes', 'Sauna / steam / jacuzzi'],
    programs: ['24/7 Access', 'Pilates+', 'Group Classes', 'Personal Training', 'Club Network']
  },
  {
    slug: 'fitness-plus-dinoyo',
    name: 'Fitness Plus Dinoyo',
    city: 'Malang',
    archetype: 'chain',
    primary: '#d4af37',
    accent: '#10b981',
    headline: 'Always positive, always progressing.',
    positioning: 'Corporate 24-hour mega gym with international equipment, classes, and personal trainer support.',
    philosophy: 'Fitness Plus Dinoyo needs to feel complete and facility-first: big equipment depth, reliable access, and practical membership value.',
    source: 'fitnessplusindonesia.co.id + Instagram',
    instagram: 'https://www.instagram.com/fitnessplus.dinoyo/',
    whatsapp: 'https://wa.me/6281130051777',
    maps: 'https://www.google.com/maps/search/?api=1&query=Fitness+Plus+Dinoyo+Malang',
    hours: '24-hour gym concept',
    facilities: ['100+ equipment', 'Fun classes', 'Personal trainers', 'Mega gym floor'],
    programs: ['Strength Area', 'Cardio Training', 'Fun Classes', 'Body Transformation', 'PT Coaching']
  },
  {
    slug: 'fitx-gym',
    name: 'FITX Gym',
    city: 'Indonesia',
    archetype: 'chain',
    primary: '#8bc34a',
    accent: '#ffffff',
    headline: 'Extend your limit with X-Squad energy.',
    positioning: 'Futuristic premium-affordable 24/7 gym with 90+ machines, classes, recovery, and lifestyle add-ons.',
    philosophy: 'FITX Gym should feel bright, modern, high-value, and youthful without becoming too gaming or neon-heavy.',
    source: 'fitxgym.id + Linktree',
    instagram: 'https://www.instagram.com/fitxgym.id/',
    whatsapp: 'https://wa.me/6281188021085',
    maps: 'https://www.google.com/maps/search/?api=1&query=FITX+Gym',
    hours: '24/7 access',
    facilities: ['90+ machines', '1,000+ monthly classes', 'Sauna / ice bath', 'Pilates / spinning'],
    programs: ['X-Squad Training', 'Pilates', 'Spinning', 'Strength Training', 'Recovery']
  },
  {
    slug: 'osbond-gym',
    name: 'Osbond Gym',
    city: 'Indonesia',
    archetype: 'chain',
    primary: '#ef1b1b',
    accent: '#ffffff',
    headline: 'One stop body needs.',
    positioning: 'Established national gym with 30+ clubs, all-club access, premium equipment, pool, sauna, steam, and ice bath.',
    philosophy: 'Osbond Gym should read as reliable, broad, and established with clear club credibility and facility proof.',
    source: 'osbondgym.com + club page',
    instagram: 'https://www.instagram.com/osbondgym/',
    whatsapp: 'https://www.osbondgym.com/contact-us',
    maps: 'https://www.google.com/maps/search/?api=1&query=Osbond+Gym',
    hours: 'Check nearest club',
    facilities: ['30+ clubs', '160+ classes', 'Premium equipment', 'Pool / sauna / steam'],
    programs: ['All Club Access', 'Group Classes', 'Personal Training', 'Recovery Facilities', 'Strength Floor']
  },
  {
    slug: 'belle-crown-gym',
    name: 'Belle Crown Gym',
    city: 'Malang',
    archetype: 'wellness',
    primary: '#1e3a8a',
    accent: '#e11d48',
    headline: 'Comfort fitness with pool-side energy.',
    positioning: 'Semi-premium Malang wellness gym with swimming pool, 10+ classes, and personal training.',
    philosophy: 'Belle Crown should feel elegant, calm, and trust-building with a comfort-first gym and pool experience.',
    source: 'bellecrown.id + Linktree + Instagram',
    instagram: 'https://www.instagram.com/bellecrown.gym/',
    whatsapp: 'https://linktr.ee/bellecrownindonesia',
    maps: 'https://www.google.com/maps/search/?api=1&query=Belle+Crown+Gym+Lembah+Dieng+Malang',
    hours: 'Check official Linktree',
    facilities: ['Swimming pool', '10+ classes', 'Personal trainer', 'Comfort training floor'],
    programs: ['Wellness Training', 'Swimming Access', 'Group Classes', 'Personal Coaching', 'Strength Basics']
  },
  {
    slug: 'draco-gym',
    name: 'Draco Gym',
    city: 'Surabaya',
    archetype: 'hardcore',
    primary: '#dc2626',
    accent: '#f97316',
    headline: 'Train fierce in Kalijudan.',
    positioning: 'Dark-bold local gym focused on personal training, strength, and serious daily discipline.',
    philosophy: 'Draco Gym should feel sharp and performance-first, with a fierce identity but clear practical contact flow.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/draco.gym_/',
    whatsapp: 'https://wa.me/62895385588866',
    maps: 'https://www.google.com/maps/search/?api=1&query=Draco+Gym+Kalijudan+Surabaya',
    hours: 'Daily 06:00 - 22:00',
    facilities: ['Strength floor', 'PT coaching', 'Free weights', 'Local community'],
    programs: ['Strength Training', 'PT Session', 'Muscle Building', 'Beginner Form', 'Conditioning']
  },
  {
    slug: 'planet-gym-surabaya',
    name: 'Planet Gym Surabaya',
    city: 'Surabaya',
    archetype: 'local',
    primary: '#22c55e',
    accent: '#38bdf8',
    headline: 'Banyu Urip fitness for everyday progress.',
    positioning: 'Urban Surabaya fitness center with workout area, boxing, cardio, aerobic, classes, and PT.',
    philosophy: 'Planet Gym should feel city-local, active, accessible, and easy to contact for daily fitness needs.',
    source: 'Instagram',
    instagram: 'https://www.instagram.com/planetgymsby/',
    whatsapp: 'https://wa.me/628113451228',
    maps: 'https://www.google.com/maps/search/?api=1&query=Planet+Gym+Banyu+Urip+248+Surabaya',
    hours: 'Contact admin for latest schedule',
    facilities: ['Workout area', 'Boxing area', 'Cardio', 'Aerobic classes'],
    programs: ['Fitness Center', 'Boxing Basics', 'Aerobic Class', 'Personal Training', 'Cardio Program']
  },
  {
    slug: 'new-icon-gym',
    name: 'New Icon Gym',
    city: 'Surabaya',
    archetype: 'local',
    primary: '#f97316',
    accent: '#facc15',
    headline: 'Become your new icon.',
    positioning: 'Surabaya local transformation gym with practical access, trainer support, and Google Maps clarity.',
    philosophy: 'New Icon Gym should feel aspirational but practical: a clean place to become a new version of yourself.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/new.icon.gym/',
    whatsapp: 'https://wa.me/6281216115104',
    maps: 'https://www.google.com/maps/search/?api=1&query=New+Icon+Gym+Barata+Jaya+59+Surabaya',
    hours: 'Contact admin for latest hours',
    facilities: ['Gym floor', 'Aerobic', 'Trainer support', 'Barata Jaya location'],
    programs: ['Transformation Plan', 'Gym Access', 'Aerobic Movement', 'PT Intro', 'Strength Basics']
  },
  {
    slug: 'speedrocky-gym',
    name: 'SpeedRocky Gym',
    city: 'Surabaya',
    archetype: 'hardcore',
    primary: '#f59e0b',
    accent: '#ef4444',
    headline: 'Old-school strength, faster grit.',
    positioning: 'Hardcore bodybuilding-style gym in Keputih with gritty strength identity and practical contact path.',
    philosophy: 'SpeedRocky should feel raw, serious, and old-school, built for people who want no-nonsense strength work.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/speedrocky_gym/',
    whatsapp: 'tel:+62315932336',
    maps: 'https://www.google.com/maps/search/?api=1&query=SpeedRocky+Gym+Keputih+Utara+83+Surabaya',
    hours: 'Contact by phone for latest hours',
    facilities: ['Free weights', 'Bodybuilding floor', 'Machines', 'Local strength community'],
    programs: ['Bodybuilding', 'Strength Training', 'Muscle Gain', 'Conditioning Challenge', 'Form Coaching']
  },
  {
    slug: 'warriors-gym-surabaya',
    name: 'Warriors Gym Surabaya',
    city: 'Surabaya',
    archetype: 'hardcore',
    primary: '#b91c1c',
    accent: '#f97316',
    headline: 'Discipline starts in Manyar.',
    positioning: 'Semi-hardcore Surabaya strength community with private training, functional training, and warrior-style tone.',
    philosophy: 'Warriors Gym should carry discipline and community proof without looking identical to Draco or SpeedRocky.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/warriorsgym_sby/',
    whatsapp: 'https://www.instagram.com/warriorsgym_sby/',
    maps: 'https://www.google.com/maps/search/?api=1&query=Warriors+Gym+Manyar+Adi+II+No+35+Surabaya',
    hours: 'Check Instagram for latest hours',
    facilities: ['Private training', 'Functional training', 'Strength floor', 'Community gym'],
    programs: ['Warrior Strength', 'Private Training', 'Functional Fitness', 'Transformation', 'Community Class']
  },
  {
    slug: 'audid-gym',
    name: 'Audid Gym',
    city: 'Surabaya',
    archetype: 'lifestyle',
    primary: '#06b6d4',
    accent: '#22c55e',
    headline: 'A sport complex for active Surabaya.',
    positioning: 'Multi-sport complex with gym, basketball, pickleball, jogging track, calisthenics, boxing, pool, and ice bath.',
    philosophy: 'Audid Gym should feel broader than a gym: an active sport complex where training choices stay practical.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/audidgym/',
    whatsapp: 'https://wa.me/6282229304618',
    maps: 'https://www.google.com/maps/search/?api=1&query=Audid+Gym+Klampis+Jaya+Surabaya',
    hours: 'Contact admin for latest schedule',
    facilities: ['Basketball', 'Pickleball', 'Jogging track', 'Pool / ice bath'],
    programs: ['Gym Training', 'Boxing', 'Calisthenics', 'Court Sports', 'Recovery']
  },
  {
    slug: 'champion-gym-surabaya',
    name: 'Champion Gym Surabaya',
    city: 'Surabaya',
    archetype: 'local',
    primary: '#facc15',
    accent: '#22c55e',
    headline: 'Train comfortable, leave like a champion.',
    positioning: 'Budget-comfort gym with full AC, free parking, comfortable training space, PT, and membership promos.',
    philosophy: 'Champion Gym should feel achievement-focused and practical, with comfort and access as selling points.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/champion.gym.sby/',
    whatsapp: 'https://wa.me/6281331717779',
    maps: 'https://www.google.com/maps/search/?api=1&query=Champion+Gym+Klampis+Semolo+Timur+6C+Surabaya',
    hours: 'Contact admin for latest hours',
    facilities: ['Full AC', 'Free parking', 'Comfortable gym floor', 'Personal trainer'],
    programs: ['Champion Plan', 'Gym Access', 'PT Coaching', 'Body Tone', 'Beginner Strength']
  },
  {
    slug: 'crystal-gym-aerobic',
    name: 'Crystal Gym & Aerobic',
    city: 'Surabaya',
    archetype: 'wellness',
    primary: '#14b8a6',
    accent: '#f97316',
    headline: 'Friendly gym and aerobic movement.',
    positioning: 'Friendly gym and aerobic center in Surabaya with community class energy and direct WhatsApp booking.',
    philosophy: 'Crystal Gym & Aerobic should feel active and social, more class-oriented than hardcore strength-only.',
    source: 'Instagram',
    instagram: 'https://www.instagram.com/newcrystalgym/',
    whatsapp: 'https://wa.me/6282233225222',
    maps: 'https://www.google.com/maps/search/?api=1&query=Crystal+Gym+And+Aerobic+Soponyono+19+Surabaya',
    hours: 'Contact admin for class schedule',
    facilities: ['Aerobic studio', 'Gym access', 'Body weight training', 'Community classes'],
    programs: ['Aerobic Class', 'Body Weight', 'Gym Access', 'Class Pass', 'Beginner Fitness']
  },
  {
    slug: 'm-gym-malang',
    name: 'M Gym Malang',
    city: 'Malang',
    archetype: 'local',
    primary: '#16a34a',
    accent: '#f97316',
    headline: 'Student-friendly training near ABM.',
    positioning: 'Practical Malang gym near STIE Malangkucecwara / ABM with approachable access and PT potential.',
    philosophy: 'M Gym Malang should feel simple, friendly, and useful for students and everyday members.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/mgym.abm/',
    whatsapp: 'https://www.instagram.com/mgym.abm/',
    maps: 'https://www.google.com/maps/search/?api=1&query=M+Gym+STIE+Malangkucecwara+ABM+Malang',
    hours: 'Contact Instagram for latest hours',
    facilities: ['Student-friendly access', 'Gym floor', 'Personal training', 'ABM area location'],
    programs: ['Daily Gym', 'Student Plan', 'PT Intro', 'Strength Basics', 'Fitness Habit']
  },
  {
    slug: 'dm-gym-yogyakarta',
    name: 'DM Gym / DM Fitness Yogyakarta',
    city: 'Yogyakarta',
    archetype: 'local',
    primary: '#f97316',
    accent: '#38bdf8',
    headline: 'Jogja community fitness with branch access.',
    positioning: 'Accessible Yogyakarta gym with studio options, women area potential, all-branch membership, PT, classes, and basketball.',
    philosophy: 'DM Gym should feel warm and practical: community fitness for students, workers, and class-goers.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/dm_fitnessjogja/',
    whatsapp: 'https://wa.me/6287832893128',
    maps: 'https://www.google.com/maps/search/?api=1&query=DM+Fitness+Jl+Veteran+No+23+Yogyakarta',
    hours: 'Contact admin for latest hours',
    facilities: ['Studio 1-4', 'Women area', 'All-branch membership', 'Basketball court'],
    programs: ['Gym Membership', 'Classes', 'PT Coaching', 'Women Area', 'Basketball Access']
  },
  {
    slug: 'ocigen-fitness',
    name: 'OCIGEN Fitness',
    city: 'Yogyakarta',
    archetype: 'wellness',
    primary: '#0ea5e9',
    accent: '#22c55e',
    headline: 'Fresh training above the city.',
    positioning: 'Premium hotel fitness center at KJ Hotel with pool, Muay Thai, Pound Fit, Yoga, Zumba, and modern equipment.',
    philosophy: 'OCIGEN Fitness should feel breathable and hotel-premium: wellness plus performance in one calm system.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/ocigen.id/',
    whatsapp: 'https://www.instagram.com/ocigen.id/',
    maps: 'https://www.google.com/maps/search/?api=1&query=OCIGEN+Physical+Fitness+Center+KJ+Hotel+Yogyakarta',
    hours: 'Daily 06:00 - 21:00',
    facilities: ['Pool', 'Muay Thai', 'Pound Fit', 'Yoga / Zumba'],
    programs: ['Wellness Training', 'Muay Thai', 'Yoga', 'Zumba', 'Personal Training']
  },
  {
    slug: 'optimum-fitness-cafe',
    name: 'Optimum Fitness & Cafe',
    city: 'Yogyakarta',
    archetype: 'lifestyle',
    primary: '#a16207',
    accent: '#22c55e',
    headline: 'Train harder, recover better.',
    positioning: 'Hybrid fitness and healthy cafe concept with class, InBody test, locker, towel, and student-friendly Jogja lifestyle.',
    philosophy: 'Optimum Fitness & Cafe must not look like a normal gym only. It should feel like train, recover, and socialize in one destination.',
    source: 'LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/optimumfcyogyakarta/',
    whatsapp: 'https://www.instagram.com/optimumfcyogyakarta/',
    maps: 'https://www.google.com/maps/search/?api=1&query=Optimum+Fitness+Cafe+RW+Monginsidi+39+Yogyakarta',
    hours: 'Contact admin for latest hours',
    facilities: ['Healthy cafe', 'InBody test', 'Locker / towel', 'Classes'],
    programs: ['Gym Package', 'Cafe Recovery', 'Class Schedule', 'InBody Check', 'Student Fitness']
  },
  {
    slug: 'blackbox-gym-bausasran',
    name: 'BlackBox Gym Bausasran',
    city: 'Yogyakarta',
    archetype: 'hardcore',
    primary: '#ffffff',
    accent: '#f97316',
    headline: 'Dark urban training, open all day.',
    positioning: 'Urban dark gym in Bausasran with 24-hour access, Pro package, Pilates studio, HYROX class, sauna, locker, shower, full AC, and PT.',
    philosophy: 'BlackBox should feel industrial, focused, and no-nonsense with a modern cafe-like edge.',
    source: 'blackbox.camp + LatihanFisik + Instagram',
    instagram: 'https://www.instagram.com/blackbox.camp/',
    whatsapp: 'https://www.instagram.com/blackbox.camp/',
    maps: 'https://www.google.com/maps/search/?api=1&query=BlackBox+Gym+Bausasran+No+22+Yogyakarta',
    hours: '24-hour gym concept',
    facilities: ['24-hour access', 'Pilates studio', 'HYROX class', 'Sauna / locker / shower'],
    programs: ['BlackBox Training', 'HYROX Class', 'Pilates Studio', 'Pro Package', 'PT Coaching']
  },
  {
    slug: 'glanzfit-yogyakarta',
    name: 'Glanzfit Yogyakarta',
    city: 'Yogyakarta',
    archetype: 'wellness',
    primary: '#ec4899',
    accent: '#f9a8d4',
    headline: 'Women-focused fitness with privacy and style.',
    positioning: 'Women’s boutique gym in Yogyakarta with clean, private, feminine, class-based fitness appeal.',
    philosophy: 'Glanzfit should feel boutique, clean, and confidence-building with privacy and modern women-focused support.',
    source: 'Instagram',
    instagram: 'https://www.instagram.com/glanzfit.id/',
    whatsapp: 'https://wa.me/6287846351704',
    maps: 'https://www.google.com/maps/search/?api=1&query=Glanzfit+Women+Gym+Yogyakarta',
    hours: 'Contact admin for latest hours',
    facilities: ['Women’s gym', 'Boutique training', 'Classes', 'Private environment'],
    programs: ['Women Strength', 'Class Pass', 'Body Tone', 'Private Coaching', 'Confidence Fitness']
  }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function ctaHref(gym) {
  if (!gym.whatsapp) return gym.instagram;
  return gym.whatsapp;
}

function pageUrl(gym) {
  return `/${gym.slug}/`;
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 3).map((item) => item[0]).join('').toUpperCase();
}

function sectionOrder(gym) {
  if (gym.archetype === 'chain') return ['ecosystem', 'programs', 'membership', 'journey', 'coaches', 'gallery', 'proof', 'join'];
  if (gym.archetype === 'hardcore') return ['programs', 'ecosystem', 'journey', 'gallery', 'membership', 'coaches', 'proof', 'join'];
  if (gym.archetype === 'wellness') return ['ecosystem', 'programs', 'coaches', 'gallery', 'membership', 'proof', 'journey', 'join'];
  if (gym.archetype === 'lifestyle') return ['ecosystem', 'gallery', 'programs', 'membership', 'coaches', 'proof', 'journey', 'join'];
  return ['ecosystem', 'membership', 'programs', 'gallery', 'coaches', 'proof', 'journey', 'join'];
}

function imageList(gym) {
  return imageSets[gym.archetype] || imageSets.local;
}

function navItems(gym) {
  if (gym.archetype === 'chain') return [['Access', 'ecosystem'], ['Programs', 'programs'], ['Plans', 'membership'], ['Clubs', 'join']];
  if (gym.archetype === 'hardcore') return [['Training', 'programs'], ['Challenge', 'journey'], ['Coaches', 'coaches'], ['Join', 'join']];
  if (gym.archetype === 'wellness') return [['Comfort', 'ecosystem'], ['Classes', 'programs'], ['Coaches', 'coaches'], ['Visit', 'join']];
  if (gym.archetype === 'lifestyle') return [['Concept', 'ecosystem'], ['Cafe/Space', 'gallery'], ['Plans', 'membership'], ['Location', 'join']];
  return [['Why Here', 'ecosystem'], ['Programs', 'programs'], ['Plans', 'membership'], ['Location', 'join']];
}

function buildHero(gym, imgs) {
  return `
    <section id="hero" class="hero site-${gym.archetype}" aria-labelledby="page-title">
      <div class="hero-media" data-parallax-speed="0.10">
        <img src="${imgs[0]}" alt="${esc(gym.name)} training atmosphere" width="1800" height="1200" fetchpriority="high" loading="eager">
      </div>
      <div class="container hero-grid">
        <div class="hero-copy reveal" data-animate="fade-up">
          <p class="eyebrow">${esc(gym.city)} / ${esc(gym.archetype.replace('-', ' '))}</p>
          <h1 id="page-title">${esc(gym.name)}</h1>
          <p class="hero-kicker">${esc(gym.headline)}</p>
          <p class="hero-text">${esc(gym.positioning)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${esc(ctaHref(gym))}" target="_blank" rel="noopener">Book Trial</a>
            <a class="btn btn-secondary" href="${esc(gym.maps)}" target="_blank" rel="noopener">View Location</a>
          </div>
        </div>
        <aside class="hero-status reveal" data-animate="scale-in">
          <span>Today</span>
          <strong data-open-status>Checking Hours</strong>
          <p>${esc(gym.hours)}</p>
          <div class="status-meter"><i style="width:${gym.archetype === 'chain' ? '86' : '72'}%"></i></div>
          <small>Source: ${esc(gym.source)}</small>
        </aside>
      </div>
    </section>`;
}

function buildEcosystem(gym) {
  return `
    <section id="ecosystem" class="section" aria-labelledby="ecosystem-title">
      <div class="container split">
        <div class="section-copy reveal" data-animate="fade-right">
          <p class="eyebrow">About / Philosophy</p>
          <h2 id="ecosystem-title">${esc(gym.name)} in one focused journey.</h2>
          <p>${esc(gym.philosophy)}</p>
          <div class="pill-list">${gym.facilities.map((item) => `<span>${esc(item)}</span>`).join('')}</div>
        </div>
        <div class="bento reveal" data-animate="fade-left">
          ${gym.facilities.map((item, index) => `<article><strong>0${index + 1}</strong><h3>${esc(item)}</h3><p>${esc(`${item} is highlighted as a decision-making point for visitors comparing gyms in ${gym.city}.`)}</p></article>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildPrograms(gym, imgs) {
  return `
    <section id="programs" class="section muted-section" aria-labelledby="programs-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Programs / Training</p>
          <h2 id="programs-title">Training paths made for ${esc(gym.city)} members.</h2>
          <p>Filter the program cards by intent. The motion remains repeatable when users scroll down and back up.</p>
        </div>
        <div class="filter-bar reveal" data-animate="fade-up">
          <button class="filter-button is-active" type="button" data-filter="all">All</button>
          <button class="filter-button" type="button" data-filter="strength">Strength</button>
          <button class="filter-button" type="button" data-filter="class">Class</button>
          <button class="filter-button" type="button" data-filter="coach">Coaching</button>
        </div>
        <div class="program-grid">
          ${gym.programs.map((program, index) => {
            const tag = index === 0 ? 'strength' : index === 2 || index === 4 ? 'class' : 'coach';
            return `<article class="program-card reveal" data-program="${tag}" data-animate="fade-up">
              <img src="${imgs[(index + 1) % imgs.length]}" alt="${esc(`${program} at ${gym.name}`)}" width="900" height="650" loading="lazy">
              <div><p class="card-label">${esc(tag)}</p><h3>${esc(program)}</h3><p>${esc(`${program} gives visitors a clear starting point for training, membership, or consultation at ${gym.name}.`)}</p></div>
            </article>`;
          }).join('')}
        </div>
      </div>
    </section>`;
}

function buildJourney(gym) {
  return `
    <section id="journey" class="section journey-section" aria-labelledby="journey-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Scroll Animation Experience</p>
          <h2 id="journey-title">A 20-level progress story for every visitor.</h2>
          <p>Each chapter re-activates on scroll up and down using the same bidirectional motion system from the PRD, SRS, and SDD.</p>
        </div>
        <div class="journey-track reveal" data-animate="scale-in">
          ${['Foundation', 'Consistency', 'Load', 'Capacity', 'Evolution'].map((title, index) => `<article><span>${index * 4 + 1}-${index * 4 + 4}</span><h3>${title}</h3><p>${esc(`${gym.name} can map visitor goals into this ${title.toLowerCase()} stage before pushing them to WhatsApp or location CTA.`)}</p></article>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildMembership(gym) {
  const tiers = [
    ['Starter', 'Trial / Day Access', 'Ask admin', ['First visit guidance', 'Gym floor intro', 'Best for beginners']],
    ['Pro', 'Monthly Progress', 'Best value', ['Membership access', 'Program recommendation', 'Class or facility priority']],
    ['Elite', 'Coached Result', 'Premium', ['Personal coaching', 'Progress review', 'Transformation support']]
  ];
  return `
    <section id="membership" class="section" aria-labelledby="membership-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Membership / Pricing</p>
          <h2 id="membership-title">Choose a plan, then ask admin for the latest price.</h2>
          <p>Prices are intentionally not invented unless verified. The CTA generates an intent-based WhatsApp or official contact flow.</p>
        </div>
        <div class="pricing-grid">
          ${tiers.map(([tier, title, price, benefits], index) => `<article class="price-card ${index === 1 ? 'featured' : ''} reveal" data-package="${tier}" data-animate="fade-up">
            <p class="card-label">${tier}</p><h3>${title}</h3><strong>${price}</strong>
            <ul>${benefits.map((benefit) => `<li>${benefit}</li>`).join('')}</ul>
            <button class="btn btn-card" type="button" data-select-package="${tier}">Choose ${tier}</button>
          </article>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildCoaches(gym, imgs) {
  const names = ['Ari Pradana', 'Maya Kirana', 'Raka Mahendra'];
  return `
    <section id="coaches" class="section muted-section" aria-labelledby="coaches-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Coaches / Trainers</p>
          <h2 id="coaches-title">Coach profiles built for trust.</h2>
          <p>Dummy trainer profiles are realistic placeholders and should be replaced with verified coach data before launch.</p>
        </div>
        <div class="coach-grid">
          ${names.map((name, index) => `<article class="coach-card reveal" data-animate="fade-up">
            <img src="${imgs[(index + 4) % imgs.length]}" alt="${esc(`${name}, trainer at ${gym.name}`)}" width="800" height="980" loading="lazy">
            <div><p>${index === 0 ? 'Strength Coach' : index === 1 ? 'Transformation Coach' : 'Class Coach'}</p><h3>${name}</h3><span>${esc(`Best for ${index === 0 ? 'strength foundations' : index === 1 ? 'body recomposition' : 'movement confidence'} at ${gym.name}.`)}</span></div>
          </article>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildProof(gym) {
  return `
    <section id="proof" class="section proof-section" aria-labelledby="proof-title">
      <div class="container split">
        <div class="section-copy reveal" data-animate="fade-right">
          <p class="eyebrow">Testimonials / Social Proof</p>
          <h2 id="proof-title">Proof points ready for real reviews.</h2>
          <p>These testimonial slots are placeholders. Replace them with Google Maps reviews, Instagram comments, or member transformation proof when verified.</p>
        </div>
        <div class="testimonial reveal" data-animate="fade-left">
          <p data-testimonial-text>"${esc(gym.name)} makes the decision easier because the facility, location, and next action are clear."</p>
          <strong data-testimonial-name>${esc(gym.city)} member profile</strong>
          <div class="slider-controls"><button type="button" data-testimonial-prev aria-label="Previous testimonial">Prev</button><button type="button" data-testimonial-next aria-label="Next testimonial">Next</button></div>
        </div>
      </div>
      <div class="container proof-stats">
        <div class="proof-stat reveal" data-animate="fade-up"><strong data-count="20">0</strong><span>Journey levels</span></div>
        <div class="proof-stat reveal" data-animate="fade-up"><strong data-count="${gym.facilities.length}">0</strong><span>Facility highlights</span></div>
        <div class="proof-stat reveal" data-animate="fade-up"><strong data-count="${gym.programs.length}">0</strong><span>Program paths</span></div>
      </div>
    </section>`;
}

function buildGallery(gym, imgs) {
  return `
    <section id="gallery" class="section" aria-labelledby="gallery-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Gallery / Atmosphere</p>
          <h2 id="gallery-title">Visual atmosphere with useful hover copy.</h2>
          <p>Hover or focus a photo to read the paragraph. Tap/click to open a larger view.</p>
        </div>
        <div class="gallery-grid">
          ${imgs.slice(0, 4).map((img, index) => `<button class="gallery-card ${index === 1 ? 'tall' : index === 3 ? 'wide' : ''} reveal" type="button" data-animate="fade-up" data-lightbox-src="${img}" data-lightbox-title="${esc(gym.facilities[index % gym.facilities.length])}" data-lightbox-text="${esc(`${gym.facilities[index % gym.facilities.length]} helps ${gym.name} communicate a real, source-backed reason to visit or contact admin.`)}">
            <img src="${img}" alt="${esc(`${gym.name} ${gym.facilities[index % gym.facilities.length]} visual`) }" width="1000" height="760" loading="lazy">
            <span><strong>${esc(gym.facilities[index % gym.facilities.length])}</strong><small>${esc(`${gym.name} uses this visual to make the landing page feel real and decision-ready.`)}</small></span>
          </button>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildJoin(gym) {
  return `
    <section id="join" class="section join-section" aria-labelledby="join-title">
      <div class="container split">
        <div class="section-copy reveal" data-animate="fade-right">
          <p class="eyebrow">Final CTA</p>
          <h2 id="join-title">Ask, compare, then visit ${esc(gym.name)}.</h2>
          <p>Use WhatsApp, Instagram, or Maps to confirm the latest schedule, membership, class, and PT availability.</p>
          <div class="contact-list">
            <a href="${esc(ctaHref(gym))}" target="_blank" rel="noopener">Primary contact</a>
            <a href="${esc(gym.instagram)}" target="_blank" rel="noopener">Instagram</a>
            <a href="${esc(gym.maps)}" target="_blank" rel="noopener">Google Maps</a>
          </div>
        </div>
        <form class="join-form reveal" data-animate="fade-left" data-join-form data-contact="${esc(ctaHref(gym))}" data-gym="${esc(gym.name)}">
          <label>Name<input type="text" name="name" placeholder="Your name" autocomplete="name" required></label>
          <label>Goal<select name="goal"><option>Build strength</option><option>Body transformation</option><option>Join classes</option><option>Personal training</option></select></label>
          <label>Package<select name="package" data-package-select><option>Starter</option><option selected>Pro</option><option>Elite</option></select></label>
          <label>Visit time<select name="time"><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Weekend</option></select></label>
          <p class="form-error" data-form-error role="alert"></p>
          <button class="btn btn-primary" type="submit">Generate Contact Message</button>
        </form>
      </div>
    </section>`;
}

function buildFooter(gym) {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div><a class="brand-lockup" href="#hero"><span class="brand-mark">${initials(gym.name)}</span><span>${esc(gym.name)}</span></a><p>${esc(gym.positioning)}</p></div>
        <div><h2>Contact</h2><a href="${esc(ctaHref(gym))}" target="_blank" rel="noopener">Primary contact</a><a href="${esc(gym.instagram)}" target="_blank" rel="noopener">Instagram</a><a href="${esc(gym.maps)}" target="_blank" rel="noopener">Maps</a></div>
        <div><h2>Hours</h2><p>${esc(gym.hours)}</p><p>Location: ${esc(gym.city)}</p></div>
      </div>
    </footer>
    <div class="sticky-cta" data-sticky-cta><span>${esc(gym.name)}</span><a class="btn btn-primary" href="${esc(ctaHref(gym))}" target="_blank" rel="noopener">Ask Admin</a></div>
    <div class="modal" data-modal="trial" aria-hidden="true"><div class="modal-backdrop" data-close-modal></div><div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1"><button class="modal-close" type="button" data-close-modal aria-label="Close">Close</button><p class="eyebrow">Trial booking</p><h2 id="modal-title">Contact ${esc(gym.name)}</h2><p>Choose a package and continue to the official contact flow.</p><a class="btn btn-primary" href="${esc(ctaHref(gym))}" target="_blank" rel="noopener">Continue</a></div></div>
    <div class="lightbox" data-lightbox aria-hidden="true"><div class="modal-backdrop" data-lightbox-close></div><div class="lightbox-panel" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" tabindex="-1"><button class="modal-close" type="button" data-lightbox-close aria-label="Close gallery">Close</button><img data-lightbox-image src="${imageList(gym)[0]}" alt="${esc(gym.name)} gallery preview" width="1600" height="1000" loading="lazy"><h2 id="lightbox-title" data-lightbox-title>${esc(gym.name)}</h2><p data-lightbox-text>${esc(gym.positioning)}</p></div></div>`;
}

function buildPage(gym) {
  const imgs = imageList(gym);
  const order = sectionOrder(gym);
  const sections = {
    ecosystem: buildEcosystem(gym),
    programs: buildPrograms(gym, imgs),
    journey: buildJourney(gym),
    membership: buildMembership(gym),
    coaches: buildCoaches(gym, imgs),
    proof: buildProof(gym),
    gallery: buildGallery(gym, imgs),
    join: buildJoin(gym)
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#0b0d0f">
  <title>${esc(gym.name)} | Evolution 20 Gym Landing Page</title>
  <meta name="description" content="${esc(gym.positioning)}">
  <link rel="canonical" href="http://localhost:4173${pageUrl(gym)}">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <meta property="og:title" content="${esc(gym.name)} | Premium gym landing page">
  <meta property="og:description" content="${esc(gym.positioning)}">
  <meta property="og:image" content="${imgs[0]}">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/gyms/shared/site.css">
  <style>:root{--primary:${gym.primary};--accent:${gym.accent};}</style>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'HealthClub', name: gym.name, description: gym.positioning, url: `http://localhost:4173${pageUrl(gym)}`, image: imgs[0], address: { '@type': 'PostalAddress', addressLocality: gym.city, addressCountry: 'ID' }, openingHours: gym.hours, sameAs: [gym.instagram] })}</script>
</head>
<body class="archetype-${gym.archetype}" data-gym="${esc(gym.name)}">
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="Primary navigation">
      <a class="brand-lockup" href="#hero"><span class="brand-mark">${initials(gym.name)}</span><span>${esc(gym.name)}</span></a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-toggle><span></span><span></span></button>
      <div class="nav-links" data-nav-links>${navItems(gym).map(([label, id]) => `<a href="#${id}">${label}</a>`).join('')}</div>
      <a class="nav-cta" href="${esc(ctaHref(gym))}" target="_blank" rel="noopener">Ask Admin</a>
    </nav>
  </header>
  <main id="main-content" tabindex="-1">
    ${buildHero(gym, imgs)}
    ${order.map((key) => sections[key]).join('\n')}
  </main>
  ${buildFooter(gym)}
  <script src="/gyms/shared/site.js" defer></script>
</body>
</html>`;
}

function buildSharedCss() {
  let css = `:root{--bg:#0b0d0f;--panel:rgba(18,23,29,.84);--panel2:rgba(255,255,255,.055);--text:#f8fafc;--muted:rgba(248,250,252,.72);--line:rgba(255,255,255,.14);--primary:#f97316;--accent:#22c55e;--font-heading:"Barlow Condensed",system-ui,sans-serif;--font-body:"Barlow",system-ui,sans-serif;--radius:16px;--ease:cubic-bezier(.2,.8,.2,1);--motion-distance:32px;--container:1180px}*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth;color-scheme:dark}body{margin:0;min-width:320px;max-width:100%;overflow-x:hidden;background:radial-gradient(circle at 12% 8%,color-mix(in srgb,var(--primary) 18%,transparent),transparent 30%),repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0 1px,transparent 1px 96px),#090b0d;color:var(--text);font-family:var(--font-body);-webkit-font-smoothing:antialiased}body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(120deg,transparent 0 58%,color-mix(in srgb,var(--primary) 7%,transparent) 58% 59%,transparent 59%);opacity:.8}body.modal-open{overflow:hidden}a{color:inherit;text-decoration:none}button,input,select{font:inherit}button,a,select{touch-action:manipulation}button{cursor:pointer}img{display:block;max-width:100%}p,h1,h2,h3,span,strong,a,button,small{overflow-wrap:break-word}:focus-visible{outline:3px solid var(--accent);outline-offset:4px}.container{width:min(var(--container),calc(100% - 48px));margin-inline:auto}.skip-link{position:fixed;top:14px;left:14px;z-index:200;transform:translateY(-140%);background:var(--accent);color:#07120b;border-radius:10px;min-height:44px;display:inline-flex;align-items:center;padding:0 14px;font-weight:900}.skip-link:focus{transform:translateY(0)}.site-header{position:fixed;top:18px;left:0;right:0;z-index:90;padding-inline:24px;pointer-events:none}.nav-shell{width:min(1220px,100%);min-height:72px;margin:auto;display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:center;border:1px solid var(--line);border-radius:16px;background:rgba(8,10,12,.82);backdrop-filter:blur(18px);box-shadow:0 20px 70px rgba(0,0,0,.38);padding:10px 12px 10px 16px;pointer-events:auto}.brand-lockup{display:inline-flex;align-items:center;gap:12px;font-family:var(--font-heading);font-weight:800;letter-spacing:.04em;text-transform:uppercase}.brand-mark{width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;border:1px solid color-mix(in srgb,var(--primary) 55%,rgba(255,255,255,.2));border-radius:12px;background:linear-gradient(145deg,color-mix(in srgb,var(--primary) 24%,transparent),rgba(255,255,255,.04));font-size:1.15rem;flex:none}.nav-links{display:flex;justify-content:center;gap:8px}.nav-links a{min-height:44px;display:inline-flex;align-items:center;border-radius:999px;padding:0 13px;color:var(--muted);font-size:.82rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.nav-links a:hover,.nav-links a.is-active{background:rgba(255,255,255,.08);color:#fff}.nav-cta,.btn{display:inline-flex;min-height:48px;align-items:center;justify-content:center;border:0;border-radius:10px;padding:0 18px;font-weight:900;letter-spacing:.06em;text-transform:uppercase}.nav-cta,.btn-primary{background:linear-gradient(135deg,var(--primary),color-mix(in srgb,var(--primary) 70%,#fff));color:#100702;box-shadow:0 18px 36px color-mix(in srgb,var(--primary) 25%,transparent)}.btn-secondary,.btn-card{border:1px solid var(--line);background:rgba(255,255,255,.07);color:#fff}.menu-toggle{display:none;width:48px;height:48px;border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.06);color:#fff;position:relative}.menu-toggle span{position:absolute;width:20px;height:2px;background:currentColor;left:13px}.menu-toggle span:first-child{top:18px}.menu-toggle span:last-child{top:28px}.menu-toggle[aria-expanded=true] span:first-child{top:23px;transform:rotate(45deg)}.menu-toggle[aria-expanded=true] span:last-child{top:23px;transform:rotate(-45deg)}.hero{min-height:94svh;position:relative;overflow:hidden;display:flex;align-items:end;padding:130px 0 42px;border-bottom:1px solid var(--line)}.hero-media{position:absolute;inset:0;z-index:-2;background:#11161b}.hero-media::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,9,12,.94),rgba(7,9,12,.55) 48%,rgba(7,9,12,.86)),linear-gradient(0deg,rgba(7,9,12,.97),transparent 50%,rgba(7,9,12,.25))}.hero-media img{width:100%;height:calc(100% + 56px);object-fit:cover;transform:translate3d(0,var(--parallax-y,0),0) scale(1.03);filter:grayscale(.12) contrast(1.08)}.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,380px);gap:clamp(28px,6vw,70px);align-items:end}.hero-copy{min-width:0;max-width:900px}.eyebrow{margin:0 0 13px;color:var(--primary);font-weight:900;letter-spacing:.18em;text-transform:uppercase;font-size:.82rem}h1,h2,h3{margin:0;font-family:var(--font-heading);text-transform:uppercase}h1{max-width:900px;font-size:clamp(3rem,8vw,7rem);line-height:.9;letter-spacing:.01em}h2{max-width:820px;font-size:clamp(2.25rem,5vw,4.55rem);line-height:.92}h3{font-size:clamp(1.45rem,3vw,2.1rem);line-height:1}.hero-kicker{margin:18px 0 0;color:var(--accent);font-size:clamp(1.25rem,3vw,2rem);font-weight:900}.hero-text,.section-heading p,.section-copy>p,.program-card p,.journey-track p,.price-card li,.coach-card span,.site-footer p,.join-form,.gallery-card small{color:var(--muted);font-size:clamp(1rem,1.35vw,1.1rem);line-height:1.65}.hero-text{max-width:680px}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.hero-status,.program-card,.price-card,.coach-card,.testimonial,.join-form,.bento article,.journey-track article{border:1px solid var(--line);background:linear-gradient(145deg,rgba(255,255,255,.09),rgba(255,255,255,.045));box-shadow:0 28px 90px rgba(0,0,0,.42);backdrop-filter:blur(18px)}.hero-status{border-radius:20px;padding:24px}.hero-status span,.card-label{color:var(--primary);font-size:.8rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.hero-status strong{display:block;font-family:var(--font-heading);font-size:2.1rem;text-transform:uppercase}.status-meter{height:10px;margin:18px 0;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden}.status-meter i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--primary),var(--accent))}.section{padding:clamp(70px,9vw,128px) 0;border-top:1px solid rgba(255,255,255,.075)}.muted-section{background:rgba(255,255,255,.025)}.section-heading{max-width:820px;margin-bottom:34px}.split{display:grid;grid-template-columns:minmax(0,.95fr) minmax(320px,1.05fr);gap:clamp(30px,7vw,82px);align-items:center}.pill-list,.contact-list{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.pill-list span,.contact-list a{border:1px solid color-mix(in srgb,var(--accent) 35%,var(--line));border-radius:999px;background:color-mix(in srgb,var(--accent) 10%,transparent);padding:10px 14px;font-weight:900}.bento{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.bento article,.journey-track article{border-radius:16px;padding:20px}.bento strong,.journey-track span{color:var(--accent);font-weight:900;letter-spacing:.12em}.filter-bar{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px}.filter-button{min-height:44px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.06);color:var(--muted);padding:0 15px;font-weight:900;text-transform:uppercase}.filter-button.is-active,.filter-button:hover{background:color-mix(in srgb,var(--primary) 18%,transparent);color:#fff;border-color:color-mix(in srgb,var(--primary) 60%,var(--line))}.program-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:16px}.program-card{grid-column:span 2;overflow:hidden;border-radius:16px}.program-card.is-hidden{display:none}.program-card img{width:100%;height:230px;object-fit:cover}.program-card div,.coach-card div{padding:20px}.journey-track{display:grid;grid-template-columns:repeat(5,minmax(220px,1fr));gap:14px;overflow-x:auto}.pricing-grid,.coach-grid,.proof-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.price-card{border-radius:20px;padding:24px}.price-card.featured{border-color:color-mix(in srgb,var(--primary) 64%,var(--line));background:linear-gradient(145deg,color-mix(in srgb,var(--primary) 15%,transparent),rgba(255,255,255,.055))}.price-card strong{display:block;margin:14px 0;font-family:var(--font-heading);font-size:clamp(2.4rem,5vw,3.8rem)}.price-card ul{list-style:none;padding:0;margin:20px 0}.price-card li{padding-left:18px;position:relative}.price-card li::before{content:"";position:absolute;left:0;top:.7em;width:7px;height:7px;border-radius:50%;background:var(--accent)}.coach-card{overflow:hidden;border-radius:20px}.coach-card img{width:100%;height:380px;object-fit:cover}.testimonial{border-radius:20px;padding:28px;position:relative}.testimonial p{font-family:var(--font-heading);font-size:clamp(1.8rem,4vw,3.2rem);line-height:1;text-transform:uppercase;color:#fff}.slider-controls{display:flex;gap:10px}.slider-controls button,.modal-close{min-height:42px;border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.07);color:#fff;padding:0 12px}.proof-stats{margin-top:22px}.proof-stat{border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.055);padding:18px}.proof-stat strong{display:block;font-family:var(--font-heading);font-size:3rem;line-height:.9}.gallery-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:240px;gap:14px}.gallery-card{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:16px;background:#11161b;padding:0;text-align:left}.gallery-card.tall{grid-row:span 2}.gallery-card.wide{grid-column:span 2}.gallery-card img{width:100%;height:100%;object-fit:cover;transition:transform .56s var(--ease)}.gallery-card:hover img,.gallery-card:focus-visible img{transform:scale(1.07)}.gallery-card span{position:absolute;left:12px;right:12px;bottom:12px;border:1px solid var(--line);border-radius:12px;background:rgba(8,10,12,.78);backdrop-filter:blur(14px);padding:14px;display:grid;gap:7px;transform:translateY(calc(100% - 52px));transition:transform .56s var(--ease)}.gallery-card:hover span,.gallery-card:focus-visible span{transform:translateY(0)}.gallery-card strong{font-family:var(--font-heading);font-size:1.35rem;text-transform:uppercase}.join-form{display:grid;gap:14px;border-radius:20px;padding:24px}.join-form label{display:grid;gap:7px;color:#fff;font-weight:900}.join-form input,.join-form select{min-height:50px;border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.065);color:#fff;padding:0 13px}.join-form option{color:#0b0d0f}.form-error{min-height:20px;color:#fecaca;font-weight:900}.site-footer{border-top:1px solid var(--line);padding:46px 0;background:rgba(5,7,9,.85)}.footer-grid{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:26px}.footer-grid>div{display:grid;align-content:start;gap:10px}.footer-grid h2{font-size:1.5rem}.site-footer a{color:var(--accent);font-weight:900}.sticky-cta{position:fixed;left:50%;bottom:18px;z-index:80;width:min(620px,calc(100% - 32px));display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid color-mix(in srgb,var(--primary) 36%,var(--line));border-radius:16px;background:rgba(8,10,12,.88);backdrop-filter:blur(18px);box-shadow:0 24px 70px rgba(0,0,0,.42);padding:10px;opacity:0;pointer-events:none;transform:translate(-50%,24px);transition:.42s var(--ease)}.sticky-cta.is-visible{opacity:1;pointer-events:auto;transform:translate(-50%,0)}.modal,.lightbox{position:fixed;inset:0;z-index:120;display:none;align-items:center;justify-content:center;padding:24px}.modal.is-open,.lightbox.is-open{display:flex}.modal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72)}.modal-panel,.lightbox-panel{position:relative;z-index:1;width:min(620px,100%);border:1px solid var(--line);border-radius:20px;background:#11161b;box-shadow:0 24px 90px rgba(0,0,0,.55);padding:28px}.modal-close{position:absolute;top:14px;right:14px}.lightbox-panel{width:min(920px,100%);display:grid;gap:16px}.lightbox-panel img{width:100%;max-height:68vh;object-fit:cover;border-radius:16px}body.js-ready .reveal{opacity:0;transform:translate3d(0,var(--motion-enter-y,var(--motion-distance)),0);filter:blur(2px);transition:opacity .56s var(--ease),transform .56s var(--ease),filter .56s var(--ease)}body.js-ready .reveal[data-animate=fade-left],body.js-ready .reveal[data-animate=fade-right]{transform:translate3d(var(--motion-enter-x,0),0,0)}body.js-ready .reveal[data-animate=fade-left]{--motion-enter-x:36px}body.js-ready .reveal[data-animate=fade-right]{--motion-enter-x:-36px}body.js-ready .reveal[data-animate=scale-in]{transform:scale(.965)}body.js-ready .reveal.scroll-up{--motion-enter-y:calc(var(--motion-distance) * -1)}body.js-ready .reveal.is-visible{opacity:1;transform:translate3d(0,0,0) scale(1);filter:blur(0)}body.js-ready .reveal.is-exiting{opacity:.18}.image-failed{min-height:220px;background:linear-gradient(135deg,color-mix(in srgb,var(--primary) 18%,transparent),color-mix(in srgb,var(--accent) 12%,transparent)),#11161b}.archetype-hardcore{--bg:#080808}.archetype-wellness{--radius:20px}.archetype-lifestyle .hero-media::after{background:linear-gradient(90deg,rgba(12,8,4,.9),rgba(12,8,4,.56),rgba(12,8,4,.82)),linear-gradient(0deg,rgba(12,8,4,.94),transparent 52%)}@media(max-width:1024px){.nav-shell{grid-template-columns:auto auto auto}.menu-toggle{display:inline-flex;justify-self:end}.nav-links{position:absolute;top:calc(100% + 10px);left:0;right:0;display:grid;justify-content:stretch;border:1px solid var(--line);border-radius:16px;background:rgba(8,10,12,.97);padding:10px;opacity:0;pointer-events:none;transform:translateY(-8px);transition:.26s var(--ease)}.nav-links.is-open{opacity:1;pointer-events:auto;transform:translateY(0)}.nav-links a{justify-content:center}.hero-grid,.split{grid-template-columns:1fr}.program-card{grid-column:span 3}.pricing-grid,.coach-grid,.footer-grid{grid-template-columns:1fr}}@media(max-width:760px){.container,.hero-grid{width:calc(100vw - 48px);max-width:calc(100vw - 48px)}.site-header{top:10px;padding-inline:12px}.nav-shell{min-height:64px;padding:8px}.brand-mark{width:44px;height:44px}.brand-lockup span:last-child{font-size:1rem;max-width:154px;line-height:.95}.nav-cta{display:none}.hero{min-height:auto;padding-top:108px}.hero-status,.program-card,.price-card,.coach-card,.testimonial,.join-form,.bento article,.journey-track article,.proof-stat{width:100%;max-width:100%;min-width:0}.hero-actions{width:100%;max-width:calc(100vw - 48px);overflow:hidden}.hero-actions .btn{width:min(100%,320px);max-width:calc(100vw - 64px)}.bento,.proof-stats{grid-template-columns:1fr}.program-grid{grid-template-columns:1fr}.program-card{grid-column:auto}.journey-track{display:flex;overflow-x:auto}.pricing-grid,.coach-grid{grid-template-columns:1fr}.gallery-grid{grid-template-columns:1fr;grid-auto-rows:260px}.gallery-card.tall,.gallery-card.wide{grid-column:auto;grid-row:auto}.gallery-card span{transform:translateY(0)}.sticky-cta{flex-direction:column;align-items:stretch}.sticky-cta span{text-align:center}}@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}body.js-ready .reveal,body.js-ready .reveal[data-animate=fade-left],body.js-ready .reveal[data-animate=fade-right],body.js-ready .reveal[data-animate=scale-in]{opacity:1;transform:none;filter:none}.hero-media img{transform:none!important}}@media(prefers-contrast:more){:root{--muted:rgba(255,255,255,.88);--line:rgba(255,255,255,.34)}}`;
  css = css
    .replace('.site-header{position:fixed;top:18px;left:0;right:0;z-index:90;padding-inline:24px;pointer-events:none}', '.site-header{position:sticky;top:0;left:0;right:0;z-index:90;padding:16px 24px 10px;pointer-events:none;background:linear-gradient(180deg,rgba(9,11,13,.96),rgba(9,11,13,.78) 70%,transparent)}')
    .replace('.hero{min-height:94svh;position:relative;overflow:hidden;display:flex;align-items:end;padding:130px 0 42px;border-bottom:1px solid var(--line)}', '.hero{min-height:calc(100svh - 112px);position:relative;overflow:hidden;display:flex;align-items:center;padding:56px 0 70px;border-bottom:1px solid var(--line)}')
    .replace('.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,380px);gap:clamp(28px,6vw,70px);align-items:end}', '.hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,380px);gap:clamp(28px,6vw,70px);align-items:center}')
    .replace('.gallery-card strong{font-family:var(--font-heading);font-size:1.35rem;text-transform:uppercase}.join-form', '.gallery-card strong{font-family:var(--font-heading);font-size:1.35rem;text-transform:uppercase}.gallery-card small{opacity:0;max-height:0;overflow:hidden;transition:opacity .32s var(--ease),max-height .32s var(--ease)}.gallery-card:hover small,.gallery-card:focus-visible small{opacity:1;max-height:120px}.join-form')
    .replace('.hero{min-height:auto;padding-top:108px}', '.hero{min-height:auto;padding:36px 0 54px}')
    .replace('.gallery-card span{transform:translateY(0)}.sticky-cta', '.gallery-card span{transform:translateY(0)}.gallery-card small{opacity:1;max-height:160px}.sticky-cta');
  return css;
}

function buildSharedJs() {
  return `(()=>{'use strict';const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));const focusableSelector='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');const state={direction:'down',lastY:scrollY,ticking:false,lastFocus:null,package:'Pro',testimonial:0};document.body.classList.add('js-ready');function contactUrl(form){const base=form?.dataset.contact||document.querySelector('.nav-cta')?.href||location.href;if(!base.includes('wa.me'))return base;const data=form?new FormData(form):new FormData();const name=data.get('name')||'Visitor';const goal=data.get('goal')||'Training';const pack=data.get('package')||state.package;const time=data.get('time')||'Flexible';const gym=form?.dataset.gym||document.body.dataset.gym||document.title;return base+(base.includes('?')?'&':'?')+'text='+encodeURIComponent('Halo admin '+gym+', saya ingin bertanya tentang:\\n- Nama: '+name+'\\n- Tujuan: '+goal+'\\n- Paket: '+pack+'\\n- Jadwal kunjungan: '+time+'\\nMohon informasinya. Terima kasih.')}function initNav(){const header=$('[data-header]'),btn=$('[data-menu-toggle]'),links=$('[data-nav-links]'),anchors=$$('.nav-links a');btn?.addEventListener('click',()=>{const open=links?.classList.toggle('is-open')||false;btn.setAttribute('aria-expanded',String(open))});anchors.forEach(a=>a.addEventListener('click',()=>{links?.classList.remove('is-open');btn?.setAttribute('aria-expanded','false')}));const sections=$$('main section[id]');const obs='IntersectionObserver'in window?new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;anchors.forEach(a=>{const active=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('is-active',active);active?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})})},{threshold:.32,rootMargin:'-20% 0px -55% 0px'}):null;sections.forEach(s=>obs?.observe(s));addEventListener('scroll',()=>{header?.classList.toggle('is-scrolled',scrollY>24);$('[data-sticky-cta]')?.classList.toggle('is-visible',scrollY>1200)},{passive:true})}const ScrollMotionController={observer:null,elements:[],init(){this.elements=$$('[data-animate],.reveal');if(reduceMotion.matches){this.elements.forEach(e=>e.classList.add('is-visible'));return}addEventListener('scroll',()=>{if(state.ticking)return;state.ticking=true;requestAnimationFrame(()=>{const y=scrollY;if(Math.abs(y-state.lastY)>4){state.direction=y>state.lastY?'down':'up';state.lastY=y}this.updateParallax();state.ticking=false})},{passive:true});if(!('IntersectionObserver'in window)){this.elements.forEach(e=>e.classList.add('is-visible'));return}this.observer=new IntersectionObserver(es=>{es.forEach(e=>{const el=e.target;if(e.isIntersecting){el.classList.remove('is-exiting','scroll-up','scroll-down');el.classList.add('is-visible','scroll-'+state.direction);el.dispatchEvent(new CustomEvent('animation:enter',{bubbles:true,detail:{direction:state.direction}}))}else if(!el.hasAttribute('data-animate-once')){el.classList.remove('is-visible');el.classList.add('is-exiting')}})},{threshold:.16,rootMargin:'0px 0px -10% 0px'});this.elements.forEach((e,i)=>{e.style.transitionDelay=Math.min(i%4,3)*54+'ms';this.observer.observe(e)})},updateParallax(){if(reduceMotion.matches)return;$$('[data-parallax-speed]').forEach(el=>{const speed=Number(el.dataset.parallaxSpeed||.08),r=el.getBoundingClientRect();if(r.bottom<-80||r.top>innerHeight+80)return;const off=Math.max(-38,Math.min(38,(r.top-innerHeight/2)*speed));el.style.setProperty('--parallax-y',off+'px')})},getState(){return{direction:state.direction,elements:this.elements.length}}};window.ScrollMotionController=ScrollMotionController;function initFilters(){$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.filter;$$('[data-filter]').forEach(b=>b.classList.toggle('is-active',b===btn));$$('[data-program]').forEach(card=>card.classList.toggle('is-hidden',filter!=='all'&&!(card.dataset.program||'').includes(filter))) }))}function initPackages(){$$('[data-select-package]').forEach(btn=>btn.addEventListener('click',()=>{state.package=btn.dataset.selectPackage;$('[data-package-select]')&&( $('[data-package-select]').value=state.package);openModal('trial')}));$('[data-package-select]')?.addEventListener('change',e=>state.package=e.target.value)}function trap(container,event){if(event.key!=='Tab')return;const f=$$(focusableSelector,container);if(!f.length)return;const first=f[0],last=f[f.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}function openModal(name){const modal=$('[data-modal="'+name+'"]'),panel=$('.modal-panel',modal);if(!modal||!panel)return;state.lastFocus=document.activeElement;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>panel.focus(),0)}function closeModal(){const modal=$('.modal.is-open');if(!modal)return;modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');state.lastFocus?.focus?.()}function initModal(){$$('[data-open-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.openModal)));$$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModal));$('[data-modal="trial"]')?.addEventListener('keydown',e=>trap(e.currentTarget,e))}function initLightbox(){const lb=$('[data-lightbox]'),img=$('[data-lightbox-image]'),title=$('[data-lightbox-title]'),text=$('[data-lightbox-text]');if(!lb||!img||!title||!text)return;$$('[data-lightbox-src]').forEach(btn=>btn.addEventListener('click',()=>{state.lastFocus=document.activeElement;img.src=btn.dataset.lightboxSrc;img.alt=btn.dataset.lightboxTitle||'Gallery image';title.textContent=btn.dataset.lightboxTitle||'Gallery';text.textContent=btn.dataset.lightboxText||'';lb.classList.add('is-open');lb.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');$('.lightbox-panel')?.focus()}));function close(){lb.classList.remove('is-open');lb.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');state.lastFocus?.focus?.()}$$('[data-lightbox-close]').forEach(b=>b.addEventListener('click',close));lb.addEventListener('keydown',e=>trap(lb,e))}function initCounters(){const counters=$$('[data-count]');if(reduceMotion.matches||!('IntersectionObserver'in window)){counters.forEach(c=>c.textContent=c.dataset.count);return}const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=Number(el.dataset.count||0),start=performance.now();function tick(now){const p=Math.min(1,(now-start)/900),v=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=String(v);if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);obs.unobserve(el)})},{threshold:.4});counters.forEach(c=>obs.observe(c))}function initTestimonials(){const quotes=['The page makes the gym feel clear before I even visit.','The contact path is obvious and the programs are easy to compare.','The facility highlights make it easier to decide what to ask admin.'];const text=$('[data-testimonial-text]');let i=0;function show(n){i=(n+quotes.length)%quotes.length;if(text)text.textContent='"'+quotes[i]+'"'}$('[data-testimonial-prev]')?.addEventListener('click',()=>show(i-1));$('[data-testimonial-next]')?.addEventListener('click',()=>show(i+1))}function initForms(){$$('[data-join-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const err=$('[data-form-error]',form),name=String(new FormData(form).get('name')||'').trim();if(!name){if(err)err.textContent='Please enter your name first.';$('input[name="name"]',form)?.focus();return}if(err)err.textContent='';open(contactUrl(form),'_blank','noopener')}))}function imageFallback(){document.addEventListener('error',e=>{const target=e.target;if(!(target instanceof HTMLImageElement))return;const holder=target.closest('.hero-media,.program-card,.coach-card,.gallery-card,.lightbox-panel');holder?.classList.add('image-failed');target.remove()},true)}function keyboard(){document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;closeModal();const lb=$('[data-lightbox].is-open');if(lb){lb.classList.remove('is-open');lb.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');state.lastFocus?.focus?.()}})}function status(){const t=$('[data-open-status]');if(!t)return;const h=new Date().getHours();t.textContent=h>=6&&h<22?'Open Now':'Check Schedule'}reduceMotion.addEventListener?.('change',()=>{if(reduceMotion.matches)$$('[data-animate],.reveal').forEach(e=>e.classList.add('is-visible'))});imageFallback();initNav();ScrollMotionController.init();initFilters();initPackages();initModal();initLightbox();initCounters();initTestimonials();initForms();keyboard();status();})();`;
}

function buildHub() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Evolution 20 Gym Sites | Local Preview Hub</title>
  <meta name="description" content="Local preview hub for 20 premium gym landing pages with bidirectional scroll animation.">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/gyms/shared/site.css">
  <style>.hub{padding:120px 0}.hub h1{font-size:clamp(3rem,8vw,7rem);line-height:.9}.hub-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:32px}.hub-card{border:1px solid var(--line);border-radius:16px;background:rgba(255,255,255,.055);padding:18px;display:grid;gap:12px}.hub-card:hover{border-color:var(--primary)}.hub-card strong{font-family:var(--font-heading);font-size:1.6rem;text-transform:uppercase}.hub-card span{color:var(--muted)}@media(max-width:1024px){.hub-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.hub-grid{grid-template-columns:1fr}}</style>
</head>
<body>
  <main class="hub">
    <div class="container">
      <p class="eyebrow">Evolution 20 Gym / local preview</p>
      <h1>20 premium gym landing pages.</h1>
      <p class="hero-text">Every page uses the same production motion spec: bidirectional scroll reveal, repeatable section animation, gallery lightbox, program filters, pricing tiers, WhatsApp/contact CTA, and responsive layout.</p>
      <div class="hub-grid">
        ${gyms.map((gym, index) => `<a class="hub-card reveal" data-animate="fade-up" href="/${gym.slug}/"><span>${String(index + 1).padStart(2, '0')} / ${esc(gym.city)}</span><strong>${esc(gym.name)}</strong><small>${esc(gym.positioning)}</small></a>`).join('')}
      </div>
    </div>
  </main>
  <script src="/gyms/shared/site.js" defer></script>
</body>
</html>`;
}

function generate() {
  ensureDir(outDir);
  ensureDir(sharedDir);
  fs.writeFileSync(path.join(sharedDir, 'site.css'), buildSharedCss(), 'utf8');
  fs.writeFileSync(path.join(sharedDir, 'site.js'), buildSharedJs(), 'utf8');
  fs.writeFileSync(path.join(outDir, 'index.html'), buildHub(), 'utf8');
  fs.writeFileSync(path.join(outDir, 'gyms.config.json'), JSON.stringify(gyms, null, 2), 'utf8');
  for (const gym of gyms) {
    const dir = path.join(outDir, gym.slug);
    ensureDir(dir);
    const html = buildPage(gym);
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

    const aliasDir = path.join(root, gym.slug);
    ensureDir(aliasDir);
    fs.writeFileSync(path.join(aliasDir, 'index.html'), html, 'utf8');
  }
  console.log(`Generated ${gyms.length} gym landing pages in ${outDir} and root slug aliases`);
}

generate();
