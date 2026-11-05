// The page Supabase's OAuth server sends a user to when a host asks to connect:
// sign in if needed, as the Backtick app does (Apple, Google, or a code sent
// to an email), then allow or deny the host. Supabase adds `authorization_id`
// to its URL.
import { cs } from "@backtickjs/core";
import { createClient } from "@supabase/supabase-js" with {
  backtick: "client",
};
import { createSignal } from "solid-js" with { backtick: "client" };

export const Consent = cs`(props: { url: string; publishableKey: string }) => {
  const supabase = $createClient(props.url, props.publishableKey);
  const id = new URLSearchParams(window.location.search).get("authorization_id");
  const [message, setMessage] = $createSignal("Loading…");
  const [error, setError] = $createSignal("");
  const [step, setStep] = $createSignal<"loading" | "sign-in" | "code" | "asking">(
    "loading",
  );
  const [email, setEmail] = $createSignal("");
  const [code, setCode] = $createSignal("");

  async function consent() {
    if (id === null) {
      setMessage("Open this page from an app that's connecting to Backtick.");
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    if (session === null) {
      setStep("sign-in");
      return;
    }
    const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(id);
    if (error) {
      setError(error.message);
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
    setStep("asking");
  }

  // Back to this page, signed in, with the same authorization_id.
  async function withProvider(provider: "apple" | "google") {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.href },
    });
    if (error) {
      setError(error.message);
    }
  }

  async function sendCode(event: SubmitEvent) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email: email().trim(),
    });
    if (error) {
      setError("Couldn't send a code just now. Try again in a minute.");
      return;
    }
    setError("");
    setStep("code");
  }

  // The emailed code, or the review account's fixed one, which only the
  // server knows: it answers with a one-time sign-in for that account.
  async function checkCode(event: SubmitEvent) {
    event.preventDefault();
    const address = email().trim();
    const token = code().replace(/\s/g, "");
    const emailed = await supabase.auth.verifyOtp({
      email: address,
      token,
      type: "email",
    });
    if (emailed.error) {
      const answer = await fetch("/oauth/review-code", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: address, code: token }),
      });
      const review = answer.ok
        ? await supabase.auth.verifyOtp({
            token_hash: (await answer.json()).tokenHash,
            type: "email",
          })
        : undefined;
      if (review === undefined || review.error) {
        setError("That code didn't work. Check it, or ask for a new one.");
        return;
      }
    }
    setError("");
    setStep("loading");
    await consent();
  }

  // Signed out on this page only, back to the sign-in options: for someone
  // signed in here with another account before.
  async function switchAccount() {
    await supabase.auth.signOut({ scope: "local" });
    setError("");
    setStep("sign-in");
  }

  async function decide(allow: boolean) {
    const { error } = allow
      ? await supabase.auth.oauth.approveAuthorization(id!)
      : await supabase.auth.oauth.denyAuthorization(id!);
    if (error) {
      setError(error.message);
    }
  }

  consent().catch((failure: Error) => setError(failure.message));

  return (
    <main>
      <img class="wordmark" src="/wordmark.svg" alt="Backtick" />
      {step() === "sign-in" ? (
        <>
          <h1>Connect to Backtick</h1>
          <p class="lede">Sign in with the account you use in the Backtick app.</p>
          {error() ? <p class="message">{error()}</p> : null}
          <button class="pill" onClick={() => withProvider("apple")}>
            Continue with Apple
          </button>
          <button class="pill" onClick={() => withProvider("google")}>
            Continue with Google
          </button>
          <p class="or">or</p>
          <form onSubmit={sendCode}>
            <input
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              required
              value={email()}
              onInput={(event) => setEmail(event.currentTarget.value)}
            />
            <button class="pill solid" type="submit">
              Continue with email
            </button>
          </form>
        </>
      ) : step() === "code" ? (
        <>
          <h1>Check your email</h1>
          <p class="lede">Enter the six-digit code we sent to {email().trim()}.</p>
          {error() ? <p class="message">{error()}</p> : null}
          <form onSubmit={checkCode}>
            <input
              class="code"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="7"
              placeholder="000000"
              required
              value={code()}
              onInput={(event) => setCode(event.currentTarget.value)}
            />
            <button class="pill solid" type="submit">
              Continue
            </button>
          </form>
          <button class="other" onClick={() => setStep("sign-in")}>
            Use a different email
          </button>
        </>
      ) : step() === "asking" ? (
        <>
          <h1>Connect to Backtick</h1>
          <p class="lede">{message()}</p>
          {error() ? <p class="message">{error()}</p> : null}
          <button class="pill solid" onClick={() => decide(true)}>
            Allow
          </button>
          <button class="pill" onClick={() => decide(false)}>
            Deny
          </button>
          <button class="other" onClick={switchAccount}>
            Use a different account
          </button>
        </>
      ) : (
        <>
          <h1>Connect to Backtick</h1>
          <p class="lede">{message()}</p>
          {error() ? <p class="message">{error()}</p> : null}
        </>
      )}
    </main>
  );
}`;
