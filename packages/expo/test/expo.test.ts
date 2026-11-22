import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { WebSocketServer } from "ws";
import expo from "../dist/plugin.js";
import { reloadExpo } from "../dist/server.js";

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

describe("the Babel step", () => {
  const step = expo();

  it("moves an async arrow's default parameter into its body, for Hermes V1", () => {
    const { code } = step(
      "export default async (path, init = {}) => [await path, init];",
      "script.jsx",
    );
    assert.match(code, /async \(path, _p\) => \{/);
    assert.match(code, /var init = _p === undefined \? \{\} : _p;/);
  });

  it("keeps the script's imports, its modern syntax, and its platform checks", () => {
    const { code, map } = step(
      `import { Platform } from "react-native";
export default (props) => [Platform.OS, props?.x ?? 0, { ...props }];`,
      "script.jsx",
    );
    assert.match(code, /^import \{ Platform \} from "react-native";/);
    assert.match(code, /Platform\.OS, props\?\.x \?\? 0, \{\n\s*\.\.\.props/);
    assert.equal(JSON.parse(map).version, 3);
  });
});
