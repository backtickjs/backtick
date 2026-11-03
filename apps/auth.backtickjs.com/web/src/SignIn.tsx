// The Backtick app's email sign-in, in the system's sign-in browser: an
// existing account's email and password (App Review's). Apple and Google are
// the app's own buttons, which skip this page. The URL is the app's OAuth
// authorization request; /authorize checked it before serving the page. The
// form takes that request back to this server, which signs in with Supabase
// there: nothing of a session is ever in this page.
import { cs } from "@backtickjs/core";

export const SignIn = cs`() => {
  const query = new URLSearchParams(window.location.search);
  const error = query.get("error");
  query.delete("error");
  const message =
    error === "password-account"
      ? "This email can't sign in with a password. Use Apple or Google in the Backtick app."
      : error === "password"
        ? "That email and password didn't work."
        : "";

  return (
    <main>
      <img class="wordmark" src="/wordmark.svg" alt="Backtick" />
      <h1>Sign in with email</h1>
      {message ? <p class="message">{message}</p> : null}
      <form method="post" action="/authorize/password">
        {[...query].map(([name, value]) => (
          <input type="hidden" name={name} value={value} />
        ))}
        <input
          type="email"
          name="email"
          autocomplete="username"
          placeholder="Email"
          autofocus
          required
        />
        <input
          type="password"
          name="password"
          autocomplete="current-password"
          placeholder="Password"
          required
        />
        <button class="pill solid" type="submit">Sign in</button>
      </form>
    </main>
  );
}`;
