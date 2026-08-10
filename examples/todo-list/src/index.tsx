import { createServer } from "node:http";
import { page } from "@backtickjs/web-sdk";
import { TodoList } from "./todos.js";

// One request, no second trip: the list is drawn into the page that carries it.
const port = Number(process.env.PORT ?? 5175);

createServer((_, outgoing) => {
  void page(<TodoList />).then((html) => {
    outgoing.writeHead(200, { "content-type": "text/html" });
    outgoing.end(html);
  });
}).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
