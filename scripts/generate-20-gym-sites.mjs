import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const outDir = path.join(root, 'gyms');
const sharedDir = path.join(outDir, 'shared');
const siteUrl = 'https://project-xc6z6.vercel.app';
const sourceConfigPath = path.join(outDir, 'gyms.config.json');

const imageSets = {
  chain: [
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=85&w=1200&auto=format&fit=crop'
  ],
  hardcore: [
    'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598971639058-a6c52630c758?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=85&w=1200&auto=format&fit=crop'
  ],
  wellness: [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=85&w=1200&auto=format&fit=crop'
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=85&w=1200&auto=format&fit=crop'
  ],
  local: [
    'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=85&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=85&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=85&w=1200&auto=format&fit=crop'
  ]
};

const featuredCopy = {
  'evolution-fitness-malang': {
    headline: 'Gym lokal Malang untuk kelas studio, latihan beban, dan personal training.',
    intro: 'Evolution Fitness Malang diposisikan sebagai benchmark kualitas halaman: informatif, mudah dibaca, dan langsung mengarahkan calon member ke WhatsApp, lokasi, kelas, serta kebutuhan latihan yang relevan.',
    audience: 'Pemula, member aktif, pencari kelas studio, dan calon member yang ingin tanya paket PT atau membership sebelum datang.',
    area: 'Malang. Gunakan Google Maps untuk rute terbaru dan WhatsApp untuk cek jadwal kelas atau paket latihan.',
    hours: 'Setiap hari 06.00-21.00. Konfirmasi jadwal kelas dan admin sebelum berkunjung.'
  },
  'honam-gym': {
    headline: 'Gym lokal di area Dau untuk latihan rutin yang praktis.',
    intro: 'Honam Gym cocok untuk pemula, mahasiswa, dan pekerja sekitar Dau/Karangwidoro yang ingin latihan tanpa alur pendaftaran yang rumit.',
    audience: 'Pemula, mahasiswa, pekerja sekitar Dau, dan warga Karangwidoro.',
    area: 'Jl. Puncak Esberg No.7, Doro, Karangwidoro, Dau, Kabupaten Malang.',
    hours: 'Buka sekitar pukul 06.00. Cek Google Maps atau WhatsApp untuk perubahan jadwal harian.'
  },
  'strength-club-malang': {
    headline: 'Strength training dan functional training di area Puncak Tidar.',
    intro: 'Strength Club Malang menonjol untuk latihan beban, functional class, dan suasana latihan yang lebih terarah di Villa Puncak Tidar.',
    audience: 'Member yang fokus strength, body shaping, functional training, dan latihan konsisten.',
    area: 'Villa Puncak Arjuna, Jl. Villa Puncak Tidar No.H-19, Dau, Malang.',
    hours: 'Buka mulai sekitar pukul 06.00. Konfirmasi jadwal terbaru melalui kanal resmi.'
  },
  'de-gym-platinum-malang': {
    headline: 'Gym modern dengan alat lengkap, kelas, dan dukungan trainer.',
    intro: 'De Gym Platinum Malang cocok untuk calon member yang mencari gym modern dengan pilihan alat, kelas, dan informasi resmi dari kanal brand.',
    audience: 'Member yang mencari fasilitas lengkap, kelas, dan pengalaman gym modern.',
    area: 'Malang. Gunakan Maps atau website resmi untuk memilih titik kunjungan.',
    hours: 'Cek website atau kanal resmi De Gym untuk jam operasional terbaru.'
  },
  'the-gym-asifa-pro': {
    headline: 'Gym terjangkau di Lowokwaru dengan kelas dan opsi latihan harian.',
    intro: 'The Gym Asifa Pro dapat menjadi pilihan untuk latihan praktis di area Mojolangu/Lowokwaru, dengan informasi harga dan jadwal yang perlu dicek melalui sumber resmi.',
    audience: 'Mahasiswa, pemula, dan warga Lowokwaru yang butuh akses latihan praktis.',
    area: 'Jl. Simpang Candi Panggung, Mojolangu, Lowokwaru, Kota Malang.',
    hours: 'Direktori mencatat jam panjang pada hari kerja; cek Maps untuk jadwal terbaru sebelum datang.'
  },
  '3c-gym-malang': {
    headline: 'Gym di Pisang Candi dengan Linktree resmi sebagai pusat kontak.',
    intro: '3C Gym Malang menggunakan Linktree resmi untuk mengarahkan calon member ke kontak, lokasi, dan kanal sosial yang aktif.',
    audience: 'Member yang ingin tanya admin dulu sebelum datang ke lokasi Pisang Candi.',
    area: 'Jl. Puncak Mandala No.42-44, Pisang Candi, Kota Malang.',
    hours: 'Konfirmasi jam buka melalui Linktree atau kanal resmi 3C Gym Malang.'
  },
  'fitnessworks-black-lanners': {
    headline: 'Area latihan luas dengan kelas, alat lengkap, dan trainer profesional.',
    intro: 'Fitnessworks Black Lanners diposisikan sebagai gym Malang dengan ruang latihan yang lebih luas, pilihan kelas, dan dukungan trainer.',
    audience: 'Member yang mencari gym luas, kelas bervariasi, dan pendampingan latihan.',
    area: 'Malang. Gunakan Maps untuk rute paling akurat ke lokasi.',
    hours: 'Direktori mencatat 05.00-22.00. Konfirmasi kembali melalui WhatsApp sebelum berkunjung.'
  },
  'prestige-fitness-malang': {
    headline: 'Gym area Klojen dengan jam operasional panjang.',
    intro: 'Prestige Fitness Malang cocok untuk calon member yang mencari gym di area kota/Klojen dengan akses lokasi yang jelas dan kontak langsung.',
    audience: 'Pekerja, mahasiswa, dan warga sekitar Klojen yang butuh jadwal latihan fleksibel.',
    area: 'Jl. Tangkuban Perahu No.9, Klojen, Kota Malang.',
    hours: 'Listing publik mencatat jam panjang pada hari kerja. Cek Maps atau kontak resmi untuk perubahan.'
  }
};

const labelMap = new Map([
  ['Gym floor', 'Area latihan'],
  ['Studio classes', 'Kelas studio'],
  ['Personal training', 'Personal trainer'],
  ['Personal trainers', 'Personal trainer'],
  ['Community sessions', 'Komunitas latihan'],
  ['60+ clubs', '60+ klub'],
  ['Pilates+', 'Pilates+'],
  ['Les Mills classes', 'Kelas Les Mills'],
  ['Sauna / steam / jacuzzi', 'Sauna, steam, jacuzzi'],
  ['100+ equipment', '100+ alat'],
  ['Fun classes', 'Kelas grup'],
  ['Mega gym floor', 'Area gym luas'],
  ['90+ machines', '90+ mesin'],
  ['1,000+ monthly classes', '1.000+ kelas per bulan'],
  ['Sauna / ice bath', 'Sauna dan ice bath'],
  ['Pilates / spinning', 'Pilates dan spinning'],
  ['30+ clubs', '30+ klub'],
  ['160+ classes', '160+ kelas'],
  ['Premium equipment', 'Peralatan premium'],
  ['Pool / sauna / steam', 'Kolam, sauna, steam'],
  ['Swimming pool', 'Kolam renang'],
  ['10+ classes', '10+ kelas'],
  ['Comfort training floor', 'Area latihan nyaman'],
  ['Strength floor', 'Area strength'],
  ['PT coaching', 'Pendampingan PT'],
  ['Free weights', 'Free weight'],
  ['Local community', 'Komunitas lokal'],
  ['Workout area', 'Area workout'],
  ['Boxing area', 'Area boxing'],
  ['Cardio', 'Cardio'],
  ['Aerobic classes', 'Kelas aerobik'],
  ['Gym area', 'Area gym'],
  ['Trainer support', 'Dukungan trainer'],
  ['Easy access', 'Akses mudah'],
  ['Full AC', 'Full AC'],
  ['Free parking', 'Parkir gratis'],
  ['Basketball', 'Basket'],
  ['Pickleball', 'Pickleball'],
  ['Jogging track', 'Jogging track'],
  ['Pool / ice bath', 'Kolam dan ice bath'],
  ['Group class', 'Kelas grup'],
  ['Women area', 'Area khusus perempuan'],
  ['PT support', 'Dukungan PT'],
  ['Pool access', 'Akses kolam'],
  ['Muay Thai', 'Muay Thai'],
  ['Pound Fit', 'Pound Fit'],
  ['Yoga / Zumba', 'Yoga dan Zumba'],
  ['Cafe / diet food', 'Cafe dan diet food'],
  ['InBody test', 'Tes InBody'],
  ['Locker / towel', 'Loker dan handuk'],
  ['Student-friendly', 'Ramah mahasiswa'],
  ['24-hour access', 'Akses 24 jam'],
  ['Pilates studio', 'Studio Pilates'],
  ['HYROX class', 'Kelas HYROX'],
  ['Sauna / locker / shower', 'Sauna, loker, shower'],
  ['Women’s gym', 'Gym khusus perempuan'],
  ['Boutique training', 'Latihan boutique'],
  ['Classes', 'Kelas'],
  ['Private environment', 'Lingkungan privat'],
  ['Affordable access', 'Akses terjangkau'],
  ['Local Dau location', 'Lokasi Dau'],
  ['WhatsApp admin', 'Admin WhatsApp'],
  ['Premium facilities', 'Fasilitas premium'],
  ['Professional coaches', 'Coach profesional'],
  ['Functional classes', 'Kelas functional'],
  ['Coffee bar', 'Coffee bar'],
  ['International equipment', 'Peralatan standar internasional'],
  ['Certified trainers', 'Trainer bersertifikat'],
  ['Group class studio', 'Studio kelas'],
  ['Functional area', 'Area functional'],
  ['AC training room', 'Ruang latihan ber-AC'],
  ['Free drinking water', 'Air minum gratis'],
  ['Class options', 'Pilihan kelas'],
  ['Coaching support', 'Dukungan coaching'],
  ['Pisang Candi access', 'Akses Pisang Candi'],
  ['Admin booking', 'Booking admin'],
  ['Large gym floor', 'Area gym luas'],
  ['Complete equipment', 'Alat lengkap'],
  ['Fitness classes', 'Kelas fitness'],
  ['Professional trainers', 'Trainer profesional'],
  ['City gym floor', 'Area gym kota'],
  ['Long weekday hours', 'Jam weekday panjang'],
  ['Personal training inquiry', 'Info personal training'],
  ['Klojen access', 'Akses Klojen'],
  ['Strength Training', 'Latihan strength'],
  ['Body Transformation', 'Transformasi badan'],
  ['Functional Fitness', 'Functional fitness'],
  ['Personal Coaching', 'Pendampingan personal'],
  ['Group Classes', 'Kelas grup'],
  ['24/7 Access', 'Akses 24/7'],
  ['Club Network', 'Jaringan klub'],
  ['Cardio Training', 'Latihan cardio'],
  ['Beginner Gym', 'Latihan pemula'],
  ['All Club Access', 'Akses semua klub'],
  ['Recovery Facilities', 'Fasilitas recovery'],
  ['Wellness Training', 'Latihan wellness'],
  ['Fitness Center', 'Fitness center'],
  ['Boxing Basics', 'Dasar boxing'],
  ['Aerobic Class', 'Kelas aerobik'],
  ['Cardio Program', 'Program cardio'],
  ['Student Access', 'Akses mahasiswa'],
  ['Daily Training', 'Latihan harian'],
  ['Yoga / Zumba', 'Yoga dan Zumba'],
  ['Cafe recovery', 'Recovery cafe'],
  ['Lifestyle class', 'Kelas lifestyle'],
  ['Women-only training', 'Latihan khusus perempuan'],
  ['Strength training', 'Latihan strength'],
  ['Functional training', 'Functional training'],
  ['Trial visit', 'Kunjungan percobaan'],
  ['Beginner Training', 'Latihan pemula'],
  ['Body Combat', 'Body combat'],
  ['HIIT', 'HIIT']
]);

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

function loadGyms() {
  if (!fs.existsSync(sourceConfigPath)) {
    throw new Error('gyms/gyms.config.json is required as the source data file.');
  }
  return JSON.parse(fs.readFileSync(sourceConfigPath, 'utf8'));
}

function pageUrl(gym) {
  return `/${gym.slug}/`;
}

function fullUrl(gym) {
  return `${siteUrl}${pageUrl(gym)}`;
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 3).map((item) => item[0]).join('').toUpperCase();
}

function localLabel(value) {
  return labelMap.get(value) || value;
}

function listItems(items, limit = 3) {
  return items.slice(0, limit).map(localLabel).join(', ');
}

function imageList(gym) {
  return imageSets[gym.archetype] || imageSets.local;
}

function hasWhatsApp(gym) {
  return /^https:\/\/wa\.me\//i.test(gym.whatsapp || '');
}

function contactKind(gym) {
  const url = gym.whatsapp || gym.instagram || '';
  if (/wa\.me/i.test(url)) return 'whatsapp';
  if (/linktr\.ee/i.test(url)) return 'linktree';
  if (/instagram\.com/i.test(url)) return 'instagram';
  if (/google\.com\/maps/i.test(url)) return 'maps';
  return 'website';
}

function contactLabel(gym) {
  const kind = contactKind(gym);
  if (kind === 'whatsapp') return 'Kirim WhatsApp';
  if (kind === 'linktree') return 'Buka Linktree Resmi';
  if (kind === 'instagram') return 'Lihat Instagram';
  if (kind === 'maps') return 'Lihat Lokasi';
  return 'Buka Website Resmi';
}

function primaryContactUrl(gym, intent = 'info harga, jadwal, dan fasilitas terbaru') {
  const base = gym.whatsapp || gym.instagram || gym.maps;
  if (!hasWhatsApp(gym)) return base;
  const message = `Halo admin ${gym.name}, saya ingin bertanya tentang ${intent}. Terima kasih.`;
  return `${base}${base.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
}

function secondaryLink(gym) {
  if (gym.instagram && gym.instagram !== gym.whatsapp) {
    return { url: gym.instagram, label: /instagram\.com/i.test(gym.instagram) ? 'Lihat Instagram' : 'Sumber Resmi' };
  }
  return { url: gym.maps, label: 'Lihat Lokasi' };
}

function safeHours(gym) {
  const override = featuredCopy[gym.slug]?.hours;
  if (override) return override;
  const raw = String(gym.hours || '').trim();
  if (!raw || /contact admin|check nearest club|check instagram|check official|latest schedule/i.test(raw)) {
    return 'Konfirmasi jam operasional terbaru melalui kanal resmi sebelum berkunjung.';
  }
  return raw
    .replace(/^Daily/i, 'Setiap hari')
    .replace(/^Mon-Fri/i, 'Senin-Jumat')
    .replace(/^Sat/i, 'Sabtu')
    .replace(/^Sun/i, 'Minggu')
    .replace(/from local directory; verify latest before launch/i, 'berdasarkan direktori publik; konfirmasi ulang sebelum datang');
}

function areaText(gym) {
  return featuredCopy[gym.slug]?.area || `Area ${gym.city}. Gunakan Google Maps untuk rute dan titik lokasi terbaru.`;
}

function audienceText(gym) {
  if (featuredCopy[gym.slug]?.audience) return featuredCopy[gym.slug].audience;
  if (gym.archetype === 'chain') return 'Calon member yang mencari fasilitas lengkap, kelas, akses klub, dan alur membership yang lebih terstruktur.';
  if (gym.archetype === 'hardcore') return 'Member yang fokus latihan beban, pembentukan badan, dan latihan dengan ritme lebih serius.';
  if (gym.archetype === 'wellness') return 'Member yang mencari latihan nyaman, kelas, dan suasana yang lebih supportive.';
  if (gym.archetype === 'lifestyle') return 'Member yang ingin menggabungkan latihan, recovery, lifestyle, dan komunitas.';
  return `Warga sekitar ${gym.city}, pemula, mahasiswa, dan pekerja yang ingin akses latihan praktis.`;
}

function introText(gym) {
  if (featuredCopy[gym.slug]?.intro) return featuredCopy[gym.slug].intro;
  return `${gym.name} menampilkan informasi penting untuk calon member: area, fasilitas, program latihan, kontak resmi, dan akses Google Maps sebelum berkunjung.`;
}

function headlineText(gym) {
  if (featuredCopy[gym.slug]?.headline) return featuredCopy[gym.slug].headline;
  if (gym.archetype === 'chain') return `Akses gym modern dengan fokus ${listItems(gym.programs, 2)}.`;
  if (gym.archetype === 'hardcore') return `Latihan strength dan pembentukan badan dengan karakter yang lebih fokus.`;
  if (gym.archetype === 'wellness') return `Latihan yang lebih nyaman dengan dukungan kelas dan fasilitas.`;
  if (gym.archetype === 'lifestyle') return `Tempat latihan dengan sentuhan lifestyle dan komunitas.`;
  return `Gym lokal untuk latihan rutin, kelas, dan pendampingan dasar.`;
}

function metaTitle(gym) {
  const city = gym.city === 'Indonesia' ? 'Indonesia' : gym.city;
  // Avoid repeating city if gym name already contains it
  const nameHasCity = gym.name.toLowerCase().includes(city.toLowerCase());
  return nameHasCity
    ? `${gym.name} | Info Lokasi, Fasilitas, dan Kontak`
    : `${gym.name} ${city} | Info Lokasi, Fasilitas, dan Kontak`;
}

function metaDescription(gym) {
  return `Cari info ${gym.name} di ${gym.city}: lokasi, fasilitas, program latihan, kontak admin, dan akses Google Maps untuk membantu calon member sebelum berkunjung.`;
}

function sourceText(gym) {
  return String(gym.source || 'Kanal resmi dan direktori publik').replace(/\+/g, ', ');
}

function programTag(program) {
  if (/class|zumba|yoga|pilates|aerobic|pound|spinning|les mills|hyrox|muay thai|boxing|belly|line/i.test(program)) return 'kelas';
  if (/coach|personal|trainer|pt|private/i.test(program)) return 'pendampingan';
  return 'latihan';
}

function programDescription(program, gym) {
  const name = localLabel(program);
  if (/personal|coach|pt|trainer|private/i.test(program)) {
    return `${name} dapat dikonfirmasi melalui admin, termasuk ketersediaan trainer, jadwal, dan biaya terbaru.`;
  }
  if (/class|zumba|yoga|pilates|aerobic|pound|spinning|les mills|hyrox|muay thai|boxing/i.test(program)) {
    return `${name} cocok untuk member yang ingin variasi latihan. Jadwal kelas sebaiknya dicek melalui kanal resmi ${gym.name}.`;
  }
  return `${name} membantu calon member memahami tipe latihan yang tersedia sebelum memilih paket atau berkunjung.`;
}

function facilityDescription(facility, gym) {
  const label = localLabel(facility);
  if (/trainer|coach|pt|personal/i.test(facility)) {
    return `${label} tersedia berdasarkan informasi sumber. Detail jadwal dan biaya perlu dikonfirmasi ke admin.`;
  }
  if (/24|60|90|100|160|1\.000|\+/i.test(label)) {
    return `${label} adalah informasi dari sumber publik/kanal resmi. Pastikan kembali detail akses dan cabangnya sebelum datang.`;
  }
  return `${label} menjadi salah satu pertimbangan utama saat membandingkan ${gym.name} dengan gym lain di ${gym.city}.`;
}

function buildHero(gym, imgs) {
  const second = secondaryLink(gym);
  return `
    <section id="hero" class="hero" aria-labelledby="page-title">
      <div class="hero-media" data-parallax-speed="0.08">
        <img src="${imgs[0]}" alt="Ilustrasi suasana latihan gym" width="1800" height="1200" fetchpriority="high" loading="eager">
      </div>
      <div class="container hero-grid">
        <div class="hero-copy reveal" data-animate="fade-up">
          <p class="eyebrow">${esc(gym.city)} / Direktori gym</p>
          <h1 id="page-title">${esc(gym.name)}</h1>
          <p class="hero-kicker">${esc(headlineText(gym))}</p>
          <p class="hero-text">${esc(introText(gym))}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${esc(primaryContactUrl(gym))}" target="_blank" rel="noopener">${esc(contactLabel(gym))}</a>
            <a class="btn btn-secondary" href="${esc(gym.maps)}" target="_blank" rel="noopener">Lihat Lokasi</a>
            <a class="btn btn-secondary" href="${esc(second.url)}" target="_blank" rel="noopener">${esc(second.label)}</a>
          </div>
        </div>
        <aside class="hero-status reveal" data-animate="scale-in" aria-label="Info cepat ${esc(gym.name)}">
          <span>Info cepat</span>
          <strong>${esc(gym.city)}</strong>
          <p>${esc(safeHours(gym))}</p>
          <div class="mini-stack">
            <small>Area: ${esc(areaText(gym))}</small>
            <small>Sumber: ${esc(sourceText(gym))}</small>
          </div>
        </aside>
      </div>
    </section>`;
}

function buildQuickInfo(gym) {
  const info = [
    ['Cocok untuk', audienceText(gym)],
    ['Area', areaText(gym)],
    ['Tipe latihan', listItems(gym.programs, 4)],
    ['Kanal kontak', contactLabel(gym)]
  ];
  return `
    <section id="quick-info" class="section section-light compact-section" aria-labelledby="quick-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Ringkasan</p>
          <h2 id="quick-title">Yang perlu dicek sebelum datang.</h2>
          <p>Halaman ini merangkum informasi praktis agar calon member bisa cepat membandingkan lokasi, fasilitas, dan jalur kontak resmi.</p>
        </div>
        <div class="info-grid">
          ${info.map(([title, text]) => `<article class="info-card reveal" data-animate="fade-up"><span>${esc(title)}</span><p>${esc(text)}</p></article>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildFacilities(gym, imgs) {
  const cards = [
    ...gym.facilities.map((item) => ({ title: localLabel(item), type: 'fasilitas', text: facilityDescription(item, gym) })),
    ...gym.programs.map((item) => ({ title: localLabel(item), type: programTag(item), text: programDescription(item, gym) }))
  ];
  return `
    <section id="facilities" class="section section-dark" aria-labelledby="facilities-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Fasilitas & Program</p>
          <h2 id="facilities-title">Informasi latihan yang aman untuk dipublikasikan.</h2>
          <p>Data di bawah memakai sumber yang tersedia. Detail harga, jadwal kelas, dan ketersediaan trainer sebaiknya tetap dikonfirmasi langsung.</p>
        </div>
        <div class="filter-bar reveal" data-animate="fade-up" aria-label="Filter fasilitas dan program">
          <button class="filter-button is-active" type="button" data-filter="all" aria-pressed="true">Semua</button>
          <button class="filter-button" type="button" data-filter="fasilitas" aria-pressed="false">Fasilitas</button>
          <button class="filter-button" type="button" data-filter="latihan" aria-pressed="false">Latihan</button>
          <button class="filter-button" type="button" data-filter="kelas" aria-pressed="false">Kelas</button>
          <button class="filter-button" type="button" data-filter="pendampingan" aria-pressed="false">Pendampingan</button>
        </div>
        <div class="program-grid">
          ${cards.map((card, index) => `<article class="program-card reveal" data-program="${esc(card.type)}" data-animate="fade-up">
            <img src="${imgs[(index + 1) % imgs.length]}" alt="Ilustrasi ${esc(card.title.toLowerCase())}" width="900" height="650" loading="lazy">
            <div><p class="card-label">${esc(card.type)}</p><h3>${esc(card.title)}</h3><p>${esc(card.text)}</p></div>
          </article>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildMembership(gym) {
  const contact = primaryContactUrl(gym);
  const label = contactLabel(gym);
  const cards = [
    ['Kunjungan pertama', 'Tanya biaya kunjungan, jam ramai, dan aturan masuk sebelum datang pertama kali.'],
    ['Membership rutin', 'Cek pilihan paket bulanan atau periode lain melalui admin atau kanal resmi.'],
    ['Personal training / kelas', 'Konfirmasi jadwal trainer, kelas, dan biaya tambahan bila tersedia.']
  ];
  return `
    <section id="membership" class="section section-light" aria-labelledby="membership-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Harga / Membership</p>
          <h2 id="membership-title">Pilih kebutuhan latihan, lalu hubungi kanal resmi.</h2>
          <p>Harga dapat berubah. Halaman ini tidak membuat paket fiktif; semua keputusan harga diarahkan ke admin, website resmi, Linktree, Instagram, atau Maps sesuai data yang tersedia.</p>
        </div>
        <div class="pricing-grid">
          ${cards.map(([title, text], index) => `<article class="price-card ${index === 1 ? 'featured' : ''} reveal" data-animate="fade-up">
            <p class="card-label">Opsi ${index + 1}</p>
            <h3>${esc(title)}</h3>
            <p>${esc(text)}</p>
            <a class="btn btn-card" href="${esc(contact)}" target="_blank" rel="noopener" data-select-package="${esc(title)}">${esc(label)}</a>
          </article>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildSupport(gym) {
  return `
    <section id="support" class="section section-white" aria-labelledby="support-title">
      <div class="container split">
        <div class="section-copy reveal" data-animate="fade-right">
          <p class="eyebrow">Pendampingan Latihan</p>
          <h2 id="support-title">Tanyakan dukungan latihan yang tersedia.</h2>
          <p>Beberapa gym menyediakan personal trainer, kelas, atau pendampingan dasar. Karena nama coach dan jadwal bisa berubah, konfirmasi detailnya melalui kanal resmi ${esc(gym.name)}.</p>
          <div class="pill-list">${gym.programs.slice(0, 5).map((item) => `<span>${esc(localLabel(item))}</span>`).join('')}</div>
        </div>
        <div class="support-card reveal" data-animate="fade-left">
          <h3>Informasi yang sebaiknya ditanyakan</h3>
          <ul>
            <li>Harga kunjungan atau membership terbaru</li>
            <li>Jam operasional dan waktu terbaik untuk datang</li>
            <li>Ketersediaan personal trainer atau kelas</li>
            <li>Aturan member baru, parkir, dan fasilitas pendukung</li>
          </ul>
        </div>
      </div>
    </section>`;
}

function buildGallery(gym, imgs) {
  return `
    <section id="gallery" class="section section-dark" aria-labelledby="gallery-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">Visual</p>
          <h2 id="gallery-title">Ilustrasi suasana latihan.</h2>
          <p>Gambar berikut dipakai sebagai ilustrasi sampai foto resmi dari gym tersedia di project. Caption tidak mengklaim sebagai foto asli lokasi.</p>
        </div>
        <div class="gallery-grid">
          ${imgs.slice(1, 5).map((img, index) => {
            const title = localLabel(gym.facilities[index % gym.facilities.length]);
            const text = `Ilustrasi ${title.toLowerCase()} untuk membantu calon member membayangkan tipe latihan. Cek Instagram atau Maps ${gym.name} untuk foto lokasi terbaru.`;
            return `<button class="gallery-card ${index === 1 ? 'tall' : index === 3 ? 'wide' : ''} reveal" type="button" data-animate="fade-up" aria-label="Lihat ilustrasi ${esc(title.toLowerCase())}" data-lightbox-src="${img}" data-lightbox-title="${esc(title)}" data-lightbox-text="${esc(text)}">
              <img src="${img}" alt="Ilustrasi ${esc(title.toLowerCase())}" width="1000" height="760" loading="lazy">
              <span><strong>${esc(title)}</strong><small>Ilustrasi suasana latihan</small></span>
            </button>`;
          }).join('')}
        </div>
      </div>
    </section>`;
}

function buildLocation(gym) {
  const second = secondaryLink(gym);
  return `
    <section id="location" class="section section-light" aria-labelledby="location-title">
      <div class="container split">
        <div class="section-copy reveal" data-animate="fade-right">
          <p class="eyebrow">Lokasi</p>
          <h2 id="location-title">Cek rute sebelum berangkat.</h2>
          <p>${esc(areaText(gym))}</p>
          <div class="contact-list">
            <a href="${esc(gym.maps)}" target="_blank" rel="noopener">Buka Google Maps</a>
            <a href="${esc(primaryContactUrl(gym))}" target="_blank" rel="noopener">${esc(contactLabel(gym))}</a>
            <a href="${esc(second.url)}" target="_blank" rel="noopener">${esc(second.label)}</a>
          </div>
        </div>
        <div class="map-card reveal" data-animate="fade-left">
          <span>Jam operasional</span>
          <strong>${esc(safeHours(gym))}</strong>
          <p>Gunakan Maps untuk melihat rute, foto terbaru, dan ulasan publik sebelum berkunjung.</p>
        </div>
      </div>
    </section>`;
}

function buildReviews(gym) {
  return `
    <section id="reviews" class="section section-white" aria-labelledby="reviews-title">
      <div class="container split">
        <div class="section-copy reveal" data-animate="fade-right">
          <p class="eyebrow">Ulasan & Validasi</p>
          <h2 id="reviews-title">Cek pengalaman pengunjung terbaru.</h2>
          <p>Kami tidak menampilkan rating yang belum terverifikasi. Untuk melihat foto lokasi, ulasan publik, dan informasi terbaru, buka halaman Google Maps atau kanal resmi ${esc(gym.name)}.</p>
        </div>
        <div class="cta-panel reveal" data-animate="fade-left">
          <a class="btn btn-primary" href="${esc(gym.maps)}" target="_blank" rel="noopener">Cek Ulasan di Maps</a>
          <a class="btn btn-secondary" href="${esc(secondaryLink(gym).url)}" target="_blank" rel="noopener">${esc(secondaryLink(gym).label)}</a>
        </div>
      </div>
    </section>`;
}

function buildFaq(gym) {
  const primary = contactLabel(gym).toLowerCase();
  const faqs = [
    ['Apakah bisa tanya harga terbaru?', `Bisa. Gunakan tombol ${primary} agar admin atau kanal resmi ${gym.name} bisa memberi info harga yang paling baru.`],
    ['Apakah lokasi bisa dicek sebelum datang?', 'Bisa. Tombol Google Maps tersedia untuk membuka rute dan melihat informasi publik terbaru.'],
    ['Apakah tersedia personal training?', 'Jika sumber menyebut personal trainer atau coaching, ketersediaannya tetap perlu dikonfirmasi karena jadwal dapat berubah.'],
    ['Apakah jadwal kelas dan jam buka bisa berubah?', 'Bisa. Jadwal kelas, jam operasional, dan promo sebaiknya dicek langsung melalui admin atau kanal resmi.']
  ];
  return `
    <section id="faq" class="section section-light" aria-labelledby="faq-title">
      <div class="container">
        <div class="section-heading reveal" data-animate="fade-up">
          <p class="eyebrow">FAQ</p>
          <h2 id="faq-title">Pertanyaan singkat sebelum daftar.</h2>
        </div>
        <div class="faq-list">
          ${faqs.map(([q, a], index) => `<details class="faq-item reveal" data-animate="fade-up" ${index === 0 ? 'open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
        </div>
      </div>
    </section>`;
}

function buildJoin(gym) {
  return `
    <section id="join" class="section section-accent" aria-labelledby="join-title">
      <div class="container split">
        <div class="section-copy reveal" data-animate="fade-right">
          <p class="eyebrow">Langkah Berikutnya</p>
          <h2 id="join-title">Mau cek harga, jadwal, atau fasilitas terbaru?</h2>
          <p>Hubungi kanal resmi ${esc(gym.name)} sebelum datang agar informasi yang kamu pakai tetap akurat.</p>
        </div>
        <div class="cta-panel reveal" data-animate="fade-left">
          <a class="btn btn-primary" href="${esc(primaryContactUrl(gym))}" target="_blank" rel="noopener">${esc(contactLabel(gym))}</a>
          <a class="btn btn-secondary" href="${esc(gym.maps)}" target="_blank" rel="noopener">Lihat Lokasi</a>
        </div>
      </div>
    </section>`;
}

function buildFooter(gym) {
  const second = secondaryLink(gym);
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand-lockup" href="#hero"><span class="brand-mark">${esc(initials(gym.name))}</span><span>${esc(gym.name)}</span></a>
          <p>${esc(metaDescription(gym))}</p>
        </div>
        <div><h2>Kontak</h2><a href="${esc(primaryContactUrl(gym))}" target="_blank" rel="noopener">${esc(contactLabel(gym))}</a><a href="${esc(second.url)}" target="_blank" rel="noopener">${esc(second.label)}</a><a href="${esc(gym.maps)}" target="_blank" rel="noopener">Google Maps</a></div>
        <div><h2>Info</h2><p>${esc(safeHours(gym))}</p><p>${esc(areaText(gym))}</p></div>
      </div>
    </footer>
    <div class="sticky-cta" data-sticky-cta><span>${esc(gym.name)}</span><a class="btn btn-primary" href="${esc(primaryContactUrl(gym))}" target="_blank" rel="noopener">${esc(contactLabel(gym))}</a></div>`;
}

function buildPage(gym) {
  const imgs = imageList(gym);
  const nav = [
    ['Ringkasan', 'quick-info'],
    ['Fasilitas', 'facilities'],
    ['Harga', 'membership'],
    ['Lokasi', 'location'],
    ['Ulasan', 'reviews'],
    ['FAQ', 'faq']
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: gym.name,
    description: metaDescription(gym),
    url: fullUrl(gym),
    image: imgs[0],
    address: {
      '@type': 'PostalAddress',
      addressLocality: gym.city,
      addressCountry: 'ID'
    },
    openingHours: safeHours(gym),
    sameAs: [gym.instagram, gym.maps].filter(Boolean)
  };
  if (hasWhatsApp(gym)) jsonLd.telephone = gym.whatsapp.replace('https://wa.me/', '+');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#151515">
  <title>${esc(metaTitle(gym))}</title>
  <meta name="description" content="${esc(metaDescription(gym))}">
  <link rel="canonical" href="${fullUrl(gym)}">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <meta name="robots" content="index, follow">
  <meta property="og:locale" content="id_ID">
  <meta property="og:title" content="${esc(metaTitle(gym))}">
  <meta property="og:description" content="${esc(metaDescription(gym))}">
  <meta property="og:image" content="${imgs[0]}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${fullUrl(gym)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(metaTitle(gym))}">
  <meta name="twitter:description" content="${esc(metaDescription(gym))}">
  <meta name="twitter:image" content="${imgs[0]}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="preload" as="image" href="${imgs[0]}" fetchpriority="high">
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/gyms/shared/site.css">
  <style>:root{--primary:${gym.primary || '#f97316'};--accent:${gym.accent || '#22c55e'};}</style>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body data-gym="${esc(gym.name)}">
  <a class="skip-link" href="#main-content">Lewati ke konten utama</a>
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="Navigasi utama">
      <a class="brand-lockup" href="/"><span class="brand-mark">${esc(initials(gym.name))}</span><span>${esc(gym.name)}</span></a>
      <button class="menu-toggle" type="button" aria-label="Buka navigasi" aria-expanded="false" data-menu-toggle><span></span><span></span></button>
      <div class="nav-links" data-nav-links>${nav.map(([label, id]) => `<a href="#${id}">${label}</a>`).join('')}</div>
      <a class="nav-cta" href="${esc(primaryContactUrl(gym))}" target="_blank" rel="noopener">${esc(contactLabel(gym))}</a>
    </nav>
  </header>
  <main id="main-content" tabindex="-1">
    ${buildHero(gym, imgs)}
    ${buildQuickInfo(gym)}
    ${buildFacilities(gym, imgs)}
    ${buildMembership(gym)}
    ${buildSupport(gym)}
    ${buildGallery(gym, imgs)}
    ${buildLocation(gym)}
    ${buildReviews(gym)}
    ${buildFaq(gym)}
    ${buildJoin(gym)}
  </main>
  ${buildFooter(gym)}
  <div class="lightbox" data-lightbox aria-hidden="true">
    <div class="modal-backdrop" data-lightbox-close></div>
    <div class="lightbox-panel" role="dialog" aria-modal="true" aria-label="Preview gambar" tabindex="-1">
      <button class="modal-close" type="button" data-lightbox-close aria-label="Tutup preview">Tutup</button>
      <img data-lightbox-image alt="">
      <h2 data-lightbox-title>Visual</h2>
      <p data-lightbox-text></p>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" defer></script>
  <script src="/gyms/shared/site.js" defer></script>
</body>
</html>`;
}

function buildSharedCss() {
  return `/* ==========================================================================
   CSS DESIGN SYSTEM — TOKENS & RESET
   ========================================================================== */

:root {
  /* Colors */
  --bg: #0b0d0f;
  --panel: rgba(18, 23, 29, 0.86);
  --panel2: rgba(255, 255, 255, 0.06);
  --text: #f8fafc;
  --muted: rgba(248, 250, 252, 0.74);
  --line: rgba(255, 255, 255, 0.14);
  --primary: #f97316;
  --accent: #22c55e;
  
  /* Typography */
  --font-heading: "Barlow Condensed", system-ui, sans-serif;
  --font-body: "Barlow", system-ui, sans-serif;
  
  /* Layout & Animation */
  --radius: 16px;
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --motion-distance: 32px;
  --container: 1180px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  color-scheme: dark;
}

body {
  margin: 0;
  min-width: 320px;
  max-width: 100%;
  overflow-x: hidden;
  background: radial-gradient(circle at 12% 8%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 30%),
              repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 96px),
              #090b0d;
  color: var(--text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(120deg, transparent 0 58%, color-mix(in srgb, var(--primary) 7%, transparent) 58% 59%, transparent 59%);
  opacity: 0.8;
}

body.modal-open {
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, select {
  font: inherit;
}

button, a, select {
  touch-action: manipulation;
}

button {
  cursor: pointer;
}

img {
  display: block;
  max-width: 100%;
}

p, h1, h2, h3, span, strong, a, button, small {
  overflow-wrap: break-word;
}

/* Accessibility Focus States */
:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 4px;
}

.skip-link {
  position: fixed;
  top: 14px;
  left: 14px;
  z-index: 200;
  transform: translateY(-140%);
  background: var(--accent);
  color: #07120b;
  border-radius: 10px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  font-weight: 900;
  transition: transform 0.3s var(--ease);
}

.skip-link:focus {
  transform: translateY(0);
}

/* ==========================================================================
   LAYOUT & CONTAINER
   ========================================================================== */

.container {
  width: min(var(--container), calc(100% - 48px));
  margin-inline: auto;
}

/* ==========================================================================
   NAVIGATION BAR
   ========================================================================== */

.site-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  padding: 16px 24px 10px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(9, 11, 13, 0.96), rgba(9, 11, 13, 0.76) 70%, transparent);
}

.nav-shell {
  width: min(1220px, 100%);
  min-height: 72px;
  margin: auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(8, 10, 12, 0.84);
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.38);
  padding: 10px 12px 10px 16px;
  pointer-events: auto;
}

.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-heading);
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.brand-mark {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--primary) 55%, rgba(255, 255, 255, 0.2));
  border-radius: 12px;
  background: linear-gradient(145deg, color-mix(in srgb, var(--primary) 24%, transparent), rgba(255, 255, 255, 0.04));
  font-size: 1.15rem;
  flex: none;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.nav-links a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0 13px;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background-color 0.25s var(--ease), color 0.25s var(--ease);
}

.nav-links a:hover,
.nav-links a.is-active {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.nav-cta, .btn {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 10px;
  padding: 0 18px;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
}

.nav-cta, .btn-primary {
  background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 72%, #fff));
  color: #100702;
  box-shadow: 0 18px 36px color-mix(in srgb, var(--primary) 25%, transparent);
}

.btn-secondary, .btn-card {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
}

.menu-toggle {
  display: none;
  width: 48px;
  height: 48px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  position: relative;
}

.menu-toggle span {
  position: absolute;
  width: 20px;
  height: 2px;
  background: currentColor;
  left: 13px;
  transition: transform 0.25s var(--ease), top 0.25s var(--ease);
}

.menu-toggle span:first-child {
  top: 18px;
}

.menu-toggle span:last-child {
  top: 28px;
}

.menu-toggle[aria-expanded=true] span:first-child {
  top: 23px;
  transform: rotate(45deg);
}

.menu-toggle[aria-expanded=true] span:last-child {
  top: 23px;
  transform: rotate(-45deg);
}

/* ==========================================================================
   HERO BANNER
   ========================================================================== */

.hero {
  min-height: calc(100svh - 112px);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 56px 0 70px;
  border-bottom: 1px solid var(--line);
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: -2;
  background: #11161b;
}

.hero-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(7, 9, 12, 0.94), rgba(7, 9, 12, 0.55) 48%, rgba(7, 9, 12, 0.86)),
              linear-gradient(0deg, rgba(7, 9, 12, 0.97), transparent 50%, rgba(7, 9, 12, 0.25));
}

.hero-media img {
  width: 100%;
  height: calc(100% + 56px);
  object-fit: cover;
  transform: translate3d(0, var(--parallax-y, 0), 0) scale(1.03);
  filter: grayscale(0.16) contrast(1.08);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
  gap: clamp(28px, 6vw, 70px);
  align-items: center;
}

.hero-copy {
  min-width: 0;
  max-width: 900px;
}

.eyebrow {
  margin: 0 0 13px;
  color: var(--primary);
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.82rem;
}

h1, h2, h3 {
  margin: 0;
  font-family: var(--font-heading);
  text-transform: uppercase;
}

h1 {
  max-width: 900px;
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  letter-spacing: 0.01em;
}

h2 {
  max-width: 840px;
  font-size: clamp(2.1rem, 4.8vw, 4.35rem);
  line-height: 0.94;
}

h3 {
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  line-height: 1;
}

.hero-kicker {
  margin: 18px 0 0;
  color: var(--accent);
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 900;
}

.hero-text, .section-heading p, .section-copy>p, .program-card p, .price-card p,
.support-card li, .site-footer p, .gallery-card small, .faq-item p, .info-card p, .map-card p {
  color: var(--muted);
  font-size: clamp(1rem, 1.35vw, 1.1rem);
  line-height: 1.65;
}

.hero-text {
  max-width: 700px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

/* ==========================================================================
   CARDS & PANELS
   ========================================================================== */

.hero-status, .program-card, .price-card, .support-card, .map-card, .cta-panel, .info-card, .faq-item {
  border: 1px solid var(--line);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.045));
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(18px);
}

.hero-status {
  border-radius: 20px;
  padding: 24px;
}

.hero-status span, .card-label, .info-card span, .map-card span {
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-status strong, .map-card strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 2rem;
  line-height: 1;
  text-transform: uppercase;
}

.mini-stack {
  display: grid;
  gap: 8px;
  margin-top: 18px;
}

.mini-stack small {
  color: var(--muted);
  line-height: 1.5;
}

/* ==========================================================================
   SECTIONS
   ========================================================================== */

.section {
  padding: clamp(68px, 8vw, 116px) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.075);
}

.compact-section {
  padding-top: clamp(46px, 6vw, 82px);
}

.muted-section {
  background: rgba(255, 255, 255, 0.025);
}

.section-heading {
  max-width: 850px;
  margin-bottom: 34px;
}

.split {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 1.05fr);
  gap: clamp(30px, 7vw, 82px);
  align-items: center;
}

/* ==========================================================================
   INFO & DIRECTORY GRIDS
   ========================================================================== */

.info-grid, .pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.info-card, .price-card, .support-card, .map-card, .cta-panel {
  border-radius: 18px;
  padding: 22px;
}

.info-card p {
  margin-bottom: 0;
}

.pill-list, .contact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.pill-list span, .contact-list a {
  border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--line));
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  padding: 10px 14px;
  font-weight: 900;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.filter-button {
  min-height: 44px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--muted);
  padding: 0 15px;
  font-weight: 900;
  text-transform: uppercase;
  transition: all 0.25s var(--ease);
}

.filter-button.is-active, .filter-button:hover {
  background: color-mix(in srgb, var(--primary) 18%, transparent);
  color: #fff;
  border-color: color-mix(in srgb, var(--primary) 60%, var(--line));
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
}

.program-card {
  grid-column: span 2;
  overflow: hidden;
  border-radius: 16px;
}

.program-card.is-hidden {
  display: none;
}

.program-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.program-card div {
  padding: 20px;
}

.pricing-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.price-card.featured {
  border-color: color-mix(in srgb, var(--primary) 64%, var(--line));
  background: linear-gradient(145deg, color-mix(in srgb, var(--primary) 15%, transparent), rgba(255, 255, 255, 0.055));
}

.price-card .btn {
  margin-top: 18px;
}

.support-card ul {
  padding-left: 20px;
  margin: 18px 0 0;
  display: grid;
  gap: 10px;
}

/* ==========================================================================
   GALLERY COMPONENT
   ========================================================================== */

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 240px;
  gap: 14px;
}

.gallery-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #11161b;
  padding: 0;
  text-align: left;
}

.gallery-card.tall {
  grid-row: span 2;
}

.gallery-card.wide {
  grid-column: span 2;
}

.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.56s var(--ease);
}

.gallery-card:hover img, .gallery-card:focus-visible img {
  transform: scale(1.07);
}

.gallery-card span {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(8, 10, 12, 0.78);
  backdrop-filter: blur(14px);
  padding: 14px;
  display: grid;
  gap: 7px;
  transform: translateY(calc(100% - 52px));
  transition: transform 0.56s var(--ease);
}

.gallery-card:hover span, .gallery-card:focus-visible span {
  transform: translateY(0);
}

.gallery-card strong {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  text-transform: uppercase;
}

.gallery-card small {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: opacity 0.32s var(--ease), max-height 0.32s var(--ease);
}

.gallery-card:hover small, .gallery-card:focus-visible small {
  opacity: 1;
  max-height: 120px;
}

/* ==========================================================================
   FAQ & ACCORDION
   ========================================================================== */

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-item {
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
}

.faq-item summary {
  min-height: 58px;
  padding: 18px 20px;
  font-weight: 900;
  cursor: pointer;
  user-select: none;
}

.faq-item p {
  padding: 0 20px 20px;
  margin: 0;
}

.cta-panel {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

/* ==========================================================================
   FOOTER LAYER
   ========================================================================== */

.site-footer {
  border-top: 1px solid var(--line);
  padding: 46px 0;
  background: rgba(5, 7, 9, 0.85);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.8fr;
  gap: 26px;
}

.footer-grid>div {
  display: grid;
  align-content: start;
  gap: 10px;
}

.footer-grid h2 {
  font-size: 1.5rem;
}

.site-footer a {
  color: var(--accent);
  font-weight: 900;
}

/* ==========================================================================
   STICKY & FLOATING CONVERSION CTA
   ========================================================================== */

.sticky-cta {
  position: fixed;
  left: 50%;
  bottom: 18px;
  z-index: 80;
  width: min(620px, calc(100% - 32px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid color-mix(in srgb, var(--primary) 36%, var(--line));
  border-radius: 16px;
  background: rgba(8, 10, 12, 0.88);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
  padding: 10px;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 24px);
  transition: 0.42s var(--ease);
}

.sticky-cta.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, 0);
}

/* ==========================================================================
   LIGHTBOX DIALOG (MODAL)
   ========================================================================== */

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.lightbox.is-open {
  display: flex;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
}

.modal-close {
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.07);
  color: #fff;
  padding: 0 12px;
  justify-self: end;
}

.lightbox-panel {
  position: relative;
  z-index: 1;
  width: min(920px, 100%);
  border: 1px solid var(--line);
  border-radius: 20px;
  background: #11161b;
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.55);
  padding: 22px;
  display: grid;
  gap: 14px;
}

.lightbox-panel img {
  width: 100%;
  max-height: 68vh;
  object-fit: cover;
  border-radius: 16px;
}

/* ==========================================================================
   REVEAL / SCROLL ANIMATION STATES
   ========================================================================== */

body.js-ready .reveal {
  opacity: 0;
  transform: translate3d(0, var(--motion-enter-y, var(--motion-distance)), 0);
  filter: blur(2px);
  transition: opacity 0.56s var(--ease), transform 0.56s var(--ease), filter 0.56s var(--ease);
}

body.js-ready .reveal[data-animate=fade-left],
body.js-ready .reveal[data-animate=fade-right] {
  transform: translate3d(var(--motion-enter-x, 0), 0, 0);
}

body.js-ready .reveal[data-animate=fade-left] {
  --motion-enter-x: 36px;
}

body.js-ready .reveal[data-animate=fade-right] {
  --motion-enter-x: -36px;
}

body.js-ready .reveal[data-animate=scale-in] {
  transform: scale(0.965);
}

body.js-ready .reveal.scroll-up {
  --motion-enter-y: calc(var(--motion-distance) * -1);
}

body.js-ready .reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
  filter: blur(0);
}

body.js-ready .reveal.is-exiting {
  opacity: 0.16;
}

.image-failed {
  min-height: 220px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, transparent), color-mix(in srgb, var(--accent) 12%, transparent)),
              #11161b;
}

/* ==========================================================================
   GYMS HUB & DIRECTORY SPECIFIC
   ========================================================================== */

.directory {
  padding: 104px 0;
}

.directory h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
}

.directory-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 32px;
}

.directory-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.055);
  padding: 18px;
  display: grid;
  gap: 12px;
  transition: all 0.25s var(--ease);
}

.directory-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.directory-card strong {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  text-transform: uppercase;
}

.directory-card span, .directory-card small {
  color: var(--muted);
}

.directory-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 28px;
}

/* ==========================================================================
   RESPONSIVE MEDIA QUERIES (TABLET & LAPTOP)
   ========================================================================== */

@media (max-width: 1024px) {
  .nav-shell {
    grid-template-columns: auto auto auto;
  }
  
  .menu-toggle {
    display: inline-flex;
    justify-self: end;
  }
  
  .nav-links {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    display: grid;
    justify-content: stretch;
    border: 1px solid var(--line);
    border-radius: 16px;
    background: rgba(8, 10, 12, 0.97);
    padding: 10px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transition: 0.26s var(--ease);
  }
  
  .nav-links.is-open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  
  .nav-links a {
    justify-content: center;
  }
  
  .hero-grid, .split {
    grid-template-columns: 1fr;
  }
  
  .program-card {
    grid-column: span 3;
  }
  
  .info-grid, .pricing-grid, .footer-grid, .directory-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .container, .hero-grid {
    width: calc(100vw - 48px);
    max-width: calc(100vw - 48px);
  }
  
  .site-header {
    top: 0;
    padding: 10px 12px;
  }
  
  .nav-shell {
    min-height: 64px;
    padding: 8px;
  }
  
  .brand-mark {
    width: 44px;
    height: 44px;
  }
  
  .brand-lockup span:last-child {
    font-size: 1rem;
    max-width: 154px;
    line-height: 0.95;
  }
  
  .nav-cta {
    display: none;
  }
  
  .hero {
    min-height: auto;
    padding: 36px 0 54px;
  }
  
  .hero-status, .program-card, .price-card, .support-card, .map-card, .cta-panel, .info-card, .faq-item {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
  
  .hero-actions {
    width: 100%;
    max-width: calc(100vw - 48px);
    overflow: hidden;
  }
  
  .hero-actions .btn {
    width: min(100%, 340px);
    max-width: calc(100vw - 64px);
  }
  
  .program-grid, .info-grid, .pricing-grid, .directory-grid {
    grid-template-columns: 1fr;
  }
  
  .program-card {
    grid-column: auto;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 260px;
  }
  
  .gallery-card.tall, .gallery-card.wide {
    grid-column: auto;
    grid-row: auto;
  }
  
  .gallery-card span {
    transform: translateY(0);
  }
  
  .gallery-card small {
    opacity: 1;
    max-height: 160px;
  }
  
  .sticky-cta {
    position: sticky;
    bottom: 10px;
    margin: 0 auto 10px;
    left: auto;
    transform: none;
    width: calc(100% - 24px);
    flex-direction: column;
    align-items: stretch;
  }
  
  .sticky-cta.is-visible {
    transform: none;
  }
  
  .sticky-cta span {
    text-align: center;
  }
}

/* prefers-reduced-motion fallback */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  body.js-ready .reveal,
  body.js-ready .reveal[data-animate=fade-left],
  body.js-ready .reveal[data-animate=fade-right],
  body.js-ready .reveal[data-animate=scale-in] {
    opacity: 1;
    transform: none;
    filter: none;
  }
  
  .hero-media img {
    transform: none !important;
  }
}

/* high contrast accessibility support */
@media (prefers-contrast: more) {
  :root {
    --muted: rgba(255, 255, 255, 0.88);
    --line: rgba(255, 255, 255, 0.34);
  }
}`;
}

function buildSharedJs() {
  return `/* ==========================================================================
   SHARED JAVASCRIPT — SYSTEM MOTIONS & INTERACTION
   ========================================================================== */

(() => {
  'use strict';
  
  // DOM Selectors with Safety Guards
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  
  const focusableSelector = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  
  // Animation System State
  const state = {
    direction: 'down',
    lastY: window.scrollY,
    ticking: false,
    lastFocus: null
  };
  
  document.body.classList.add('js-ready');
  
  /* 1. HEADER & INTERACTIVE NAVIGATION */
  function initNav() {
    const header = $('[data-header]');
    const btn = $('[data-menu-toggle]');
    const links = $('[data-nav-links]');
    const anchors = $$('.nav-links a');
    
    if (btn && links) {
      btn.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
      
      anchors.forEach(a => a.addEventListener('click', () => {
        links.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }));
    }
    
    // Smooth navigation active marker linking using IntersectionObserver
    const sections = $$('main section[id]');
    const obs = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        anchors.forEach(a => {
          const active = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('is-active', active);
          if (active) {
            a.setAttribute('aria-current', 'true');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      });
    }, { threshold: 0.28, rootMargin: '-20% 0px -55% 0px' }) : null;
    
    sections.forEach(s => obs?.observe(s));
    
    // Header scrolled and sticky CTA visibility behaviors
    window.addEventListener('scroll', () => {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
      }
      
      const stickyCta = $('[data-sticky-cta]');
      if (stickyCta) {
        stickyCta.classList.toggle('is-visible', window.scrollY > 900);
      }
    }, { passive: true });
  }
  
  /* 2. DIRECTIONAL SCROLL MOTION SYSTEM (NON-GSAP FALLBACK) */
  const ScrollMotionController = {
    observer: null,
    elements: [],
    
    init() {
      this.elements = $$('[data-animate], .reveal');
      
      if (reduceMotion.matches) {
        this.elements.forEach(e => e.classList.add('is-visible'));
        return;
      }
      
      // Scroll direction passive tracking
      window.addEventListener('scroll', () => {
        if (state.ticking) return;
        state.ticking = true;
        
        requestAnimationFrame(() => {
          const y = window.scrollY;
          // Apply a 4px tolerance filter to suppress micro jitter
          if (Math.abs(y - state.lastY) > 4) {
            state.direction = y > state.lastY ? 'down' : 'up';
            state.lastY = y;
          }
          this.updateParallax();
          state.ticking = false;
        });
      }, { passive: true });
      
      if (!('IntersectionObserver' in window)) {
        this.elements.forEach(e => e.classList.add('is-visible'));
        return;
      }
      
      // Bidirectional entering and leaving triggers
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.remove('is-exiting', 'scroll-up', 'scroll-down');
            el.classList.add('is-visible', 'scroll-' + state.direction);
            
            // Custom motion analytics/event hook
            el.dispatchEvent(new CustomEvent('animation:enter', {
              bubbles: true,
              detail: { direction: state.direction }
            }));
          } else {
            el.classList.remove('is-visible');
            el.classList.add('is-exiting');
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });
      
      this.elements.forEach((e, i) => {
        // Stagger transitions slightly
        e.style.transitionDelay = (Math.min(i % 4, 3) * 45) + 'ms';
        this.observer.observe(e);
      });
    },
    
    updateParallax() {
      if (reduceMotion.matches) return;
      
      $$('[data-parallax-speed]').forEach(el => {
        const speed = Number(el.dataset.parallaxSpeed || 0.08);
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
        
        const off = Math.max(-34, Math.min(34, (r.top - window.innerHeight / 2) * speed));
        el.style.setProperty('--parallax-y', off + 'px');
      });
    },
    
    getState() {
      return {
        direction: state.direction,
        elements: this.elements.length
      };
    }
  };
  
  window.ScrollMotionController = ScrollMotionController;
  
  /* 3. CARD FILTERING (PROGRAM SECTION) */
  function initFilters() {
    $$('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        $$('[data-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
        
        $$('[data-program]').forEach(card => {
          const matched = filter === 'all' || (card.dataset.program || '').includes(filter);
          card.classList.toggle('is-hidden', !matched);
        });
      });
    });
  }
  
  /* 4. PLAN PACKAGES INTERACTION */
  function initPackages() {
    $$('[data-select-package]').forEach(el => {
      el.addEventListener('click', () => {
        $$('[data-select-package]').forEach(i => i.classList.remove('is-selected'));
        el.classList.add('is-selected');
      });
    });
  }
  
  /* 5. FOCUS MANAGEMENT & TRAPPING TOOL */
  function trap(container, event) {
    if (event.key !== 'Tab') return;
    const f = $$(focusableSelector, container);
    if (!f.length) return;
    
    const first = f[0];
    const last = f[f.length - 1];
    
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  
  /* 6. ACCESSIBLE GALLERY LIGHTBOX DIALOG */
  function initLightbox() {
    const lb = $('[data-lightbox]');
    const img = $('[data-lightbox-image]');
    const title = $('[data-lightbox-title]');
    const text = $('[data-lightbox-text]');
    const panel = $('.lightbox-panel');
    
    if (!lb || !img || !title || !text) return;
    
    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      state.lastFocus?.focus?.();
    }
    
    $$('[data-lightbox-src]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.lastFocus = document.activeElement;
        img.src = btn.dataset.lightboxSrc;
        img.alt = btn.dataset.lightboxTitle || 'Preview visual';
        title.textContent = btn.dataset.lightboxTitle || 'Visual';
        text.textContent = btn.dataset.lightboxText || '';
        
        lb.classList.add('is-open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        panel?.focus();
      });
    });
    
    $$('[data-lightbox-close]').forEach(b => b.addEventListener('click', close));
    
    lb.addEventListener('keydown', e => trap(lb, e));
    
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) {
        close();
      }
    });
  }
  
  /* 7. FAQ ACCORDION (MUTUALLY EXCLUSIVE DETAILS) */
  function initFaq() {
    $$('details.faq-item').forEach(item => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        $$('details.faq-item').forEach(other => {
          if (other !== item) {
            other.open = false;
          }
        });
      });
    });
  }
  
  /* 8. ROBUST IMAGE BROKEN FALLBACKS */
  function imageFallback() {
    document.addEventListener('error', e => {
      const target = e.target;
      if (!(target instanceof HTMLImageElement)) return;
      
      const holder = target.closest('.hero-media, .program-card, .gallery-card, .lightbox-panel');
      if (holder) {
        holder.classList.add('image-failed');
      }
      target.remove();
    }, true);
  }
  
  // Listen for reduced motion changes dynamically
  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) {
      $$('[data-animate], .reveal').forEach(e => e.classList.add('is-visible'));
    }
  });
  
  // Initialization Trigger
  imageFallback();
  initNav();
  ScrollMotionController.init();
  initFilters();
  initPackages();
  initLightbox();
  initFaq();
})();`;
}

function buildGsapEnhancementJs() {
  return `/* ==========================================================================
   GSAP SYSTEM ENGINE — ADVANCED BIDIRECTIONAL MOTION PARALLAX
   ========================================================================== */

(() => {
  'use strict';
  
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }
  
  ready(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    // Skip completely if libraries are missing or user prefers reduced motion
    if (!gsap || !ScrollTrigger || reduce.matches) return;
    
    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('gsap-ready');
    
    // Set standard premium durations and eases
    gsap.defaults({
      duration: 0.62,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    
    // Initialize reveal starts
    gsap.set('.reveal', { autoAlpha: 0, y: 28 });
    
    // Core Layout Entrances
    gsap.from('.nav-shell', {
      autoAlpha: 0,
      y: -18,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.04
    });
    
    gsap.from('.hero h1', {
      autoAlpha: 0,
      y: 34,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.12
    });
    
    gsap.from('.hero .eyebrow, .hero-kicker, .hero-text, .hero-actions', {
      autoAlpha: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.22
    });
    
    // Bidirectional scroll trigger batches
    ScrollTrigger.batch('.reveal', {
      start: 'top 86%',
      end: 'bottom 8%',
      interval: 0.08,
      batchMax: 6,
      
      // Scroll down: animate in from positive translate offset
      onEnter: batch => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        stagger: { each: 0.055, from: 'start' },
        duration: 0.64,
        ease: 'power2.out'
      }),
      
      // Scroll up: re-animate in with smooth entry from negative offset
      onEnterBack: batch => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        stagger: { each: 0.035, from: 'end' },
        duration: 0.48,
        ease: 'power2.out'
      }),
      
      // Scroll back up: retreat slightly to prepare for next scroll down
      onLeaveBack: batch => gsap.to(batch, {
        autoAlpha: 0.38,
        y: -18,
        stagger: 0.02,
        duration: 0.32,
        ease: 'power1.out'
      })
    });
    
    // Gentle premium parallax for Hero media container
    const heroImg = document.querySelector('.hero-media img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 6,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
    
    // Hover micro-motion effects for all cards
    gsap.utils.toArray('.program-card, .gallery-card, .price-card, .directory-card').forEach(card => {
      card.addEventListener('pointerenter', () => gsap.to(card, {
        y: -6,
        scale: 1.012,
        duration: 0.24,
        ease: 'power2.out'
      }));
      
      card.addEventListener('pointerleave', () => gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.28,
        ease: 'power2.out'
      }));
      
      card.addEventListener('focusin', () => gsap.to(card, {
        y: -4,
        scale: 1.008,
        duration: 0.22,
        ease: 'power2.out'
      }));
      
      card.addEventListener('focusout', () => gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.24,
        ease: 'power2.out'
      }));
    });
    
    // Perform trigger recalculation on fully loaded document
    let refreshTimer;
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    
    window.addEventListener('resize', () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 160);
    }, { passive: true });
    
    // Globals exposure for QA debug hooks
    window.GymGsapMotion = {
      refresh: () => ScrollTrigger.refresh(),
      version: gsap.version
    };
  });
})();`;
}

function buildMobileCssPatch() {
  return `/* ==========================================================================
   MOBILE RESPONSIVE CLEANUPS (UNDER 520PX WIDTH)
   ========================================================================== */

@media (max-width: 520px) {
  html, body, main, .hero, .section {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .container, .hero-grid {
    width: calc(100vw - 48px);
    max-width: calc(100vw - 48px);
  }
  
  .container > *, .hero-grid > * {
    max-width: 100%;
  }
  
  .hero-grid {
    display: block;
  }
  
  .hero-copy {
    width: 100%;
    max-width: calc(100vw - 72px);
    overflow: visible;
  }
  
  .section-heading, .section-copy, .hero-status, .map-card, .cta-panel, .info-card {
    width: 100%;
    max-width: calc(100vw - 72px);
    overflow: hidden;
  }
  
  h1, h2, h3, .hero-kicker, .hero-text, .hero-status p, .hero-status small,
  .info-card p, .section-heading p, .section-copy p {
    display: block;
    width: 100%;
    max-width: calc(100vw - 72px);
    white-space: normal;
    word-break: normal;
    overflow-wrap: break-word;
  }
  
  h1 {
    font-size: clamp(2.3rem, 11vw, 2.9rem);
  }
  
  h2 {
    font-size: clamp(1.78rem, 8.4vw, 2.35rem);
    line-height: 1.1;
  }
  
  .hero-kicker {
    font-size: 1.15rem;
    line-height: 1.28;
  }
  
  .hero-text {
    font-size: 1rem;
    line-height: 1.62;
  }
  
  .hero-status, .hero-status *, .nav-shell, .nav-shell * {
    min-width: 0;
  }
  
  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    max-width: calc(100vw - 72px);
    gap: 10px;
  }
  
  .hero-actions .btn {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-left: 12px;
    padding-right: 12px;
  }
  
  .hero-status {
    margin-top: 28px;
  }
  
  .nav-shell {
    width: 100%;
    max-width: calc(100vw - 24px);
  }
  
  .brand-lockup span:last-child {
    max-width: 170px;
    color: #f7f7f7;
  }
}`;
}

function buildBreathableCssPatch() {
  return `/* ==========================================================================
   BREATHABLE PREMIUM BRAND THEME — CONTRAST & DEPTH
   ========================================================================== */

html {
  color-scheme: light dark;
}

body {
  background: #f6f5f1;
  color: #151515;
}

body::after {
  opacity: 0.22;
}

.site-header {
  background: linear-gradient(180deg, rgba(15, 15, 15, 0.94), rgba(21, 21, 21, 0.72) 70%, transparent);
}

.nav-shell {
  --muted: rgba(255, 255, 255, 0.72);
  --line: rgba(255, 255, 255, 0.16);
  background: rgba(21, 21, 21, 0.82);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.22);
  color: #f7f7f7;
}

.brand-lockup, .brand-lockup span:last-child {
  color: #f7f7f7;
  text-shadow: 0 1px 14px rgba(0, 0, 0, 0.34);
}

.brand-mark {
  background: linear-gradient(145deg, color-mix(in srgb, var(--primary) 18%, #fff), color-mix(in srgb, var(--primary) 34%, #151515));
  color: #fff;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.22);
}

.hero, .site-footer {
  --text: #fafafa;
  --muted: rgba(250, 250, 250, 0.76);
  --line: rgba(255, 255, 255, 0.16);
  color: var(--text);
  background: #151515;
}

.hero-media {
  background: #151515;
}

.hero-media::after {
  background: linear-gradient(90deg, rgba(15, 15, 15, 0.88), rgba(21, 21, 21, 0.54) 48%, rgba(15, 15, 15, 0.80)),
              linear-gradient(0deg, rgba(15, 15, 15, 0.92), transparent 48%, rgba(21, 21, 21, 0.22));
}

.section {
  --text: #151515;
  --muted: rgba(21, 21, 21, 0.68);
  --line: rgba(21, 21, 21, 0.13);
  color: var(--text);
  background: #f7f6f2;
  border-top: 1px solid rgba(21, 21, 21, 0.08);
}

.section h2, .section h3, .directory h1, .directory h2 {
  color: var(--text);
}

.section .eyebrow {
  color: color-mix(in srgb, var(--primary) 82%, #161616);
}

.muted-section {
  --text: #f8fafc;
  --muted: rgba(248, 250, 252, 0.74);
  --line: rgba(255, 255, 255, 0.16);
  color: var(--text);
  background: radial-gradient(circle at 10% 0, color-mix(in srgb, var(--primary) 20%, transparent), transparent 32%),
              linear-gradient(135deg, #151515, #202020 62%, #151515);
}

#quick-info, #membership, #support, #location, #reviews, #faq {
  background: #f7f6f2;
}

#membership {
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 9%, #fafafa), #f5f5f0 52%, #efefea);
}

#support {
  background: #fafafa;
}

#location {
  background: linear-gradient(180deg, #f7f6f2, #eeeeea);
}

#reviews {
  background: #f5f5f0;
}

#faq {
  background: #fafafa;
}

#gallery {
  background: linear-gradient(135deg, #181818, color-mix(in srgb, var(--primary) 18%, #232323), #1b1b1b);
}

#join {
  --text: #fff;
  --muted: rgba(255, 255, 255, 0.82);
  --line: rgba(255, 255, 255, 0.24);
  color: #fff;
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 88%, #151515), color-mix(in srgb, var(--accent) 62%, #1b1b1b));
}

.info-card, .price-card, .support-card, .map-card, .faq-item, .directory-card {
  background: rgba(255, 255, 255, 0.78);
  border-color: rgba(18, 18, 18, 0.12);
  box-shadow: 0 16px 48px rgba(20, 20, 20, 0.08);
  backdrop-filter: blur(14px);
}

.price-card.featured {
  background: linear-gradient(145deg, color-mix(in srgb, var(--primary) 13%, #fff), rgba(255, 255, 255, 0.86));
  box-shadow: 0 18px 54px color-mix(in srgb, var(--primary) 18%, rgba(15, 15, 15, 0.12));
}

.muted-section .program-card, .muted-section .gallery-card {
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 18px 54px rgba(0, 0, 0, 0.22);
}

.muted-section .filter-button {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.72);
}

#join .cta-panel {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.24);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.18);
}

.btn-primary, .nav-cta {
  box-shadow: 0 16px 34px color-mix(in srgb, var(--primary) 22%, transparent);
}

.btn-secondary, .btn-card {
  background: rgba(255, 255, 255, 0.58);
  border-color: rgba(21, 21, 21, 0.16);
  color: #151515;
}

.hero .btn-secondary, .site-footer .btn-secondary, .muted-section .btn-secondary, .muted-section .btn-card {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.22);
  color: #fff;
}

.pill-list span, .contact-list a {
  background: color-mix(in srgb, var(--accent) 10%, #fff);
  border-color: color-mix(in srgb, var(--accent) 30%, rgba(21, 21, 21, 0.14));
  color: #151515;
}

.directory {
  --text: #151515;
  --muted: rgba(21, 21, 21, 0.68);
  --line: rgba(21, 21, 21, 0.14);
  color: var(--text);
  background: radial-gradient(circle at 14% 8%, color-mix(in srgb, var(--primary) 14%, transparent), transparent 30%),
              linear-gradient(135deg, #fafafa, #f1f0eb);
}

.directory-card {
  background: rgba(255, 255, 255, 0.80);
}

.hero-media img, .nav-shell, .sticky-cta {
  will-change: transform, opacity;
}

body.gsap-ready .reveal {
  transition: none !important;
  filter: none !important;
  will-change: transform, opacity;
}

@media (max-width: 760px) {
  .section {
    padding-block: 64px;
  }
  
  .hero {
    background: #151515;
  }
  
  .muted-section {
    background: linear-gradient(135deg, #171717, #222);
  }
}`;
}

function buildHomePage(gyms) {
  const malang = gyms.filter((gym) => /malang/i.test(gym.city) || /malang/i.test(gym.name));
  const others = gyms.filter((gym) => !malang.includes(gym));
  const ordered = [...malang, ...others];
  const card = (gym, index) => `<a class="directory-card reveal" data-animate="fade-up" href="/${gym.slug}/"><span>${String(index + 1).padStart(2, '0')} / ${esc(gym.city)}</span><strong>${esc(gym.name)}</strong><small>${esc(headlineText(gym))}</small><small>${esc(listItems(gym.facilities, 3))}</small><b>Lihat Detail</b></a>`;
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#151515">
  <title>Direktori Landing Page Gym Malang | Info Lokasi, Fasilitas, Kontak</title>
  <meta name="description" content="Direktori landing page gym Malang untuk membandingkan lokasi, fasilitas, program latihan, kontak resmi, dan akses Google Maps sebelum berkunjung.">
  <link rel="canonical" href="${siteUrl}/">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <meta name="robots" content="index, follow">
  <meta property="og:locale" content="id_ID">
  <meta property="og:title" content="Direktori Landing Page Gym Malang">
  <meta property="og:description" content="Bandingkan gym berdasarkan lokasi, fasilitas, program latihan, kontak resmi, dan Google Maps.">
  <meta property="og:image" content="${imageSets.local[0]}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${siteUrl}/">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/gyms/shared/site.css">
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Direktori Landing Page Gym Malang', url: `${siteUrl}/`, numberOfItems: gyms.length, itemListElement: ordered.map((gym, index) => ({ '@type': 'ListItem', position: index + 1, url: fullUrl(gym), name: gym.name })) })}</script>
</head>
<body>
  <a class="skip-link" href="#main-content">Lewati ke konten utama</a>
  <header class="site-header" data-header>
    <nav class="nav-shell" aria-label="Navigasi utama">
      <a class="brand-lockup" href="/"><span class="brand-mark">GYM</span><span>Direktori Gym Malang</span></a>
      <button class="menu-toggle" type="button" aria-label="Buka navigasi" aria-expanded="false" data-menu-toggle><span></span><span></span></button>
      <div class="nav-links" data-nav-links><a href="#malang">Gym Malang</a><a href="#all">Semua Gym</a><a href="/gyms/">Hub</a></div>
      <a class="nav-cta" href="#malang">Lihat Daftar</a>
    </nav>
  </header>
  <main id="main-content" class="directory" tabindex="-1">
    <div class="container">
      <p class="eyebrow">Direktori / Landing page gym</p>
      <h1>Direktori Landing Page Gym Malang</h1>
      <p class="hero-text">Bandingkan gym berdasarkan lokasi, fasilitas, program latihan, kontak resmi, dan akses Google Maps. Fokusnya sederhana: bantu calon member memilih tempat latihan sebelum datang.</p>
      <div class="directory-actions"><a class="btn btn-primary" href="#malang">Lihat Gym Malang</a><a class="btn btn-secondary" href="/gyms/">Buka Semua Halaman</a></div>
      <section id="malang" class="section compact-section" aria-labelledby="malang-title">
        <div class="section-heading"><p class="eyebrow">Prioritas Malang</p><h2 id="malang-title">Gym Malang yang sudah dibuatkan halaman.</h2><p>Card berisi ringkasan singkat dan tombol detail ke landing page masing-masing gym.</p></div>
        <div class="directory-grid">${malang.map(card).join('')}</div>
      </section>
      <section id="all" class="section compact-section" aria-labelledby="all-title">
        <div class="section-heading"><p class="eyebrow">Referensi lain</p><h2 id="all-title">Halaman gym lain di sistem.</h2></div>
        <div class="directory-grid">${others.map((gym, index) => card(gym, index + malang.length)).join('')}</div>
      </section>
    </div>
  </main>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" defer></script>
  <script src="/gyms/shared/site.js" defer></script>
</body>
</html>`;
}

function buildHub(gyms) {
  return buildHomePage(gyms).replace('Direktori Landing Page Gym Malang | Info Lokasi, Fasilitas, Kontak', 'Hub Direktori Gym | Semua Landing Page').replace('<h1>Direktori Landing Page Gym Malang</h1>', `<h1>${gyms.length} halaman landing page gym.</h1>`);
}

function publicGymConfig(gym) {
  return {
    slug: gym.slug,
    name: gym.name,
    city: gym.city,
    archetype: gym.archetype,
    primary: gym.primary,
    accent: gym.accent,
    headline: headlineText(gym),
    description: metaDescription(gym),
    contactLabel: contactLabel(gym),
    contactUrl: primaryContactUrl(gym),
    whatsapp: gym.whatsapp,
    instagram: gym.instagram,
    maps: gym.maps,
    hours: safeHours(gym),
    facilities: gym.facilities.map(localLabel),
    programs: gym.programs.map(localLabel),
    source: sourceText(gym)
  };
}

function generate() {
  const gyms = loadGyms();
  ensureDir(outDir);
  ensureDir(sharedDir);

  // Read CSS/JS from pre-built shared files if they exist, otherwise fall back to inline builders
  const cssSourcePath = path.join(sharedDir, 'site.css');
  const jsSourcePath = path.join(sharedDir, 'site.js');
  const cssContent = fs.existsSync(cssSourcePath) ? fs.readFileSync(cssSourcePath, 'utf8') : (buildSharedCss() + buildBreathableCssPatch() + buildMobileCssPatch());
  const jsContent = fs.existsSync(jsSourcePath) ? fs.readFileSync(jsSourcePath, 'utf8') : (buildSharedJs() + '\n' + buildGsapEnhancementJs() + '\n');
  fs.writeFileSync(cssSourcePath, cssContent, 'utf8');
  fs.writeFileSync(jsSourcePath, jsContent, 'utf8');

  fs.writeFileSync(path.join(root, 'index.html'), buildHomePage(gyms), 'utf8');
  fs.writeFileSync(path.join(outDir, 'index.html'), buildHub(gyms), 'utf8');
  fs.writeFileSync(path.join(outDir, 'gyms.config.json'), JSON.stringify(gyms.map(publicGymConfig), null, 2), 'utf8');

  for (const gym of gyms) {
    const html = buildPage(gym);
    const dir = path.join(outDir, gym.slug);
    ensureDir(dir);
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

    const aliasDir = path.join(root, gym.slug);
    ensureDir(aliasDir);
    fs.writeFileSync(path.join(aliasDir, 'index.html'), html, 'utf8');
  }
  console.log(`Generated ${gyms.length} polished gym landing pages with production URLs.`);
}

generate();
