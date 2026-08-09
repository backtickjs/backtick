// The difference is what a component compiles *to*. `Main.tsx` is server code,
// so `build.mjs` runs it and writes down what it drew — a bundle, which is what
// every client of this framework draws from. It sits in `lib/` with the rest of
// the build's output and is inlined here rather than fetched, because every
// other implementation ships one module and a second request would show up in
// the startup numbers as ours alone.
import { dom, render } from "@backtickjs/web-sdk/client";
import bundle from "../lib/bundle.json" with { type: "json" };

render(bundle, dom, document.querySelector("#main")!);
