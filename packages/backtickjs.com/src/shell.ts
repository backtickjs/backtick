import { clientUrl } from "./files.js";

const PALETTE =
  "--ink: light-dark(#0e0e10, #fafafa);" +
  " --paper: light-dark(#ffffff, #0e0e10);" +
  " --muted: light-dark(#71717a, #a1a1aa);" +
  " --line: light-dark(#e4e4e7, #27272a);" +
  " --wash: light-dark(#fafafa, #161618);" +
  // Single quotes inside, not double: this string is written into a
  // `style="..."` attribute, and a double quote in it ends the attribute
  // there. CSS reads either.
  " --sans: 'Helvetica Neue', Helvetica, Inter, system-ui, sans-serif;" +
  " --mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

// `color-scheme` is what makes `light-dark()` mean anything, and it inherits —
// so declaring it here is what lets every component pick a colour for both
// themes from an inline style, where a media query cannot go.
const BODY =
  "color-scheme: light dark; margin: 0;" +
  " background: var(--paper); color: var(--ink);" +
  " font-family: var(--sans); font-size: 17px; line-height: 1.6;" +
  " -webkit-font-smoothing: antialiased";

/**
 * The document a page is drawn into: a head, and a body with nothing in it.
 *
 * This is the whole of the site that is not Backtick. It cannot be less — the
 * client has to be asked for by something, and a `<head>` is not a place a
 * bundle can draw, because the bundle is drawn by the script the head loads.
 *
 * The palette is here rather than in a stylesheet because it is the one thing
 * every component shares and nothing else on the page can declare: a custom
 * property inherits, so this is the only place it needs saying.
 */
export function shell({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): string {
  return (
    `<!doctype html><html lang="en"><head>` +
    // Counts only in the first 1024 bytes, and only while the document is being
    // parsed: a bundle is UTF-8 read back with `JSON.parse`, and a document
    // decoded as anything else is every string on the page quietly mangled.
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    // `style-src` is spelled out because the default would forbid the one
    // thing this page is made of. `default-src` cascades to `style-src-attr`,
    // and `'self'` there blocks a `style` attribute the parser reads — which
    // is every style in the document below, and the palette on `<body>` that
    // the rest of them resolve against.
    //
    // The client's own styles never needed it: `dom.ts` writes them through
    // `cssText`, which no policy polices. It is the static attributes here
    // that do.
    `<meta http-equiv="content-security-policy" ` +
    `content="default-src 'self'; style-src 'self' 'unsafe-inline'">` +
    `<title>${title}</title>` +
    `<meta name="description" content="${description}">` +
    `<link rel="canonical" href="https://backtickjs.com${path}">` +
    `<meta property="og:title" content="${title}">` +
    `<meta property="og:description" content="${description}">` +
    `<meta property="og:url" content="https://backtickjs.com${path}">` +
    `<script defer src="${clientUrl}"></script>` +
    `</head><body style="${PALETTE}; ${BODY}">` +
    // Stays where it is: `insert` draws after what the body already holds, and
    // a `<noscript>` shows only when there is nothing to draw it.
    `<noscript><p style="max-width: 34em; margin: 48px auto; padding: 0 24px;` +
    ` color: var(--muted)">This page is a Backtick bundle, drawn by a script.` +
    ` With scripting off there is nothing to draw it with.</p></noscript>` +
    `</body></html>`
  );
}
