import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const fail = (message) => {
  console.error('Build check failed: ' + message);
  process.exit(1);
};
const localRefExists = (ref, baseDir = root) => {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return true;
  const target = clean.startsWith('/')
    ? path.join(root, clean.slice(1))
    : path.resolve(baseDir, clean);
  return fs.existsSync(target);
};

for (const file of ['index.html', 'styles.css', 'script.js']) {
  if (!exists(file)) fail(`${file} is missing`);
}

const html = read('index.html');
const css = read('styles.css');
const js = read('script.js');
const all = html + '\n' + css + '\n' + js;

if (!html.includes('href="styles.css"')) fail('HTML does not reference styles.css');
if (!html.includes('src="script.js"')) fail('HTML does not reference script.js');
if (!/Evolution 20 Gym/i.test(html)) fail('Brand name missing');
if ((html.match(/<h1\b/gi) || []).length !== 1) fail('Exactly one h1 is required');
if ((html.match(/<img\b/gi) || []).length < 8) fail('At least 8 images are required');
if (/src=["']\s*["']/i.test(html)) fail('Empty image src found');
if (/source\.unsplash\.com\/random|\/random\?/i.test(html)) fail('Random image API is not allowed');
if (/[A-Z]:\\|file:\/\//i.test(all)) fail('Local Windows/file path found');
if (/href=["']\s*["']/i.test(html)) fail('Empty href found');
if (/href=["']#["']/i.test(html)) fail('Meaningless href="#" found');
if (!/<title>[^<]+<\/title>/i.test(html)) fail('Missing title');
if (!/<meta\s+name=["']description["']/i.test(html)) fail('Missing meta description');
if (!/<link\s+rel=["']canonical["']/i.test(html)) fail('Missing canonical');
if (!/property=["']og:title["']/i.test(html) || !/property=["']og:description["']/i.test(html) || !/property=["']og:image["']/i.test(html)) fail('Missing Open Graph tags');
if (!/application\/ld\+json/i.test(html)) fail('Missing JSON-LD');
if (!/class=["']skip-link["']/i.test(html)) fail('Skip link missing');
if (!/<main\s+id=["']main-content["']/i.test(html)) fail('Main landmark missing');
if (!/<header\b/i.test(html) || !/<footer\b/i.test(html)) fail('Header/footer missing');

const requiredSections = ['hero', 'philosophy', 'programs', 'motion', 'membership', 'coaches', 'proof', 'gallery', 'join'];
for (const id of requiredSections) {
  if (!new RegExp(`id=["']${id}["']`, 'i').test(html)) fail(`Required section missing: ${id}`);
}

if (!/Starter[\s\S]*Pro[\s\S]*Elite/i.test(html)) fail('Membership tiers Starter/Pro/Elite missing');
if (!/Strength Training/i.test(html) || !/Body Transformation/i.test(html) || !/Functional Fitness/i.test(html) || !/Personal Coaching/i.test(html) || !/Group Classes/i.test(html)) fail('Training programs missing');
if (!/data-lightbox-src/i.test(html)) fail('Gallery lightbox hooks missing');
if (!/data-modal=["']trial["']/i.test(html)) fail('Trial modal missing');
if (!/data-filter=/i.test(html)) fail('Program filter missing');
if (!/data-select-package/i.test(html)) fail('Package selector missing');
if (!/data-join-form/i.test(html)) fail('Join form missing');
if (!/wa\.me|WhatsApp|WHATSAPP_NUMBER/i.test(all)) fail('WhatsApp CTA/generator missing');
if ((html.match(/<button\b|<select\b|<input\b|data-lightbox-src|data-filter=|data-select-package/gi) || []).length < 12) fail('Not enough interactive elements');
if (!/data-animate|class=["'][^"']*reveal/i.test(html)) fail('Reveal animation hooks missing');
if (!/data-parallax-speed/i.test(html)) fail('Parallax hook missing');

if (!/:focus-visible/i.test(css)) fail('CSS missing focus-visible');
if (!/prefers-reduced-motion/i.test(css)) fail('CSS missing prefers-reduced-motion');
if (!/prefers-contrast/i.test(css)) fail('CSS missing prefers-contrast support');
if (!/clamp\(/i.test(css)) fail('Responsive clamp typography missing');
if (!/overflow-x:\s*hidden/i.test(css)) fail('Body overflow-x hidden missing');

if (!/js-ready/i.test(js)) fail('JS missing js-ready');
if (!/ScrollMotionController/i.test(js)) fail('ScrollMotionController missing');
if (!/IntersectionObserver/i.test(js)) fail('IntersectionObserver missing');
if (!/scroll-up/i.test(js + css) || !/scroll-down/i.test(js + css)) fail('Bidirectional scroll classes missing');
if (!/is-exiting/i.test(js + css)) fail('Exit animation state missing');
if (!/requestAnimationFrame/i.test(js)) fail('requestAnimationFrame missing');
if (!/Escape/i.test(js)) fail('Escape key handling missing');
if (!/focusableSelector/i.test(js)) fail('Focus management missing');
if (!/CustomEvent\(['"]animation:enter/i.test(js)) fail('Animation event hook missing');

const localRefs = Array.from(html.matchAll(/(?:href|src)=["']([^"']+)["']/gi))
  .map((match) => match[1])
  .filter((ref) => !ref.startsWith('http') && !ref.startsWith('#') && !ref.startsWith('mailto:') && !ref.startsWith('tel:'));

for (const ref of localRefs) {
  if (!localRefExists(ref)) fail('Broken local asset path: ' + ref);
}

console.log('Evolution 20 Gym validation passed.');

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
  'glanzfit-yogyakarta'
];

const gymRoot = path.join(root, 'gyms');
if (!fs.existsSync(gymRoot)) fail('gyms folder is missing');
if (!fs.existsSync(path.join(gymRoot, 'index.html'))) fail('gyms/index.html hub is missing');
if (!fs.existsSync(path.join(gymRoot, 'shared', 'site.css'))) fail('gyms/shared/site.css is missing');
if (!fs.existsSync(path.join(gymRoot, 'shared', 'site.js'))) fail('gyms/shared/site.js is missing');

const sharedCss = fs.readFileSync(path.join(gymRoot, 'shared', 'site.css'), 'utf8');
const sharedJs = fs.readFileSync(path.join(gymRoot, 'shared', 'site.js'), 'utf8');
if (!/prefers-reduced-motion/i.test(sharedCss)) fail('20-gym CSS missing reduced motion');
if (!/prefers-contrast/i.test(sharedCss)) fail('20-gym CSS missing contrast support');
if (!/ScrollMotionController/i.test(sharedJs)) fail('20-gym JS missing ScrollMotionController');
if (!/scroll-up/i.test(sharedJs + sharedCss) || !/scroll-down/i.test(sharedJs + sharedCss)) fail('20-gym bidirectional classes missing');
if (!/IntersectionObserver/i.test(sharedJs)) fail('20-gym JS missing IntersectionObserver');
if (!/Escape/i.test(sharedJs)) fail('20-gym JS missing Escape handling');
if (!/focusableSelector/i.test(sharedJs)) fail('20-gym JS missing focus management');

for (const slug of expectedGyms) {
  const file = path.join(gymRoot, slug, 'index.html');
  if (!fs.existsSync(file)) fail(`Missing generated gym page: ${slug}`);
  const page = fs.readFileSync(file, 'utf8');
  const required = ['hero', 'ecosystem', 'programs', 'journey', 'membership', 'coaches', 'proof', 'gallery', 'join'];
  if ((page.match(/<h1\b/gi) || []).length !== 1) fail(`${slug}: exactly one h1 required`);
  if ((page.match(/<img\b/gi) || []).length < 8) fail(`${slug}: at least 8 images required`);
  if (!/<meta\s+name=["']description["']/i.test(page)) fail(`${slug}: missing meta description`);
  if (!/<link\s+rel=["']canonical["']/i.test(page)) fail(`${slug}: missing canonical`);
  if (!/application\/ld\+json/i.test(page)) fail(`${slug}: missing JSON-LD`);
  for (const id of required) {
    if (!new RegExp(`id=["']${id}["']`, 'i').test(page)) fail(`${slug}: missing section ${id}`);
  }
  if (!/Starter[\s\S]*Pro[\s\S]*Elite/i.test(page)) fail(`${slug}: missing Starter/Pro/Elite tiers`);
  if (!/data-filter=/i.test(page)) fail(`${slug}: missing program filter`);
  if (!/data-select-package/i.test(page)) fail(`${slug}: missing package selector`);
  if (!/data-lightbox-src/i.test(page)) fail(`${slug}: missing gallery lightbox`);
  if (!/data-join-form/i.test(page)) fail(`${slug}: missing join form`);
  if (!/wa\.me|instagram\.com|tel:/i.test(page)) fail(`${slug}: missing contact CTA`);
  if (!/google\.com\/maps/i.test(page)) fail(`${slug}: missing Google Maps link`);
  if (/src=["']\s*["']|href=["']\s*["']/i.test(page)) fail(`${slug}: empty src/href found`);
  if (/source\.unsplash\.com\/random|\/random\?/i.test(page)) fail(`${slug}: random image API found`);
  if (/[A-Z]:\\|file:\/\//i.test(page)) fail(`${slug}: local file path found`);
  const pageDir = path.dirname(file);
  const refs = Array.from(page.matchAll(/(?:href|src)=["']([^"']+)["']/gi))
    .map((match) => match[1])
    .filter((ref) => !ref.startsWith('http') && !ref.startsWith('#') && !ref.startsWith('mailto:') && !ref.startsWith('tel:'));
  for (const ref of refs) {
    if (!localRefExists(ref, pageDir)) fail(`${slug}: broken local ref ${ref}`);
  }
  if (!fs.existsSync(path.join(root, slug, 'index.html'))) fail(`${slug}: root slug alias missing`);
}

console.log('20 generated gym pages validation passed.');
