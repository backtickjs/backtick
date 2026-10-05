// The palette, resolved where the page is built rather than looked up in the
// browser. A component composes the value straight into its style string, so
// what crosses is the colour itself — no custom property to declare above it,
// and nothing to resolve at draw time.
//
// `light-dark()` stays, because picking by theme is the one thing a value
// written here cannot do on its own. It needs `color-scheme`, which the page's
// head sets once and everything inherits.
export const ink = "light-dark(#0e0e10, #fafafa)";
export const paper = "light-dark(#ffffff, #0a0a0c)";
export const muted = "light-dark(#6b6b76, #a1a1aa)";
export const line = "light-dark(#e4e4e7, #26262b)";
export const wash = "light-dark(#f7f7f8, #121215)";

export const sans =
  "'Inter', 'Helvetica Neue', Helvetica, system-ui, sans-serif";
export const mono = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

// Violet is the brand; cyan is React's. The gradient between them is the one
// place the two meet.
export const accent = "light-dark(#7c3aed, #a78bfa)";
export const cyan = "light-dark(#0891b2, #61dafb)";
export const gradient = `linear-gradient(90deg, ${cyan}, ${accent})`;

// The fill and its edge are alphas rather than `light-dark()` pairs: a
// translucent violet composites to a pale tint over white and a dim one over
// near-black on its own, so one value is right in both themes.
export const accentFill = "rgba(139, 92, 246, 0.11)";
export const accentEdge = "rgba(139, 92, 246, 0.26)";

// Code is dark in both themes, so the highlighter needs one palette.
export const codeBg = "#0d1117";
export const codeLine = "#21262d";
export const codeMuted = "#7d8590";

export const radius = "20px";
