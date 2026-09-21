import type {
  ClientScriptArrayElement,
  ClientScriptBlock,
  ClientScriptBody,
  ClientScriptDeclaration,
  ClientScriptExpression,
  ClientScriptStatement,
} from "@backtickjs/client-script";
import type { ScriptEntry } from "./ScriptEntry.js";
import { sourceName } from "./bindingKey.js";
import type {
  BundleArrayElement,
  BundleConstDeclaration,
  BundleLetDeclaration,
  BundleBlock,
  BundleBody,
  BundleExpression,
  BundleIdentifier,
  BundleParameter,
  BundleStatement,
} from "@backtickjs/platform-sdk";

// A parameter list as the wire carries it: one node per name. Shared with
// `buildBundle`, which builds entries and thunks the same way.
export function parameterNodes(names: readonly string[]): BundleParameter[] {
  return names.map((name) => ["param", name]);
}

// Lowers a script to its wire `BundleBody`. The mapping mirrors the grammar —
// expressions lower to expressions, statements to statements — with two places
// where the script itself decides what to emit: an identifier, and a splice.
//
// Both are read off the script rather than passed in, so a body follows from
// its own source. Nothing else here needs the script, which is why the builders
// close over them instead of threading them down every branch to reach two
// leaves.
export function lowerScriptBody(script: ScriptEntry): BundleBody {
  // An entry's parameters are one numbered sequence: a thunk per splice hole
  // the script writes, then a value per binding it captures. Both lists come
  // from the script, so the arity and the order are its own.
  //
  // A capture reads as its number rather than its source name, which is what
  // keeps it out of the way: `$` cannot start a source name, so a capture can
  // never be shadowed by a local, and neither ever needs renaming to avoid the
  // other. A binding the script declares still reads as itself, since that is
  // what the source says.
  const captureIndex = new Map(
    script.captures.map((key, at) => [key, script.splices.length + at]),
  );
  const read = (key: string): BundleExpression => {
    const at = captureIndex.get(key);
    return ["id", at === undefined ? sourceName(key) : `$${at}`];
  };

  // The body names holes by key; a reference's `args` are positional in the
  // script's `splices` order, so this maps between them. The hole hands its
  // thunk the bindings bound where it sits (see `spliceParams`), since a
  // fragment landing there can only reference what was in scope where it was
  // written.
  const holes = new Map(
    script.splices.map((splice, index) => [splice.key, index] as const),
  );
  const paramsOf = new Map(
    script.splices.map((splice) => [splice.key, splice.params] as const),
  );
  const renderSplice = (key: string): BundleExpression => {
    const index = holes.get(key);
    if (index === undefined) {
      throw new Error(`This script has no \`${key}\` splice.`);
    }
    // What a fragment landing here could want: the bindings bound at this hole,
    // then everything this script captured — which, captures being transitive,
    // already covers what a fragment nested here needs. Positional, in an order
    // the script fixes, so a call site reading the same metadata can line its
    // thunk up without either side knowing the other.
    const args = [...(paramsOf.get(key) ?? []), ...script.captures].map(
      (bound) => read(bound),
    );
    return ["()", ["id", `$${index}`], args];
  };

  const buildBody = (node: ClientScriptBody): BundleBody =>
    node.kind === "{}" ? buildBlock(node) : buildExpression(node);

  function buildBlock(node: ClientScriptBlock): BundleBlock {
    const statements = node.statements.map((statement) =>
      buildStatement(statement),
    );
    return ["{}", statements];
  }

  // The wire keeps a declaration flat: TypeScript's three nodes say where the
  // `const` sits and that a list could hold several, neither of which this
  // language has a second case for.
  function buildDeclaration(
    node: ClientScriptDeclaration,
  ): BundleConstDeclaration | BundleLetDeclaration {
    // Built per branch rather than with the kind chosen inside one tuple: a
    // node's kind is what says which node it is, so widening it loses that.
    const name = sourceName(node.name.bindingKey);
    const initializer = buildExpression(node.initializer);
    return node.kind === "const"
      ? ["const", name, initializer]
      : ["let", name, initializer];
  }

  function buildStatement(node: ClientScriptStatement): BundleStatement {
    switch (node.kind) {
      case "{}":
        return buildBlock(node);
      case "if": {
        return [
          "if",
          buildExpression(node.expression),
          buildStatement(node.thenStatement),
          node.elseStatement === null
            ? null
            : buildStatement(node.elseStatement),
        ];
      }
      case "while":
        return [
          "while",
          buildExpression(node.expression),
          buildStatement(node.statement),
        ];
      case "for":
        return [
          "for",
          node.initializer === null
            ? null
            : node.initializer.kind === "const" ||
                node.initializer.kind === "let"
              ? buildDeclaration(node.initializer)
              : buildExpression(node.initializer),
          node.condition === null ? null : buildExpression(node.condition),
          node.incrementor === null ? null : buildExpression(node.incrementor),
          buildStatement(node.statement),
        ];
      case "break":
        return ["break"];
      case "continue":
        return ["continue"];
      case "return":
        return ["return", buildExpression(node.expression)];
      case "throw":
        return ["throw", buildExpression(node.expression)];
      case "try": {
        const clause = node.catchClause;
        return [
          "try",
          buildBlock(node.tryBlock),
          [
            "catch",
            clause.variableDeclaration === null
              ? null
              : sourceName(clause.variableDeclaration.bindingKey),
            buildBlock(clause.block),
          ],
        ];
      }
      case "const":
      case "let":
        return buildDeclaration(node);
      default:
        // Every remaining kind is an expression, evaluated for its effect.
        return buildExpression(node);
    }
  }

  // A step names the variable it writes, as an assignment does.
  function stepTarget(operand: ClientScriptExpression): BundleIdentifier {
    if (operand.kind !== "id") {
      throw new Error("A step's operand must be an identifier.");
    }
    return ["id", sourceName(operand.bindingKey)];
  }

  function buildExpression(node: ClientScriptExpression): BundleExpression {
    const e = (child: ClientScriptExpression): BundleExpression =>
      buildExpression(child);
    // Where a list admits `...xs` as well as a value.
    const element = (child: ClientScriptArrayElement): BundleArrayElement =>
      child.kind === "..."
        ? ["...", buildExpression(child.expression)]
        : buildExpression(child);
    switch (node.kind) {
      case "arr":
        // Data, and a node is an array too, so it says which it is.
        return ["arr", node.elements.map(element)];
      case "=>": {
        const params = node.parameters.map((param) =>
          sourceName(param.name.bindingKey),
        );
        return ["=>", parameterNodes(params), buildBody(node.body)];
      }
      case "binop": {
        if (node.operatorToken === "=") {
          // Only a variable can be assigned to, which the compiler enforces
          // and the wire type states; this is where the two meet.
          if (node.left.kind !== "id") {
            throw new Error("An assignment target must be an identifier.");
          }
          return ["=", ["id", sourceName(node.left.bindingKey)], e(node.right)];
        }
        // A tuple whose first slot holds a union of operators is not the
        // union of tuples the fifteen kinds spell, and TypeScript will not
        // turn one into the other — so the shape is asserted once, here.
        return [
          node.operatorToken,
          e(node.left),
          e(node.right),
        ] as BundleExpression;
      }
      case "prefixop":
        // A negative literal carries itself, like every other literal here: the
        // node is TypeScript's way of writing one, not something to evaluate.
        // Except `-0`, which JSON writes as `0`: it travels as a negation.
        if (
          node.operator === "-" &&
          node.operand.kind === "number" &&
          node.operand.value !== 0
        ) {
          return -node.operand.value;
        }
        if (node.operator === "++") {
          return ["++x", stepTarget(node.operand)];
        }
        if (node.operator === "--") {
          return ["--x", stepTarget(node.operand)];
        }
        return node.operator === "!"
          ? ["!", e(node.operand)]
          : ["-x", e(node.operand)];
      case "postfixop":
        return node.operator === "++"
          ? ["x++", stepTarget(node.operand)]
          : ["x--", stepTarget(node.operand)];
      case "?:":
        return ["?:", e(node.condition), e(node.whenTrue), e(node.whenFalse)];
      case "true":
        return true;
      case "false":
        return false;
      case "()":
      case "?.()": {
        // The callee is built before the arguments, because building one can
        // mint a `functions` entry and the labels run in the order they are
        // taken. Binding them here keeps that order explicit.
        const callee = e(node.expression);
        const args = node.arguments.map(element);
        return node.kind === "()"
          ? ["()", callee, args]
          : ["?.()", callee, args];
      }
      case "id":
        return read(node.bindingKey);
      case "null":
        return null;
      // A node rather than the literal: JSON has no form for `undefined`.
      case "undefined":
        return ["undef"];
      case "number":
        return node.value;
      case "obj": {
        // An object literal serializes as the plain object it spells: what
        // ships is data, which is what lets a spliced object pass through
        // untouched — every key of it, the format reserving none.
        //
        // A spread has no key to write "and every key of that one" under, and
        // a computed key has no text to write at all. Either one makes the
        // literal what it means, `Object.fromEntries` over its pairs, with a
        // spread standing for `Object.entries` of what it spreads.
        const entries: { [key: string]: BundleExpression } = {};
        for (const property of node.properties) {
          if (property.kind === "..." || property.name.kind !== "string") {
            return [
              "()",
              ["bltn", "Object.fromEntries"],
              [
                [
                  "arr",
                  node.properties.map((property) =>
                    property.kind === "..."
                      ? [
                          "...",
                          [
                            "()",
                            ["bltn", "Object.entries"],
                            [e(property.expression)],
                          ],
                        ]
                      : ["arr", [e(property.name), e(property.initializer)]],
                  ),
                ],
              ],
            ];
          }
          entries[property.name.text] = e(property.initializer);
        }
        return entries;
      }
      case ".":
      case "?.": {
        const expression = e(node.expression);
        return node.kind === "."
          ? [".", expression, node.name]
          : ["?.", expression, node.name];
      }
      case "[]":
        return ["[]", e(node.expression), e(node.argumentExpression)];
      case "bltn":
        return ["bltn", node.name];
      // An element the script wrote, which is the node a tree entry already
      // builds: `children` is a prop beside the rest, so what draws one draws
      // both and nothing downstream learns a second kind of element.
      case "jsx": {
        const props: { [prop: string]: BundleExpression } = {};
        for (const attribute of node.attributes) {
          props[attribute.name] = e(attribute.initializer);
        }
        // One child stands on its own; several travel under a `ArrayLiteralExpression`,
        // which is how an array of data says it is not a node. None is `null`.
        const children: BundleExpression =
          node.children.length === 0
            ? null
            : node.children.length === 1
              ? e(node.children[0])
              : ["arr", node.children.map((child) => e(child))];
        // An element of the target is its own name, which is the id an element
        // node carries. The other is a tag the script wrote, and what it
        // splices is the expansion of what it named — an arrow over the one
        // parameter a component takes — so the tag lowers to a call of it.
        //
        // The props go as one object under the names the tag wrote, behind one
        // thunk the drawing calls where it reads them. That is what keeps a
        // prop a prop: an argument is evaluated once where it is passed, and a
        // prop has to be re-read whenever what it names changes.
        //
        // Called as a component, untracked: what its script reads while
        // setting up is read once, rather than running the setup again when
        // it changes.
        if (node.type.kind === "splice") {
          const passed: { [prop: string]: BundleExpression } = {};
          for (const [name, value] of Object.entries(props)) {
            passed[name] = ["=>", [], value];
          }
          return [
            "comp",
            renderSplice(node.type.key),
            passed,
            children === null ? null : ["=>", [], children],
          ];
        }
        if (node.type.kind === "id") {
          return ["comp", e(node.type), props, children];
        }
        return ["el", node.type.text, props, children];
      }
      case "splice":
        return renderSplice(node.key);
      case "string":
        return node.text;
      default: {
        const unhandled: never = node;
        throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
      }
    }
  }

  return buildBody(script.body);
}
