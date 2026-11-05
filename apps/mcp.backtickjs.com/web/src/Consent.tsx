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
  const [step, setStep] = $createSignal<"loading" | "sign-in" | "email" | "code" | "asking">(
    "loading",
  );
  const [email, setEmail] = $createSignal("");
  // Who's signed in on this page, beside the way to switch.
  const [account, setAccount] = $createSignal("");
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
        " wants to see, build and edit apps in your Backtick account.",
    );
    setAccount(data.user.email);
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
          <p class="lede">Sign in with the account you use in the Backtick app.</p>
          {error() ? <p class="message">{error()}</p> : null}
          <button class="pill solid" onClick={() => withProvider("google")}>
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>
          <button class="pill solid" onClick={() => withProvider("apple")}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.05 12.54c-.03-2.78 2.27-4.12 2.37-4.18-1.29-1.89-3.3-2.15-4.02-2.18-1.71-.17-3.34 1.01-4.21 1.01-.87 0-2.21-.98-3.63-.96-1.87.03-3.59 1.09-4.55 2.76-1.94 3.37-.5 8.35 1.39 11.08.92 1.34 2.03 2.84 3.47 2.78 1.39-.06 1.92-.9 3.6-.9 1.68 0 2.15.9 3.62.87 1.5-.03 2.45-1.36 3.36-2.71 1.06-1.55 1.5-3.06 1.52-3.14-.03-.01-2.92-1.12-2.95-4.45zM14.3 4.38c.77-.93 1.29-2.22 1.15-3.51-1.11.05-2.45.74-3.25 1.67-.71.82-1.34 2.14-1.17 3.4 1.24.1 2.5-.63 3.27-1.56z" />
            </svg>
            Continue with Apple
          </button>
          <button class="pill" onClick={() => setStep("email")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
            </svg>
            Continue with email
          </button>
        </>
      ) : step() === "email" ? (
        <>
          <h1>Continue with email</h1>
          <p class="lede">We'll email you a code to sign in. New here? This makes your account.</p>
          {error() ? <p class="message">{error()}</p> : null}
          <form onSubmit={sendCode}>
            <input
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              autofocus
              required
              value={email()}
              onInput={(event) => setEmail(event.currentTarget.value)}
            />
            <button class="pill solid" type="submit">
              Send code
            </button>
          </form>
          <button class="other" onClick={() => setStep("sign-in")}>
            Other ways to sign in
          </button>
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
          <button class="other" onClick={() => setStep("email")}>
            Use a different email
          </button>
        </>
      ) : step() === "asking" ? (
        <>
          <p class="lede">{message()}</p>
          {error() ? <p class="message">{error()}</p> : null}
          <button class="pill solid" onClick={() => decide(true)}>
            Allow
          </button>
          <button class="pill" onClick={() => decide(false)}>
            Deny
          </button>
          <button class="other" onClick={switchAccount}>
            Not {account()}? Use a different account
          </button>
        </>
      ) : (
        <>
          <p class="lede">{message()}</p>
          {error() ? <p class="message">{error()}</p> : null}
        </>
      )}
    </main>
  );
}`;
