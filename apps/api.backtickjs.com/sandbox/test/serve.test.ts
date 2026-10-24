import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "node:test";
import { installedPackages } from "@backtickjs/core/node";

// A counter app, as a model writes one from the service's starter.
const counter = readFileSync(
  join(import.meta.dirname, "fixtures/App.tsx"),
  "utf8",
);

const root = join(import.meta.dirname, "..");
const installed = installedPackages(root);
const phone = JSON.stringify({
  react: installed.react!,
  "react/jsx-runtime": installed.react!,
  "react-native": installed["react-native"]!,
  "react-native-safe-area-context":
    installed["react-native-safe-area-context"]!,
  "expo-router": installed["expo-router"]!,
});

function write(name: string, source: string): string {
  const dir = join(root, ".builds", "test", name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "App.tsx"), source);
  writeFileSync(
    join(dir, "tsconfig.json"),
    `{ "extends": "../../../tsconfig.app.json" }`,
  );
  return join(dir, "App.tsx");
}

// As the sandbox runs it: one process, asked again and again.
it("typechecks, checks and answers over HTTP, file after file", async () => {
  const port = 5199;
  const server = spawn(
    process.execPath,
    ["--import", "@backtickjs/node-plugin", "src/serve.ts"],
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
      counter.replace("$useState<number>(0)", '$useState<number>("0")'),
    );
    const app = write("serve-counter", counter);
    assert.deepEqual(await post("typecheck", { file: app }), {
      errors: [],
      warnings: [],
    });
    const { errors } = await post("typecheck", { file: typo });
    assert.match(errors.join("\n"), /^App\.tsx\(31,51\): error TS2345/);
    const checked = await post("check", { file: app });
    assert.deepEqual(checked.errors, []);
    assert.match(checked.compiled, /ClientVersionMismatch/);
    const refusedCheck = await post("check", { file: typo });
    assert.equal(refusedCheck.compiled, undefined);
    assert.match(refusedCheck.errors.join("\n"), /TS2345/);
    assert.equal(
      (await post("screen", { file: app, path: "/day", modules: phone }))
        .status,
      200,
    );
    const refused = await post("screen", {
      file: app,
      path: "/",
      modules: "{}",
    });
    assert.equal(refused.status, 426);
  } finally {
    server.kill();
  }
});
