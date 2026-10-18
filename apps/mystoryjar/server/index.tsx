import { reloadExpo } from "@backtickjs/expo/server";
import { serve } from "@hono/node-server";
import { app } from "./app.js";

// 3000 unless PORT says otherwise, as a host such as Cloud Run does.
const port = Number(process.env.PORT ?? 3000);
// Once it listens, the app Expo serves reloads to show this server's
// screens; deployed, there's no Expo to reload.
serve({ fetch: app.fetch, port }, () => {
  console.log(`MyStoryJar server on http://localhost:${port}`);
  reloadExpo();
});
