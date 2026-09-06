import type { Bundle } from "@backtickjs/bundler";

/**
 * A bundle, as the element a web client draws it from.
 *
 *     `<body>${island(await bundler.run(<Home />))}</body>`
 *
 * The document has to ask for the client itself — one `<script>` anywhere in
 * it. Without it a bundle is data nothing draws.
 */
export function island(bundle: Bundle): string {
  // A bundle is mostly `"`, so the attribute is written in single quotes: in
  // double it would have to spell every one `&quot;`, which is 63% longer and
  // 6% after gzip. `&` and `'` are what single quotes escape; `<` joins them so
  // that a bundle holding markup of its own cannot end the tag early.
  const held = JSON.stringify(bundle)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll("'", "&#39;");
  return `<backtick-island bundle='${held}'></backtick-island>`;
}
