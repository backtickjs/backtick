import type { Bundle } from "@backtickjs/core";

/**
 * One island: a bundle, as a page carries it.
 *
 *     `<main>${island(await bundle(<Home />))}</main>`
 *
 * Data and nothing else. What draws it is the client, which the page asks for
 * itself — a script tag the app writes, wherever it serves the file from. So how
 * it is deployed, cached, or vouched for is the app's, and nothing here has an
 * opinion about a url it does not control. `page` writes that tag for you.
 *
 * Two nodes: the bundle, and an element after it that says to draw it. The
 * element is what the browser reports — the client defines `backtick-island`,
 * and whether it is defined before the page is parsed or long after, every one
 * of these draws itself. Nothing waits for the document and nothing scans it.
 *
 * The bundle goes in front rather than inside, because a custom element is told
 * it is in the document while the parser is still inside it: its children do not
 * exist yet, and everything before it does. Which is also what keeps a bundle
 * the size it is — raw text in a script needs no escaping for an attribute.
 *
 * Drawn into whatever holds it, in its place — so an island can sit anywhere in
 * an element, and what follows it in the markup stays after what it draws.
 */
export function island(bundle: Bundle): string {
  // `</script` ends the element wherever it stands. Only strings can hold a `<`,
  // and `<` is an escape JSON reads back itself.
  const escaped = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  return (
    `<script type="application/backtick+json">${escaped}</script>` +
    `<backtick-island></backtick-island>`
  );
}
