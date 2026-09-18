import { examplePage } from "@backtickjs/web-page/server";
import { Report } from "./Report.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async () => {
      // An element saying what to draw. The component has not run yet.
      const report = <Report of="conformance" />;

      // A document carrying what it drew, with the client that draws it.
      const html = await examplePage(report, "/client.js");

      // Ordinary HTTP from here
      return new Response(html, { headers: { "content-type": "text/html" } });
    },

    "/client.js": () => new Response(client),
  },
});

console.log(`Preview on ${server.url}`);
