import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";

process.env.SUPABASE_URL = "https://project.supabase.co";
process.env.SUPABASE_PUBLISHABLE_KEY = "publishable";
process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
process.env.BACKTICK_DPOP_NONCE_SECRET = "nonce secret";
process.env.BACKTICK_REVIEW_EMAIL = "review-k7q2m9@example.com";
process.env.BACKTICK_REVIEW_CODE = "246810";
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
function supabase(answers: { token?: number; otp?: number } = {}) {
  mock.restoreAll();
  const calls: { url: string; body?: unknown; headers: Headers }[] = [];
  mock.method(globalThis, "fetch", async (url: string, init?: RequestInit) => {
    const body =
      typeof init?.body === "string" ? JSON.parse(init.body) : undefined;
    calls.push({ url: String(url), body, headers: new Headers(init?.headers) });
    if (String(url).includes("/auth/v1/admin/generate_link")) {
      return Response.json({ id: user, action_link: "unused" });
    }
    if (String(url).includes("/auth/v1/otp")) {
      return new Response("{}", { status: answers.otp ?? 200 });
    }
    if (
      String(url).includes("/auth/v1/token") ||
      String(url).includes("/auth/v1/verify")
    ) {
      return (answers.token ?? 200) === 200
        ? Response.json({
            access_token: "supabase session",
            user: { id: user },
          })
        : Response.json({ error: "invalid_grant" }, { status: 400 });
    }
    if (String(url).includes("/auth/v1/settings")) {
      return Response.json({ external: { apple: false, google: true } });
    }
    if (String(url).includes("/auth/v1/logout")) {
      return new Response(null, { status: 204 });
    }
    return new Response(null, { status: 201 });
  });
  return calls;
}

async function startGoogle() {
  supabase();
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

  it("tells the app, not the user, when a provider is off in Supabase", async () => {
    supabase();
    const answer = await app.request(`${host}/authorize/apple?${query}`);
    assert.equal(answer.status, 303);
    const to = new URL(answer.headers.get("location")!);
    assert.equal(
      to.origin + to.pathname,
      "https://app.backtickjs.com/signed-in",
    );
    assert.equal(to.searchParams.get("error"), "temporarily_unavailable");
    assert.equal(to.searchParams.get("state"), request.state);
    assert.equal(answer.headers.get("set-cookie"), null);
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

describe("signing in with an emailed code", () => {
  const post = (path: string, fields: Record<string, string>, cookie = "") =>
    app.request(`${host}${path}`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        cookie,
        "x-forwarded-for": "203.0.113.7",
      },
      body: new URLSearchParams({ ...request, ...fields }).toString(),
    });

  async function sent() {
    const calls = supabase();
    const answer = await post("/authorize/email", {
      email: " You@Example.com ",
    });
    const cookie = answer.headers.get("set-cookie")!.split(";")[0]!;
    return { answer, cookie, calls };
  }

  it("sends a code, keeping the address in the cookie, not the URL", async () => {
    const { answer, cookie, calls } = await sent();
    assert.equal(answer.status, 303);
    const to = new URL(answer.headers.get("location")!, host);
    assert.equal(to.pathname, "/authorize");
    assert.equal(to.searchParams.get("step"), "code");
    assert.equal(to.searchParams.get("state"), request.state);
    assert.doesNotMatch(to.href, /example\.com/i);
    assert.match(cookie, /^__Host-backtick-sign-in=/);
    const otp = calls.find((call) => call.url.endsWith("/auth/v1/otp"))!;
    assert.deepEqual(otp.body, { email: "you@example.com", create_user: true });
    assert.equal(otp.headers.get("sb-forwarded-for"), "203.0.113.7");
  });

  it("refuses what isn't an address, and says when Supabase won't send", async () => {
    const calls = supabase();
    const bad = await post("/authorize/email", { email: "nope" });
    assert.equal(
      new URL(bad.headers.get("location")!, host).searchParams.get("error"),
      "email",
    );
    assert.deepEqual(calls, []);
    supabase({ otp: 429 });
    const limited = await post("/authorize/email", { email: "a@b.co" });
    assert.equal(
      new URL(limited.headers.get("location")!, host).searchParams.get("error"),
      "send",
    );
  });

  it("gives the app its code for the right one", async () => {
    const { cookie } = await sent();
    const calls = supabase();
    const answer = await post("/authorize/code", { code: "123 456" }, cookie);
    assert.equal(answer.status, 303);
    const to = new URL(answer.headers.get("location")!);
    assert.equal(
      to.origin + to.pathname,
      "https://app.backtickjs.com/signed-in",
    );
    assert.match(to.searchParams.get("code")!, /^[A-Za-z0-9_-]{43}$/);
    const verify = calls.find((call) => call.url.endsWith("/auth/v1/verify"))!;
    assert.deepEqual(verify.body, {
      type: "email",
      email: "you@example.com",
      token: "123456",
    });
    assert.ok(calls.some((call) => call.url.includes("/auth/v1/logout")));
    assert.match(answer.headers.get("set-cookie")!, /Max-Age=0/);
  });

  it("stays on the code step for a wrong code", async () => {
    const { cookie } = await sent();
    supabase({ token: 400 });
    for (const code of ["000000", "abc"]) {
      const answer = await post("/authorize/code", { code }, cookie);
      const to = new URL(answer.headers.get("location")!, host);
      assert.equal(to.searchParams.get("step"), "code");
      assert.equal(to.searchParams.get("error"), "code");
    }
  });

  it("starts over without the cookie, or with another request's", async () => {
    const { cookie } = await sent();
    supabase();
    for (const [fields, withCookie] of [
      [{ code: "123456" }, ""],
      [{ code: "123456", state: "u".repeat(32) }, cookie],
    ] as const) {
      const answer = await post("/authorize/code", fields, withCookie);
      const to = new URL(answer.headers.get("location")!, host);
      assert.equal(to.searchParams.get("error"), "expired");
      assert.equal(to.searchParams.get("step"), null);
    }
  });

  it("keeps the email cookie out of a provider's callback", async () => {
    const { cookie } = await sent();
    const answer = await app.request(`${host}/authorize/callback?code=c`, {
      headers: { cookie },
    });
    assert.equal(answer.status, 400);
  });
});

describe("the review account", () => {
  const post = (path: string, fields: Record<string, string>, cookie = "") =>
    app.request(`${host}${path}`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", cookie },
      body: new URLSearchParams({ ...request, ...fields }).toString(),
    });

  async function started(email: string) {
    const calls = supabase();
    const answer = await post("/authorize/email", { email });
    return {
      calls,
      cookie: answer.headers.get("set-cookie")!.split(";")[0]!,
      answer,
    };
  }

  it("gets no email, and signs in with its fixed code", async () => {
    const { calls, cookie, answer } = await started(
      "Review-K7Q2M9@example.com",
    );
    assert.equal(
      new URL(answer.headers.get("location")!, host).searchParams.get("step"),
      "code",
    );
    assert.equal(calls.length, 0);
    const signedIn = await post("/authorize/code", { code: "246 810" }, cookie);
    const to = new URL(signedIn.headers.get("location")!);
    assert.equal(
      to.origin + to.pathname,
      "https://app.backtickjs.com/signed-in",
    );
    assert.ok(calls.some((call) => call.url.includes("/admin/generate_link")));
    assert.ok(!calls.some((call) => call.url.includes("/auth/v1/verify")));
  });

  it("refuses a wrong code, and the fixed code for anyone else", async () => {
    const review = await started("review-k7q2m9@example.com");
    const wrong = await post(
      "/authorize/code",
      { code: "246811" },
      review.cookie,
    );
    assert.equal(
      new URL(wrong.headers.get("location")!, host).searchParams.get("error"),
      "code",
    );
    // Anyone else's code is Supabase's to check, which refuses it.
    const other = await started("someone@example.com");
    const calls = supabase({ token: 400 });
    const borrowed = await post(
      "/authorize/code",
      { code: "246810" },
      other.cookie,
    );
    assert.equal(
      new URL(borrowed.headers.get("location")!, host).searchParams.get(
        "error",
      ),
      "code",
    );
    assert.ok(calls.some((call) => call.url.endsWith("/auth/v1/verify")));
    assert.ok(!calls.some((call) => call.url.includes("/admin/generate_link")));
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
