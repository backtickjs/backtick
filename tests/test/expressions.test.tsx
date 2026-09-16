import { describe, it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "./snapshotCase.ts";

// Expressions a client script writes: literals, operators, conditions, arrows,
// spreads.

const arrow = cs`{
  const base = 10;
  return (one: number, two: number) => one + two + base;
}`;

const constant = cs`1`;

// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
const comments = cs`{
  // leading line comment
  const count = 1; // trailing line comment
  /* block comment */
  if (count === 1) {
    // branch comment
    return "one";
  }
  /**
   * doc comment
   */
  return "many";
}`;

// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = { strict: cs`true` };

const label: Client<(text: string | null, upper: boolean) => string> = cs`(
  text: string | null,
  upper: boolean,
) => {
  if (upper && text !== null) {
    return text.toUpperCase();
  }
  if (${flags.strict} && text !== null && text.charAt(0) === "!") {
    return text.concat("?");
  }
  return "none";
}`;

const conditionNarrowing = cs`({
  missing: $label(null, true),
  loud: $label("!hi", true),
  quiet: $label("!hi", false),
  plain: $label("zz", false),
})`;

// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs: Client<number>): Client<number> {
  return cs`$lhs + 2`;
}

const dollarName = cs`{
  const foo$ = 1;
  return ${add(cs`foo$`)};
}`;

const methodCall = cs`{
  const greeting = "Hello";
  return greeting.concat(", ", "World").toUpperCase();
}`;

// A negative literal is written as one, and reaches the wire as one: `-1` is a
// prefix operator on `1` in TypeScript's AST and in this one, and a number on
// the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
const negation = cs`(count: number) => {
  const floor = -1;
  const step = -count;
  return floor + step + -2;
}`;

// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate: Client<(a: boolean, b: boolean) => string> = cs`(
  a: boolean,
  b: boolean,
) => {
  const keep = (on: boolean) => on;
  if (keep(a && b)) {
    return "kept";
  }
  return "dropped";
}`;

const nestedConditionCheck = cs`({
  both: $gate(true, true),
  one: $gate(true, false),
})`;

// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash: Client<(value: string | null) => string> = cs`(
  value: string | null,
) => {
  if (value === null) {
    return "-";
  }
  return value;
}`;

const nullLiteral = cs`({
  missing: $orDash(null),
  present: $orDash("hi"),
  bare: null,
})`;

// `!` is the one prefix operator, and its operand is boolean like every other
// tested position — there is no truthiness for it to negate.
const prefixNot = cs`(ready: boolean, count: number) => {
  if (!ready) {
    return "waiting";
  }
  return !(count > 3) ? "room left" : "full";
}`;

// `?:` tests a boolean — no truthiness — evaluates only the taken branch,
// and its condition narrows like an `if`'s.
const pick = cs`(n: number | null) => {
  return n === null ? 0 : n + 1;
}`;

const ternary = cs`({
  absent: $pick(null),
  present: $pick(4),
})`;

const answered = '{"rows":["one","two"],"count":2}';

// An assertion is the checker's alone. It is erased on the way to a bundle —
// the runtime here is the expression and nothing else — so a host reading one
// never learns an assertion was written.
//
// `JSON.parse` is why the language has one at all. It answers with
// `ClientValue`, the union of everything a client can hold, and a script that
// means to read `.rows` off what came back has no other way to say what it is
// looking at.
const typeAssertion = cs`{
  const page = JSON.parse($answered) as { rows: string[]; count: number };

  return page.rows[0] + " of " + page.count;
}`;

// A host ascription putting `undefined` in a function's return, which is
// ordinary now that `undefined` is a value: the function stores, it calls, and
// what a call answers with is `string | undefined` on both sides of the
// boundary.
type Maybe = string | undefined;

const lying: Client<() => Maybe> = cs`() => "hi"`;

const undefinedReturn = cs`{
  const stored = $lying;
  const caught = $lying();
  return 1;
}`;

// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
const spread = cs`{
  const front = [1, 2];
  const back = [3];
  const none = [];
  const all = [0, ...front, ...none, ...back, 4];
  const twice = [...all, ...all];
  return all.join(",") + "|" + twice.length;
}`;

describe("what each case compiles and bundles to", () => {
  it("arrow", async (t) => {
    await snapshotCase(t, "arrow", arrow);
  });

  it("constant", async (t) => {
    await snapshotCase(t, "constant", constant);
  });

  it("comments", async (t) => {
    await snapshotCase(t, "comments", comments);
  });

  it("conditionNarrowing", async (t) => {
    await snapshotCase(t, "conditionNarrowing", conditionNarrowing);
  });

  it("dollarName", async (t) => {
    await snapshotCase(t, "dollarName", dollarName);
  });

  it("methodCall", async (t) => {
    await snapshotCase(t, "methodCall", methodCall);
  });

  it("negation", async (t) => {
    await snapshotCase(t, "negation", negation);
  });

  it("nestedConditionCheck", async (t) => {
    await snapshotCase(t, "nestedConditionCheck", nestedConditionCheck);
  });

  it("nullLiteral", async (t) => {
    await snapshotCase(t, "nullLiteral", nullLiteral);
  });

  it("prefixNot", async (t) => {
    await snapshotCase(t, "prefixNot", prefixNot);
  });

  it("ternary", async (t) => {
    await snapshotCase(t, "ternary", ternary);
  });

  it("typeAssertion", async (t) => {
    await snapshotCase(t, "typeAssertion", typeAssertion);
  });

  it("undefinedReturn", async (t) => {
    await snapshotCase(t, "undefinedReturn", undefinedReturn);
  });

  it("spread", async (t) => {
    await snapshotCase(t, "spread", spread);
  });
});
