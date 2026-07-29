import type { Bundle } from "@backtickjs/core";

export interface DocumentOptions {
  // The module the page imports to draw the payload, as a URL it can reach.
  // Named rather than assumed, so this doesn't have to know which client is
  // drawing — only that it exports `mount`.
  readonly client: string;
  // Bare specifiers a browser can't resolve, as the import map handed to the
  // page. A workspace package imported by name needs an entry here.
  readonly imports?: { readonly [specifier: string]: string };
  readonly title?: string;
}

// JSON in a `<script>` ends at the first `</script>` the parser sees, wherever
// it sits — including inside a string the app put there. Escaping `<` closes
// that off, and `<` reads back as `<` through `JSON.parse`, so nothing
// downstream has to know.
const embed = (bundle: Bundle): string =>
  JSON.stringify(bundle).replaceAll("<", "\\u003c");

// A bundle in a document that mounts it. Pure: no HTTP, no runtime APIs.
//
// The payload is inlined rather than fetched, which is what saves the round
// trip a separate request would cost — the browser has everything the moment
// the document arrives, exactly as a native client does when it asks for JSON.
export function renderDocument(
  bundle: Bundle,
  { client, imports = {}, title = "Backtick" }: DocumentOptions,
): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      body { margin: 0; font-family: system-ui, sans-serif; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="application/json" id="bundle">${embed(bundle)}</script>
    <script type="importmap">${JSON.stringify({ imports })}</script>
    <script type="module">
      import { mount } from ${JSON.stringify(client)};

      mount(
        JSON.parse(document.getElementById("bundle").textContent),
        document.getElementById("root"),
      );
    </script>
  </body>
</html>
`;
}
