import { createServer } from "node:http";
import { bundle } from "@backtickjs/core";
import { starterPage } from "@backtickjs/web-sdk";
import { Counter } from "./Counter.js";

const server = createServer(async (incoming, outgoing) => {
  // An element saying what to draw. The component has not run yet.
  const counter = <Counter from={0} />;

  // Runs it, here on the server. What comes back is data, not HTML.
  const bundled = await bundle(counter);

  // A document holding that data and the client that draws it.
  const page = starterPage(bundled);

  // Ordinary HTTP from here
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(page);
});

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
