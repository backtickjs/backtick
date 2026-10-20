// The page Supabase's OAuth server sends a user to when a host asks to connect:
// sign in with Google if needed, then allow or deny the host. Supabase adds
// `authorization_id` to its URL.
export function consentPage(): string {
  // Public values, written into a script: `<` escaped so they can't end it.
  const config = JSON.stringify({
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_PUBLISHABLE_KEY,
  }).replaceAll("<", "\\u003c");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Connect to Backtick</title>
<style>
  :root { color-scheme: light dark; --fg: #17201b; --muted: #64706a; --bg: #f3f5f2; --card: #fff; --accent: #1f7a55; }
  @media (prefers-color-scheme: dark) { :root { --fg: #eaf0ec; --muted: #94a39b; --bg: #0f1412; --card: #18201c; --accent: #3dbe86; } }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: var(--bg); color: var(--fg); font: 16px/1.5 system-ui, sans-serif; }
  main { width: min(100% - 32px, 400px); background: var(--card); border-radius: 12px; padding: 24px; }
  h1 { font-size: 20px; margin: 0 0 8px; }
  p { margin: 0 0 16px; color: var(--muted); }
  .buttons { display: flex; gap: 8px; }
  button { flex: 1; padding: 12px; border-radius: 8px; border: 1px solid var(--muted); background: none; color: var(--fg); font: inherit; cursor: pointer; }
  button.allow { background: var(--accent); border-color: var(--accent); color: #fff; }
  [hidden] { display: none; }
</style>
</head>
<body>
<main>
  <h1>Connect to Backtick</h1>
  <p id="message">Loading…</p>
  <div class="buttons" id="buttons" hidden>
    <button id="deny">Deny</button>
    <button class="allow" id="allow">Allow</button>
  </div>
</main>
<script type="module">
  import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/+esm";
  const config = ${config};
  const supabase = createClient(config.url, config.key);
  const id = new URLSearchParams(location.search).get("authorization_id");
  const message = document.getElementById("message");

  async function consent() {
    if (id === null) {
      message.textContent = "Open this page from an app that's connecting to Backtick.";
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    if (session === null) {
      // Back to this page, signed in, with the same authorization_id.
      await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.href } });
      return;
    }
    const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(id);
    if (error) {
      message.textContent = error.message;
      return;
    }
    // Allowed before: Supabase already has the answer.
    if (!("authorization_id" in data)) {
      location.href = data.redirect_url;
      return;
    }
    message.textContent = (data.client.name || "An app") + " wants to make and change apps in your Backtick account, " + data.user.email + ".";
    document.getElementById("buttons").hidden = false;
    for (const [button, decide] of [["allow", "approveAuthorization"], ["deny", "denyAuthorization"]]) {
      document.getElementById(button).onclick = async () => {
        const { error } = await supabase.auth.oauth[decide](id);
        if (error) message.textContent = error.message;
      };
    }
  }
  consent().catch((error) => (message.textContent = error.message));
</script>
</body>
</html>`;
}
