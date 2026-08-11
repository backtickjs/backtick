import { starterPage } from "@backtickjs/web-sdk";
import { Counter } from "./Counter.js";

const server = Bun.serve({
  port: 5174,
  async fetch() {
    const page = await starterPage(<Counter from={0} />);
    return new Response(page, { headers: { "content-type": "text/html" } });
  },
});

console.log(`Preview on ${server.url}`);
