// The whole flow against a deployment, signed in as the test user: the tools a
// host calls, then the screens a phone fetches.
// `node --env-file=.env.local scripts/e2e.ts`, with BASE to point elsewhere.
import { join } from "node:path";
import { installedPackages } from "@backtickjs/core/node";
import { modules } from "shell/modules";
import { starter } from "../src/function/starter.ts";
import { testUserToken } from "./testUser.ts";

const base = process.env.BASE ?? "https://api.backtickjs.com";
const token = await testUserToken();
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

async function call(name: string, args: object) {
  const started = performance.now();
  const response = await fetch(`${base}/mcp`, {
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
  console.log(
    `${name} ${ms} ms${result.isError ? " (error)" : ""}:`,
    text.split("\n")[0].slice(0, 110),
  );
  return text;
}

async function open(id: string, path: string, modules: object, auth = true) {
  const started = performance.now();
  // As the phone does: through the app's own host, at the screen's path.
  const response = await fetch(`https://${id}.backtickjs.app${path}`, {
    headers: {
      ...(auth ? { authorization: `Bearer ${token}` } : {}),
      "x-backtick-modules": JSON.stringify(modules),
    },
  });
  const body = await response.text();
  const ms = Math.round(performance.now() - started);
  console.log(
    `GET ${id}.backtickjs.app${path} ${response.status} ${ms} ms, version ${response.headers.get("x-backtick-version")}:`,
    body.slice(0, 90).replace(/\n/g, " "),
  );
}

const id = JSON.parse((await call("start_app", {})).split("\n")[0]).id;
await new Promise((resolve) => setTimeout(resolve, 8000));
await call("save_app", {
  id,
  title: "E2E counter",
  code: starter.replace("useState<number>(0)", 'useState<number>("zero")'),
});
await call("save_app", { id, title: "E2E counter", code: starter });
await call("get_app", { id });
await call("list_apps", {});
await call("update_app", { id, old_str: "no such text", new_str: "" });
await call("update_app", { id, old_str: "<$Text", new_str: "<$Text" });
await call("update_app", {
  id,
  old_str: "useState<number>(0)",
  new_str: 'useState<number>("zero")',
});
await call("update_app", { id, old_str: '" taps"', new_str: '" presses"' });
await open(id, "/", phone);
await open(id, "/", phone);
await open(id, "/day", phone);
await open(id, "/nowhere", phone);
await open(id, "/", {});
await open(id, "/", phone, false);
await open("00000000-0000-4000-8000-000000000000", "/", phone);
