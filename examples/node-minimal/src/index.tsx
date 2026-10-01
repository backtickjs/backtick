import { createServer } from "node:http";
import { Counter } from "./Counter.js";
import { toHtml } from "./html.js";

const server = createServer(async (incoming, outgoing) => {
  const html = await toHtml(<Counter from={0} />);
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(html);
});

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
