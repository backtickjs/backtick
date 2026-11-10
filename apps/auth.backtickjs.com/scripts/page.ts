// The sign-in page's script, with Solid in it, as a string the function
// serves at /sign-in.js: web/dist/script.js. From this origin only, never a
// CDN: the page signs people in, so no one else's server may change its code.
// Not in public/: Vercel copies public/ before the build runs.
import { writeFile } from "node:fs/promises";
import { build } from "esbuild";
import { signInScript } from "../web/dist/page.js";

// The page's entry, as Solid's: the component drawn into the page. The
// component's bundle is a module of its own, which the entry imports.
const component = await signInScript();
const { outputFiles } = await build({
  stdin: {
    contents: `import { render } from "solid-js/web";
import SignIn from "sign-in";
render(SignIn, document.getElementById("app"));`,
    resolveDir: new URL("..", import.meta.url).pathname,
    loader: "js",
  },
  plugins: [
    {
      name: "sign-in",
      setup(build) {
        build.onResolve({ filter: /^sign-in$/ }, () => ({
          path: "sign-in",
          namespace: "sign-in",
        }));
        build.onLoad({ filter: /.*/, namespace: "sign-in" }, () => ({
          contents: component,
          resolveDir: new URL("..", import.meta.url).pathname,
          loader: "js",
        }));
      },
    },
  ],
  bundle: true,
  format: "esm",
  platform: "browser",
  conditions: ["browser"],
  minify: true,
  write: false,
  logLevel: "warning",
});

await writeFile(
  new URL("../web/dist/script.js", import.meta.url),
  `export const signInScript = ${JSON.stringify(outputFiles[0]!.text)};\n`,
);
await writeFile(
  new URL("../web/dist/script.d.ts", import.meta.url),
  "export declare const signInScript: string;\n",
);
