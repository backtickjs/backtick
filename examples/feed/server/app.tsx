import { backtick } from "@backtickjs/hono";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Feed, pageFor } from "./Feed.js";
import { commentFor, commentsFor, itemFor, likeFor } from "./Item.js";
import { commentsPath, itemPath, likesPath, pagePath } from "./paths.js";

export const app = new Hono();

// `npm run web` serves the app from another origin.
app.use(
  cors({ origin: "*", allowHeaders: ["x-backtick-modules", "content-type"] }),
);

// `context.render(value)` answers with it, bundled for the app.
app.use(backtick());

// The feed, and its pages, which know their items' paths only.
app.get("/", (context) => context.render(<Feed />));
app.get(pagePath(":page"), (context) =>
  context.render(pageFor(Number(context.req.param("page")))),
);

// Each item, which the phone queries by its path, answered with the
// component that draws it; and a like, a POST, answered with the new count.
app.get(itemPath(":id"), (context) =>
  context.render(itemFor(context.req.param("id"))),
);
app.post(likesPath(":id"), (context) =>
  context.render(likeFor(context.req.param("id"))),
);

// An item's comments, and a new one, a POST to the same path.
app.get(commentsPath(":id"), (context) =>
  context.render(commentsFor(context.req.param("id"))),
);
app.post(commentsPath(":id"), async (context) => {
  const { text } = await context.req.json<{ text: string }>();
  return context.render(commentFor(context.req.param("id"), text));
});

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});
