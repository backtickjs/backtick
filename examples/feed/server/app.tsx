import { render } from "@backtickjs/bundler";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Feed, pageFor } from "./Feed.js";
import { commentFor, commentsFor, itemFor, likeFor } from "./Item.js";
import { commentsPath, itemPath, likesPath, pagePath } from "./paths.js";

export const app = new Hono();

// `npm run web` serves the app from another origin.
app.use(
  cors({
    origin: "*",
    allowHeaders: ["x-backtick-modules", "content-type"],
  }),
);

// The feed, and its pages, which know their items' paths only.
app.get("/", (context) => render(context.req.raw, <Feed />));
app.get(pagePath(":page"), (context) =>
  render(context.req.raw, pageFor(Number(context.req.param("page")))),
);

// Each item, which the phone queries by its path, answered with the
// component that draws it; and a like, a POST, answered with the new count.
app.get(itemPath(":id"), (context) =>
  render(context.req.raw, itemFor(context.req.param("id"))),
);
app.post(likesPath(":id"), (context) =>
  render(context.req.raw, likeFor(context.req.param("id"))),
);

// An item's comments, and a new one, a POST to the same path.
app.get(commentsPath(":id"), (context) =>
  render(context.req.raw, commentsFor(context.req.param("id"))),
);
app.post(commentsPath(":id"), async (context) => {
  const { text } = await context.req.json<{ text: string }>();
  return render(context.req.raw, commentFor(context.req.param("id"), text));
});

// A screen the app can't run answers itself (406); anything else is a 500.
app.onError((error, context) => {
  if ("getResponse" in error) {
    return error.getResponse();
  }
  console.error(error);
  return context.text(String(error), 500);
});
