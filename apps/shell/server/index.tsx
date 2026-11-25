import { cs } from "@backtickjs/core";
import { BundlerError, render } from "@backtickjs/bundler";
import { Hono } from "hono";
import {
  chooseAssistant,
  connectionsOf,
  deleteAccount,
  disconnectAssistant,
  failed,
  supabase,
  userOf,
} from "./account.js";
import { Home } from "./screens/Home.js";
import { isAssistant } from "./components/assistants.js";
import { Assistants } from "./screens/Assistants.js";
import { HomeNavigator } from "./screens/navigator.js";
import { SignIn } from "./screens/SignIn.js";
import { Source } from "./screens/Source.js";

export { eraseDeletedApps } from "./account.js";

// Backtick's own screens, sign-in's included, served at app.backtickjs.com,
// for the user the phone's access token names.
export const app = new Hono<{ Variables: { user: string } }>();

// Nothing of anyone's without a token for this origin: a phone without a
// session gets sign-in for a screen, and a 401 for anything else, so a delete
// or an upload never looks done when it wasn't. Every route after this has
// the user.
app.use(async (context, next) => {
  const user = await userOf(context.req.header("authorization"));
  if (user === undefined) {
    return context.req.method === "GET"
      ? render(context.req.raw, <SignIn />)
      : context.json({ error: "invalid_token" }, 401);
  }
  context.set("user", user);
  await next();
});

// The home as the phone opens it: its stack of screens.
app.get("/", (context) => {
  const origin = new URL(context.req.url).origin;
  return render(context.req.raw, cs`<$HomeNavigator origin={$origin} />`);
});

// The user's apps.
app.get("/apps", (context) =>
  render(
    context.req.raw,
    <Home
      user={context.var.user}
      modules={context.req.header("x-backtick-modules") ?? "{}"}
    />,
  ),
);

// The assistants the user connected, and their default, from the account
// sheet.
app.get("/assistants", (context) =>
  render(context.req.raw, <Assistants user={context.var.user} />),
);

// Choosing the assistant New and Edit open, from the Assistants screen: one
// that's connected. A POST, so no link can do it.
app.post("/assistants/:assistant/choose", async (context) => {
  const assistant = context.req.param("assistant");
  if (!isAssistant(assistant)) {
    return context.notFound();
  }
  const { connected } = await connectionsOf(context.var.user);
  if (!connected.includes(assistant)) {
    return context.json({ error: "not_connected" }, 409);
  }
  await chooseAssistant(context.var.user, assistant);
  return context.json({ chosen: true });
});

// Disconnecting an assistant, from the Assistants screen once the user
// confirms: Backtick stops answering it. A POST, so no link can do it.
app.post("/assistants/:assistant/disconnect", async (context) => {
  const assistant = context.req.param("assistant");
  if (!isAssistant(assistant)) {
    return context.notFound();
  }
  await disconnectAssistant(context.var.user, assistant);
  return context.json({ disconnected: true });
});

// An app's source, from its ⋯ sheet.
app.get("/source/:id", (context) =>
  render(
    context.req.raw,
    <Source user={context.var.user} id={context.req.param("id")} />,
  ),
);

// Deleting one of the user's apps, from the home's own sheet: gone from
// Backtick at once, and erased with its preview after 30 days
// (`eraseDeletedApps`). A POST, so no link can do it.
app.post("/apps/:id/delete", async (context) => {
  const { data, error } = await supabase()
    .from("apps")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", context.req.param("id"))
    .eq("owner_id", context.var.user)
    .is("deleted_at", null)
    .select("id");
  if (error) {
    throw failed(error);
  }
  return context.json({ deleted: data.length > 0 });
});

// Deleting the user's account and everything Backtick keeps for it, now. A
// POST the shell makes itself once the user confirms in its own alert (the
// `delete-account` link), then signs the phone out.
app.post("/account/delete", async (context) => {
  await deleteAccount(context.var.user);
  return context.json({ deleted: true });
});

// An app's preview, captured on the phone a moment after it opens: kept in
// the user's own folder, for the app's card. Only for the user's own app.
app.post("/apps/:id/preview", async (context) => {
  const id = context.req.param("id");
  const owned = await supabase()
    .from("apps")
    .select("id")
    .eq("id", id)
    .eq("owner_id", context.var.user)
    .is("deleted_at", null)
    .maybeSingle();
  if (owned.error) {
    throw failed(owned.error);
  }
  const image = await context.req.arrayBuffer();
  if (owned.data === null || image.byteLength > 2_000_000) {
    return context.json({ saved: false }, 400);
  }
  const { error } = await supabase()
    .storage.from("previews")
    .upload(`${context.var.user}/${id}.jpg`, image, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) {
    throw failed(error);
  }
  return context.json({ saved: true });
});

// Answered rather than crashed on, so the app can show why: a bundle the
// phone can't run as the bundler's own 400 or 406.
app.onError((error, context) => {
  if (error instanceof BundlerError) {
    return error.getResponse();
  }
  console.error(error);
  return context.text("Something went wrong.", 500);
});
