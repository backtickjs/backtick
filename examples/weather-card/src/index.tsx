import { WeatherCard } from "./WeatherCard.js";
import { toHtml } from "./html.js";

const server = Bun.serve({
  port: 5176,
  routes: {
    "/": async () => {
      const html = await toHtml(<WeatherCard />);
      return new Response(html, { headers: { "content-type": "text/html" } });
    },
  },
});

console.log(`Preview on ${server.url}`);
