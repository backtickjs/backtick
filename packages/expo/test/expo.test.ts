import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { WebSocketServer } from "ws";
import { getBacktickExtra } from "../dist/index.js";
import withBacktickExtra from "../dist/plugin.js";
import { reloadExpo } from "../dist/server.js";

// An app with React installed.
function app(): string {
  const root = mkdtempSync(join(tmpdir(), "expo-"));
  writeFileSync(
    join(root, "package.json"),
    JSON.stringify({ dependencies: { react: "*" } }),
  );
  mkdirSync(join(root, "node_modules", "react"), { recursive: true });
  writeFileSync(
    join(root, "node_modules", "react", "package.json"),
    JSON.stringify({ name: "react", version: "19.2.3" }),
  );
  return root;
}

describe("the config plugin", () => {
  it("puts the installed packages in extra.backtick, keeping the rest", () => {
    const config = withBacktickExtra({
      name: "app",
      extra: { eas: { projectId: "1" }, backtick: { other: true } },
      _internal: { projectRoot: app() },
    });
    assert.equal(config.name, "app");
    assert.deepEqual(config.extra, {
      eas: { projectId: "1" },
      backtick: { other: true, installedPackages: { react: "19.2.3" } },
    });
  });

  it("is what the app reads back", () => {
    const config = withBacktickExtra({ _internal: { projectRoot: app() } });
    assert.deepEqual(getBacktickExtra(config), {
      installedPackages: { react: "19.2.3" },
    });
  });

  it("needs the project root Expo gives it", () => {
    assert.throws(() => withBacktickExtra({}), /no projectRoot/);
  });
});

describe("getBacktickExtra", () => {
  it("throws as the app starts without the plugin", () => {
    for (const expoConfig of [null, undefined, {}, { extra: {} }]) {
      assert.throws(
        () => getBacktickExtra(expoConfig),
        /is @backtickjs\/expo in app.json's plugins/,
      );
    }
  });

  it("throws for installed packages that aren't the plugin's", () => {
    for (const installedPackages of [
      undefined,
      null,
      ["react"],
      { react: 19 },
    ]) {
      assert.throws(
        () => getBacktickExtra({ extra: { backtick: { installedPackages } } }),
        /isn't \{ package: version \}/,
      );
    }
  });
});

describe("reloadExpo", () => {
  it("sends Expo a reload, as pressing r does", async () => {
    const server = new WebSocketServer({ port: 0, path: "/message" });
    await new Promise((resolve) => server.once("listening", resolve));
    const received = new Promise<unknown>((resolve) =>
      server.once("connection", (socket) =>
        socket.once("message", (data) => resolve(JSON.parse(String(data)))),
      ),
    );
    reloadExpo((server.address() as { port: number }).port);
    assert.deepEqual(await received, { version: 2, method: "reload" });
    await new Promise((resolve) => server.close(resolve));
  });

  it("does nothing without Expo", async () => {
    // a port nothing listens on: refused, and the error is handled
    const server = new WebSocketServer({ port: 0 });
    await new Promise((resolve) => server.once("listening", resolve));
    const { port } = server.address() as { port: number };
    await new Promise((resolve) => server.close(resolve));
    reloadExpo(port);
    await new Promise((resolve) => setTimeout(resolve, 200));
  });
});
