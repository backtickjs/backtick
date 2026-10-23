// The page Supabase's OAuth server sends a user to when a host asks to connect:
// sign in with Google if needed, then allow or deny the host. Supabase adds
// `authorization_id` to its URL.
import { cs } from "@backtickjs/core";
import { createClient } from "@supabase/supabase-js" with {
  backtick: "client",
};
import { createSignal } from "solid-js" with { backtick: "client" };

export const Consent = cs`(props: { url: string; publishableKey: string }) => {
  const supabase = $createClient(props.url, props.publishableKey);
  const id = new URLSearchParams(window.location.search).get("authorization_id");
  const [message, setMessage] = $createSignal("Loading…");
  const [asking, setAsking] = $createSignal(false);

  async function consent() {
    if (id === null) {
      setMessage("Open this page from an app that's connecting to Backtick.");
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    if (session === null) {
      // Back to this page, signed in, with the same authorization_id.
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.href },
      });
      return;
    }
    const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(id);
    if (error) {
      setMessage(error.message);
      return;
    }
    // Allowed before: Supabase already has the answer.
    if (!("authorization_id" in data)) {
      window.location.href = data.redirect_url;
      return;
    }
    setMessage(
      (data.client.name || "An app") +
        " wants to make and change apps in your Backtick account, " +
        data.user.email + ".",
    );
    setAsking(true);
  }

  async function decide(allow: boolean) {
    const { error } = allow
      ? await supabase.auth.oauth.approveAuthorization(id!)
      : await supabase.auth.oauth.denyAuthorization(id!);
    if (error) {
      setMessage(error.message);
    }
  }

  consent().catch((error: Error) => setMessage(error.message));

  return (
    <main>
      <h1>Connect to Backtick</h1>
      <p>{message()}</p>
      {asking() ? (
        <div class="buttons">
          <button onClick={() => decide(false)}>Deny</button>
          <button class="allow" onClick={() => decide(true)}>Allow</button>
        </div>
      ) : null}
    </main>
  );
}`;
