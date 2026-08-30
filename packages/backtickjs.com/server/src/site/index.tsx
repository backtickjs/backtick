import { bundler } from "@backtickjs/core";
import { insert } from "@backtickjs/web-sdk";
import { Layout } from "../components/Layout.js";
import { Home } from "../pages/Home.js";
import { client } from "./client.js";

// What a search result and a shared link say. Here rather than beside the page,
// because they describe the document and the page describes itself.
const TITLE = "Backtick — Ship today. Not next release.";
const DESCRIPTION =
  "A server-driven UI framework: your app fetches screens and their behavior" +
  " at runtime, so changing one costs a deploy rather than a release.";
const URL = "https://backtickjs.com/";

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
const template =
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
  `<title>${TITLE}</title>` +
  `<meta name="description" content="${DESCRIPTION}">` +
  `<link rel="canonical" href="${URL}">` +
  `<meta property="og:title" content="${TITLE}">` +
  `<meta property="og:description" content="${DESCRIPTION}">` +
  `<meta property="og:url" content="${URL}">` +
  `<script defer src="/${client.name}"></script>` +
  `</head><body>` +
  // Stays where it is: `insert` draws after what the body already holds, and
  // a `<noscript>` shows only when there is nothing to draw it.
  `<noscript><p>This page is a Backtick bundle, drawn by a script.` +
  ` With scripting off there is nothing to draw it with.</p></noscript>` +
  `</body></html>`;

// An element saying what to draw. The components have not run yet. The layout
// is applied here rather than inside the page, so the page is its content and
// the chrome is written once — and if a second page ever arrives, this is the
// thing that grows a list.
const page = <Layout>{await Home()}</Layout>;

// Runs them, here while the site is built. What comes back is a bundle: data,
// not HTML.
const bundle = await bundler.run(page);

/** The document, carrying that bundle as JSON. */
export const html = insert(template, "body", bundle);
