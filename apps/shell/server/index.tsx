import { backtick } from "@backtickjs/hono";
import { Hono } from "hono";
import { Home } from "./Home.js";
import { SignIn } from "./SignIn.js";
import { Source } from "./Source.js";

// Backtick's own screens, sign-in's included, served at app.backtickjs.com.
// A token is the user's, checked by Supabase, which reads their apps as them.
export const app = new Hono<{ Variables: { authorization: string } }>();

app.use(backtick());

// Nothing of anyone's without a token: a phone without a session gets
// sign-in, whatever it asked for. Every route after this has the token.
app.use(async (context, next) => {
  const authorization = context.req.header("authorization");
  if (authorization === undefined) {
    return context.render(<SignIn />);
  }
  context.set("authorization", authorization);
  await next();
});

// The user's apps.
app.get("/", (context) =>
  context.render(<Home authorization={context.var.authorization} />),
);

// An app's source, from its ⋯ sheet.
app.get("/source/:id", (context) =>
  context.render(
    <Source
      authorization={context.var.authorization}
      id={context.req.param("id")}
    />,
  ),
);

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});
