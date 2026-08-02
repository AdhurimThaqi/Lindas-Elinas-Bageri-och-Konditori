/**
 * Generates tasteful, on-brand SVG DEMO placeholder images so the site can be
 * presented before real photography exists. Each image is a warm gradient with
 * a simple line illustration and a label. These are clearly placeholders —
 * replace them with real .webp/.jpg photos (see ASSET_CHECKLIST.md).
 *
 * Run: node scripts/gen-demo-images.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imgDir = join(root, "public", "images");
const galDir = join(imgDir, "gallery");
mkdirSync(galDir, { recursive: true });

// Warm brand-tone gradient pairs.
const P = {
  cream: ["#FFF8EF", "#F4E9DA"],
  raspberry: ["#FBE7EC", "#EFC3D0"],
  gold: ["#F6E7CC", "#E4C494"],
  sage: ["#E9ECE2", "#C6CDB9"],
  berry: ["#ECD9E1", "#C99DAE"],
  paper: ["#F7EEE1", "#E7D5BC"],
};

// Simple line illustrations (stroked), drawn in a 0..100 box, centred.
const ICONS = {
  cake: `
    <path d="M22 62 h56 v18 a6 6 0 0 1-6 6 H28 a6 6 0 0 1-6-6 z"/>
    <path d="M28 62 v-12 a6 6 0 0 1 6-6 h32 a6 6 0 0 1 6 6 v12"/>
    <path d="M22 71 q7 6 14 0 t14 0 t14 0 t14 0"/>
    <path d="M50 44 v-9"/><circle cx="50" cy="31" r="3.2"/>`,
  bread: `
    <path d="M20 58 q0-16 30-16 t30 16 a8 8 0 0 1-8 8 H28 a8 8 0 0 1-8-8 z"/>
    <path d="M40 45 l-4 16 M50 43 l0 18 M60 45 l4 16"/>`,
  pastry: `
    <path d="M26 64 q-6-14 8-16 q10-2 16 6 q6-8 16-6 q14 2 8 16 q-4 8-24 8 t-24-8 z"/>
    <path d="M40 54 q10 6 20 0"/>`,
  sandwich: `
    <path d="M24 46 h52 v26 a6 6 0 0 1-6 6 H30 a6 6 0 0 1-6-6 z"/>
    <path d="M24 46 q26-12 52 0"/>
    <circle cx="38" cy="40" r="3"/><circle cx="52" cy="37" r="3"/><circle cx="64" cy="41" r="3"/>`,
  coffee: `
    <path d="M28 44 h34 v14 a14 14 0 0 1-14 14 h-6 a14 14 0 0 1-14-14 z"/>
    <path d="M62 48 h6 a7 7 0 0 1 0 14 h-6"/>
    <path d="M36 34 q4-5 0-10 M46 34 q4-5 0-10"/>`,
  shop: `
    <path d="M24 50 h52 v26 H24 z"/>
    <path d="M20 50 l6-14 h48 l6 14"/>
    <path d="M20 50 q8 8 14 0 t14 0 t14 0 t14 0"/>
    <path d="M44 76 v-14 h12 v14"/>`,
  chef: `
    <path d="M34 60 q-12 0-12-12 a10 10 0 0 1 12-10 a12 12 0 0 1 32 0 a10 10 0 0 1 12 10 q0 12-12 12 z"/>
    <path d="M34 60 v12 h32 V60"/>`,
  wheat: `
    <path d="M50 78 V40"/>
    <path d="M50 40 q10-4 12-14 q-10 2-12 10 Z M50 40 q-10-4-12-14 q10 2 12 10 Z"/>
    <path d="M50 52 q9-3 11-12 q-9 2-11 9 Z M50 52 q-9-3-11-12 q9 2 11 9 Z"/>
    <path d="M50 64 q9-3 11-12 q-9 2-11 9 Z M50 64 q-9-3-11-12 q9 2 11 9 Z"/>`,
};

function svg({ label, tone, icon, w = 1000, h = 750 }) {
  const [c1, c2] = P[tone];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g transform="translate(${w / 2 - 150}, ${h / 2 - 150}) scale(3)" fill="none" stroke="#1D1A18" stroke-opacity="0.42" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    ${ICONS[icon]}
  </g>
  <text x="${w / 2}" y="${h - 70}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="#1D1A18" fill-opacity="0.7">${label}</text>
  <text x="${w / 2}" y="${h - 34}" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" letter-spacing="3" fill="#873D56" fill-opacity="0.75">EXEMPELBILD</text>
</svg>`;
}

const main = [
  ["cake-detail.svg", "Tårtor", "raspberry", "cake"],
  ["pastries.svg", "Bakverk & kaffebröd", "gold", "pastry"],
  ["bread.svg", "Matbröd", "paper", "bread"],
  ["sandwich-cake.svg", "Smörgåstårtor", "sage", "sandwich"],
  ["breakfast-lunch.svg", "Frukost & lunch", "cream", "coffee"],
  ["interior.svg", "I bageriet", "berry", "shop"],
  ["hero-cakes.svg", "Tårtor & bakverk", "raspberry", "cake"],
];

const gallery = [
  ["tarta-1.svg", "Tårtor", "raspberry", "cake"],
  ["tarta-2.svg", "Tårtor", "berry", "cake"],
  ["bakverk-1.svg", "Bakverk", "gold", "pastry"],
  ["kaffebrod-1.svg", "Kaffebröd", "gold", "coffee"],
  ["matbrod-1.svg", "Matbröd", "paper", "bread"],
  ["matbrod-2.svg", "Matbröd", "cream", "bread"],
  ["smorgastarta-1.svg", "Smörgåstårtor", "sage", "sandwich"],
  ["butiken-1.svg", "Butiken", "berry", "shop"],
  ["butiken-2.svg", "Butiken", "paper", "shop"],
  ["bakom-1.svg", "Bakom kulisserna", "sage", "chef"],
];

for (const [file, label, tone, icon] of main) {
  writeFileSync(join(imgDir, file), svg({ label, tone, icon }));
}
for (const [file, label, tone, icon] of gallery) {
  writeFileSync(join(galDir, file), svg({ label, tone, icon, w: 900, h: 900 }));
}

console.log(`Generated ${main.length + gallery.length} demo images.`);
