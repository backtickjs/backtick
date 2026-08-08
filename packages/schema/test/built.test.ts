import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { SchemaDocument } from "@backtickjs/schema";
import * as built from "./built.ts";
import * as written from "./samples.ts";

// One assertion per document, and it is the whole of what the builder has to be
// right about: what it writes is what a generator would have read anyway.

describe("a schema the builder wrote", () => {
  it("is the web document, written by hand", () => {
    assert.deepEqual(built.web, written.web);
  });

  it("is the portable document, written by hand", () => {
    assert.deepEqual(built.portable, written.portable);
  });

  // Not `assert`: a document a generator can read is what the builder promises,
  // and a type is what says so.
  it("answers with a document", () => {
    const documents: SchemaDocument[] = [built.web, built.portable];
    assert.equal(documents.length, 2);
  });
});

// What phase 3 reads. The document is what a generator takes, but the *type* is
// what `Intrinsics<S>` maps, so an inference that widened would cost nothing at
// runtime and everything there. These are checked by compiling.
const _spellings: readonly ("text" | "number" | "checkbox" | "radio")[] =
  built.web.elements.input.properties.type.type.values;
const _members: readonly ("button" | "dialog" | "navigation")[] =
  built.web.types.ariaRole.values;
const _extended: readonly ["globalAttributes"] = built.web.elements.div.extends;
const _held: "content" = built.web.elements.div.children;
const _required: false = built.web.elements.input.properties.name.optional;
const _named: "viewStyle" =
  built.portable.elements.View.properties.style.type.name;
