import { page } from "@backtickjs/web-sdk/server";
import { serve } from "@backtickjs/web-sdk/server/node";
import { About, Counter, Home } from "./screens.js";

// One page per path, drawn when the path is asked for and answered whole.
//
// There is nothing static to serve: `page` writes the document with the bundle
// already in it, so a browser makes one request for the page and one for the
// client. `/about` reports the uptime at the moment of the request rather than
// the moment the server started, because a route runs then.
const started = new Date();

const routes = [
  { path: "/", respond: () => page(<Home />) },
  { path: "/counter", respond: () => page(<Counter />) },
  { path: "/about", respond: () => page(<About started={started} />) },
];

const port = Number(process.env.PORT ?? 5173);

serve(routes).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
