import type { Bundle, ClientUnknown } from "@backtickjs/platform-sdk";
import { generate } from "astring";
import type * as ES from "estree";
import type { BundleTree } from "../bundle/buildBundle.js";
import { arrow, call, identifier, member, stringLiteral } from "../estree.js";

/**
 * A bundle tree as JavaScript: one expression that answers with what the
 * tree's root evaluates to, printed by `astring`.
 *
 * Literals are printed as literals, strings escaped so that no `</script>` or
 * `<!--` appears. The bundle does not yet tell a value the host computed from
 * one a script wrote, so both are printed that way for now. An element's tag
 * or prop name that is not a plain name is data: the expression carries its
 * data in one `JSON.parse`, and reads it as `$d[i]`.
 *
 * An element or a component is a call of the client's `jsx`, and a builtin is
 * read as the global of its name: defining a client is putting them on the
 * global object before any bundle runs. What an element is, is the client's.
 */

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// What the bundle itself names, beside the builtins it reads.
const RUNTIME = ["$d", "fixed", "globalThis", "jsx"];

// Names a bundle may not bind: it is strict code, and `await` is reserved in a
// module.
const UNBINDABLE = new Set(["arguments", "await", "eval", "yield"]);

export function printBundle<T extends ClientUnknown>(
  tree: BundleTree,
): Bundle<T> {
  const { names } = tree;
  const bound = new Set(names.bindings.map((node) => node.name));
  // Taken by the bundle, so a binding or a label named the same is renamed.
  const taken = new Set([...RUNTIME, ...names.builtins]);
  const fresh = (base: string): string => {
    let at = 1;
    while (taken.has(`${base}_${at}`) || bound.has(`${base}_${at}`)) {
      at += 1;
    }
    taken.add(`${base}_${at}`);
    return `${base}_${at}`;
  };

  // A binding keeps the name as written, unless the bundle needs it or may not
  // bind it; every binding of one name is renamed alike.
  const printed = new Map<string, string>();
  for (const node of names.bindings) {
    let name = printed.get(node.name);
    if (name === undefined) {
      name =
        IDENTIFIER.test(node.name) &&
        !taken.has(node.name) &&
        !UNBINDABLE.has(node.name)
          ? node.name
          : fresh(IDENTIFIER.test(node.name) ? node.name : "binding");
      printed.set(node.name, name);
    }
    node.name = name;
  }

  // Labels numbered in table order, clear of every binding.
  const labels = new Map<string, string>();
  let next = 1;
  for (const [key] of tree.functions) {
    while (taken.has(`f${next}`) || bound.has(`f${next}`)) {
      next += 1;
    }
    labels.set(key, `f${next}`);
    taken.add(`f${next}`);
  }
  for (const [node, key] of names.labels) {
    node.name = labels.get(key)!;
  }

  const functions: ES.Statement[] = tree.functions.map(([key, body]) => ({
    type: "VariableDeclaration",
    kind: "const",
    declarations: [
      {
        type: "VariableDeclarator",
        id: identifier(labels.get(key)!),
        init: body,
      },
    ],
  }));
  const carried: ES.Expression =
    names.data.length === 0
      ? { type: "ArrayExpression", elements: [] }
      : call(member(identifier("JSON"), "parse", false), [
          stringLiteral(JSON.stringify(names.data)),
        ]);
  const program = call(
    arrow([identifier("$d")], {
      type: "BlockStatement",
      body: [...functions, { type: "ReturnStatement", argument: tree.root }],
    }),
    [carried],
  );
  return generate(program) as Bundle<T>;
}
