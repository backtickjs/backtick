import type { Bundle } from "@backtickjs/bundler";
import { parseHTML } from "linkedom";

/**
 * A document somebody else wrote, with a bundle drawn into it — a template from
 * another framework, a file on disk, a CMS's output.
 *
 *     embed(await readFile("index.html", "utf8"), "#cart", bundle);
 *
 * What is drawn goes inside what the selector names, after what it already holds,
 * and draws in that place — so what follows it in the markup stays after what it
 * draws. A selector matching nothing throws: a document that says where to draw
 * and one that has somewhere to draw are different claims.
 *
 * One bundle per call; a document with more calls again with what came back.
 *
 * The document has to ask for the client itself — one `<script>` anywhere in it,
 * which is also where a CDN, an `integrity` or a `crossorigin` would go. Without
 * it the bundles are data nothing draws.
 *
 * The document is parsed and written out again, so what comes back is the same
 * HTML but not the same bytes.
 */
export function embed(html: string, selector: string, bundle: Bundle): string {
  const { document } = parseHTML(html);
  const target = document.querySelector(selector);
  if (target === null) {
    throw new Error(
      `backtick: nothing in the document matches \`${selector}\``,
    );
  }
  // The bundle rides on the island itself, in an attribute written with single
  // quotes. A bundle is mostly `"`, and an attribute in double quotes has to
  // write every one of them as `&quot;` — 63% longer, measured on this site's
  // own page. In single quotes only `'` and `&` are escaped, which JSON holds
  // almost none of, so the cost is about one percent.
  //
  // Which is why the island is written without its bundle and given one after:
  // the serializer quotes attributes its own way and would put the `&quot;`
  // back. An island with no bundle is a shape that exists only between these
  // two lines — every one this has finished with carries the attribute — so
  // there is exactly one to find.
  const empty = "<backtick-island></backtick-island>";
  target.insertAdjacentHTML("beforeend", empty);
  const written = document.toString();
  if (written.indexOf(empty) !== written.lastIndexOf(empty)) {
    throw new Error("backtick: a document already held an island with no bundle");
  }
  const held = JSON.stringify(bundle)
    .replaceAll("&", "&amp;")
    .replaceAll("'", "&#39;");
  return written.replace(
    empty,
    `<backtick-island bundle='${held}'></backtick-island>`,
  );
}
