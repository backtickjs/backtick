// The Backtick app's sign-in, in the system's sign-in browser: Apple, Google,
// or an existing account's email and password (App Review's). The URL is the
// app's OAuth authorization request; /authorize checked it before serving the
// page. Each choice takes that request back to this server, which signs in
// with Supabase there: nothing of a session is ever in this page.
import { cs } from "@backtickjs/core";

export const SignIn = cs`() => {
  const query = new URLSearchParams(window.location.search);
  const error = query.get("error");
  query.delete("error");
  const request = query.toString();
  const message =
    error === "password-account"
      ? "Sign in with Apple or Google."
      : error === "password"
        ? "That email and password didn't work."
        : error === "sign-in"
          ? "Signing in didn't finish. Try again."
          : "";

  return (
    <main>
      <h1>Sign in to Backtick</h1>
      {message ? <p>{message}</p> : null}
      <div class="buttons stacked">
        <a class="button allow" href={"/authorize/apple?" + request}>
          Sign in with Apple
        </a>
        <a class="button" href={"/authorize/google?" + request}>
          Sign in with Google
        </a>
      </div>
      <form class="email" method="post" action="/authorize/password">
        {[...query].map(([name, value]) => (
          <input type="hidden" name={name} value={value} />
        ))}
        <input type="email" name="email" autocomplete="username" placeholder="Email" required />
        <input
          type="password"
          name="password"
          autocomplete="current-password"
          placeholder="Password"
          required
        />
        <button type="submit">Sign in with email</button>
      </form>
    </main>
  );
}`;
