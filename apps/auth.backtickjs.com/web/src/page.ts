// The sign-in page's component, bundled for the browser, which the page's
// script draws with Solid. Built once, at `pnpm build` (scripts/page.ts).
import { bundler } from "@backtickjs/bundler";
import { SignIn } from "./SignIn.tsx";

export async function signInScript(): Promise<string> {
  const bundle = await bundler.build({
    input: SignIn,
    modules: {
      "solid-js": "1.9.17",
      "solid-js/web": "1.9.17",
      "solid-js/store": "1.9.17",
    },
  });
  return bundle.generate({ format: "es" }).code;
}
