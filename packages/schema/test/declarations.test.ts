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
  namespace: "Core",
  extends: [],
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
  namespace: "Middle",
  extends: [core],
  types: {
    Shared: Type.Union([Type.String(), Type.Number()]),
  },
  elements: {},
  builtins: {},
};

const target: Schema = {
  package: "@backtickjs/target",
  namespace: "Target",
  extends: [middle],
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

/** An element whose children position holds a script that makes drawings. */
const list: Schema = {
  package: "@backtickjs/list",
  namespace: "List",
  extends: [middle],
  types: {
    ListProps: Type.Interface([], {
      each: Type.Array(Type.Ref("Shared"), {
        description: "The array to draw one thing per member of.",
      }),
      children: Type.Function(
        [Type.FunctionParameter("member", Type.Ref("Shared"))],
        Type.Ref("Drawing"),
      ),
    }),
  },
  elements: { list: Type.Ref("ListProps") },
  builtins: {},
};

describe("declarations", () => {
  it("names a type where it is offered, not where it was written", () => {
    const written = declarations(target);
    // `Shared` is the middle schema's own and arrives from the one this is
    // built on, so a target needs no dependency on a package further up.
    assert.match(
      written,
      /import type \{[^}]*\bShared,[^}]*\} from "@backtickjs\/middle";/,
    );
    // `Drawing` is this schema's children type and nothing else, and the
    // children position takes `Children` rather than what a schema declared
    // for it — so no line here says `Drawing`, and an import would read nothing.
    assert.doesNotMatch(written, /import type \{[^}]*\bDrawing\b[^}]*\}/);
    assert.doesNotMatch(written, /from "@backtickjs\/core"/);
    // `Prop` is the ui schema's, wherever it is named, so it comes from one place
    // every layer rather than being handed up like the rest.
    assert.match(
      written,
      /import type \{[^}]*\bProp,[^}]*\} from "@backtickjs\/ui";/,
    );
  });

  it("reaches the wrapping's own names in one hop, at the root", () => {
    const root: Schema = {
      package: "@backtickjs/core",
      namespace: "Core",
      extends: [],
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
      /import type \{[^}]*\bProp,[^}]*\} from "@backtickjs\/ui";/,
      "a root reaches the wrapping's names the same way every layer above does",
    );
    assert.doesNotMatch(written, /from "@backtickjs\/core"/);
  });

  it("hands on everything the schemas under it declare", () => {
    // `Cell` is the root's and `Shared` the middle's, and a file written
    // against this schema reaches both by naming one package.
    assert.match(
      declarations(target),
      /export type \{\n {2}Cell,\n {2}Drawing,\n {2}Drawn,\n {2}Shared,\n\} from "@backtickjs\/middle";/,
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

  it("writes a children position holding a function as a script", () => {
    // A script and never the node type itself, which would admit a host
    // function and a list of them beside it: what stands here makes drawings
    // rather than being one.
    assert.match(
      declarations(list),
      /children: Client<\(member: Shared\) => Drawing>;/,
    );
  });

  it("keeps what a prop says about itself", () => {
    assert.match(
      declarations(list),
      / \* The array to draw one thing per member of\.\n {3}\*\/\n {2}each: Prop<Shared\[\]>;/,
    );
  });

  it("wraps what an element accepts, and only that", () => {
    const written = declarations(target);
    // a prop holds a value or a script standing in for one
    assert.match(written, /value\?: Prop<Shared>;/);
    // a function prop is a script and never a host function: `Prop` drops its
    // written arm where the server has no way to write one
    assert.match(written, /onpick\?: Prop<\(\) => void>;/);
    // what goes inside an element takes its own type: `Prop` over the arms that
    // are one thing and a plain array over the rest, which no wrapper says
    assert.match(written, /children\?: Children;/);
    // and a client's own interface is not props
    assert.doesNotMatch(declarations(core), /Prop</);
  });

  it("writes the elements it declares, and what each accepts", () => {
    // Its own under its namespace, and the chain gathered separately: a target
    // answering for its own tags reads the first, and a tag written in a
    // document is checked against the second.
    assert.match(
      declarations(target),
      /export interface TargetElements \{\n {2}pick: Props;\n\}/,
    );
    assert.match(
      declarations(target),
      /export interface Elements extends MiddleElements, TargetElements \{\}/,
    );
    // its own and nothing it inherited: the chain is what gathers them
    assert.doesNotMatch(declarations(target), /\bstate\b/);
  });

  it("writes what a client owes, from its own names", () => {
    // Two interfaces, because two questions are asked of this: a client for one
    // layer answers for that layer's names, and a script reaches every name in
    // scope. The first is the layer's own, under its namespace.
    assert.match(
      declarations(core),
      /export interface CoreBuiltins \{\n {2}state: Cell;\n\}/,
    );
    assert.match(
      declarations(core),
      /export interface Builtins extends CoreBuiltins \{\}/,
    );
    assert.doesNotMatch(declarations(target), /state: Cell;/);
  });

  it("writes both names at every layer, so a chain has no gap in it", () => {
    // `middle` declares neither an element nor a builtin. Written anyway,
    // because a layer that skipped one is where the chain stops: the schema
    // above it would extend a name that is not there, and what a base declares
    // would stop arriving.
    const written = declarations(middle);
    assert.match(written, /export interface MiddleElements \{\n\}/);
    assert.match(
      written,
      /export interface Elements extends CoreElements, MiddleElements \{\}/,
    );
    // Its own is empty and still written: a layer that skipped it is a name the
    // layer above extends and cannot find.
    assert.match(written, /export interface MiddleBuiltins \{\n\}/);
    assert.match(
      written,
      /export interface Builtins extends CoreBuiltins, MiddleBuiltins \{\}/,
    );
    // the root declares no element and still writes both names
    assert.match(declarations(core), /export interface CoreElements \{\n\}/);
    assert.match(
      declarations(core),
      /export interface Elements extends CoreElements \{\}/,
    );
  });

  it("extends each base under the name of the package it came from", () => {
    // This file declares both names itself, so a heritage is aliased — and it
    // is read from the base that offers it, like every other name here.
    assert.match(
      declarations(target),
      /import type \{\n[^}]*  Builtins as MiddleBuiltins,\n[^}]*  Elements as MiddleElements,\n[^}]*\} from "@backtickjs\/middle";/,
    );
    assert.doesNotMatch(declarations(target), /from "@backtickjs\/core"/);
  });

  it("hands on what its base declares, and none of the language's own", () => {
    const written = declarations(middle);
    assert.match(
      written,
      /export type \{\n {2}Cell,\n {2}Drawing,\n {2}Drawn,\n\} from "@backtickjs\/core";/,
    );
    // A language name is reached from the language at every layer, so a base
    // hands on none of them — not even one a declaration under it wrote.
    assert.doesNotMatch(written, /\bProp\b/);
    assert.doesNotMatch(written, /\bBacktickNode\b/);
  });

  it("imports what a declaration writes, not what it says about itself", () => {
    // A framework name is found by reading the file back, since no ref names
    // one — so prose that spells one has to not count, or the artifact imports
    // a type nothing in it reads.
    const prose: Schema = {
      package: "@backtickjs/core",
      namespace: "Core",
      extends: [],
      types: {
        Held: Type.String({
          description: "Neither a `Prop` nor `BacktickNode`, whatever it says.",
        }),
      },
      elements: {},
      builtins: {},
    };
    const written = declarations(prose);
    assert.match(written, /Neither a `Prop` nor `BacktickNode`/);
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

// A tuple is how the bundle format says every one of its nodes: a word naming
// the kind, then what that kind holds. What is checked here is what a reader
// outside TypeScript needs — that the positions keep their names and their
// order.
describe("a tuple", () => {
  const written = (types: Schema["types"]): string =>
    declarations({ ...core, types: { ...core.types, ...types } });

  it("names every position, in the order the schema wrote them", () => {
    assert.match(
      written({
        Call: Type.Tuple({
          kind: Type.Literal("()"),
          expression: Type.Ref("Drawn"),
          args: Type.Array(Type.Ref("Drawn")),
        }),
      }),
      /export type Call = \[kind: "\(\)", expression: Drawn, args: Drawn\[\]\];/,
    );
  });

  it("holds a ref back to what holds it", () => {
    // The bundle's shape: an expression is a union of tuples, and a tuple holds
    // expressions. Nothing new is needed to say it — the ref does the work.
    const out = written({
      Expression: Type.Union([Type.Number(), Type.Ref("Negation")]),
      Negation: Type.Tuple({
        kind: Type.Literal("-x"),
        operand: Type.Ref("Expression"),
      }),
    });
    assert.match(out, /export type Expression = number \| Negation;/);
    assert.match(
      out,
      /export type Negation = \[kind: "-x", operand: Expression\];/,
    );
  });

  it("is written `readonly` where the schema says so", () => {
    assert.match(
      written({
        Pair: Type.Tuple(
          { a: Type.Number(), b: Type.Number() },
          { readOnly: true },
        ),
      }),
      /export type Pair = readonly \[a: number, b: number\];/,
    );
  });

  it("carries an empty run", () => {
    assert.match(
      written({ Break: Type.Tuple({ kind: Type.Literal("break") }) }),
      /export type Break = \[kind: "break"\];/,
    );
  });

  it("is walked for the names it reaches", () => {
    // A ref inside a position is a ref: a tuple the validator did not read into
    // would let an unresolvable name through, which is the one thing a closed
    // document may not have.
    assert.throws(
      () =>
        written({
          Held: Type.Tuple({
            kind: Type.Literal("k"),
            held: Type.Ref("Missing"),
          }),
        }),
      /names `Missing` and does not declare it/,
    );
  });

  it("refuses a position standing on its own as a type", () => {
    assert.throws(
      () => written({ Stray: Type.Tuple({ a: Type.Number() }).items[0]! }),
      /a tuple element is a position, not a type/,
    );
  });
});

// An opaque type with parameters and nothing to read: the parameters have
// nowhere to appear but the brand, which is what `Bundle<T>` is.
describe("a brand", () => {
  // Declared here, because a schema may no longer name what it does not
  // declare: the root of every opaque type is a type like any other.
  const written = (types: Schema["types"]): string =>
    declarations({
      ...core,
      types: {
        ...core.types,
        ClientHandle: Type.Interface([], {}),
        ...types,
      },
    });

  it("carries the parameters of an opaque type that has no members", () => {
    assert.match(
      written({
        Held: Type.Generic(
          [Type.GenericParameter("T")],
          Type.Interface([Type.Ref("ClientHandle")], {}),
        ),
      }),
      /export interface Held<T> extends ClientHandle \{\n {2}readonly \[HeldBrand\]: T;\n\}/,
    );
  });

  it("carries several as a run of them", () => {
    assert.match(
      written({
        Pair: Type.Generic(
          [Type.GenericParameter("T"), Type.GenericParameter("U")],
          Type.Interface([Type.Ref("ClientHandle")], {}),
        ),
      }),
      /readonly \[PairBrand\]: \[T, U\];/,
    );
  });

  it("stays `never` where a member already names the parameter", () => {
    // `State<T>` reads and writes one, so the parameter is carried by what the
    // type says rather than by what holds two of them apart.
    assert.match(
      written({
        Cellish: Type.Generic(
          [Type.GenericParameter("T")],
          Type.Interface([Type.Ref("ClientHandle")], {
            read: Type.Function([], Type.Ref("T")),
          }),
        ),
      }),
      /readonly \[CellishBrand\]: never;/,
    );
  });

  it("stays `never` where there are no parameters", () => {
    assert.match(
      written({ Opaque: Type.Interface([Type.Ref("ClientHandle")], {}) }),
      /readonly \[OpaqueBrand\]: never;/,
    );
  });
});
