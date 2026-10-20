import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "node:test";
import { installedPackages } from "@backtickjs/core/node";

const root = join(import.meta.dirname, "..");
const starter = readFileSync(join(root, "starter/App.tsx"), "utf8");
const installed = installedPackages(root);
const phone = {
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
};

function write(name: string, source: string): string {
  const dir = join(root, ".builds", "test", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "App.tsx"), source);
  return join(dir, "App.tsx");
}

// As the sandbox runs it: one process, asked again and again.
it("typechecks and bundles over HTTP, file after file", async () => {
  const port = 5199;
  const server = spawn(
    process.execPath,
    ["--import", "@backtickjs/node-plugin", "src/sandbox/serve.ts"],
    {
      cwd: root,
      env: { ...process.env, PORT: String(port) },
      stdio: "inherit",
    },
  );
  const url = `http://127.0.0.1:${port}`;
  const post = async (path: string, body: object) =>
    (
      await fetch(`${url}/${path}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      })
    ).json();
  try {
    for (let attempt = 0; ; attempt++) {
      const ready = await fetch(`${url}/ready`).catch(() => undefined);
      if (ready?.ok) break;
      assert.ok(attempt < 100, "the server didn't start");
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const typo = write(
      "serve-type",
      starter.replace("$useState<number>(0)", '$useState<number>("0")'),
    );
    const app = write("serve-starter", starter);
    assert.deepEqual(await post("typecheck", { file: app }), { errors: [] });
    const { errors } = await post("typecheck", { file: typo });
    assert.match(errors.join("\n"), /^App\.tsx\(18,49\): error TS2345/);
    assert.equal(
      (await post("bundle", { file: app, modules: phone })).ok,
      true,
    );
    const refused = await post("bundle", { file: app, modules: {} });
    assert.equal(refused.ok, false);
    assert.equal(refused.name, "ClientVersionMismatch");
  } finally {
    server.kill();
  }
});
