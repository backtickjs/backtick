// The Backtick app's sign-in, in the system's sign-in browser: Apple, Google,
// or an existing account's email and password (App Review's). Signed in, the
// page trades its Supabase session for an authorization code, ends that
// session, and sends the code to the app, which redeems it with its PKCE
// verifier and DPoP key (docs/security-model.md). The URL is the app's OAuth
// authorization request; /authorize checked it before serving the page.
import { cs } from "@backtickjs/core";
import { createClient } from "@supabase/supabase-js" with {
  backtick: "client",
};
import { createSignal } from "solid-js" with { backtick: "client" };

export const SignIn = cs`(props: { url: string; publishableKey: string }) => {
  // This tab only, across the provider's redirect, and signed out once used.
  const supabase = $createClient(props.url, props.publishableKey, {
    auth: { flowType: "pkce", storage: window.sessionStorage },
  });
  // The app's request, without what Supabase's own sign-in adds on the way back.
  const query = new URLSearchParams(window.location.search);
  const request = Object.fromEntries(
    [
      "response_type",
      "client_id",
      "redirect_uri",
      "code_challenge",
      "code_challenge_method",
      "state",
      "dpop_jkt",
    ].map((name) => [name, query.get(name)]),
  );
  const [message, setMessage] = $createSignal("");
  const [busy, setBusy] = $createSignal(true);
  const [email, setEmail] = $createSignal("");
  const [password, setPassword] = $createSignal("");

  // Back from Apple or Google, or just signed in with email.
  async function finish() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session === null) {
      setBusy(false);
      return;
    }
    const response = await fetch("/authorize", {
      method: "POST",
      headers: {
        authorization: "Bearer " + session.access_token,
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const answer = await response.json();
    // The browser's session was only to prove who the user is: ended on
    // Supabase's side too.
    await supabase.auth.signOut({ scope: "local" });
    if (!response.ok) {
      setMessage(answer.error);
      setBusy(false);
      return;
    }
    setMessage("Signed in. Back to Backtick…");
    window.location.href = answer.redirect;
  }

  async function withProvider(provider: "apple" | "google") {
    setBusy(true);
    // Back to this page, with the same request.
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.href },
    });
    if (error) {
      setMessage(error.message);
      setBusy(false);
    }
  }

  async function withEmail(event: SubmitEvent) {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email(),
      password: password(),
    });
    if (error) {
      setMessage(error.message);
      setBusy(false);
      return;
    }
    await finish();
  }

  finish().catch((error: Error) => {
    setMessage(error.message);
    setBusy(false);
  });

  return (
    <main>
      <h1>Sign in to Backtick</h1>
      {message() ? <p>{message()}</p> : null}
      <div class="buttons stacked">
        <button class="allow" disabled={busy()} onClick={() => withProvider("apple")}>
          Sign in with Apple
        </button>
        <button disabled={busy()} onClick={() => withProvider("google")}>
          Sign in with Google
        </button>
      </div>
      <form class="email" onSubmit={withEmail}>
        <input
          type="email"
          autocomplete="username"
          placeholder="Email"
          value={email()}
          onInput={(event) => setEmail(event.currentTarget.value)}
        />
        <input
          type="password"
          autocomplete="current-password"
          placeholder="Password"
          value={password()}
          onInput={(event) => setPassword(event.currentTarget.value)}
        />
        <button type="submit" disabled={busy()}>
          Sign in with email
        </button>
      </form>
    </main>
  );
}`;
