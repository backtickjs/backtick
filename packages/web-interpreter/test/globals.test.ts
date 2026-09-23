import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/platform-sdk/schema";
import type { Response, Window } from "@backtickjs/web-sdk";
import { builtinOf } from "../dist/builtinOf.js";
import type { Instance } from "../dist/Instance.js";

// What the interpreter answers with, against what the schema says a script may
// reach. A name declared and not answered fails here rather than at the first
// bundle that reaches it; one answered and not declared does not build.

// No bundle here is drawn inside another, so what `vm` would draw with is never
// read.
const instance = {} as Instance;

describe("builtins", () => {
  it("the client answers for every name in scope", () => {
    for (const name of Object.keys(schema.builtins)) {
      assert.notEqual(
        builtinOf(instance, name),
        undefined,
        `\`${name}\` is declared and not answered`,
      );
    }
  });

  it("answers an ECMAScript global with the client's own", () => {
    assert.equal(builtinOf(instance, "Math"), Math);
    assert.equal(builtinOf(instance, "encodeURIComponent"), encodeURIComponent);
  });
});

describe("window.fetch", () => {
  // Node's globals answer for the browser's: `fetch` and `AbortSignal` are
  // all this reaches.
  const fetch = (
    builtinOf({ window: globalThis } as unknown as Instance, "window") as {
      fetch: Window["fetch"];
    }
  ).fetch;

  const get = (url: string, onResponse: (response: Response) => void) =>
    new Promise<string>((resolve) => {
      fetch(url, onResponse, resolve);
    });

  it("answers with the status and the body as text", async () => {
    let answered: unknown = null;
    await get('data:application/json,{"a":1}', (response) => {
      answered = response;
      throw "done";
    });
    assert.deepEqual(answered, { status: 200, text: '{"a":1}' });
  });

  it("hands a throw from onResponse to onFailure", async () => {
    const message = await get("data:,hello", () => {
      throw "not what was wanted";
    });
    assert.equal(message, "not what was wanted");
  });

  it("fails where nothing answered", async () => {
    assert.ok((await get("not a url", () => {})).length > 0);
  });

  it("sends the method, headers and body it is handed", async () => {
    const server = createServer((request, response) => {
      let body = "";
      request.setEncoding("utf8");
      request.on("data", (chunk: string) => (body += chunk));
      request.on("end", () => {
        response.end(`${request.method} ${request.headers["x-asked"]} ${body}`);
      });
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const { port } = server.address() as AddressInfo;
    const asked = await new Promise<string>((resolve, reject) => {
      fetch(
        `http://localhost:${port}/at`,
        (response) => resolve(response.text),
        reject,
        { method: "POST", headers: { "x-asked": "yes" }, body: "é" },
      );
    });
    server.close();
    assert.equal(asked, "POST yes é");
  });
});
