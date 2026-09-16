import { describe, it } from "node:test";
import { cs, state, type Client } from "@backtickjs/core";
import type { Spliceable } from "@backtickjs/core";
import { version } from "@backtickjs/client-script";
import { snapshotCase } from "./snapshotCase.ts";

// Host values spliced into scripts: when they evaluate, how they are shared
// and deduplicated, and what widths and shapes they keep.

async function fetchGreeting() {
  return "hello";
}

// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here at module top level.
const awaitInSplice = cs`${await fetchGreeting()} + "!"`;

// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs`7`;

const deduplicatedScripts = cs`({ a: $leaf, b: $leaf })`;

// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = cs`1`;
const d1 = cs`{
  return $d0 + $d0;
}`;
const d2 = cs`{
  return $d1 + $d1;
}`;
const d3 = cs`{
  return $d2 + $d2;
}`;
const d4 = cs`{
  return $d3 + $d3;
}`;

const diamond = d4;

// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new script,
// written at its own location outside the enclosing one, so nothing about it
// looks lexical. `same` hands back the template it was given: the script that
// lands at the hole *is* written inside the enclosing script's span, and still
// can't be read off that span, because only running `same` says it goes there.
// Anything that resolves a hole by comparing spans gets this one wrong.
function wrap(start: Client<number>): Client<number> {
  return cs`{
    const outer = $start;
    return ${foo(cs`{
      const middle = 10;
      return middle + ${same(cs`outer`)};
    }`)};
  }`;
}

function foo(start: Client<number>): Client<number> {
  return cs`$start + 1`;
}

function same(script: Client<number>): Client<number> {
  return script;
}

const hostWrappedSplice = cs`${wrap(cs`1`)} + ${wrap(cs`2`)}`;

// A hole with declarations after it. Two call sites make the script
// polymorphic, so each splice arrives as a thunk and the entry passes the
// bindings it declares at the hole (see `passKeys`).
//
// It passes all of them, including ones the hole sits above: at the hole
// `spliced` is still being initialized and `after` has not been reached. Both
// hoist to the block bound to `null`, so naming them early is inert — which is
// what makes passing every declaration safe, rather than working out which are
// in scope. A fragment cannot reference them anyway; it is written out here,
// where they do not exist.
function sandwich(fragment: Client<number>): Client<number> {
  return cs`{
    const before = 1;
    const spliced = $fragment;
    const after = 2;
    return before + spliced + after;
  }`;
}

const spliceBeforeDeclaration = cs`${sandwich(cs`10`)} + ${sandwich(cs`20`)}`;

// A host value that is imported and never mentioned outside a script.
//
// `version` appears once, as the `$version` splice below. That reference is
// written by the transform, and TypeScript decides whether an import is used
// before any transform runs — from the source it was handed, where the only
// mention is inside a template literal. So the import is a candidate for
// elision, and if it is elided the emitted module throws
// `version is not defined` the moment the script is bundled.
//
// What keeps it is `verbatimModuleSyntax`, which every tsconfig in this repo
// sets (`configs/tsconfig.base.json`, and each example's own). This case is
// here so that turning it off anywhere fails a test rather than a page: the
// `.js` snapshot beside it carries the import, and the `.bundle` snapshot
// carries the spliced value.
// A value rather than a function, so the `.value` snapshot beside this is the
// spliced value itself.
const spliceImportedValue = cs`$version`;

// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment: Client<string>): Client<(flag: boolean) => string> {
  return cs`(flag: boolean) => {
    if (flag) {
      return $fragment;
    }
    return "skipped";
  }`;
}

const ok = cs`"evaluated"`;
const broken = cs`{
  throw "the guarded fragment must never evaluate";
}`;

const spliceLaziness = cs`({
  taken: ${guard(ok)}(true),
  skipped: ${guard(broken)}(false),
})`;

const spliceNumeric = cs`${1}`;

// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;

const spliceOrder = cs`({ a: $count, b: ${++count} })`;

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs`$lhs + $rhs`;
}

const spliceSharing = cs`({
  x: ${add(cs`1`, cs`2`)},
  y: ${add(cs`3`, cs`4`)},
})`;

// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';

const spliceString = cs`$value`;

// A container the host built holding scripts, spliced whole.
//
// Each member crosses as what its script produced, so a script reads
// `{ x: number, label: string }` where the host wrote `{ x: Client<number>,
// label: Client<string> }`. Reading `x` off it has to typecheck as a number,
// which is what pins the direction `cs.splice` maps in: forward, from what the
// host wrote. Read the other way — from the client's type back to what the host
// may write — this shape is the one TypeScript cannot infer, and a splice has
// nowhere to name it, since the compiler writes the call.
const originX = cs`1`;
const label = cs`"origin"`;

const point = { x: originX, label };

const splicedContainer = cs`$point.x + 1`;

// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
const splicedFunctionParam = cs`{
  const apply = (f: () => number) => f() + 1;
  return apply(${cs`() => 2`});
}`;

// A host function has no data form — client code is written in `cs`...` — so
// the bundler expands it rather than carrying it: run once against one opaque
// hole per parameter, and what it answered is what crosses.
//
// Nothing here is about components. A component is a function of one argument
// it reads fields off, which is why a tag written inside a script works at all.
//
// The cast is because `Spliceable` does not admit a function yet: the rule is
// the bundler's, and the type has still to catch up — until it does, a script
// cannot call one by name either.
const splicedFunction = cs`() => ${((n: never) => n) as unknown as Spliceable}`;

// What a splice hands over keeps the width the host gave it.
//
// `const five = 5` has the literal type `5`, and an enum member has its own, so
// a cell built from either would take no other value if the splice retyped what
// it crossed. It does not: `cs.splice` reads its argument unbound, leaving the
// binding to decide the width — `number` for the one, `Color` for the other.
//
// The writes are the assertion, each an error the moment a bound comes back to
// `cs.splice`. An action, so a write is what the script is for: in one that
// returns a value they would be side effects as well, and that error would
// stand beside the one under test.
enum Color {
  Red = 0,
  Blue = 1,
}

const five = 5;

const splicedLiteralWidens = cs`{
  const n = $state($five);
  n.write(6);
  const c = $state(${Color.Red});
  c.write(${Color.Blue});
}`;

describe("what each case compiles and bundles to", () => {
  it("awaitInSplice", async (t) => {
    await snapshotCase(t, "awaitInSplice", awaitInSplice);
  });

  it("deduplicatedScripts", async (t) => {
    await snapshotCase(t, "deduplicatedScripts", deduplicatedScripts);
  });

  it("diamond", async (t) => {
    await snapshotCase(t, "diamond", diamond);
  });

  it("hostWrappedSplice", async (t) => {
    await snapshotCase(t, "hostWrappedSplice", hostWrappedSplice);
  });

  it("spliceBeforeDeclaration", async (t) => {
    await snapshotCase(t, "spliceBeforeDeclaration", spliceBeforeDeclaration);
  });

  it("spliceImportedValue", async (t) => {
    await snapshotCase(t, "spliceImportedValue", spliceImportedValue);
  });

  it("spliceLaziness", async (t) => {
    await snapshotCase(t, "spliceLaziness", spliceLaziness);
  });

  it("spliceNumeric", async (t) => {
    await snapshotCase(t, "spliceNumeric", spliceNumeric);
  });

  it("spliceOrder", async (t) => {
    await snapshotCase(t, "spliceOrder", spliceOrder);
  });

  it("spliceSharing", async (t) => {
    await snapshotCase(t, "spliceSharing", spliceSharing);
  });

  it("spliceString", async (t) => {
    await snapshotCase(t, "spliceString", spliceString);
  });

  it("splicedContainer", async (t) => {
    await snapshotCase(t, "splicedContainer", splicedContainer);
  });

  it("splicedFunctionParam", async (t) => {
    await snapshotCase(t, "splicedFunctionParam", splicedFunctionParam);
  });

  it("splicedFunction", async (t) => {
    await snapshotCase(t, "splicedFunction", splicedFunction);
  });

  it("splicedLiteralWidens", async (t) => {
    await snapshotCase(t, "splicedLiteralWidens", splicedLiteralWidens);
  });
});
