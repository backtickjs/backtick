import { createServer } from "node:http";
import { starterPage } from "@backtickjs/web-sdk";
import { Counter } from "./Counter.js";

const server = createServer(async (incoming, outgoing) => {
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(await starterPage(<Counter from={0} />));
});

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
