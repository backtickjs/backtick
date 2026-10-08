import { it } from "node:test";
import { type Client, cs } from "@backtickjs/core";
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
