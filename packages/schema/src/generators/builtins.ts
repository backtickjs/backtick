import { IsGeneric } from "../nodes/Generic.js";
import { IsRef } from "../nodes/Ref.js";
import { documentation, identifier, tags, type } from "./typescript.js";
import type { TGeneric } from "../nodes/Generic.js";
import type { TRef } from "../nodes/Ref.js";
import type { Schema } from "../Schema.js";
import { format } from "./format.js";
import type { TNode } from "../TNode.js";

// A schema's builtins as the values an app imports and splices.
//
// A script may write no name bare but the language's own, so a name the
// framework or a target provides needs a host value to be imported as. This
// writes those values: one per name, carrying the name and the signature the
// schema declared for it, so what an app splices and what a client answers for
// are the same document read twice.
//
// Which names those are is read off the list below rather than off the shape of
// a name. Everything else is a whole name a script splices, and it is written
// under exactly that name: what a schema keyed it by is what an app imports.
//
// A name reached here is not checked against what the schema declares.
// `declarations` reads the same nodes and throws on one it cannot find, and
// both run from the one command.

/**
 * Every name the host language provides, which a script writes rather than
 * imports.
 *
 * A script reaches one by writing it — `Math.floor`, `"x".trim()`,
 * `setTimeout(…)` — so there is no value for an app to import it through, and
 * nothing here to write. Eight are fronts, dot and all: four a place statics
 * hang off and four a kind of value a member is read off. The rest are whole
 * names, which need no member to be one.
 *
 * Written out rather than read off the dot, because the two are not the same
 * question. A name is skipped here because the language answers for it, and a
 * dotted name the language does not answer for is a mistake — one no app can
 * import, since there is no identifier to import it as. Inferring from the dot
 * would skip that one silently and call it a working schema.
 *
 * Kept by hand, and kept with the language: `rewriteNode.ts` holds the same
 * list in the same shape — the fronts and whole names a script writes bare —
 * and `receivers.ts` the four a member is read off. A name added to either is
 * added here. One this misses is written as a value to splice, for a name no
 * script splices.
 */
const language: readonly string[] = [
  "Array.",
  "JSON.",
  "Math.",
  "Number.",
  "String.",
  "array.",
  "boolean.",
  "number.",
  "string.",
  "clearInterval",
  "clearTimeout",
  "setInterval",
  "setTimeout",
];

/** The values a script splices to reach the builtins a schema declares. */
export function builtins(schema: Schema): string {
  // This schema's own, and never what it inherited: a base wrote its own values
  // beside its own artifact, and an app reaches a name from the package that
  // declared it.
  const spliced: [string, TNode][] = [];
  for (const [name, node] of Object.entries(schema.builtins)) {
    if (language.some((front) => name.startsWith(front))) {
      continue;
    }
    if (!identifier(name)) {
      throw new Error(
        `\`${name}\` is neither a name the language answers for nor one an ` +
          "app can import: a builtin a script splices is written as the " +
          "identifier it is imported as, and what it groups is the value it " +
          "holds rather than the dots in its name",
      );
    }
    spliced.push([name, node]);
  }
  if (spliced.length === 0) {
    return "";
  }

  // Every type a value's signature names, which is what this file has to
  // import. A generic's parameters are its own and in scope only inside it, so
  // a ref to one is not a name to find — the rule `declarations` reads a
  // builtin under, because it is reading these same nodes.
  const reached = new Set<string>();
  const declares = (node: unknown, bound: ReadonlySet<string>): void => {
    if (typeof node !== "object" || node === null) {
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((one) => declares(one, bound));
      return;
    }
    const held = IsGeneric(node as TNode)
      ? new Set([
          ...bound,
          ...(node as TGeneric).parameters.map((one) => one.name),
        ])
      : bound;
    if (IsRef(node as TNode) && !held.has((node as TRef).$ref)) {
      reached.add((node as TRef).$ref);
    }
    Object.values(node).forEach((one) => declares(one, held));
  };
  spliced.forEach(([, node]) => declares(node, new Set()));

  // Where the two names this file writes for itself come from.
  //
  // A schema with something under it reaches every type through its own
  // artifact: `declarations.generated.ts` re-exports what its base declared,
  // so one import covers the signatures and `Client` alike whatever layer this
  // is. The root has no such re-export — it declares its types and publishes
  // `Client` by hand — so both are read beside it.
  //
  // `createBuiltin` is a value, and no artifact carries one. At the root it
  // sits beside the type it makes; above the root it is the base's to hand on,
  // the way a base hands on every other name.
  const head = ["// Generated by `pnpm generate`. Do not edit.", ""];
  const shared = [...reached].filter((one) => format.has(one)).sort();
  const own = [...reached].filter((one) => !format.has(one)).sort();
  head.push(
    `import { createBuiltin, ${["type Client", ...shared.map((one) => `type ${one}`)].join(", ")} } from "@backtickjs/boundary";`,
  );
  if (own.length > 0) {
    head.push(`import type {`);
    for (const one of own) {
      head.push(`  ${one},`);
    }
    head.push(`} from "./declarations.generated.js";`);
  }
  head.push("");

  const lines: string[] = [];
  for (const [name, node] of spliced) {
    lines.push(...documentation(node, "", tags(node)));
    lines.push(
      `export const ${name}: Client<${type(node)}> = createBuiltin("${name}");`,
    );
    lines.push("");
  }

  return [...head, ...lines].join("\n");
}
