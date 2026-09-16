import type { ClientValue } from "@backtickjs/core";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluate } from "@backtickjs/web-testing";
import type { EvaluateOptions } from "@backtickjs/web-testing";
import { createSourceLoader } from "./importFixture.ts";

// What a client answers for beside the language's own names, and what it may
// not: a member the schema leaves out, and a name a client adds.
//
// The sources are compiled without typechecking, so a member the typechecker
// would refuse still reaches the client.
const importSource = createSourceLoader("builtins");

// A script's value, with `names` declared as builtins an SDK would add.
async function run(
  body: string,
  names: string[] = [],
  options: EvaluateOptions = {},
): Promise<unknown> {
  const declared = names
    .map((name) => `const ${name} = createBuiltin(${JSON.stringify(name)});`)
    .join("\n");
  return evaluate(
    await importSource(
      `import { cs } from "@backtickjs/core";
      import { createBuiltin } from "@backtickjs/platform-sdk";
      ${declared}
      export default cs\`${body}\`;`,
    ),
    options,
  );
}

const greet = (name: string) => (name === "greet" ? () => "hello" : undefined);

describe("a member the schema leaves out", () => {
  it("is a name this language has no meaning for", async () => {
    // Not absent, and not the host's: reading it as null would let a bundle ask
    // for a member the schema left out and carry on, and the client answers
    // every name a value has — so nothing answering is the whole answer.
    await assert.rejects(
      run(`"abc".padStart`),
      /a string has no `padStart` in this language/,
    );
  });
});

describe("a name a target answers for", () => {
  // What an SDK or an app adds: a whole name, reached by splicing the value
  // `createBuiltin` made, which lands on the wire as the same node `Math.floor`
  // does.
  it("is answered by the function its target handed over", async () => {
    assert.equal(
      await run(`$greet()`, ["greet"], { builtinOf: greet }),
      "hello",
    );
  });

  it("is not answered by a client whose target added nothing", async () => {
    // The language's list is every client's floor, and a name beyond it is a
    // name that target never offered — so a bundle built against one client
    // says so on another rather than reading as absent.
    await assert.rejects(run(`$greet()`, ["greet"]), /unknown builtin greet/);
  });

  it("holds what a target handed over, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object this answered
    // with, which is the same path a cell's `read` is reached by.
    const storage = { greeting: "hei" } as Record<string, string>;
    assert.equal(
      await run(`$storage.get("greeting")`, ["storage"], {
        builtinOf: (name) =>
          name === "storage"
            ? { get: (key: ClientValue) => storage[key as string] ?? null }
            : undefined,
      }),
      "hei",
    );
  });

  it("may lengthen the language's list and never edit it", async () => {
    // The language's names are read first, so a target naming one is never
    // reached: redefining `Math.floor` would be one client answering a bundle
    // differently from every other.
    assert.equal(
      await run(`Math.floor(2.7)`, [], {
        builtinOf: (name) => (name === "Math.floor" ? () => 0 : undefined),
      }),
      2,
    );
  });

  it("may not add a member to a kind of value", async () => {
    // A member of a string is the language's, so a target naming one adds a
    // whole name nothing reads: `"abc".padStart` still finds nothing.
    await assert.rejects(
      run(`"abc".padStart`, [], {
        builtinOf: (name) =>
          name === "string.padStart" ? (self: ClientValue) => self : undefined,
      }),
      /a string has no `padStart` in this language/,
    );
  });
});
