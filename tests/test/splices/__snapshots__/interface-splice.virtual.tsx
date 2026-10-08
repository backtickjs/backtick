import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import {
  type Client,
  cs,
  type Spliceable,
  type SplicesAs,
} from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// Data declared with an interface splices as data declared with a type alias
// does: member by member. An interface has no index signature, so it's checked
// by its members rather than as `Spliceable`'s.
interface Todo {
  title: string;
  done: boolean;
  tags: readonly string[];
}

const todo: Todo = { title: "Ship 0.1.5", done: false, tags: ["release"] };

it("interfaceSplice", async (t) => {
  await snapshotCase(
    t,
    "interfaceSplice",
    cs.lift((() => (cs.splice((createRoot)))(() => (cs.splice((todo))).title + " " + (cs.splice((todo))).done + " " + (cs.splice((todo))).tags[0]))()),
  );
});

// A member that's a script arrives as what it computes.
interface Labelled {
  label: Client<string>;
}

const labelled: Labelled = { label: cs.lift((() => "computed")()) };

it("interfaceScriptMember", async (t) => {
  await snapshotCase(
    t,
    "interfaceScriptMember",
    cs.lift((() => (cs.splice((createRoot)))(() => (cs.splice((labelled))).label.toUpperCase()))()),
  );
});

// A method is host code, which can't cross, whichever way the type is
// declared.
interface WithMethod {
  title: string;
  shout(): string;
}

const withMethod: WithMethod = { title: "t", shout: () => "T" };

// @ts-expect-error: Argument of type 'WithMethod' is not assignable to parameter of type 'Spliceable'.
export const refused = cs.lift((() => (cs.splice((withMethod))).title)());

// `SplicesAs<T>` checks a value as a splice does, so an interface satisfies
// it, and one with a method doesn't.
export const checked = todo satisfies SplicesAs<Todo>;
// @ts-expect-error: Type 'WithMethod' does not satisfy the expected type
export const checkedMethod = withMethod satisfies SplicesAs<WithMethod>;

// `Spliceable` alone matches an object through an index signature, which
// TypeScript never gives an interface.
// @ts-expect-error: Type 'Todo' does not satisfy the expected type 'Spliceable'.
export const unchecked = todo satisfies Spliceable;

// The bundler takes what a splice takes.
it("bundles an interface as input", async () => {
  const bundle = await bundler.build({ input: todo, packageVersions: {} });
  assert.match(bundle.generate({ format: "es" }).code, /"Ship 0\.1\.5"/);
});

// Never called: refused by the types, it would be refused when bundling too.
export const refusedInput = () =>
  bundler.build({
    // @ts-expect-error: Type 'WithMethod' is not assignable to type 'Spliceable'.
    input: withMethod,
    packageVersions: {},
  });
