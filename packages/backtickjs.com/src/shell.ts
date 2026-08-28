import { clientUrl } from "./files.js";

/**
 * The document a page is drawn into: a head, and a body with nothing in it.
 *
 * This is the whole of the site that is not Backtick. It cannot be less — the
 * client has to be asked for by something, and a `<head>` is not a place a
 * bundle can draw, because the bundle is drawn by the script the head loads.
 *
 * It carries no styling at all. What `<body>` used to say — the type, the ink,
 * the canvas — is either drawn by the bundle now or comes from `color-scheme`
 * above, which leaves nothing here for a content policy to have to allow.
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
    // Strict, and it can be: nothing below carries a `style` attribute for
    // the parser to read. Every style on the page is written by the client
    // through `cssText`, which no policy polices.
    `<meta http-equiv="content-security-policy" content="default-src 'self'">` +
    // What the inline `color-scheme` was for, said as markup instead. It tells
    // the browser the page answers for both themes, so the canvas behind the
    // document is painted to match — and it is what `light-dark()` resolves
    // against, wherever that value ends up being written.
    `<meta name="color-scheme" content="light dark">` +
    `<title>${title}</title>` +
    `<meta name="description" content="${description}">` +
    `<link rel="canonical" href="https://backtickjs.com${path}">` +
    `<meta property="og:title" content="${title}">` +
    `<meta property="og:description" content="${description}">` +
    `<meta property="og:url" content="https://backtickjs.com${path}">` +
    `<script defer src="${clientUrl}"></script>` +
    `</head><body>` +
    // Stays where it is: `insert` draws after what the body already holds, and
    // a `<noscript>` shows only when there is nothing to draw it.
    `<noscript><p>This page is a Backtick bundle, drawn by a script.` +
    ` With scripting off there is nothing to draw it with.</p></noscript>` +
    `</body></html>`
  );
}
