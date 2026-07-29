import { serve } from "@backtickjs/web-sdk/server/node";
import { About, Counter, Home } from "./screens.js";

// One route table for every client. A browser asks for `/about` and gets a
// document with the bundle already in it; a phone asks for the same path and
// gets the bundle on its own. Neither knows the other exists.
//
// A route is a function, so it runs when the path is asked for — `/about`
// reports the uptime at the moment of the request.
const started = new Date();
const port = Number(process.env.PORT ?? 5173);

serve(
  {
    "/": () => <Home />,
    "/counter": () => <Counter />,
    "/about": () => <About started={started} />,
  },
  { title: "Backtick — node-minimal" },
).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
