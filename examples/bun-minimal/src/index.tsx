import { bundle } from "@backtickjs/core";
import { starterPage } from "@backtickjs/web-sdk";
import { Counter } from "./Counter.js";

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const counter = <Counter from={0} />;

      // Runs it, here on the server. What comes back is data, not HTML.
      const bundled = await bundle(counter);

      // A document holding that data and the client that draws it.
      const page = starterPage(bundled);

      // Ordinary HTTP from here: what backtick gave you is a string.
      return new Response(page, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
