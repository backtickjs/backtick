import { hash, source } from "@backtickjs/web-client";

/** The client, as one url, the bytes to answer there, and how to answer. */
export interface ClientAsset {
  /** Where a document asks for it, and what a server matches to answer. */
  url: string;
  /** What to answer with at {@link url}, and nothing about any other url. */
  headers: { "content-type": string; "cache-control": string };
  /** The client itself. */
  source: string;
  /** What {@link source} holds, as a sha256, and what {@link url} is named for. */
  hash: string;
}

/**
 * The client, as a thing served.
 *
 *     const asset = clientAsset();
 *     // <script defer src="${asset.url}"></script>
 *     if (pathname === asset.url) send(asset.source, asset.headers);
 *
 * Three facts that have to agree, which is why they arrive together: the url is
 * named for what the client holds, so a rebuilt client is a url no browser has
 * an answer for, which is what makes a year of `immutable` a promise that can be
 * kept. Name it something else and the cache-control here is a way to pin a
 * visitor to an old client for a year.
 *
 * `base` is the one thing an app knows and this cannot: where its own urls
 * begin. Relative — `./_backtick/` — for an app served under a prefix somebody
 * else chose.
 *
 * An app that answers none of this the same way — a CDN that names its own
 * files, a build that writes the client out beside a document, a page that
 * writes it inline — takes `source` and `hash` and leaves the rest.
 *
 * The `<script>` is the document's own: `defer` or `module`, an `integrity`, a
 * `crossorigin` for a CDN. This says what to ask for, not how to ask.
 */
export function clientAsset(base: string = "/_backtick/"): ClientAsset {
  return {
    url: `${base}client-${hash.slice(0, 16)}.js`,
    headers: {
      "content-type": "text/javascript",
      "cache-control": "public, max-age=31536000, immutable",
    },
    source,
    hash,
  };
}
