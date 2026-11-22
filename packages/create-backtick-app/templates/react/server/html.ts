import { bundler } from "@backtickjs/bundler";
import type { JSX } from "@backtickjs/jsx-react/jsx-runtime";

// The versions of React the page loads, below: what each page is bundled for.
const modules = {
  react: "19.2.3",
  "react/jsx-runtime": "19.2.3",
  "react-dom/client": "19.2.3",
};

// Development unless NODE_ENV says production, as hosts set it for a deploy.
const development = process.env.NODE_ENV !== "production";

// A page: its element, bundled for the browser, which the page's script runs
// with React from a CDN and draws with `createRoot`.
export async function toHtml(element: JSX.Element): Promise<string> {
  const bundle = await bundler.build({ input: element, modules });
  // In development, a map back to the files you wrote, for the browser's
  // devtools.
  const { code } = bundle.generate({
    format: "cjs",
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
    <script type="text/plain" id="bundle">${code}</script>
    <script type="module">
      import * as React from "react";
      import * as JSXRuntime from "react/jsx-runtime";
      import { createRoot } from "react-dom/client";

      const moduleMap = {
        react: React,
        "react/jsx-runtime": JSXRuntime,
      };

      const bundle = document.getElementById("bundle").textContent;
      const module = { exports: {} };
      new Function("module", "exports", "require", bundle)(
        module,
        module.exports,
        (name) => moduleMap[name],
      );

      const app = document.getElementById("app");
      createRoot(app).render(module.exports);
    </script>
  </body>
</html>`;
}
