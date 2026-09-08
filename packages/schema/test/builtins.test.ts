import assert from "node:assert/strict";
import { describe, it } from "node:test";
// The built output, which is what a project generates against.
import { Type } from "../dist/index.js";
import { builtins } from "../dist/generators/builtins.js";
import type { Schema } from "../dist/index.js";

// What a schema's builtins turn into for the app that splices them. The names
// worth reading whole are here rather than in the artifacts, which are one
// value long between them.

const core: Schema = {
  package: "@backtickjs/core",
  namespace: "Core",
  extends: [],
  types: {
    Cell: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([], { read: Type.Function([], Type.Ref("T")) }),
    ),
    Store: Type.Interface([], {
      get: Type.Function(
        [Type.FunctionParameter("key", Type.String())],
        Type.String(),
      ),
    }),
  },
  elements: {},
  builtins: {
    // a name a script splices, whose signature names a type
    state: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [Type.FunctionParameter("initial", Type.Ref("T"))],
        Type.Apply(Type.Ref("Cell"), [Type.Ref("T")]),
      ),
    ),
    // a name holding what a client owns, rather than something to call
    store: Type.Ref("Store"),
    // the language's own: a member of a namespace and a member of a value,
    // both written in a script rather than imported into one
    "Math.floor": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),
    "string.trim": Type.Function(
      [Type.FunctionParameter("self", Type.String())],
      Type.String(),
    ),
  },
};

/** A target built on the root, which is what an import has to find. */
const target: Schema = {
  package: "@backtickjs/target",
  namespace: "Target",
  extends: [core],
  types: {
    Clip: Type.Interface([], { read: Type.Function([], Type.String()) }),
  },
  elements: {},
  builtins: { clipboard: Type.Ref("Clip") },
};

describe("builtins", () => {
  it("writes a value per name, under the name the schema keyed it by", () => {
    // What an app imports is what the schema wrote, so the two are one name and
    // nothing derives one from the other.
    assert.match(
      builtins(core),
      /export const state: Client<<T>\(initial: T\) => Cell<T>> = createBuiltin\("state"\);/,
    );
  });

  it("writes a name holding a value as readily as one to call", () => {
    // A target groups what it offers by handing over one name holding several
    // members, which is why this is not a signature.
    assert.match(
      builtins(core),
      /export const store: Client<Store> = createBuiltin\("store"\);/,
    );
  });

  it("writes nothing for a name the language answers for", () => {
    // A member of one of its namespaces and a member of a client value. Both
    // are recognised where they are written, so there is no value for an app
    // to reach them through.
    const written = builtins(core);
    assert.doesNotMatch(written, /Math\.floor/);
    assert.doesNotMatch(written, /string\.trim/);
  });

  it("refuses a dotted name the language does not answer for", () => {
    // The one a rule read off the dot would skip in silence: nothing generated,
    // no identifier to import it as, and a schema that looks like it worked.
    // Grouping is done by the value a name holds, not by the dots in it.
    assert.throws(
      () =>
        builtins({
          ...core,
          builtins: { "localStorage.get": Type.Ref("Store") },
        }),
      /`localStorage\.get` is neither a name the language answers for/,
    );
  });

  it("writes no file at all where a schema has nothing to splice", () => {
    // An empty artifact is a name for an app to import from and find nothing
    // in, so the schema that declares only the language's own writes none.
    const { state, store, ...named } = core.builtins;
    assert.equal(builtins({ ...core, builtins: named }), "");
    assert.equal(builtins({ ...core, builtins: {} }), "");
  });

  it("writes its own and nothing it inherited", () => {
    // A base wrote its own values beside its own artifact, and an app reaches a
    // name from the package that declared it.
    const written = builtins(target);
    assert.match(
      written,
      /export const clipboard: Client<Clip> = createBuiltin\("clipboard"\);/,
    );
    assert.doesNotMatch(written, /\bstate\b/);
  });

  it("reads what may cross the boundary from `boundary`, at every layer", () => {
    // `createBuiltin` and `Client` are the boundary's, not a layer's, so the root
    // and a target above it read them the same way. What a layer declares is
    // still read through that layer's own artifact.
    for (const schema of [core, target]) {
      assert.match(
        builtins(schema),
        /import \{ createBuiltin, type Client \} from "@backtickjs\/boundary";/,
      );
    }
    assert.match(
      builtins(core),
      /import type \{\n {2}Cell,\n {2}Store,\n\} from "\.\/declarations\.generated\.js";/,
    );
    assert.match(
      builtins(target),
      /import type \{\n {2}Clip,\n\} from "\.\/declarations\.generated\.js";/,
    );
  });

  it("does not look for a name a generic bound itself", () => {
    // `state` refs its own `T`, which is in scope only inside it — an import
    // written for one is an import nothing resolves.
    assert.doesNotMatch(builtins(core), /^ {2}T,$/m);
  });

  it("reaches for what a value reads as, which is the boundary's", () => {
    // Not a layer's to publish: `Client` comes from `@backtickjs/boundary`
    // wherever it is written, so a root has nothing of its own to hand on.
    assert.match(
      builtins(core),
      /import \{ createBuiltin, type Client \} from "@backtickjs\/boundary";/,
    );
  });
});
