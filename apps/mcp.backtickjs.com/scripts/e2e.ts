// The whole flow against a deployment, signed in as the test user: the tools a
// host calls, then the screens a phone fetches. Each step is checked, and the
// script exits 1 if any fails. Run it after a release and after a deploy:
// `node --env-file=.env.local scripts/e2e.ts`, with BASE to point elsewhere.
// The test user keeps one app, "E2E", saved again on every run.
// The phone's half needs auth.backtickjs.com's signing key (BACKTICK_SIGNING_JWK,
// as Vercel has it) to make the phone's tokens; without it, it's skipped.
import { join } from "node:path";
import { importJWK, SignJWT, type JWK } from "jose";
import { installedPackages } from "@backtickjs/core/node";
import { modules } from "shell/modules";
import { starter } from "../src/function/starter.ts";
import { testUser } from "./testUser.ts";

const base = process.env.BASE ?? "https://mcp.backtickjs.com";
const auth = "https://auth.backtickjs.com";
const { token, id: user } = await testUser();
// What the phone sends: each of its modules at its package's version, which
// the sandbox installs too.
const installed = installedPackages(join(import.meta.dirname, "../sandbox"));
const packageOf = (specifier: string) =>
  specifier
    .split("/")
    .slice(0, specifier.startsWith("@") ? 2 : 1)
    .join("/");
const phone = Object.fromEntries(
  modules.map((specifier) => [specifier, installed[packageOf(specifier)]!]),
);

let failures = 0;
function check(what: string, ok: boolean, detail: string) {
  console.log(`${ok ? "ok  " : "FAIL"} ${what}: ${detail}`);
  if (!ok) failures++;
}

async function call(name: string, args: object) {
  const started = performance.now();
  const response = await fetch(`${base}/`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      "mcp-protocol-version": "2025-06-18",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  const body = await response.text();
  const data = body.split("\n").find((line) => line.startsWith("data: "));
  const { result } = JSON.parse(data ? data.slice(6) : body);
  const text: string = result.content[0].text;
  const ms = Math.round(performance.now() - started);
  return { error: result.isError === true, text, ms };
}

// A tool call that should succeed, or fail with `expected` in its message.
async function tool(
  what: string,
  name: string,
  args: object,
  expected?: string,
) {
  const result = await call(name, args);
  const ok =
    expected === undefined
      ? !result.error
      : result.error && result.text.includes(expected);
  check(
    what,
    ok,
    `${result.ms} ms, ${result.text.split("\n")[0].slice(0, 100)}`,
  );
  return result.text;
}

// The phone's token for one origin, as auth.backtickjs.com mints it.
const signingKey = process.env.BACKTICK_SIGNING_JWK;
async function phoneToken(origin: string) {
  const jwk = JSON.parse(signingKey!) as JWK;
  return new SignJWT({ client_id: "backtick-app" })
    .setProtectedHeader({ alg: "ES256", kid: jwk.kid, typ: "at+jwt" })
    .setIssuer(auth)
    .setSubject(user)
    .setAudience(origin)
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(await importJWK(jwk, "ES256"));
}

// A fetch as the phone makes it, through the app's own host.
async function open(
  what: string,
  app: string,
  path: string,
  status: number,
  options: { modules?: object; signed?: boolean } = {},
) {
  const origin = `https://${app}.backtickjs.app`;
  const started = performance.now();
  const response = await fetch(origin + path, {
    headers: {
      ...(options.signed === false
        ? {}
        : { authorization: `Bearer ${await phoneToken(origin)}` }),
      "x-backtick-modules": JSON.stringify(options.modules ?? phone),
    },
  });
  const body = await response.text();
  const ms = Math.round(performance.now() - started);
  check(
    what,
    response.status === status,
    `${path} ${response.status} (want ${status}), ${ms} ms, version ${response.headers.get("x-backtick-version")}, ${body.slice(0, 60).replace(/\n/g, " ")}`,
  );
}

// The tools. The test user's one app, made on the first run.
const listed = JSON.parse(await tool("list_apps", "list_apps", {})) as {
  id: string;
  title: string;
}[];
const id =
  listed.find((app) => app.title === "E2E")?.id ??
  (
    JSON.parse((await tool("new_app", "new_app", {})).split("\n")[0]) as {
      id: string;
    }
  ).id;
const broken = starter.replace("$useState(false)", '$useState<boolean>("no")');
check(
  "a type error to save",
  broken !== starter,
  "the starter still has $useState(false)",
);
await tool(
  "save_app refuses a type error",
  "save_app",
  { id, title: "E2E", code: broken },
  "error",
);
await tool("save_app", "save_app", { id, title: "E2E", code: starter });
const got = await tool("get_app", "get_app", { id });
check(
  "get_app is the starter",
  got.includes("const CookedButton"),
  "has CookedButton",
);
await tool(
  "update_app refuses an edit with no match",
  "update_app",
  { id, edits: [{ old_str: "no such text", new_str: "" }] },
  "no match",
);
await tool(
  "update_app refuses a type error",
  "update_app",
  {
    id,
    edits: [
      { old_str: "$useState(false)", new_str: '$useState<boolean>("no")' },
    ],
  },
  "error",
);
await tool("update_app", "update_app", {
  id,
  edits: [{ old_str: '"Mark as cooked"', new_str: '"Mark as made"' }],
});

// The phone.
if (signingKey === undefined) {
  console.log("skip the phone's fetches: BACKTICK_SIGNING_JWK isn't set");
} else {
  await open("the runtime", id, "/.well-known/backtick/runtime", 200);
  await open("the root layout", id, "/_layout", 200);
  await open("the home", id, "/", 200);
  await open("a screen's layout", id, "/recipe/pancakes/_layout", 200);
  await open("a screen's loading state", id, "/recipe/:id/_loading", 200);
  await open("a screen", id, "/recipe/pancakes", 200);
  await open("a missing screen", id, "/recipe/nowhere", 404);
  await open("a phone without the modules", id, "/", 426, { modules: {} });
  await open("no token", id, "/", 401, { signed: false });
  await open(
    "an app that isn't there",
    "00000000-0000-4000-8000-000000000000",
    "/",
    404,
  );
}

console.log(failures === 0 ? "\nall passed" : `\n${failures} failed`);
process.exit(failures === 0 ? 0 : 1);
