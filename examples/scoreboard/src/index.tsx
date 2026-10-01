import { Scoreboard } from "./Scoreboard.js";
import { load, SLATE_PATH } from "./scores.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 5177,
  routes: {
    "/": async () => {
      const html = await toHtml(<Scoreboard />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },

    // What the drawing polls. The scores it answers with are the scores the
    // bundle above was built from, read the same way — the page and its
    // refreshes agree because they call one function.
    [SLATE_PATH]: async () =>
      new Response(JSON.stringify(await load()), {
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store",
        },
      }),
  },
});

console.log(`Preview on ${server.url}`);
