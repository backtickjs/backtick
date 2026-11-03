import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";

process.env.SUPABASE_URL = "https://project.supabase.co";
process.env.SUPABASE_PUBLISHABLE_KEY = "publishable";
process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
process.env.BACKTICK_DPOP_NONCE_SECRET = "nonce secret";
process.env.BACKTICK_PASSWORD_ACCOUNTS = "review@example.com";
const { default: app } = await import("../src/index.ts");

const user = "6d1f0b2a-4c3e-4b5a-9e8d-7c6b5a4f3e2d";
const request = {
  response_type: "code",
  client_id: "backtick-app",
  redirect_uri: "https://app.backtickjs.com/signed-in",
  code_challenge: "c".repeat(43),
  code_challenge_method: "S256",
  state: "s".repeat(32),
  dpop_jkt: "k".repeat(43),
};
const query = new URLSearchParams(request).toString();
const host = "https://auth.backtickjs.com";

afterEach(() => mock.restoreAll());

// Supabase, standing in: Auth's token and logout endpoints, and the codes
// table. Each call is recorded.
function supabase(answers: { token?: number } = {}) {
  const calls: { url: string; body?: unknown; headers: Headers }[] = [];
  mock.method(globalThis, "fetch", async (url: string, init?: RequestInit) => {
    const body =
      typeof init?.body === "string" ? JSON.parse(init.body) : undefined;
    calls.push({ url: String(url), body, headers: new Headers(init?.headers) });
    if (String(url).includes("/auth/v1/token")) {
      return (answers.token ?? 200) === 200
        ? Response.json({
            access_token: "supabase session",
            user: { id: user },
          })
        : Response.json({ error: "invalid_grant" }, { status: 400 });
    }
    if (String(url).includes("/auth/v1/logout")) {
      return new Response(null, { status: 204 });
    }
    return new Response(null, { status: 201 });
  });
  return calls;
}

async function startGoogle() {
  const answer = await app.request(`${host}/authorize/google?${query}`);
  const cookie = answer.headers.get("set-cookie")!;
  return { answer, cookie: cookie.split(";")[0]! };
}

describe("signing in with a provider", () => {
  it("goes to Supabase's sign-in with PKCE, keeping the request in a cookie", async () => {
    const { answer, cookie } = await startGoogle();
    assert.equal(answer.status, 302);
    const to = new URL(answer.headers.get("location")!);
    assert.equal(
      to.origin + to.pathname,
      "https://project.supabase.co/auth/v1/authorize",
    );
    assert.equal(to.searchParams.get("provider"), "google");
    assert.equal(
      to.searchParams.get("redirect_to"),
      `${host}/authorize/callback`,
    );
    assert.equal(to.searchParams.get("code_challenge_method"), "s256");
    assert.match(to.searchParams.get("code_challenge")!, /^[A-Za-z0-9_-]{43}$/);
    const set = answer.headers.get("set-cookie")!;
    assert.match(cookie, /^__Host-backtick-sign-in=/);
    assert.match(set, /HttpOnly/);
    assert.match(set, /Secure/);
    assert.match(set, /SameSite=Lax/);
    assert.match(set, /Path=\//);
  });

  it("refuses a request that isn't the app's", async () => {
    for (const bad of [
      { ...request, client_id: "other" },
      { ...request, redirect_uri: "https://evil.example/signed-in" },
      { ...request, dpop_jkt: "" },
    ]) {
      const answer = await app.request(
        `${host}/authorize/google?${new URLSearchParams(bad)}`,
      );
      assert.equal(answer.status, 400);
    }
    const twice = await app.request(
      `${host}/authorize/google?${query}&state=${"t".repeat(32)}`,
    );
    assert.equal(twice.status, 400);
  });

  it("gives the app a code at its callback, and ends the Supabase session", async () => {
    const { cookie } = await startGoogle();
    const calls = supabase();
    const answer = await app.request(
      `${host}/authorize/callback?code=supabase-code`,
      {
        headers: { cookie },
      },
    );
    assert.equal(answer.status, 303);
    const to = new URL(answer.headers.get("location")!);
    assert.equal(
      to.origin + to.pathname,
      "https://app.backtickjs.com/signed-in",
    );
    assert.equal(to.searchParams.get("state"), request.state);
    assert.equal(to.searchParams.get("iss"), host);
    assert.match(to.searchParams.get("code")!, /^[A-Za-z0-9_-]{43}$/);
    const exchange = calls.find((call) =>
      call.url.includes("grant_type=pkce"),
    )!;
    assert.equal(
      (exchange.body as { auth_code: string }).auth_code,
      "supabase-code",
    );
    assert.ok(calls.some((call) => call.url.includes("/auth/v1/logout")));
    const saved = calls.find((call) =>
      call.url.includes("authorization_codes"),
    )!;
    assert.equal((saved.body as { user_id: string }).user_id, user);
    // Only the code's hash is kept.
    assert.notEqual(
      (saved.body as { code_hash: string }).code_hash,
      to.searchParams.get("code"),
    );
    // The cookie is gone.
    assert.match(answer.headers.get("set-cookie")!, /Max-Age=0/);
  });

  it("refuses a callback without its cookie, or with a changed one", async () => {
    const { cookie } = await startGoogle();
    const calls = supabase();
    const changed = cookie.slice(0, -2) + (cookie.endsWith("A") ? "BB" : "AA");
    for (const headers of [{}, { cookie: changed }] as Record<
      string,
      string
    >[]) {
      const answer = await app.request(`${host}/authorize/callback?code=c`, {
        headers,
      });
      assert.equal(answer.status, 400);
    }
    assert.deepEqual(calls, []);
  });

  it("tells the app when Supabase refuses the code, or the user said no", async () => {
    for (const [query, error] of [
      ["?code=c", "server_error"],
      ["?error=access_denied", "access_denied"],
    ] as const) {
      const { cookie } = await startGoogle();
      supabase({ token: 400 });
      const answer = await app.request(`${host}/authorize/callback${query}`, {
        headers: { cookie },
      });
      assert.equal(answer.status, 303);
      const to = new URL(answer.headers.get("location")!);
      assert.equal(
        to.origin + to.pathname,
        "https://app.backtickjs.com/signed-in",
      );
      assert.equal(to.searchParams.get("error"), error);
      assert.equal(to.searchParams.get("state"), request.state);
      assert.equal(to.searchParams.get("code"), null);
    }
  });
});

describe("Supabase's per-IP limits", () => {
  it("count the user's IP, sent with the secret key, not this server's", async () => {
    const { cookie } = await startGoogle();
    const calls = supabase();
    await app.request(`${host}/authorize/callback?code=c`, {
      headers: { cookie, "x-forwarded-for": "203.0.113.7, 10.0.0.1" },
    });
    for (const call of calls.filter((call) => call.url.includes("/auth/v1/"))) {
      assert.equal(
        call.headers.get("sb-forwarded-for"),
        "203.0.113.7",
        call.url,
      );
      assert.equal(call.headers.get("apikey"), "service", call.url);
    }
  });
});

describe("signing in with a password", () => {
  const form = (fields: Record<string, string>) =>
    app.request(`${host}/authorize/password`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ ...request, ...fields }).toString(),
    });

  it("is only for the listed accounts, which Supabase isn't even asked about", async () => {
    const calls = supabase();
    const answer = await form({ email: "someone@example.com", password: "p" });
    assert.equal(answer.status, 303);
    assert.equal(
      new URL(answer.headers.get("location")!, host).searchParams.get("error"),
      "password-account",
    );
    assert.deepEqual(calls, []);
  });

  it("gives a listed account the app's code", async () => {
    const calls = supabase();
    const answer = await form({ email: "Review@Example.com", password: "p" });
    assert.equal(answer.status, 303);
    assert.equal(
      new URL(answer.headers.get("location")!).origin,
      "https://app.backtickjs.com",
    );
    assert.ok(calls.some((call) => call.url.includes("grant_type=password")));
  });

  it("goes back to the page on a wrong password", async () => {
    supabase({ token: 400 });
    const answer = await form({
      email: "review@example.com",
      password: "wrong",
    });
    assert.equal(
      new URL(answer.headers.get("location")!, host).searchParams.get("error"),
      "password",
    );
  });
});

describe("a provider hint", () => {
  it("goes straight to that provider, with the same request", async () => {
    const answer = await app.request(
      `${host}/authorize?${query}&provider=google`,
    );
    assert.equal(answer.status, 302);
    const to = new URL(answer.headers.get("location")!, host);
    assert.equal(to.pathname, "/authorize/google");
    assert.deepEqual(Object.fromEntries(to.searchParams), request);
  });

  it("shows the page for a provider it doesn't know, and still checks the request", async () => {
    const unknown = await app.request(
      `${host}/authorize?${query}&provider=github`,
    );
    assert.equal(unknown.status, 200);
    assert.match(await unknown.text(), /sign-in\.js/);
    const bad = new URLSearchParams({ ...request, client_id: "other" });
    assert.equal(
      (await app.request(`${host}/authorize?${bad}&provider=google`)).status,
      400,
    );
  });
});

describe("the sign-in page", () => {
  it("allows only its own script, its import map, and its form's destinations", async () => {
    const answer = await app.request(`${host}/authorize?${query}`);
    assert.equal(answer.status, 200);
    const policy = answer.headers.get("content-security-policy")!;
    assert.match(policy, /default-src 'none'/);
    assert.match(policy, /script-src 'self'(;|$)/);
    assert.match(policy, /form-action 'self' https:\/\/app\.backtickjs\.com/);
    assert.match(policy, /frame-ancestors 'none'/);
    const html = await answer.text();
    assert.doesNotMatch(html, /cdn\.jsdelivr|supabase/i);
    assert.match(html, /<script type="module" src="\/sign-in\.js">/);
    // Nothing inline runs.
    assert.doesNotMatch(html, /<script(?![^>]*\ssrc=)[^>]*>/);
  });
});
