import { createServer } from "node:http";
import { URLPattern } from "node:url";
import { client, clientUrl, page } from "@backtickjs/web-sdk";
import { TodoList } from "./TodoList.js";

const routes = {
  "/": () => {
    return <TodoList />;
  },
};

const matchers = Object.entries(routes).map(([path, handler]) => ({
  pattern: new URLPattern({ pathname: path }),
  handler,
}));

const port = Number(process.env.PORT ?? 5175);

createServer(async (incoming, outgoing) => {
  try {
    const [pathname = "/"] = (incoming.url ?? "/").split("?");
    if (pathname === clientUrl) {
      outgoing.writeHead(200, {
        "content-type": "text/javascript",
        "cache-control": "public, max-age=31536000, immutable",
      });
      outgoing.end(client);
      return;
    }
    for (const { pattern, handler } of matchers) {
      if (pattern.exec({ pathname }) !== null) {
        const html = await page(handler());
        outgoing.writeHead(200, {
          "content-type": "text/html",
          "content-security-policy": "default-src 'self'",
        });
        outgoing.end(html);
        return;
      }
    }
    outgoing.writeHead(404, { "content-type": "text/plain" });
    outgoing.end("Not found");
  } catch (error) {
    outgoing.writeHead(500, { "content-type": "text/plain" });
    outgoing.end(String(error));
  }
}).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
