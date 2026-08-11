import { bundle } from "@backtickjs/core";
import { client, insert } from "@backtickjs/web-sdk";
import { Counter } from "./Counter.js";

const html = await Bun.file(new URL("../index.html", import.meta.url)).text();

const server = Bun.serve({
  port: 5174,
  routes: {
    "/": async () =>
      new Response(insert(html, "body", await bundle(<Counter from={0} />)), {
        headers: { "content-type": "text/html" },
      }),

    // The name `index.html` asks for
    "/_backtick/client.js": () =>
      new Response(client.source, {
        headers: { "content-type": "text/javascript" },
      }),
  },
});

console.log(`Preview on ${server.url}`);
