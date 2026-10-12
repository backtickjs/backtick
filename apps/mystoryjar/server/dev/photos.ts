import sharp from "sharp";

// Three scenes for the seed's photos, drawn rather than shipped: a sunset,
// a lake and snow, as SVG, made JPEGs the size the website stores.
const scenes: Record<string, string> = {
  sunset: `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
    <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b1e5c"/><stop offset="0.6" stop-color="#e9707d"/><stop offset="1" stop-color="#f1a817"/>
    </linearGradient></defs>
    <rect width="1600" height="1200" fill="url(#sky)"/>
    <circle cx="800" cy="820" r="170" fill="#fec400"/>
    <rect y="860" width="1600" height="340" fill="#1d3557"/>
    <path d="M0 900 Q400 860 800 900 T1600 900 V1200 H0Z" fill="#14213d"/>
  </svg>`,
  lake: `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
    <rect width="1600" height="700" fill="#9fd3f0"/>
    <path d="M0 700 L350 260 L620 560 L900 180 L1250 600 L1600 320 V700Z" fill="#4a6b5d"/>
    <rect y="700" width="1600" height="500" fill="#3f7fa6"/>
    <path d="M0 760 H1600 M0 860 H1600 M0 980 H1600" stroke="#9fd3f0" stroke-width="6" opacity="0.5"/>
  </svg>`,
  snow: `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200">
    <rect width="1600" height="1200" fill="#cfd8e3"/>
    <rect y="820" width="1600" height="380" fill="#f7f9fb"/>
    <circle cx="800" cy="760" r="150" fill="#ffffff" stroke="#d7dde4" stroke-width="6"/>
    <circle cx="800" cy="560" r="100" fill="#ffffff" stroke="#d7dde4" stroke-width="6"/>
    <circle cx="770" cy="540" r="10" fill="#303030"/><circle cx="830" cy="540" r="10" fill="#303030"/>
    <path d="M800 565 L860 580 L800 590Z" fill="#f1a817"/>
  </svg>`,
};

export type Scene = keyof typeof scenes;

/** A scene as the website's two sizes: large, and small, 800 wide. */
export async function photo(scene: string) {
  const svg = Buffer.from(scenes[scene]!);
  return {
    large: await sharp(svg).jpeg({ quality: 80 }).toBuffer(),
    small: await sharp(svg)
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toBuffer(),
  };
}
