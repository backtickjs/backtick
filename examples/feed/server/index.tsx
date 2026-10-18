import { reloadExpo } from "@backtickjs/expo/server";
import { serve } from "@hono/node-server";
import { app } from "./app.js";

// Once it listens, the app Expo serves reloads to show this server's screens.
serve({ fetch: app.fetch, port: 3000 }, () => reloadExpo());
