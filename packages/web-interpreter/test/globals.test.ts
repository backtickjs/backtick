import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/platform-sdk/schema";
import type { Builtins } from "@backtickjs/platform-sdk";
import type { Response, Window } from "@backtickjs/web-sdk";
import { builtinOf, getters } from "../dist/builtinOf.js";
import type { Instance } from "../dist/Instance.js";

// What the interpreter answers with, against what the schema says a script may
// reach. A name declared and not answered fails here rather than at the first
// bundle that reaches it; one answered and not declared does not build.

// No bundle here is drawn inside another, so what `vm` would draw with is never
// read.
const instance = {} as Instance;

function answer<Name extends keyof Builtins>(name: Name): Builtins[Name] {
  return builtinOf(instance, name) as unknown as Builtins[Name];
}

describe("builtins", () => {
  it("the client answers for every name in scope", () => {
    // Read off the schema and not off a list beside it, whether the host's lib
    // declares the name or the framework does: a name added there is checked
    // here without anything being told about it twice.
    for (const name of Object.keys(schema.builtins)) {
      assert.notEqual(
        builtinOf(instance, name),
        undefined,
        `\`${name}\` is declared and not answered`,
      );
    }
  });

  it("reads exactly the names the schema calls getters", () => {
    // The client acts on `getter` without reading the schema — nothing in its
    // answers tells `length` from `trim` — so the two lists are held together
    // here. A name that starts or stops being a getter fails on this line.
    const declared = Object.entries(schema.builtins)
      .filter(([, node]) => {
        const written = node.type === "generic" ? node.expression : node;
        return written.type === "function" && written.getter === true;
      })
      .map(([name]) => name);
    assert.deepEqual(Object.keys(getters).sort(), declared.sort());
  });

  it("read a string as a number", () => {
    assert.equal(answer("Number.parseInt")("42"), 42);
    assert.equal(answer("Number.parseInt")("42px"), 42);
    assert.equal(answer("Number.parseInt")("ff", 16), 255);
    assert.equal(answer("Number.parseFloat")("1.5"), 1.5);
  });

  it("hold a value beside the functions of a namespace", () => {
    assert.equal(answer("Number.EPSILON"), Number.EPSILON);
  });

  it("tell what a number is without converting to one", () => {
    assert.equal(answer("Number.isInteger")(2), true);
    assert.equal(answer("Number.isInteger")(2.5), false);
    assert.equal(answer("Number.isFinite")(2), true);
    // Unconverted, so a string that reads as a number is still not one.
    assert.equal(answer("Number.isFinite")("2"), false);
    assert.equal(answer("Number.isInteger")("2"), false);
  });

  it("percent-encode a string as UTF-8", () => {
    assert.equal(
      answer("encodeURIComponent")("a b+c&d#e%é"),
      "a%20b%2Bc%26d%23e%25%C3%A9",
    );
    assert.equal(answer("encodeURIComponent")(true), "true");
  });

  it("read a percent-encoded string back", () => {
    assert.equal(answer("decodeURIComponent")("a%20b+%C3%A9"), "a b+é");
    assert.throws(() => answer("decodeURIComponent")("%E"));
  });

  it("write a string from the code points it is handed", () => {
    assert.equal(answer("String.fromCodePoint")(72, 105), "Hi");
    // The schema says none is the empty string, where an empty `Math.min` has
    // no answer to give.
    assert.equal(answer("String.fromCodePoint")(), "");
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
