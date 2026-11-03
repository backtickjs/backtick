// app.backtickjs.com's Vercel Function: Backtick's own screens on the phone,
// the shell's server (`shell/screens`), at their own paths; and what lets only
// the Backtick app receive its sign-in, at `/signed-in`.
import { Hono } from "hono";
import { app as screens } from "shell/screens";

const app = new Hono();

// The Backtick app's sign-in returns here. These say which app may open it:
// iOS's associated domains, for the universal link and the sign-in browser's
// HTTPS callback (`APPLE_TEAM_ID` names the team the app is signed by), and
// Android's Digital Asset Links, for the verified App Link and Auth Tab.
app.get("/.well-known/apple-app-site-association", (c) => {
  const team = process.env.APPLE_TEAM_ID;
  if (team === undefined) {
    return c.notFound();
  }
  const apps = [`${team}.com.backtickjs.app`];
  return c.json({
    applinks: {
      details: [{ appIDs: apps, components: [{ "/": "/signed-in" }] }],
    },
    webcredentials: { apps },
  });
});

// The Backtick app, signed by EAS. Only builds EAS signs can open these links.
app.get("/.well-known/assetlinks.json", (c) =>
  c.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.backtickjs.app",
        sha256_cert_fingerprints: [
          "89:AF:4E:D2:72:B6:B5:EF:49:4A:28:14:66:52:C7:18:70:EA:D7:C8:4C:C6:27:41:6E:C0:EA:C4:48:47:4C:B7",
        ],
      },
    },
  ]),
);

// What a browser sees when no app took the link: the code in its address is
// dropped first (a redirect to the same page without it), and the page keeps
// nothing, refers nowhere and loads nothing from anyone else.
app.get("/signed-in", (c) => {
  const headers = {
    "cache-control": "no-store",
    "referrer-policy": "no-referrer",
    "content-security-policy":
      "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'",
  };
  if (new URL(c.req.url).search !== "") {
    return c.body(null, 303, { ...headers, location: "/signed-in" });
  }
  return c.html(
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Backtick</title>
<style>body{font:17px system-ui,sans-serif;margin:0;padding:48px 24px;color:#17201b;background:#f3f5f2}</style>
</head>
<body><p>Open Backtick on this phone to finish signing in.</p></body>
</html>`,
    200,
    headers,
  );
});

app.route("/", screens);

export default app;
