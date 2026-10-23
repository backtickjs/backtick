import { Hono } from "hono";
import { Home } from "./Home.js";
import { screen } from "./screen.js";
import { SignIn } from "./SignIn.js";

// Backtick's own screens, sign-in's included. backtickjs.app serves them at
// its root, and turns away a token that doesn't check out, so one that
// arrives is the user's.
export const app = new Hono();

// The user's apps, or sign-in for a phone without a session: nothing of
// anyone's without a token.
app.get("/", (context) => {
  const authorization = context.req.header("authorization");
  return authorization === undefined
    ? screen(context, <SignIn />)
    : screen(context, <Home authorization={authorization} />);
});
