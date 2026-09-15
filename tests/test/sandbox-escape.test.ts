import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import type { Bundle } from "@backtickjs/bundler";
import type { ClientUnknown } from "@backtickjs/core";
import { evaluate } from "@backtickjs/test-vm";

// A guard, not a snapshot. Every other suite here compiles a `.ts` fixture and
// runs what the compiler emitted; the point of these tests is the opposite — a
// bundle the compiler would never emit, handed straight to the interpreter.
// That is the threat model for `vm.eval`, an untrusted server, or a tampered
// response: bytes that reach a client without passing through the compiler.
//
// A bundle must not be able to reach the ambient JavaScript machinery. The
// classic escape walks `({}).constructor` (Object) to `.constructor`
// (Function) and runs arbitrary code; the same climb off a cell or the window
// would do too. `memberOf` in `packages/web-vm/src/interpreter/interpret.ts`
// treats reading any member inherited from `Object.prototype` or
// `Function.prototype` as an error, which closes every rung of that ladder while
// leaving own members and host-prototype members (a DOM event's
// `preventDefault`) reachable.
//
// If any assertion here starts failing, the interpreter's sandbox has
// regressed: a hand-written bundle can once again reach code execution.

const bundleOf = (root: unknown): Bundle<ClientUnknown> =>
  ({ functions: {}, root }) as Bundle<ClientUnknown>;

// ["obj", []] is the empty object literal; ["."] reads a member; ["()"] calls.
const EMPTY = ["obj", []];
const OBJECT_CTOR = [".", EMPTY, "constructor"];
const FUNCTION_CTOR = [".", OBJECT_CTOR, "constructor"];

describe("sandbox escape (hand-written bundles)", () => {
  it("refuses `constructor` off an object literal", () => {
    // `{}` holds no `constructor`; the inherited one from Object.prototype is
    // machinery, so reading it throws.
    assert.throws(
      () => evaluate(bundleOf(OBJECT_CTOR)),
      /an object has no `constructor` in this language/,
    );
  });

  it("refuses `__proto__` off an object literal", () => {
    assert.throws(
      () => evaluate(bundleOf([".", EMPTY, "__proto__"])),
      /an object has no `__proto__` in this language/,
    );
  });

  it("refuses a machinery method call", () => {
    const root = ["()", [".", EMPTY, "toString"], []];
    assert.throws(
      () => evaluate(bundleOf(root)),
      /an object has no `toString` in this language/,
    );
  });

  it("cannot reach the Function constructor", () => {
    assert.throws(() => evaluate(bundleOf(FUNCTION_CTOR)));
  });

  it("cannot run arbitrary code through a reached Function", () => {
    const built = ["()", FUNCTION_CTOR, ["return 1337 + 1"]];
    assert.throws(() => evaluate(bundleOf(["()", built, []])));
  });

  it("cannot reach the host realm via a global side effect", () => {
    const MARKER = "__backtick_sandbox_escape__";
    after(() => {
      delete (globalThis as Record<string, unknown>)[MARKER];
    });

    const source = `globalThis[${JSON.stringify(MARKER)}] = 42`;
    const built = ["()", FUNCTION_CTOR, [source]];
    assert.throws(() => evaluate(bundleOf(["()", built, []])));

    // The write must never have happened.
    assert.equal((globalThis as Record<string, unknown>)[MARKER], undefined);
  });

  it("still reads an own member whose name shadows the machinery", () => {
    // A data object may legitimately hold a key called `constructor`; an own
    // member always wins over the inherited-machinery rule.
    const root = [".", ["obj", [[":", "constructor", 7]]], "constructor"];
    assert.equal(evaluate(bundleOf(root)), 7);
  });

  it("refuses a timer handed a string, which a browser runs as code", () => {
    // Named directly, or handed to a host function that calls it with a
    // member of an array: either way the handler never reaches the host.
    const window = ["bltn", "window"];
    const named = ["()", [".", window, "setTimeout"], ["globalThis.x = 1", 0]];
    assert.throws(
      () => evaluate(bundleOf(named)),
      /`window.setTimeout` takes a function/,
    );
    const mapped = [
      "()",
      [".", ["arr", ["globalThis.x = 1"]], "map"],
      [[".", window, "setInterval"]],
    ];
    assert.throws(
      () => evaluate(bundleOf(mapped)),
      /`window.setInterval` takes a function/,
    );
  });

  it("refuses a builtin the table only inherits", () => {
    // The table of names is a plain object, so `constructor` on it is `Object` —
    // whose `getPrototypeOf` reaches `Function.prototype` and its own
    // `constructor`, which is `Function`.
    for (const name of ["constructor", "__proto__", "toString"]) {
      assert.throws(
        () => evaluate(bundleOf(["bltn", name])),
        new RegExp(`unknown builtin ${name}`),
      );
    }
  });
});
