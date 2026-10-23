import { Hono } from "hono";
import { Home } from "./Home.js";
import { screen } from "./screen.js";
import { SignIn } from "./SignIn.js";

// Backtick's own screens, sign-in's included, served at app.backtickjs.com.
// A token is the user's, checked by Supabase, which reads their apps as them.
export const app = new Hono();

// The user's apps, or sign-in for a phone without a session: nothing of
// anyone's without a token.
app.get("/", (context) => {
  const authorization = context.req.header("authorization");
  return authorization === undefined
    ? screen(context, <SignIn />)
    : screen(context, <Home authorization={authorization} />);
});

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text(String(error), 500);
});
