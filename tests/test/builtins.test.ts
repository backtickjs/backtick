import type { ClientUnknown } from "@backtickjs/core";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { describe, it } from "node:test";
import { type ClientValue } from "@backtickjs/core";
import { type Bundle } from "@backtickjs/bundler";
import { schema } from "@backtickjs/language/schema";
import { getters, globals } from "@backtickjs-internal/js-interpreter";
import { evaluate, testHost } from "./test-client/index.ts";

// What the reference client answers with, against what the schema says a script
// may reach. A name declared and not implemented, or implemented and not
// declared, fails here rather than at the first bundle that reaches it.

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

describe("a member the schema leaves out", () => {
  // Written by hand because nothing else can reach it: the typechecker rejects
  // `padStart` where a fixture would declare one, so this is the bundle a
  // bundler that had not rejected it would have written.
  const bundle = {
    functions: {
      "0": ["=>", [], ["{}", [["return", [".", "abc", "padStart"]]]]],
    },
    root: ["()", ["fn", "0"], []],
  } as unknown as Bundle<ClientUnknown>;

  it("is a name this language has no meaning for", () => {
    // Not absent, and not the host's: reading it as null would let a bundle ask
    // for a member the schema left out and carry on, and the flat table holds
    // every name a value has — so nothing answering is the whole answer.
    assert.throws(
      () => evaluate(bundle),
      /a string has no `padStart` in this language/,
    );
  });
});

describe("a name a target answers for", () => {
  // What an SDK or an app adds: a whole name, reached by splicing the value it
  // is imported as, which lands on the wire as the same node `Math.floor` does.
  // The bundle a schema's generated `createBuiltin("greet")` would be spliced
  // into, written by hand because no schema here declares the name.
  const bundle = {
    functions: {
      "0": ["=>", [], ["{}", [["return", ["()", ["bltn", "greet"], []]]]]],
    },
    root: ["()", ["fn", "0"], []],
  } as unknown as Bundle<ClientUnknown>;

  it("is answered by the table its target handed over", () => {
    assert.equal(evaluate(bundle, testHost, { greet: () => "hello" }), "hello");
  });

  it("is not answered by a client whose target added nothing", () => {
    // The language's list is every client's floor, and a name beyond it is a
    // name that target never offered — so a bundle built against one client
    // says so on another rather than reading as absent.
    assert.throws(() => evaluate(bundle), /unknown builtin greet/);
  });

  it("holds what a target handed over, whatever kind of value that is", () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object this answered
    // with, which is the same path a cell's `read` is reached by.
    const held = {
      functions: {
        "0": [
          "=>",
          [],
          [
            "{}",
            [
              [
                "return",
                ["()", [".", ["bltn", "storage"], "get"], ["greeting"]],
              ],
            ],
          ],
        ],
      },
      root: ["()", ["fn", "0"], []],
    } as unknown as Bundle<ClientUnknown>;
    const storage = { greeting: "hei" } as Record<string, string>;
    assert.equal(
      evaluate(held, testHost, {
        storage: { get: (key: ClientValue) => storage[key as string] ?? null },
      }),
      "hei",
    );
  });

  it("may lengthen the language's list and never edit it", () => {
    // Refused where the client is made, not at the first bundle to reach the
    // name: a target quietly redefining `state` is one client answering a
    // bundle differently from every other.
    assert.throws(
      () => evaluate(bundle, testHost, { state: () => null }),
      /the language already answers for `state`/,
    );
    assert.throws(
      () => evaluate(bundle, testHost, { "Math.floor": () => 0 }),
      /the language already answers for `Math.floor`/,
    );
  });

  it("may not add a member to a kind of value", () => {
    // A member of a string is the language's, so a table naming one adds a
    // whole name nothing reads: `"abc".padStart` still finds nothing.
    const padded = {
      functions: {
        "0": ["=>", [], ["{}", [["return", [".", "abc", "padStart"]]]]],
      },
      root: ["()", ["fn", "0"], []],
    } as unknown as Bundle<ClientUnknown>;
    assert.throws(
      () => evaluate(padded, testHost, { "string.padStart": (self) => self }),
      /a string has no `padStart` in this language/,
    );
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
