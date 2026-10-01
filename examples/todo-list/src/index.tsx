import { TodoList } from "./TodoList.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 5175,
  routes: {
    "/": async () => {
      const html = await toHtml(<TodoList />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
