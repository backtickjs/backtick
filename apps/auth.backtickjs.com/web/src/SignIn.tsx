// The Backtick app's email sign-in, in the system's sign-in browser: an
// email, then the six-digit code sent to it. Apple and Google are the app's
// own buttons, which skip this page. The URL is the app's OAuth authorization
// request; /authorize checked it before serving the page. Each form takes
// that request back to this server, which signs in with Supabase there:
// nothing of a session is ever in this page.
import { cs } from "@backtickjs/core";

export const SignIn = cs`() => {
  const query = new URLSearchParams(window.location.search);
  const error = query.get("error");
  const step = query.get("step");
  query.delete("error");
  query.delete("step");
  const messages: Record<string, string> = {
    email: "That doesn't look like an email address.",
    send: "Couldn't send a code just now. Try again in a minute.",
    code: "That code didn't work. Check it, or ask for a new one.",
    expired: "That code expired. Ask for a new one.",
  };
  const message = error === null ? "" : (messages[error] ?? "");
  // A function, so each form gets inputs of its own: a Solid node placed
  // twice moves.
  const request = () =>
    [...query].map(([name, value]) => (
      <input type="hidden" name={name} value={value} />
    ));

  return (
    <main>
      <img class="wordmark" src="/wordmark.svg" alt="Backtick" />
      {step === "code" ? (
        <>
          <h1>Check your email</h1>
          <p class="lede">Enter the six-digit code we sent you.</p>
          {message ? <p class="message">{message}</p> : null}
          <form method="post" action="/authorize/code">
            {request()}
            <input
              class="code"
              type="text"
              name="code"
              inputmode="numeric"
              autocomplete="one-time-code"
              pattern="[0-9 ]*"
              maxlength="7"
              placeholder="000000"
              autofocus
              required
            />
            <button class="pill solid" type="submit">Continue</button>
          </form>
          <a class="other" href={"/authorize?" + query}>Use a different email</a>
        </>
      ) : (
        <>
          <h1>Continue with email</h1>
          <p class="lede">We'll email you a code to sign in. New here? This makes your account.</p>
          {message ? <p class="message">{message}</p> : null}
          <form method="post" action="/authorize/email">
            {request()}
            <input
              type="email"
              name="email"
              autocomplete="email"
              placeholder="you@example.com"
              autofocus
              required
            />
            <button class="pill solid" type="submit">Send code</button>
          </form>
        </>
      )}
    </main>
  );
}`;
