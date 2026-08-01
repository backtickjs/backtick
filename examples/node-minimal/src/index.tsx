import { fileURLToPath } from "node:url";
import { serve } from "@backtickjs/web-sdk/server/node";
import { About, Counter, Home } from "./screens.js";

// One list of routes for every client. A route pairs a path with the page a
// browser opens there and a `render` that says what to draw in it; a phone asks
// the same path and gets the same answer as data. Neither is sent a document
// this didn't write, because it writes none — `public/index.html` is served as
// it was typed.
//
// `render` runs when the path is asked for, so `/about` reports the uptime at
// the moment of the request rather than the moment the server started.
const started = new Date();
const html = "/index.html";

const routes = [
  {
    path: "/",
    html,
    render: () => [{ target: "#root", component: <Home /> }],
  },
  {
    path: "/counter",
    html,
    render: () => [{ target: "#root", component: <Counter /> }],
  },
  {
    path: "/about",
    html,
    render: () => [{ target: "#root", component: <About started={started} /> }],
  },
];

const port = Number(process.env.PORT ?? 5173);
const options = {
  root: fileURLToPath(new URL("../public", import.meta.url)),
};

serve(routes, options).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
