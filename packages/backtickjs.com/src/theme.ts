// The palette, resolved where the page is built rather than looked up in the
// browser. A component composes the value straight into its style string, so
// what crosses is the colour itself — no custom property to declare above it,
// and nothing to resolve at draw time.
//
// `light-dark()` stays, because picking by theme is the one thing a value
// written here cannot do on its own. It needs `color-scheme`, which `shell.ts`
// sets on the body once and everything inherits.
export const ink = "light-dark(#0e0e10, #fafafa)";
export const paper = "light-dark(#ffffff, #0e0e10)";
export const muted = "light-dark(#71717a, #a1a1aa)";
export const line = "light-dark(#e4e4e7, #27272a)";
export const wash = "light-dark(#fafafa, #161618)";

export const sans = "'Helvetica Neue', Helvetica, Inter, system-ui, sans-serif";
export const mono = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";
