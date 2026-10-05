import { createServer } from "node:http";
import { Home } from "./Home.js";
import { development, toHtml } from "./html.js";

// In development, this run of the server: `--watch` starts a new one whenever
// you save, and the page, seeing a new one at `/live`, reloads.
const run = crypto.randomUUID();

const server = createServer(async (request, response) => {
  if (development && request.url === "/live") {
    response.end(run);
    return;
  }
  if (request.url === "/") {
    try {
      const html = await toHtml(<Home />);
      response.setHeader("content-type", "text/html");
      response.end(html);
    } catch (error) {
      // Answered rather than crashed on, so the browser can show why.
      console.error(error);
      response.statusCode = 500;
      response.end(String(error));
    }
    return;
  }
  response.statusCode = 404;
  response.end();
});

server.listen(3000, () => {
  console.log("Backtick server on http://localhost:3000");
});
