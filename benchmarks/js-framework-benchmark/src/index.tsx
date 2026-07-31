import { serve } from "@backtickjs/web-sdk/server/node";
import { Main } from "./Main.js";

// The app in a browser, for profiling by hand. The measurements `bench` reports
// need no browser at all — see `bench.ts`.
const port = Number(process.env.PORT ?? 5180);

serve(
  { "/": () => <Main /> },
  { title: "Backtick — js-framework-benchmark" },
).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
