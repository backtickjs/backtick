import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type {
  SchemaDocument,
  SchemaProperties,
  SchemaType,
  SchemaVoid,
} from "@backtickjs/schema";
import { portable, web } from "./samples.ts";

// The vocabulary has no code behind it yet, so what a test can do is hold the
// samples to being documents a generator could read. All of it moves into
// `parse()` when there is one.

// Every type a document mentions, nested ones included.
function* types(document: SchemaDocument): Generator<SchemaType | SchemaVoid> {
  const walk = function* (
    type: SchemaType | SchemaVoid,
  ): Generator<SchemaType | SchemaVoid> {
    yield type;
    if (type.kind === "union") {
      for (const member of type.of) {
        yield* walk(member);
      }
    } else if (type.kind === "list") {
      yield* walk(type.of);
    } else if (type.kind === "object" || type.kind === "interface") {
      yield* properties(type.properties);
    } else if (type.kind === "function") {
      for (const param of type.params) {
        yield* walk(param.type);
      }
      yield* walk(type.returns);
    }
  };
  const properties = function* (
    bag: SchemaProperties,
  ): Generator<SchemaType | SchemaVoid> {
    for (const property of Object.values(bag)) {
      yield* walk(property.type);
    }
  };
  for (const type of Object.values(document.types)) {
    yield* walk(type);
  }
  for (const element of Object.values(document.elements)) {
    yield* properties(element.properties);
  }
}

// What each name composes with, and the kind it has to find there.
type Composed = { readonly names: readonly string[]; readonly kind: string };

function composed(document: SchemaDocument): Map<string, Composed> {
  const found = new Map<string, Composed>();
  for (const [name, type] of Object.entries(document.types)) {
    if (type.kind === "interface") {
      found.set(name, { names: type.extends, kind: "interface" });
    } else if (type.kind === "object") {
      found.set(name, { names: type.includes, kind: "object" });
    }
  }
  for (const [tag, element] of Object.entries(document.elements)) {
    found.set(tag, { names: element.extends, kind: "interface" });
  }
  return found;
}

// What each named type aliases: a top-level `reference` and nothing deeper.
function aliased(document: SchemaDocument): Map<string, readonly string[]> {
  return new Map(
    Object.entries(document.types).map(([name, type]) => [
      name,
      type.kind === "reference" ? [type.name] : [],
    ]),
  );
}

// Whether following `edges` from a name comes back to it.
function assertAcyclic(edges: Map<string, readonly string[]>, what: string) {
  for (const start of edges.keys()) {
    const seen = new Set<string>();
    const pending = [start];
    while (pending.length > 0) {
      const at = pending.pop() as string;
      for (const next of edges.get(at) ?? []) {
        assert.notEqual(next, start, `\`${start}\` ${what} itself`);
        if (!seen.has(next)) {
          seen.add(next);
          pending.push(next);
        }
      }
    }
  }
}

function check(name: string, document: SchemaDocument): void {
  describe(name, () => {
    it("refers to a declared type, and never to an interface", () => {
      for (const type of types(document)) {
        if (type.kind === "reference") {
          const target = document.types[type.name];
          assert.ok(target !== undefined, `no type named \`${type.name}\``);
          assert.notEqual(
            target.kind,
            "interface",
            `\`${type.name}\` is an interface, which is not a value`,
          );
        }
      }
    });

    it("composes with a declared name of the kind that position admits", () => {
      for (const [from, { names, kind }] of composed(document)) {
        for (const base of names) {
          const type = document.types[base];
          assert.ok(type !== undefined, `\`${from}\` names no \`${base}\``);
          assert.equal(
            type.kind,
            kind,
            `\`${from}\` names \`${base}\`, which is not a ${kind}`,
          );
        }
      }
    });

    it("composes with nothing that composes with it back", () => {
      const edges = new Map(
        [...composed(document)].map(([name, { names }]) => [name, names]),
      );
      assertAcyclic(edges, "composes with");
    });

    it("aliases nothing that aliases it back", () => {
      assertAcyclic(aliased(document), "aliases");
    });
  });
}

describe("a hand-written schema document", () => {
  check("web", web);
  check("portable", portable);
});
