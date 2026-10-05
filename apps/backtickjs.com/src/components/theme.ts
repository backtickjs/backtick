// The palette, resolved where the page is built rather than looked up in the
// browser. A component composes the value straight into its style string, so
// what crosses is the colour itself — no custom property to declare above it,
// and nothing to resolve at draw time.
//
// `light-dark()` stays, because picking by theme is the one thing a value
// written here cannot do on its own. It needs `color-scheme`, which the page's
// head sets once and everything inherits.
export const ink = "light-dark(#0e0e10, #fafafa)";
export const paper = "light-dark(#ffffff, #0e0e10)";
export const muted = "light-dark(#71717a, #a1a1aa)";
export const line = "light-dark(#e4e4e7, #27272a)";
export const wash = "light-dark(#fafafa, #161618)";

export const sans = "'Helvetica Neue', Helvetica, Inter, system-ui, sans-serif";
export const mono = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

// The one colour on the page.
//
// The text needs `light-dark()`: the light end is unreadable on a dark canvas,
// so which end is legible is a thing only the theme knows.
export const accent = "light-dark(#7c3aed, #a78bfa)";

// The fill and its edge do not, and that is the whole reason they are alphas
// rather than the two mixed hexes each would otherwise need. A translucent
// violet composites to a pale tint over white and a dim one over near-black on
// its own, so one value is right in both themes and there is no second value
// to drift away from it.
//
// The hue sits between the two ends of `accent`, so neither theme is the one
// paying for it.
export const accentFill = "rgba(139, 92, 246, 0.11)";
export const accentEdge = "rgba(139, 92, 246, 0.26)";
