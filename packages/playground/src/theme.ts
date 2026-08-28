/**
 * What the playground is drawn in.
 *
 * Its own rather than the page's, because the page it sits in is not always
 * this repository's site — and a component that reads a palette out of wherever
 * it was dropped is a component that looks wrong somewhere.
 *
 * The values resolve where the page is built rather than in the browser: a
 * component composes one straight into a style string, so what crosses is the
 * colour itself. `light-dark()` stays, because picking by theme is the one
 * thing a value written here cannot do on its own — it needs `color-scheme`,
 * which the document sets once and everything inherits.
 */
export const ink = "light-dark(#0e0e10, #fafafa)";
export const paper = "light-dark(#ffffff, #0e0e10)";
export const muted = "light-dark(#71717a, #a1a1aa)";
export const line = "light-dark(#e4e4e7, #27272a)";
export const wash = "light-dark(#fafafa, #161618)";

export const mono = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";
