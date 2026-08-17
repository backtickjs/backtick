import assert from "node:assert/strict";
import { describe, it } from "node:test";
// The built output, which is what a project generates against.
import { Type } from "../dist/index.js";
import { declarations } from "../dist/generators/declarations.js";
import type { Schema } from "../dist/index.js";

// What a schema turns into, for schemas small enough to read whole. The two in
// this repo exercise most of this between them, but only together and only at
// 700 lines — a rule that changed would show up as a diff in an artifact rather
// than as a failure here.

const core: Schema = {
  package: "@backtickjs/core",
  extends: [],
  publishes: ["Client"],
  types: {
    // a drawing is a declared interface, branded because it extends the root
    Drawing: Type.Interface([], {}),
    // names one, or nothing drawn
    Drawn: Type.Union([Type.Ref("Drawing"), Type.Null()]),
    Cell: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([], { read: Type.Function([], Type.Ref("T")) }),
    ),
  },
  elements: {},
  builtins: { state: Type.Ref("Cell") },
};

/** A schema between the root and a target, which is what an import has to find. */
const middle: Schema = {
  package: "@backtickjs/middle",
  extends: [core],
  // Published a schema above the root, which is what a layer between them is
  // for: what a drawn position admits belongs where drawing does.
  publishes: ["Prop", "Children"],
  types: {
    Shared: Type.Union([Type.String(), Type.Number()]),
  },
  elements: {},
  builtins: {},
};

const target: Schema = {
  package: "@backtickjs/target",
  extends: [middle],
  publishes: [],
  types: {
    Props: Type.Interface([], {
      value: Type.Optional(Type.Ref("Shared")),
      onpick: Type.Optional(Type.Function([], Type.Void())),
      children: Type.Optional(Type.Ref("Drawing")),
    }),
  },
  elements: { pick: Type.Ref("Props") },
  builtins: {},
};

describe("declarations", () => {
  it("names a type where it is offered, not where it was written", () => {
    const written = declarations(target);
    // `Shared` is the middle schema's own and `Prop` is what it publishes —
    // both arrive from the one this is built on, so a target needs no
    // dependency on a package further up the chain.
    assert.match(
      written,
      /import type \{[^}]*\bProp,[^}]*\bShared,[^}]*\} from "@backtickjs\/middle";/,
    );
    assert.doesNotMatch(written, /from "@backtickjs\/core"/);
  });

  it("writes its own names beside it, and no import for them", () => {
    const root: Schema = {
      package: "@backtickjs/core",
      extends: [],
      publishes: ["Client"],
      types: {
        Props: Type.Interface([], {
          onpick: Type.Optional(Type.Function([], Type.Void())),
        }),
      },
      elements: { pick: Type.Ref("Props") },
      builtins: {},
    };
    const written = declarations(root);
    assert.match(
      written,
      /import type \{ Client \} from ".\/Client.js";/,
      "the package that publishes a name reaches it beside itself",
    );
    assert.doesNotMatch(written, /from "@backtickjs\/core"/);
  });

  it("hands on everything the schemas under it declare", () => {
    // `Cell` is the root's and `Shared` the middle's, and a file written
    // against this schema reaches both by naming one package.
    assert.match(
      declarations(target),
      /export type \{\n {2}Cell,\n {2}Children,\n {2}Client,\n {2}Drawing,\n {2}Drawn,\n {2}Prop,\n {2}Shared,\n\} from "@backtickjs\/middle";/,
    );
    // a schema with nothing under it hands on nothing
    assert.doesNotMatch(declarations(core), /^export type \{[^}]*\} from/m);
  });

  it("declares what it wrote and nothing it inherited", () => {
    const written = declarations(target);
    assert.match(written, /export interface Props/);
    assert.doesNotMatch(written, /export type Shared/);
    assert.doesNotMatch(written, /export interface Cell/);
  });

  it("wraps what an element accepts, and only that", () => {
    const written = declarations(target);
    // a prop holds a value or a script standing in for one
    assert.match(written, /value\?: Prop<Shared>;/);
    // a function prop is a script and never a host function
    assert.match(written, /onpick\?: Client<\(\) => void>;/);
    // what goes inside an element is children
    assert.match(written, /children\?: Children<Drawing>;/);
    // and a client's own interface is not props
    assert.doesNotMatch(declarations(core), /Prop</);
  });

  it("writes the elements it declares, and what each accepts", () => {
    assert.match(
      declarations(target),
      /export interface IntrinsicElements \{\n {2}pick: Props;\n\}/,
    );
    assert.doesNotMatch(declarations(core), /IntrinsicElements/);
  });

  it("writes what a client owes, from its own names", () => {
    assert.match(
      declarations(core),
      /export interface Builtins \{\n {2}state: Cell;\n\}/,
    );
    assert.doesNotMatch(declarations(target), /interface Builtins/);
  });

  it("hands on what its base published, and never what it published itself", () => {
    // `middle` publishes `Prop` and `Children`; `core` does not. So nothing in
    // middle's artifact may claim they come from core — its own package is what
    // publishes them, and the layer above reaches them from middle.
    const written = declarations(middle);
    assert.match(
      written,
      /export type \{\n {2}Cell,\n {2}Client,\n {2}Drawing,\n {2}Drawn,\n\} from "@backtickjs\/core";/,
    );
    assert.doesNotMatch(written, /\bProp\b/);
    assert.doesNotMatch(written, /\bChildren\b/);
  });

  it("imports what a declaration writes, not what it says about itself", () => {
    // A framework name is found by reading the file back, since no ref names
    // one — so prose that spells one has to not count, or the artifact imports
    // a type nothing in it reads.
    const prose: Schema = {
      package: "@backtickjs/core",
      extends: [],
      publishes: ["Prop", "Children"],
      types: {
        Held: Type.String({
          description: "Neither a `Prop` nor `Children`, whatever it says.",
        }),
      },
      elements: {},
      builtins: {},
    };
    const written = declarations(prose);
    assert.match(written, /Neither a `Prop` nor `Children`/);
    assert.doesNotMatch(written, /^import/m);
  });

  it("refuses a name the schema does not declare", () => {
    const named: Schema = { ...core, types: { A: Type.Ref("Missing") } };
    assert.throws(
      () => declarations(named),
      /names `Missing` and does not declare it/,
    );
  });
});
