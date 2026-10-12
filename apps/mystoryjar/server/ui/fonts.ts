import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import subsetFont from "subset-font";

// Noto Sans JP, the website's typeface, in its two weights. The full font is
// 5.7 MB a weight, for its Japanese glyphs; the app downloads only what Latin
// text needs, the ranges Google Fonts serves as `latin`, and the phone's own
// fonts draw any other character.
export const fontFamilies = {
  medium: "NotoSansJP_500Medium",
  bold: "NotoSansJP_700Bold",
};

const LATIN = [
  [0x0000, 0x00ff],
  [0x0131, 0x0131],
  [0x0152, 0x0153],
  [0x02bb, 0x02bc],
  [0x02c6, 0x02c6],
  [0x02da, 0x02da],
  [0x02dc, 0x02dc],
  [0x0304, 0x0304],
  [0x0308, 0x0308],
  [0x0329, 0x0329],
  [0x2000, 0x206f],
  [0x20ac, 0x20ac],
  [0x2122, 0x2122],
  [0x2191, 0x2191],
  [0x2193, 0x2193],
  [0x2212, 0x2212],
  [0x2215, 0x2215],
  [0xfeff, 0xfeff],
  [0xfffd, 0xfffd],
];

const require = createRequire(import.meta.url);
const latin = LATIN.flatMap(([from, to]) =>
  Array.from({ length: to - from + 1 }, (_, i) =>
    String.fromCodePoint(from + i),
  ),
).join("");

// Each family's file, subset once, when the server starts.
export const fontFiles = new Map(
  await Promise.all(
    Object.values(fontFamilies).map(async (family) => {
      const weight = family.slice("NotoSansJP_".length);
      const full = readFileSync(
        require.resolve(
          `@expo-google-fonts/noto-sans-jp/${weight}/${family}.ttf`,
        ),
      );
      const subset = await subsetFont(full, latin, {
        targetFormat: "truetype",
      });
      return [family, subset] as const;
    }),
  ),
);

/** Where the app downloads each family, by the name screens draw it with. */
export function fontSources(origin: string): Record<string, string> {
  return Object.fromEntries(
    [...fontFiles.keys()].map((family) => [
      family,
      `${origin}/fonts/${family}.ttf`,
    ]),
  );
}
