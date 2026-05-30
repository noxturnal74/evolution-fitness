import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://project-xc6z6.vercel.app';

const expectedGyms = [
  'evolution-fitness-malang',
  'ftl-gym',
  'fitness-plus-dinoyo',
  'fitx-gym',
  'osbond-gym',
  'belle-crown-gym',
  'draco-gym',
  'planet-gym-surabaya',
  'new-icon-gym',
  'speedrocky-gym',
  'warriors-gym-surabaya',
  'audid-gym',
  'champion-gym-surabaya',
  'crystal-gym-aerobic',
  'm-gym-malang',
  'dm-gym-yogyakarta',
  'ocigen-fitness',
  'optimum-fitness-cafe',
  'blackbox-gym-bausasran',
  'glanzfit-yogyakarta',
  'honam-gym',
  'strength-club-malang',
  'de-gym-platinum-malang',
  'the-gym-asifa-pro',
  '3c-gym-malang',
  'fitnessworks-black-lanners',
  'prestige-fitness-malang'
];

const bannedPublicPatterns = [
  /dummy/i,
  /placeholder/i,
  /replace/i,
  /localhost/i,
  /can map/i,
  /source-backed/i,
  /ready for real/i,
  /proof points ready/i,
  /realistic placeholders/i,
  /latest hours via Google Maps/i,
  /The page makes the gym feel clear/i,
  /gives visitors a clear starting point/i,
  /highlighted as a decision-making point/i,
  /20-level progress story/i,
  /Ari Pradana/i,
  /Maya Kirana/i,
  /Raka Mahendra/i,
  /Malang member profile/i,
  /Generate Contact Message/i,
  /should feel/i,
  /should read/i,
  /replace later/i
];

const fail = (message) => {
  console.error('Build check failed: ' + message);
  process.exit(1);
};

const filePath = (file) => path.join(root, file);
const exists = (file) => fs.existsSync(filePath(file));
const read = (file) => fs.readFileSync(filePath(file), 'utf8');

function localRefExists(ref, baseDir = root) {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return true;
  const target = clean.startsWith('/')
    ? path.join(root, clean.slice(1))
    : path.resolve(baseDir, clean);
  return fs.existsSync(target);
}

function assertNoBannedPublicText(html, label) {
  for (const pattern of bannedPublicPatterns) {
    if (pattern.test(html)) fail(`${label}: banned public text found (${pattern})`);
  }
}

function assertCommonHtml(html, label) {
  if ((html.match(/<h1\b/gi) || []).length !== 1) fail(`${label}: exactly one h1 required`);
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(`${label}: missing title`);
  if (!/<meta\s+name=["']description["']/i.test(html)) fail(`${label}: missing meta description`);
  if (!/<link\s+rel=["']canonical["'][^>]+https:\/\/project-xc6z6\.vercel\.app/i.test(html)) fail(`${label}: canonical must use live Vercel domain`);
  if (!/property=["']og:title["']/i.test(html) || !/property=["']og:description["']/i.test(html) || !/property=["']og:url["']/i.test(html)) fail(`${label}: missing Open Graph title/description/url`);
  if (!/application\/ld\+json/i.test(html)) fail(`${label}: missing JSON-LD`);
  if (!/class=["']skip-link["']/i.test(html)) fail(`${label}: skip link missing`);
  if (!/<main\b/i.test(html)) fail(`${label}: main landmark missing`);
  if (/src=["']\s*["']|href=["']\s*["']/i.test(html)) fail(`${label}: empty src/href found`);
  if (/source\.unsplash\.com\/random|\/random\?/i.test(html)) fail(`${label}: random image API found`);
  if (/[A-Z]:\\|file:\/\//i.test(html)) fail(`${label}: local file path found`);
  assertNoBannedPublicText(html, label);
}

function assertLocalRefs(html, label, baseDir = root) {
  const refs = Array.from(html.matchAll(/(?:href|src)=["']([^"']+)["']/gi))
    .map((match) => match[1])
    .filter((ref) => !ref.startsWith('http') && !ref.startsWith('#') && !ref.startsWith('mailto:') && !ref.startsWith('tel:'));
  for (const ref of refs) {
    if (!localRefExists(ref, baseDir)) fail(`${label}: broken local ref ${ref}`);
  }
}

if (!exists('index.html')) fail('index.html is missing');
if (!exists('gyms/index.html')) fail('gyms/index.html is missing');
if (!exists('gyms/shared/site.css')) fail('gyms/shared/site.css is missing');
if (!exists('gyms/shared/site.js')) fail('gyms/shared/site.js is missing');
if (!exists('gyms/gyms.config.json')) fail('gyms/gyms.config.json is missing');

const rootHtml = read('index.html');
assertCommonHtml(rootHtml, 'homepage');
assertLocalRefs(rootHtml, 'homepage');
if (!/Direktori Landing Page Gym Malang/i.test(rootHtml)) fail('homepage: directory headline missing');
if (!/Lihat Detail/i.test(rootHtml)) fail('homepage: detail CTA missing');
if (!/gsap@3\.13\.0\/dist\/gsap\.min\.js/i.test(rootHtml) || !/ScrollTrigger\.min\.js/i.test(rootHtml)) fail('homepage: GSAP scripts missing');

const hubHtml = read('gyms/index.html');
assertCommonHtml(hubHtml, 'gyms hub');
assertLocalRefs(hubHtml, 'gyms hub', path.join(root, 'gyms'));

const sharedCss = read('gyms/shared/site.css');
const sharedJs = read('gyms/shared/site.js');
if (!/:focus-visible/i.test(sharedCss)) fail('shared CSS missing focus-visible');
if (!/prefers-reduced-motion/i.test(sharedCss)) fail('shared CSS missing prefers-reduced-motion');
if (!/prefers-contrast/i.test(sharedCss)) fail('shared CSS missing prefers-contrast support');
if (!/clamp\(/i.test(sharedCss)) fail('shared CSS missing responsive clamp typography');
if (!/overflow-x:\s*hidden/i.test(sharedCss)) fail('shared CSS missing overflow-x hidden');
if (!/js-ready/i.test(sharedJs)) fail('shared JS missing js-ready');
if (!/ScrollMotionController/i.test(sharedJs)) fail('shared JS missing ScrollMotionController');
if (!/gsap\.registerPlugin/i.test(sharedJs) || !/ScrollTrigger\.batch/i.test(sharedJs)) fail('shared JS missing GSAP ScrollTrigger enhancement');
if (!/IntersectionObserver/i.test(sharedJs)) fail('shared JS missing IntersectionObserver');
if (!/scroll-up/i.test(sharedJs + sharedCss) || !/scroll-down/i.test(sharedJs + sharedCss)) fail('shared bidirectional scroll classes missing');
if (!/Escape/i.test(sharedJs)) fail('shared JS missing Escape handling');
if (!/focusableSelector/i.test(sharedJs)) fail('shared JS missing focus management');

const gymConfig = JSON.parse(read('gyms/gyms.config.json'));
if (gymConfig.length !== expectedGyms.length) fail(`gyms.config.json should contain ${expectedGyms.length} gyms`);

for (const slug of expectedGyms) {
  const gymFile = path.join('gyms', slug, 'index.html');
  const aliasFile = path.join(slug, 'index.html');
  if (!exists(gymFile)) fail(`${slug}: generated /gyms page missing`);
  if (!exists(aliasFile)) fail(`${slug}: root slug alias missing`);

  const page = read(gymFile);
  const alias = read(aliasFile);
  assertCommonHtml(page, slug);
  assertCommonHtml(alias, `${slug} alias`);
  assertLocalRefs(page, slug, path.dirname(filePath(gymFile)));
  assertLocalRefs(alias, `${slug} alias`, path.dirname(filePath(aliasFile)));

  const requiredSections = ['hero', 'quick-info', 'facilities', 'membership', 'support', 'gallery', 'location', 'reviews', 'faq', 'join'];
  for (const id of requiredSections) {
    if (!new RegExp(`id=["']${id}["']`, 'i').test(page)) fail(`${slug}: missing section ${id}`);
  }
  if ((page.match(/<img\b/gi) || []).length < 6) fail(`${slug}: not enough visual assets`);
  if (!/Ilustrasi suasana latihan/i.test(page)) fail(`${slug}: stock image disclosure missing`);
  if (!/Harga dapat berubah/i.test(page)) fail(`${slug}: safe pricing note missing`);
  if (!/Cek Ulasan di Maps/i.test(page)) fail(`${slug}: safe review CTA missing`);
  if (!/data-filter=/i.test(page)) fail(`${slug}: missing program/facility filter`);
  if (!/data-select-package/i.test(page)) fail(`${slug}: missing membership CTA hooks`);
  if (!/data-lightbox-src/i.test(page)) fail(`${slug}: missing gallery lightbox hooks`);
  if (!/<details class=["']faq-item/i.test(page)) fail(`${slug}: FAQ accordion missing`);
  if (!/google\.com\/maps/i.test(page)) fail(`${slug}: Google Maps CTA missing`);
  if (!/gsap@3\.13\.0\/dist\/gsap\.min\.js/i.test(page) || !/ScrollTrigger\.min\.js/i.test(page)) fail(`${slug}: GSAP scripts missing`);
  if (!/wa\.me|instagram\.com|linktr\.ee|business\.site|google\.com\/maps|https?:\/\/[^"']+/i.test(page)) fail(`${slug}: contact CTA missing`);
  if (/data-join-form|<form\b/i.test(page)) fail(`${slug}: outdated form flow still present`);
  if (!new RegExp(`<link\\s+rel=["']canonical["'][^>]+${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/${slug}\\/`, 'i').test(page)) fail(`${slug}: canonical URL is not production URL`);
  if (!new RegExp(`"url":"${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/${slug}\\/`, 'i').test(page)) fail(`${slug}: JSON-LD URL is not production URL`);
}

console.log('Production content validation passed.');
console.log(`${expectedGyms.length} generated gym pages validation passed.`);
