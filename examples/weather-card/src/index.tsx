import { examplePage } from "@backtickjs/web-page/server";
import { WeatherCard } from "./WeatherCard.js";

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
      const html = await examplePage(<WeatherCard />, "/client.js");
      return new Response(html, {
        headers: {
          "content-type": "text/html",
          "content-security-policy": "default-src 'self'",
        },
      });
    },

    "/client.js": () => new Response(client),
  },
});

console.log(`Preview on ${server.url}`);
