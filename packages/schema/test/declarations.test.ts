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
  types: {
    // names a drawing, so the framework's own name is reached from here
    Drawn: Type.Union([Type.Element(), Type.Null()]),
    Cell: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([], { read: Type.Function([], Type.Ref("T")) }),
    ),
  },
  tags: {},
  builtins: { state: Type.Ref("Cell") },
};

/** A schema between the root and a target, which is what an import has to find. */
const middle: Schema = {
  package: "@backtickjs/middle",
  extends: [core],
  types: {
    Shared: Type.Union([Type.String(), Type.Number()]),
  },
  tags: {},
  builtins: {},
};

const target: Schema = {
  package: "@backtickjs/target",
  extends: [middle],
  types: {
    Props: Type.Interface([], {
      value: Type.Optional(Type.Ref("Shared")),
      onpick: Type.Optional(Type.Function([], Type.Void())),
      children: Type.Optional(Type.Element()),
    }),
  },
  tags: { pick: Type.Tag(Type.Ref("Props")) },
  builtins: {},
};

describe("declarations", () => {
  it("names a type where it was declared, however deep", () => {
    const written = declarations(target);
    assert.match(
      written,
      /import type \{\n {2}Shared,\n\} from "@backtickjs\/middle";/,
      "a middle schema's name comes from the middle schema's package",
    );
    assert.match(
      written,
      /import type \{[^}]*ClientElement[^}]*\} from "@backtickjs\/core";/,
      "the framework's own names come from the schema everything extends",
    );
  });

  it("writes its own names beside it, and no import for them", () => {
    const written = declarations(core);
    assert.match(
      written,
      /import type \{ ClientElement \} from ".\/ClientElement.js";/,
      "the package that publishes a name reaches it beside itself",
    );
    assert.doesNotMatch(written, /from "@backtickjs\/core"/);
  });

  it("declares what it wrote and nothing it inherited", () => {
    const written = declarations(target);
    assert.match(written, /export interface Props/);
    assert.doesNotMatch(written, /export type Shared/);
    assert.doesNotMatch(written, /export interface Cell/);
  });

  it("wraps what a tag accepts, and only that", () => {
    const written = declarations(target);
    // a prop holds a value or a script standing in for one
    assert.match(written, /value\?: Prop<Shared>;/);
    // a function prop is a script and never a host function
    assert.match(written, /onpick\?: Client<\(\) => void>;/);
    // what goes inside a tag is children
    assert.match(written, /children\?: Children<ClientElement>;/);
    // and a client's own interface is not props
    assert.doesNotMatch(declarations(core), /Prop</);
  });

  it("writes the tags it declares, and what each accepts", () => {
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

  it("refuses a name the schema does not declare", () => {
    const named: Schema = { ...core, types: { A: Type.Ref("Missing") } };
    assert.throws(
      () => declarations(named),
      /names `Missing` and does not declare it/,
    );
  });
});
