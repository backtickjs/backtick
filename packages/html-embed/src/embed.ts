import type { Bundle } from "@backtickjs/bundler";
import { parseHTML } from "linkedom";

/**
 * A document somebody else wrote, with a bundle drawn into it.
 *
 *     embed(await readFile("index.html", "utf8"), "#cart", bundle);
 *
 * The bundle goes inside what the selector names, after what it already holds;
 * a selector matching nothing throws. One bundle per call, and the document
 * asks for the client itself — without one `<script>` somewhere in it a bundle
 * is data nothing draws.
 *
 * Parsed and written out again, so what comes back is the same HTML and not the
 * same bytes.
 */
export function embed(html: string, selector: string, bundle: Bundle): string {
  const { document } = parseHTML(html);
  const target = document.querySelector(selector);
  if (target === null) {
    throw new Error(`backtick: nothing in the document matches \`${selector}\``);
  }
  // Data and nothing else: a page carrying a bundle carries no code, so it
  // needs nothing of its `script-src` beyond the client it already asks for.
  // The drawing goes in front of this, and this stays where it is — a drawing
  // keeps inserting after it is first made, and needs something that holds
  // still.
  const script = document.createElement("script");
  script.setAttribute("type", "application/json");
  script.setAttribute("data-backtick", "");
  // `</script` ends the element wherever it stands. Only strings can hold a
  // `<`, and `<` is an escape JSON reads back itself.
  script.textContent = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  target.append(script);
  return document.toString();
}
