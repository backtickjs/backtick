import { cs } from "@backtickjs/core";
import { backtickApp } from "@backtickjs/hono";
import { Stack, unstable_useIsNavigating } from "expo-router" with {
  backtick: "client",
};
import { Hono } from "hono";
import { deleteAccount, failed, supabase, userOf } from "./account.js";
import { Home } from "./Home.js";
import { useColors } from "./look.js";
import { Progress } from "./Progress.js";
import { SignIn } from "./SignIn.js";
import { Source } from "./Source.js";

export { eraseDeletedApps } from "./account.js";

// Backtick's own screens, sign-in's included, served at app.backtickjs.com,
// for the user the phone's access token names.
export const app = new Hono<{ Variables: { user: string } }>();

// The home's root layout: a Stack without headers, on its paper, and a
// progress bar while a navigation waits for its screen.
const RootLayout = cs`() => {
  const colors = $useColors();
  const navigating = $unstable_useIsNavigating();
  return (
    <>
      <$Stack
        screenOptions={{
          title: "",
          headerShown: false,
          contentStyle: { backgroundColor: colors.paper },
          // No back gesture while a navigation holds: it would be undone.
          gestureEnabled: !navigating,
        }}
      />
      <$Progress color={colors.ink} />
    </>
  );
}`;

// The home as the phone opens it: signed out too, before the token check.
app.use(backtickApp(app, RootLayout));

// Nothing of anyone's without a token for this origin: a phone without a
// session gets sign-in, whatever it asked for. Every route after this has the
// user.
app.use(async (context, next) => {
  const user = await userOf(context.req.header("authorization"));
  if (user === undefined) {
    return context.render(<SignIn />);
  }
  context.set("user", user);
  await next();
});

// The user's apps.
app.get("/", (context) => context.render(<Home user={context.var.user} />));

// An app's source, from its ⋯ sheet.
app.get("/source/:id", (context) =>
  context.render(
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

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(error);
  return context.text("Something went wrong.", 500);
});
