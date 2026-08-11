import { bundle, type JsxElement } from "@backtickjs/core";
import { clientUrl } from "./browserClient.js";
import { insert } from "./insert.js";

/**
 * A page drawing this, with `head` in its head.
 *
 *     const html = await page(<Home />);
 *     const html = await page(<Home />, `<title>Home</title>`);
 *
 * A title, `og:` tags and a stylesheet are worth having only in the bytes that
 * are served: a head drawn by the client arrives too late for the preload
 * scanner and never at all for a crawler. Pass them and they are served.
 *
 * Nothing is in the head that was not asked for, save `charset`, which is
 * written either way and cannot be replaced.
 *
 * The document around them is this one's, and so is asking for the client: it is
 * served from {@link clientUrl}, on this origin. A caller with a document of
 * their own — a file on disk, another framework's template, a client on a CDN —
 * writes that script tag themselves and draws with `insert`.
 *
 * Sending it is the caller's.
 */
export async function page(
  body: JsxElement,
  head: string = "",
): Promise<string> {
  // `charset` first and never from the caller: a bundle is UTF-8 text read back
  // with `JSON.parse`, and a document decoded as anything else is every string
  // in the app quietly mangled. It counts only in the first 1024 bytes, and only
  // during parsing, so there is nowhere else to put it and no fixing it after.
  return insert(
    `<!doctype html><html><head><meta charset="utf-8">${head}` +
      `<script defer src="${clientUrl}"></script></head>` +
      `<body></body></html>`,
    "body",
    await bundle(body),
  );
}
