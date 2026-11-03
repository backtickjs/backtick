// The sign-in page's script: its component, bundled for the browser, which
// Solid draws. Built once, at `pnpm build` (scripts/page.ts).
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render } from "solid-js/web" with { backtick: "client" };
import { SignIn } from "./SignIn.tsx";

export async function signInScript(): Promise<string> {
  const bundle = await bundler.build({
    input: cs`{ $render($SignIn, document.getElementById("app")!); }`,
    modules: {
      "solid-js": "1.9.17",
      "solid-js/web": "1.9.17",
      "solid-js/store": "1.9.17",
    },
  });
  return bundle.generate({ format: "es" }).code;
}
