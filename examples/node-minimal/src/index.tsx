import { serve } from "@backtickjs/web-sdk/server/node";
import App from "./app.js";

// The bundle is built here, on the server, and the page mounts it. Nothing
// compiles in the browser: what ships is the same JSON a native client gets.
//
// The client is served from the SDK's own `dist` as plain ES modules, so this
// needs no JavaScript bundler and names none of the packages behind the SDK.
const port = Number(process.env.PORT ?? 5173);

serve(<App />, { title: "Backtick — node-minimal" }).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
