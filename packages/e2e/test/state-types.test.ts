import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { state, type State } from "@backtickjs/core";
import type { Spliced } from "@backtickjs/cs-runtime";

// What a cell holds, as the host infers it at the splice.
//
// A fixture cannot ask this. The answer is a type rather than a value, and the
// case worth pinning is an enum — syntax `erasableSyntaxOnly` refuses, so the
// two here are ambient and nothing ever reads them at run time.
//
// These assertions are the compile: each `Assert` resolves only when the two
// types agree, so a widening that changes fails `tsc` rather than this file.

declare enum Color {
  Red = 0,
  Blue = 1,
}
declare enum Tone {
  Warm = "warm",
  Cool = "cool",
}

/** `$state` as a script reaches it, which is what `Spliced` unwraps to. */
type $state = Spliced<typeof state>;

type Held<S> = S extends State<infer T> ? T : never;
type Eq<A, B> =
  (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2
    ? true
    : false;
/** Fails to compile unless its argument is `true`. */
type Assert<T extends true> = T;

declare const cell: $state;

// Never called: `cell` and the ambient enums have no run-time value. What the
// file reads is the type inferred for each call, and inference needs the
// expressions written out — an annotated `const Color.Red` is a non-widening
// literal and would pin the wrong thing.
function probes() {
  return {
    number: cell(0),
    string: cell("x"),
    boolean: cell(true),
    color: cell(Color.Red),
    tone: cell(Tone.Warm),
    arrow: cell(() => 0),
  };
}
type Probe = ReturnType<typeof probes>;

// A literal widens to its primitive, so the cell can be written to later.
export type WidensNumber = Assert<Eq<Held<Probe["number"]>, number>>;
export type WidensString = Assert<Eq<Held<Probe["string"]>, string>>;
export type WidensBoolean = Assert<Eq<Held<Probe["boolean"]>, boolean>>;

// An enum member widens to its enum and not to the primitive under it. A
// constraint would keep `Color.Red`; a primitive overload would flatten it to
// `number`. A function taking a `Color` accepts neither.
export type WidensToEnum = Assert<Eq<Held<Probe["color"]>, Color>>;
export type WidensToStringEnum = Assert<Eq<Held<Probe["tone"]>, Tone>>;

// A function takes the bound arm, where the constraint contextually types the
// body — so what it answers widens too.
export type WidensWhatAFunctionAnswers = Assert<
  Eq<Held<Probe["arrow"]>, () => number>
>;

describe("what a cell holds", () => {
  it("is checked by `tsc`, not here", () => {
    assert.ok(state);
  });
});
