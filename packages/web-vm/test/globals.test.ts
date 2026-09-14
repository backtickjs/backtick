import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/language/schema";
import { getters, globals } from "../src/interpreter/globals.ts";

// What the interpreter answers with, against what the schema says a script may
// reach. A name declared and not implemented, or implemented and not declared,
// fails here rather than at the first bundle that reaches it.

describe("builtins", () => {
  it("the client answers for every name in scope", () => {
    // Read off the schema and not off a list beside it, whether the host's lib
    // declares the name or the framework does: a name added there is checked
    // here without anything being told about it twice.
    //
    // One lookup, and nothing to unwrap: a name is whole on both sides — the
    // key the schema writes, the key this table holds, and the name the wire
    // carries are one string.
    const held = globals as unknown as Record<string, unknown>;
    for (const name of Object.keys(schema.builtins)) {
      assert.ok(name in held, `\`${name}\` is declared and not answered`);
    }
  });

  it("reads exactly the names the schema calls getters", () => {
    // The client acts on `getter` without reading the schema — nothing in its
    // table tells `length` from `trim` — so the two lists are held together
    // here. A name that starts or stops being a getter fails on this line.
    const declared = Object.entries(schema.builtins)
      .filter(([, node]) => {
        const written = node.type === "generic" ? node.expression : node;
        return written.type === "function" && written.getter === true;
      })
      .map(([name]) => name);
    assert.deepEqual([...getters].sort(), declared.sort());
  });

  it("answer with a number this language has, or not at all", () => {
    assert.throws(() => globals["Math.sqrt"](-1), /are finite/);
    assert.throws(() => globals["Math.log"](0), /are finite/);
    assert.throws(() => globals["Math.exp"](710), /are finite/);
    assert.equal(globals["Math.sqrt"](9), 3);
  });

  it("refuse an empty `Math.min`/`Math.max`", () => {
    assert.throws(() => globals["Math.min"](), /at least one number/);
    assert.throws(() => globals["Math.max"](), /at least one number/);
  });

  it("read a string as a number, or not at all", () => {
    assert.equal(globals["Number.parseInt"]("42"), 42);
    assert.equal(globals["Number.parseInt"]("42px"), 42);
    assert.equal(globals["Number.parseInt"]("ff", 16), 255);
    assert.equal(globals["Number.parseFloat"]("1.5"), 1.5);
    // `NaN` is what the host answers and not a value this language has, so the
    // name refuses rather than handing one back.
    assert.throws(() => globals["Number.parseInt"]("abc"), /read this string/);
    assert.throws(() => globals["Number.parseInt"](""), /read this string/);
    assert.throws(
      () => globals["Number.parseFloat"]("abc"),
      /read this string/,
    );
  });

  it("hold a value beside the functions of a namespace", () => {
    assert.equal(globals["Number.EPSILON"], Number.EPSILON);
  });

  it("tell what a number is without converting to one", () => {
    assert.equal(globals["Number.isInteger"](2), true);
    assert.equal(globals["Number.isInteger"](2.5), false);
    assert.equal(globals["Number.isFinite"](2), true);
    // Unconverted, so a string that reads as a number is still not one.
    assert.equal(globals["Number.isFinite"]("2"), false);
    assert.equal(globals["Number.isInteger"]("2"), false);
  });

  it("write a string from the code points it is handed", () => {
    assert.equal(globals["String.fromCodePoint"](72, 105), "Hi");
    // The schema says none is the empty string, where an empty `Math.min` has
    // no answer to give.
    assert.equal(globals["String.fromCodePoint"](), "");
  });
});

describe("http", () => {
  const get = (url: string, onResponse: (response: unknown) => void) =>
    new Promise<string>((resolve) => {
      globals.http.get(url, onResponse, resolve);
    });

  it("answers with the status and the body as text", async () => {
    let answered: unknown = null;
    await get('data:application/json,{"a":1}', (response) => {
      answered = response;
      throw "done";
    });
    assert.deepEqual(answered, { status: 200, data: '{"a":1}' });
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

  it("adds params to the query, percent-encoded", async () => {
    const server = createServer((request, response) => {
      response.end(request.url);
    });
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const { port } = server.address() as AddressInfo;
    const asked = await new Promise<string>((resolve, reject) => {
      globals.http.get(
        `http://localhost:${port}/at`,
        (response) => resolve(response.data),
        reject,
        { params: { q: "a b+c&d#e%", "k=": "é" } },
      );
    });
    server.close();
    assert.equal(asked, "/at?q=a%20b%2Bc%26d%23e%25&k%3D=%C3%A9");
  });
});
