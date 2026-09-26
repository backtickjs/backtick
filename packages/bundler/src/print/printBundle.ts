import type { Bundle, ClientUnknown } from "@backtickjs/platform-sdk";
import { parse } from "acorn";
import { GENERATOR, generate } from "astring";
import type * as ES from "estree";
import type { BundleTree } from "../bundle/buildBundle.js";
import { arrow, identifier, member } from "../estree.js";
import type { JsxElement } from "../estree.js";

/**
 * What an adapter's transform does to a bundle's module, shaped as a Vite
 * plugin's `transform`: the code and its module id in, whatever the
 * framework's compiler made of it out, with a source map (as JSON) into the
 * code it was given.
 */
export type CodeTransform = (
  code: string,
  id: string,
) => { readonly code: string; readonly map: string };

/**
 * A bundle tree as JavaScript: one expression that answers with what the
 * tree's root evaluates to.
 *
 * The tree is printed as a JSX module, by `astring`: its imports, each entry,
 * and the root as `$bundle`. The adapter's transform compiles it as the
 * framework compiles any module, and its imports become reads of the modules
 * the client registered under `$modules`, so `eval` can run it. Everything is
 * inside one function, so what the framework's compiler declares stays the
 * bundle's own.
 *
 * Strings are printed escaped so that no `</script>` or `<!--` appears, and a
 * builtin is read as the global of its name.
 */

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// What the bundle itself names, beside the builtins it reads.
const RUNTIME = ["$Script", "$bundle", "$modules", "globalThis"];

// Names a bundle may not bind: it is strict code, and `await` is reserved in a
// module.
const UNBINDABLE = new Set(["arguments", "await", "eval", "yield"]);

export function printBundle<T extends ClientUnknown>(
  tree: BundleTree,
  transform: CodeTransform,
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

  const functions = tree.functions.map(([key, body]) =>
    constant(labels.get(key)!, body),
  );
  const imports: ES.ImportDeclaration[] = [...names.imports.values()].map(
    ({ from, name, local }): ES.ImportDeclaration => ({
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportSpecifier",
          imported: identifier(name),
          local: identifier(local),
        },
      ],
      source: { type: "Literal", value: from },
      attributes: [],
    }),
  );
  // What draws a script a component drew: a component whose body runs it.
  const script: ES.Statement[] = names.drawsScript
    ? [
        constant(
          "$Script",
          arrow(
            [identifier("props")],
            {
              type: "CallExpression",
              callee: member(identifier("props"), "run", false),
              arguments: [],
              optional: false,
            },
          ),
        ),
      ]
    : [];
  const program: ES.Program = {
    type: "Program",
    sourceType: "module",
    body: [
      ...imports,
      ...script,
      ...functions,
      constant("$bundle", tree.root),
    ],
  };
  const module = generate(program, { generator });
  return asScript(transform(module, "bundle.jsx").code) as Bundle<T>;
}

function constant(name: string, init: ES.Expression): ES.VariableDeclaration {
  return {
    type: "VariableDeclaration",
    kind: "const",
    declarations: [{ type: "VariableDeclarator", id: identifier(name), init }],
  };
}

type State = { write(code: string): void };
type Generator = Record<string, (node: never, state: State) => void>;

const generator = {
  ...GENERATOR,
  // A script's entry, written as it was compiled (see `raw`).
  Raw(node: { code: string }, state: State) {
    state.write(node.code);
  },
  JsxElement(this: Generator, node: JsxElement, state: State) {
    const tag = typeof node.tag === "string" ? node.tag : node.tag.name;
    const expression = (value: ES.Expression) => {
      state.write("{");
      this[value.type]!(value as never, state);
      state.write("}");
    };
    state.write(`<${tag}`);
    for (const [name, value] of node.attributes) {
      state.write(` ${name}=`);
      expression(value);
    }
    if (node.children.length === 0) {
      state.write(" />");
      return;
    }
    state.write(">");
    for (const child of node.children) {
      if ((child as { type: string }).type === "JsxElement") {
        this.JsxElement!(child as never, state);
      } else {
        expression(child);
      }
    }
    state.write(`</${tag}>`);
  },
} as unknown as typeof GENERATOR;

// A compiled module as one expression `eval` can run: its imports read from
// `$modules`, and `$bundle` answered once everything after it has run.
function asScript(code: string): string {
  const program = parse(code, { ecmaVersion: "latest", sourceType: "module" });
  const reads: string[] = [];
  let body = code;
  for (const statement of [...program.body].reverse()) {
    if (statement.type !== "ImportDeclaration") {
      continue;
    }
    const module = `$modules[${JSON.stringify(statement.source.value)}]`;
    const named: string[] = [];
    for (const specifier of statement.specifiers) {
      if (specifier.type === "ImportNamespaceSpecifier") {
        reads.push(`const ${specifier.local.name} = ${module};`);
      } else {
        const name =
          specifier.type === "ImportDefaultSpecifier"
            ? "default"
            : specifier.imported.type === "Identifier"
              ? specifier.imported.name
              : String(specifier.imported.value);
        named.push(`${JSON.stringify(name)}: ${specifier.local.name}`);
      }
    }
    if (named.length > 0) {
      reads.push(`const { ${named.join(", ")} } = ${module};`);
    }
    body = body.slice(0, statement.start) + body.slice(statement.end);
  }
  return `(() => {\n${reads.reverse().join("\n")}\n${body.trim()}\nreturn $bundle;\n})()`;
}
