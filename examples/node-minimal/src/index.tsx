import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { bundle } from "@backtickjs/core";
import * as client from "@backtickjs/web-client";
import { insert } from "@backtickjs/web-sdk";
import { Counter } from "./Counter.js";

// A page somebody else wrote, which is what `insert` is for. `charset` is not
// decoration there: a bundle is UTF-8 text read back with `JSON.parse`, and a
// document decoded as anything else is every string in the app quietly mangled.
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

// A fixed name, so `index.html` can be a file rather than a template. Nothing
// promises a cache for it: this name says nothing about what the client holds,
// and the todo-list example shows the name that earns a year.
const clientUrl = "/_backtick/client.js";

createServer(async (incoming, outgoing) => {
  if (incoming.url === clientUrl) {
    outgoing.writeHead(200, { "content-type": "text/javascript" });
    outgoing.end(client.source);
    return;
  }
  outgoing.writeHead(200, { "content-type": "text/html" });
  outgoing.end(insert(html, "body", await bundle(<Counter from={0} />)));
}).listen(5173, () => console.log("Preview on http://localhost:5173"));
