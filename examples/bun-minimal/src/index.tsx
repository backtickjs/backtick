import { examplePage } from "@backtickjs/web-page/server";
import { Counter } from "./Counter.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const counter = <Counter from={0} />;

      // A document carrying what it drew, with the client that draws it.
      const html = await examplePage(counter, "/client.js");

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },

    "/client.js": () => new Response(client),
  },
});

console.log(`Preview on ${server.url}`);
