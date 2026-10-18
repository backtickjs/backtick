import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { createRoot } from "react-dom/client" with { backtick: "client" };
import type { JSX } from "@backtickjs/jsx-react/jsx-runtime";

// The versions of React the page loads, below: what each page is bundled for.
const modules = {
  react: "19.2.3",
  "react/jsx-runtime": "19.2.3",
  "react-dom/client": "19.2.3",
};

// Development unless NODE_ENV says production, as hosts set it for a deploy.
const development = process.env.NODE_ENV !== "production";

// A page: the element, bundled for the browser, and React from a CDN.
export async function toHtml(element: JSX.Element): Promise<string> {
  const bundle = await bundler.build({
    input: cs`$createRoot(document.getElementById("app")!).render($element)`,
    modules,
  });
  // In development, a map back to the files you wrote, for the browser's
  // devtools.
  const { code } = bundle.generate({
    format: "es",
    sourcemap: development ? "inline" : false,
  });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Backtick</title>
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@19.2.3",
          "react/jsx-runtime": "https://esm.sh/react@19.2.3/jsx-runtime",
          "react-dom/client": "https://esm.sh/react-dom@19.2.3/client?external=react"
        }
      }
    </script>
  </head>
  <body style="margin: 0">
    <div id="app"></div>
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
  </body>
</html>`;
}
