import { examplePage } from "@backtickjs/web-page/server";
import { TodoList } from "./TodoList.js";

// Bundle the client once at startup.
const build = await Bun.build({
  entrypoints: ["./src/client.ts"],
  minify: true,
});
const [client] = build.outputs;

const server = Bun.serve({
  port: 5175,
  routes: {
    "/": async () => {
      const html = await examplePage(<TodoList />, "/client.js");
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
