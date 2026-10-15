import { Hono } from "hono";
import { cors } from "hono/cors";
import { Feed, pageFor } from "./Feed.js";
import { commentFor, commentsFor, itemFor, likeFor } from "./Item.js";
import { commentsPath, itemPath, likesPath, pagePath } from "./paths.js";
import { screen } from "./screen.js";

export const app = new Hono();

// `npm run web` serves the app from another origin.
app.use(cors({ origin: "*", allowHeaders: ["x-build-id", "content-type"] }));

// The feed, and its pages, which know their items' paths only.
app.get("/", (context) => screen(context, <Feed />));
app.get(pagePath(":page"), (context) =>
  screen(context, pageFor(Number(context.req.param("page")))),
);

// Each item, which the phone queries by its path, answered with the
// component that draws it; and a like, a POST, answered with the new count.
app.get(itemPath(":id"), (context) =>
  screen(context, itemFor(context.req.param("id"))),
);
app.post(likesPath(":id"), (context) =>
  screen(context, likeFor(context.req.param("id"))),
);

// An item's comments, and a new one, a POST to the same path.
app.get(commentsPath(":id"), (context) =>
  screen(context, commentsFor(context.req.param("id"))),
);
app.post(commentsPath(":id"), async (context) => {
  const { text } = await context.req.json<{ text: string }>();
  return screen(context, commentFor(context.req.param("id"), text));
});

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, draws its screen again.
if (process.env.NODE_ENV === "development") {
  const run = crypto.randomUUID();
  app.get("/live", (context) => context.text(run));
}

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});
