import { createServer } from "node:http";
import { examplePage } from "@backtickjs/web-page/server";
import { build } from "esbuild";
import { Counter } from "./Counter.js";

// Bundle the client once at startup.
const result = await build({
  entryPoints: ["./src/client.ts"],
  bundle: true,
  minify: true,
  write: false,
});
const client = result.outputFiles[0].text;

const server = createServer(async (incoming, outgoing) => {
  if (incoming.url === "/client.js") {
    outgoing.writeHead(200, { "content-type": "text/javascript" });
    outgoing.end(client);
    return;
  }

  // An element saying what to draw. The component has not run yet.
  const counter = <Counter from={0} />;

  // A document carrying what it drew, with the client that draws it.
  const html = await examplePage(counter, "/client.js");

  // Ordinary HTTP from here
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(html);
});

server.listen(5173, () => console.log("Preview on http://localhost:5173"));
