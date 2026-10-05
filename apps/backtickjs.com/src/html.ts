import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";

// In development, a map into the host files in each bundle, for devtools.
const sourcemap = process.env.NODE_ENV === "production" ? undefined : "inline";

// What inline styles cannot say: animations, hover, and the page itself.
const STYLE = `
  body { margin: 0; background: light-dark(#ffffff, #0a0a0c); }
  ::selection { background: rgba(97, 218, 251, .35); }
  .bt-lift:hover { transform: translateY(-1px); box-shadow: 0 8px 24px -10px rgba(0,0,0,.35); }
  .bt-enter { animation: bt-enter .6s cubic-bezier(.2,.8,.2,1) both; }
  .bt-toast { animation: bt-toast 2.4s ease both; }
  .bt-flash { animation: bt-flash 1.2s ease both; }
  @keyframes bt-enter { from { opacity: 0; transform: translateY(-10px) scale(.97); } }
  @keyframes bt-toast {
    0% { opacity: 0; transform: translateY(-14px); }
    12%, 78% { opacity: 1; transform: none; }
    100% { opacity: 0; transform: translateY(-8px); }
  }
  @keyframes bt-flash { from { background: rgba(46, 160, 67, .4); } }
  @keyframes bt-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes bt-pulse {
    0% { box-shadow: 0 0 0 0 rgba(63, 185, 80, .6); }
    100% { box-shadow: 0 0 0 8px rgba(63, 185, 80, 0); }
  }
  @media (max-width: 860px) { .bt-arrow { display: none; } }
  @media (max-width: 560px) { .bt-wide { display: none; } }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`;

export async function toHtml(element: JSX.Element): Promise<string> {
  const bundle = await bundler.build({
    input: cs`$render(() => $element, document.getElementById("app")!)`,
    external: { "solid-js": "1.9.14" },
  });

  const { code } = bundle.generate({ format: "es", sourcemap });

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light dark">
    <title>Backtick · Server-driven React Native</title>
    <meta name="description" content="Write React Native screens on your server. Your app fetches them at runtime and draws them natively, without a store release.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
    <style>${STYLE}</style>
    <script type="importmap">
      {
        "imports": {
          "solid-js": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/dist/solid.js",
          "solid-js/web": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/web/dist/web.js",
          "solid-js/store": "https://cdn.jsdelivr.net/npm/solid-js@1.9.14/store/dist/store.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="data:text/javascript,${encodeURIComponent(code)}"></script>
  </body>
</html>`;
}
