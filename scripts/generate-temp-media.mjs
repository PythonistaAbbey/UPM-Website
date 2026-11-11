/**
 * Generates TEMPORARY artwork used until licensed UPM photography is approved.
 * Every output is original, procedurally drawn SVG rendered to AVIF and WebP.
 * It depicts no real building or person. See MEDIA_REGISTER.md.
 *
 * Usage: node scripts/generate-temp-media.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("public/media/temp");
fs.mkdirSync(OUT, { recursive: true });

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const r = (a, b) => a + rnd() * (b - a);
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

const W = 2400, H = 1500;

/** Rain-tree / tropical canopy: overlapping soft circles. */
function tree(x, y, s, palette, opacity = 1) {
  let g = `<g opacity="${opacity}"><rect x="${x - s * 0.04}" y="${y}" width="${s * 0.08}" height="${s * 0.9}" fill="#1e2a20" opacity="0.8"/>`;
  for (let i = 0; i < 14; i++) {
    g += `<ellipse cx="${x + r(-s * 0.7, s * 0.7)}" cy="${y + r(-s * 0.25, s * 0.15)}" rx="${r(s * 0.25, s * 0.5)}" ry="${r(s * 0.14, s * 0.26)}" fill="${pick(palette)}" opacity="${r(0.55, 0.95)}"/>`;
  }
  return g + "</g>";
}

function building(x, y, w, h, base, lit) {
  let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${base}"/>`;
  g += `<rect x="${x}" y="${y}" width="${w}" height="${h * 0.04}" fill="#ffffff" opacity="0.08"/>`;
  const cols = Math.max(3, Math.floor(w / 46)), rows = Math.max(3, Math.floor(h / 54));
  for (let c = 0; c < cols; c++) for (let rr = 0; rr < rows; rr++) {
    const on = rnd() < 0.35;
    g += `<rect x="${x + 14 + c * ((w - 28) / cols)}" y="${y + 22 + rr * ((h - 30) / rows)}" width="${(w - 28) / cols - 12}" height="${(h - 30) / rows - 22}" rx="2" fill="${on ? lit : "#0f1418"}" opacity="${on ? r(0.5, 0.9) : 0.55}"/>`;
  }
  return g;
}

const grain = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0"/></filter><filter id="soft"><feGaussianBlur stdDeviation="18"/></filter><filter id="softer"><feGaussianBlur stdDeviation="50"/></filter>`;
const finish = `<rect width="100%" height="100%" filter="url(#grain)"/>`;

const scenes = {
  /** Hero: modern campus at golden hour across a lake, framed by rain trees. */
  "campus-golden-hour": () => {
    let s = `<defs>${grain}<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2b45"/><stop offset="0.45" stop-color="#c76b4a"/><stop offset="0.7" stop-color="#f3b46b"/><stop offset="1" stop-color="#f7d79a"/></linearGradient>
      <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0b46e" stop-opacity="0.85"/><stop offset="1" stop-color="#1b2a2c"/></linearGradient>
      <radialGradient id="sun" cx="0.62" cy="0.55" r="0.35"><stop offset="0" stop-color="#fff3c8"/><stop offset="0.25" stop-color="#ffd27e" stop-opacity="0.8"/><stop offset="1" stop-color="#ffb35a" stop-opacity="0"/></radialGradient></defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#sky)"/><rect width="${W}" height="${H}" fill="url(#sun)"/>`;
    for (let i = 0; i < 6; i++) s += `<ellipse cx="${r(0, W)}" cy="${r(150, 520)}" rx="${r(220, 520)}" ry="${r(20, 50)}" fill="#ffe2c2" opacity="${r(0.12, 0.3)}" filter="url(#soft)"/>`;
    s += `<path d="M0 860 Q 400 760 900 820 T 1800 800 T ${W} 830 V ${H} H0Z" fill="#3c4a3a" opacity="0.7"/>`;
    const bs = [[260, 600, 260, 300], [560, 520, 340, 380], [930, 470, 280, 430], [1240, 560, 420, 340], [1700, 600, 300, 300], [2020, 540, 260, 360]];
    for (const [x, y, w, h] of bs) s += building(x, y, w, h, pick(["#2a2f36", "#323840", "#2b3138"]), pick(["#ffd79a", "#ffe6b8"]));
    s += `<rect x="0" y="895" width="${W}" height="${H - 895}" fill="url(#lake)"/>`;
    for (let i = 0; i < 70; i++) s += `<rect x="${r(0, W)}" y="${r(910, 1200)}" width="${r(40, 260)}" height="2" fill="#ffe7bf" opacity="${r(0.1, 0.45)}"/>`;
    const leaf = ["#1f3b26", "#2f5a35", "#3d6b3f", "#25472c", "#4b7a45"];
    s += tree(120, 780, 360, leaf) + tree(2250, 760, 420, leaf) + tree(1960, 860, 220, leaf, 0.9) + tree(430, 880, 200, leaf, 0.9);
    s += `<path d="M0 1260 Q 600 1180 1200 1240 T ${W} 1220 V ${H} H0Z" fill="#132017"/>`;
    for (let i = 0; i < 140; i++) s += `<path d="M${r(0, W)} ${r(1240, H)} l ${r(-10, 10)} ${-r(30, 90)}" stroke="#2b4a2f" stroke-width="${r(2, 5)}" opacity="0.8"/>`;
    return s + finish;
  },
  /** Lush tropical canopy with light rays — "green campus". */
  "green-canopy": () => {
    let s = `<defs>${grain}<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f2a19"/><stop offset="1" stop-color="#2c5a33"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
    for (let i = 0; i < 7; i++) s += `<polygon points="${r(600, 1800)},0 ${r(200, 2200)},${H} ${r(400, 2400)},${H}" fill="#f6f1c5" opacity="${r(0.04, 0.09)}"/>`;
    const pal = ["#2f6b3f", "#3f8a4d", "#5aa457", "#1f4a2a", "#7cbf62", "#a6d47a"];
    for (let i = 0; i < 260; i++) {
      const x = r(-100, W + 100), y = r(-100, H + 100), l = r(80, 260), a = r(0, 360);
      s += `<ellipse cx="${x}" cy="${y}" rx="${l}" ry="${l * 0.32}" transform="rotate(${a} ${x} ${y})" fill="${pick(pal)}" opacity="${r(0.35, 0.9)}"/>`;
    }
    for (let i = 0; i < 40; i++) s += `<circle cx="${r(0, W)}" cy="${r(0, H)}" r="${r(4, 16)}" fill="#fff6c9" opacity="${r(0.2, 0.6)}" filter="url(#soft)"/>`;
    return s + finish;
  },
  /** Laboratory: glassware silhouettes and molecular lattice. */
  "research-lab": () => {
    let s = `<defs>${grain}<radialGradient id="bg" cx="0.3" cy="0.4" r="0.9"><stop offset="0" stop-color="#22414f"/><stop offset="1" stop-color="#0c1419"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
    const nodes = Array.from({ length: 46 }, () => [r(1100, 2350), r(120, 1300)]);
    nodes.forEach(([x, y], i) => { const [x2, y2] = nodes[(i * 7 + 3) % nodes.length]; s += `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="#7fd0d9" stroke-opacity="0.18" stroke-width="2"/>`; });
    nodes.forEach(([x, y]) => (s += `<circle cx="${x}" cy="${y}" r="${r(6, 16)}" fill="${pick(["#7fd0d9", "#ffffff", "#CA0026"])}" opacity="${r(0.5, 0.95)}"/>`));
    const glass = (x, y, w, h, liquid) => `<path d="M${x} ${y} h${w} v${h * 0.35} l ${w * 0.9} ${h * 0.6} q 10 40 -30 45 h ${-(w * 2.8 - 60)} q -40 -5 -30 -45 l ${w * 0.9} ${-h * 0.6} z" fill="#d7eef2" fill-opacity="0.08" stroke="#d7eef2" stroke-opacity="0.55" stroke-width="5"/><path d="M${x - w * 0.55} ${y + h * 0.78} h ${w * 2.1} l ${w * 0.32} ${h * 0.17} q 6 22 -20 26 h ${-(w * 2.7 - 40)} q -26 -4 -20 -26 z" fill="${liquid}" opacity="0.85"/>`;
    s += glass(330, 560, 150, 620, "#CA0026") + glass(760, 760, 110, 470, "#4fb3a9");
    s += `<rect x="1050" y="380" width="70" height="820" rx="35" fill="#d7eef2" fill-opacity="0.08" stroke="#d7eef2" stroke-opacity="0.55" stroke-width="5"/><rect x="1058" y="820" width="54" height="372" rx="27" fill="#e9b949" opacity="0.85"/>`;
    s += `<rect y="1240" width="${W}" height="260" fill="#0a1013"/><rect y="1240" width="${W}" height="4" fill="#7fd0d9" opacity="0.4"/>`;
    for (let i = 0; i < 20; i++) s += `<circle cx="${r(0, W)}" cy="${r(0, H)}" r="${r(20, 80)}" fill="#7fd0d9" opacity="${r(0.03, 0.08)}" filter="url(#soft)"/>`;
    return s + finish;
  },
  /** Library facade: rhythmic vertical fins in warm light. */
  "library-facade": () => {
    let s = `<defs>${grain}<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9eef2"/><stop offset="1" stop-color="#c9d3da"/></linearGradient><linearGradient id="fin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f7f4ee"/><stop offset="1" stop-color="#b9b2a6"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
    s += `<rect x="0" y="260" width="${W}" height="980" fill="#2b2a28"/>`;
    for (let i = 0; i < 26; i++) { const x = i * 96; s += `<rect x="${x + 40}" y="300" width="40" height="900" fill="#ffcf86" opacity="${r(0.35, 0.8)}"/><rect x="${x}" y="260" width="34" height="980" fill="url(#fin)"/>`; }
    s += `<rect x="0" y="200" width="${W}" height="70" fill="#f3efe7"/><rect x="0" y="1240" width="${W}" height="260" fill="#8a8f8a"/>`;
    for (let i = 0; i < 12; i++) s += `<rect x="0" y="${1250 + i * 22}" width="${W}" height="3" fill="#ffffff" opacity="0.25"/>`;
    const leaf = ["#2f5a35", "#3d6b3f", "#4b7a45"];
    s += tree(140, 1080, 260, leaf) + tree(2260, 1060, 300, leaf);
    return s + finish;
  },
  /** Graduation: tossed mortarboards against a bright sky. */
  graduation: () => {
    let s = `<defs>${grain}<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d8fc9"/><stop offset="1" stop-color="#e8f1fb"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
    for (let i = 0; i < 8; i++) s += `<ellipse cx="${r(0, W)}" cy="${r(100, 900)}" rx="${r(200, 500)}" ry="${r(60, 140)}" fill="#ffffff" opacity="${r(0.3, 0.7)}" filter="url(#softer)"/>`;
    for (let i = 0; i < 26; i++) {
      const x = r(100, W - 100), y = r(120, 1150), sz = r(50, 150), a = r(-40, 40);
      s += `<g transform="translate(${x} ${y}) rotate(${a})"><polygon points="0,${-sz * 0.4} ${sz},0 0,${sz * 0.4} ${-sz},0" fill="#16191d"/><rect x="${-sz * 0.45}" y="0" width="${sz * 0.9}" height="${sz * 0.35}" rx="6" fill="#23272d"/><path d="M0 0 q ${sz * 0.5} ${sz * 0.2} ${sz * 0.6} ${sz * 0.75}" stroke="${pick(["#e9b949", "#CA0026"])}" stroke-width="6" fill="none"/></g>`;
    }
    for (let i = 0; i < 60; i++) s += `<rect x="${r(0, W)}" y="${r(0, H)}" width="${r(8, 18)}" height="${r(14, 26)}" fill="${pick(["#CA0026", "#e9b949", "#ffffff", "#2f6b3f"])}" transform="rotate(${r(0, 90)} ${r(0, W)} ${r(0, H)})" opacity="0.85"/>`;
    return s + finish;
  },
  /** Agriculture: crop rows converging to a sunrise horizon. */
  "agriculture-fields": () => {
    let s = `<defs>${grain}<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb9d6"/><stop offset="1" stop-color="#f6dfb0"/></linearGradient><linearGradient id="field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa548"/><stop offset="1" stop-color="#2d5a27"/></linearGradient></defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#sky)"/><circle cx="1650" cy="620" r="150" fill="#fff4d0" opacity="0.9" filter="url(#soft)"/>`;
    s += `<path d="M0 620 Q 600 560 1200 600 T ${W} 590 V 680 H0Z" fill="#5b7f4a" opacity="0.7"/>`;
    s += `<rect y="660" width="${W}" height="${H - 660}" fill="url(#field)"/>`;
    for (let i = -30; i <= 30; i++) s += `<line x1="${1200 + i * 6}" y1="660" x2="${1200 + i * 140}" y2="${H}" stroke="${i % 2 ? "#a7cf6a" : "#244d22"}" stroke-width="${10 + Math.abs(i) * 1.5}" opacity="0.55"/>`;
    s += tree(260, 520, 200, ["#2f5a35", "#3d6b3f"]) + tree(2150, 500, 230, ["#2f5a35", "#3d6b3f"]);
    return s + finish;
  },
  /** Student life: evening bokeh and warm community lights. */
  "campus-evening": () => {
    let s = `<defs>${grain}<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a1f3a"/><stop offset="0.6" stop-color="#3b2340"/><stop offset="1" stop-color="#6b2a2f"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
    for (let i = 0; i < 90; i++) s += `<circle cx="${r(0, W)}" cy="${r(0, H)}" r="${r(20, 110)}" fill="${pick(["#ffcf86", "#ff9f7a", "#ffe8c2", "#CA0026", "#9fd3c7"])}" opacity="${r(0.08, 0.45)}" filter="url(#soft)"/>`;
    s += `<path d="M0 1150 L 300 1060 L 520 1100 L 780 980 L 1100 1050 L 1400 960 L 1700 1040 L 2000 990 L ${W} 1060 V ${H} H0Z" fill="#0d0f1a"/>`;
    return s + finish;
  },
  /** Water and aquaculture: layered waves. */
  "water-research": () => {
    let s = `<defs>${grain}<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6eef0"/><stop offset="1" stop-color="#0f4c5c"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#bg)"/>`;
    for (let k = 0; k < 14; k++) {
      const y = 300 + k * 90, a = r(30, 70);
      let d = `M0 ${y}`;
      for (let x = 0; x <= W; x += 200) d += ` Q ${x + 100} ${y + (x / 200) % 2 ? a : -a} ${x + 200} ${y}`;
      s += `<path d="${d} V ${H} H0Z" fill="${pick(["#2f8a96", "#1c6b78", "#56aab3", "#0f4c5c"])}" opacity="${r(0.25, 0.5)}"/>`;
    }
    return s + finish;
  },
};

const sizes = [640, 1280, 1920, 2400];
const manifest = [];
for (const [id, fn] of Object.entries(scenes)) {
  seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 7);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${fn()}</svg>`;
  const base = sharp(Buffer.from(svg)).png();
  const png = await base.toBuffer();
  const variants = [];
  for (const w of sizes) {
    const resized = sharp(png).resize({ width: w });
    await resized.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(OUT, `${id}-${w}.avif`));
    await resized.clone().webp({ quality: 72 }).toFile(path.join(OUT, `${id}-${w}.webp`));
    variants.push(`${id}-${w}.avif`, `${id}-${w}.webp`);
  }
  // Tiny blurred placeholder for progressive loading.
  const blur = await sharp(png).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  manifest.push({ id, width: W, height: H, variants, blurDataURL: `data:image/webp;base64,${blur.toString("base64")}` });
  console.log("generated", id);
}
fs.writeFileSync(path.join(OUT, "generated.json"), JSON.stringify(manifest, null, 2));
