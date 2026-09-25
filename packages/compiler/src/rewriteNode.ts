import type ts from "typescript";
import type * as ES from "estree";
import type * as JSX from "estree-jsx";
import type { CodeInformation } from "./CodeInformation.js";
import { call, varDeclList } from "./nodeFactory.js";
import {
  isComponentTag,
  isFragmentTag,
  jsxText,
  type Splice,
} from "@backtickjs/client-script";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import { mangle } from "./unmangle.js";

// The global object's names from ECMA-262 and ECMA-402, which a script reads
// off the client's own global. What a target adds, like `window`, is spliced.
// `eval` is how a script runs a bundle, and a client calls it indirectly.
const globals = new Set([
  "AggregateError",
  "Array",
  "ArrayBuffer",
  "Atomics",
  "BigInt",
  "BigInt64Array",
  "BigUint64Array",
  "Boolean",
  "DataView",
  "Date",
  "Error",
  "EvalError",
  "FinalizationRegistry",
  "Float32Array",
  "Float64Array",
  "Function",
  "Infinity",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Intl",
  "Iterator",
  "JSON",
  "Map",
  "Math",
  "NaN",
  "Number",
  "Object",
  "Promise",
  "Proxy",
  "RangeError",
  "ReferenceError",
  "Reflect",
  "RegExp",
  "Set",
  "SharedArrayBuffer",
  "String",
  "Symbol",
  "SyntaxError",
  "TypeError",
  "URIError",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "WeakMap",
  "WeakRef",
  "WeakSet",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "eval",
  "globalThis",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
]);

export interface RewriteState {
  script: ClientScript;
  bindings: BindingResolution;
  params: ReadonlyMap<string, number>;
  errors: Map<ts.Node, string>;
  mappings: Map<ts.Node, ts.Node>; // virtual -> source
  // virtual nodes whose mappings carry non-default editor behavior
  codeInformation: Map<ts.Node, CodeInformation>;
}

// A splice's parameter. `resolveBindings` gave every splice one, so a miss is
// the two walks disagreeing about what is a splice.
function paramOf(state: RewriteState, key: string): number {
  const param = state.params.get(key);
  if (param === undefined) {
    throw new Error(`\`${key}\` has no parameter.`);
  }
  return param;
}

// Built here because a property access and a method call reach the same read
// by different routes, and what the wire gets has to be the same either way.
function accessNode(
  ts: typeof import("typescript"),
  state: RewriteState,
  access: ts.PropertyAccessExpression,
  name: string,
  receiver: ES.Expression,
  optional: boolean,
): ES.Expression {
  return chained(ts, state, access, optional, {
    type: "MemberExpression",
    loc: state.script.toSourceLocation(access),
    object: receiver,
    property: {
      type: "Identifier",
      loc: state.script.toSourceLocation(access.name),
      name,
    },
    computed: false,
    optional: access.questionDotToken !== undefined,
  });
}

// ESTree wraps an optional chain in one `ChainExpression`, around its last link.
function chained(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
  inChain: boolean,
  link: ES.MemberExpression | ES.SimpleCallExpression,
): ES.Expression {
  const parent = node.parent as ts.PropertyAccessExpression | ts.CallExpression;
  return inChain && !(ts.isOptionalChain(parent) && parent.expression === node)
    ? {
        type: "ChainExpression",
        loc: state.script.toSourceLocation(node),
        expression: link,
      }
    : link;
}

/**
 * A type the script wrote, carried into the virtual code as it stands.
 *
 * Mapped to itself, because it is its own source: the text is what the script
 * wrote, and the virtual node is the source node. Without a mapping of its own
 * it is swallowed by the enclosing node's, whose generated span and source span
 * are different lengths — so no position inside it reads back, and every editor
 * feature that answers about a position is answered about nothing. A type a
 * script names goes uncoloured, and go-to-definition on it lands nowhere.
 *
 * Every node inside it too: the printer does not keep a type's layout —
 * `{ count: number }` prints across three lines — so a mapping of the whole
 * reads a position inside it back at an offset into text of another length.
 * Each name mapped on its own reads back where it was written.
 *
 * A synthetic node is not one of these: `pos` is -1 where nothing was written,
 * and there is no source for it to be read back to. Rewriting a type is where
 * that arises — a banned keyword becomes `any`, which is the compiler's word
 * and not the script's.
 */
function mapType<T extends ts.TypeNode | undefined>(
  state: RewriteState,
  type: T,
): T {
  const map = (node: ts.Node): void => {
    if (node.pos >= 0) {
      state.mappings.set(node, node);
    }
    node.forEachChild(map);
  };
  if (type !== undefined) {
    map(type);
  }
  return type;
}

// The globally unique binding key the resolver assigned this identifier. An
// unbound name (a "Cannot find name" error) keeps its original text.
function bindingKey(state: RewriteState, identifier: ts.Identifier): string {
  return state.bindings.get(identifier) ?? identifier.text;
}

// Why a script may not bind a name, or null where it may. Checked here rather
// than left to TypeScript: the virtual code binds mangled names, so its
// strict-mode checks never see these.
function bannedReason(name: string): string | null {
  switch (name) {
    case "undefined":
      return "it would hide the `undefined` value in that scope";
    case "eval":
    case "arguments":
      return "strict mode forbids binding it";
    case "let":
    case "static":
    case "yield":
    case "implements":
    case "interface":
    case "package":
    case "private":
    case "protected":
    case "public":
      return "it is reserved in strict mode";
    case "await":
      return "it is reserved in module code";
    default:
      return null;
  }
}

function bannedName(
  state: RewriteState,
  name: ts.Identifier,
  position: "declaration" | "parameter",
): boolean {
  const reason = bannedReason(name.text);
  if (reason === null) {
    return false;
  }
  state.errors.set(
    name,
    `\`${name.text}\` is not allowed as a ${
      position === "declaration" ? "variable declaration" : "parameter"
    } name: ${reason}.`,
  );
  return true;
}

// `void` names no client value — an action answers with nothing, which is what
// `Client<void>` says at the boundary rather than something a script may write.
function bannedVoid(
  ts: typeof import("typescript"),
  state: RewriteState,
  type: ts.Node,
): boolean {
  if (type.kind === ts.SyntaxKind.VoidKeyword) {
    state.errors.set(type, "`void` isn't supported in a `cs` client script.");
    return true;
  }
  let found = false;
  ts.forEachChild(type, (child) => {
    found = bannedVoid(ts, state, child) || found;
  });
  return found;
}

// The initializer's first reference to the binding it declares (e.g. a
// method closing over the object that holds it) — rejected: checked value
// positions would force resolving the binding mid-inference (TS7022), and
// the pattern is spelled as an object a client function builds instead.
function selfReference(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
  key: string,
): ts.Identifier | undefined {
  if (ts.isIdentifier(node) && state.bindings.get(node) === key) {
    return node;
  }
  return ts.forEachChild(node, (child) => selfReference(ts, state, child, key));
}

export interface RewrittenNode {
  virtual: ts.Node;
  runtime: ES.Node;
}

export function rewriteNode(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
): RewrittenNode {
  const rewritten = rewriteNodeImpl(ts, state, node);
  const { virtual } = rewritten;
  if (virtual !== node && ts.getCommentRange(virtual) === virtual) {
    ts.setCommentRange(virtual, node);
  }
  if (virtual.pos < 0) {
    state.mappings.set(virtual, node);
  }
  return rewritten;
}

function rewriteNodeImpl(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
): RewrittenNode {
  const unsupported = (): RewrittenNode => ({
    virtual: node,
    runtime: { type: "Literal", loc: loc(node), value: null },
  });

  const loc = (target: ts.Node): ES.SourceLocation =>
    state.script.toSourceLocation(target);

  if (ts.isBlock(node)) {
    const statements = node.statements.map((statement) =>
      rewriteNode(ts, state, statement),
    );
    return {
      virtual: ts.factory.createBlock(
        statements.map((statement) => statement.virtual as ts.Statement),
        true,
      ),
      runtime: {
        type: "BlockStatement",
        loc: loc(node),
        body: statements.map((statement) => statement.runtime as ES.Statement),
      },
    };
  }

  // A statement is its declaration list plus a semicolon; the list rewrites on
  // its own because a `for` header holds one without the statement around it.
  if (ts.isVariableStatement(node)) {
    // The impl, not `rewriteNode`: the statement is what maps to the source
    // here, and a second mapping over the list inside it would only split the
    // same span in two. A `for` header, where the list stands alone, maps it.
    const declarations = rewriteNodeImpl(ts, state, node.declarationList);
    return {
      virtual: ts.isVariableDeclarationList(declarations.virtual)
        ? ts.factory.createVariableStatement(undefined, declarations.virtual)
        : declarations.virtual,
      // The declaration is the whole of it: a statement adds a semicolon,
      // which is not a thing to evaluate.
      runtime: declarations.runtime,
    };
  }

  if (ts.isVariableDeclarationList(node)) {
    // What a reader sees as the declaration: the whole statement where there is
    // one, `;` and all; in a `for` header the list is all there is.
    const at = ts.isVariableStatement(node.parent) ? node.parent : node;
    const flags = node.flags;
    if (flags !== ts.NodeFlags.Const && flags !== ts.NodeFlags.Let) {
      state.errors.set(
        at,
        "`var` isn't supported in a client script; use `const` or `let`.",
      );
      return unsupported();
    }
    const keyword = flags === ts.NodeFlags.Const ? "const" : "let";
    const declarations = node.declarations;
    if (declarations.length !== 1) {
      state.errors.set(
        at,
        "A client script variable declaration must declare a single variable.",
      );
      return unsupported();
    }
    const [declaration] = declarations;
    if (declaration && ts.isIdentifier(declaration.name)) {
      if (!declaration.initializer) {
        state.errors.set(
          at,
          "A client script variable declaration must have an initializer.",
        );
        return unsupported();
      }
      const name = declaration.name;
      // `$`-prefixed names splice host bindings, so a client script can't
      // declare one: the declaration would shadow the shorthand.
      if (name.text.startsWith("$")) {
        state.errors.set(
          name,
          "`$`-prefixed names are reserved for unbraced splices in a `cs` " +
            "client script.",
        );
        return unsupported();
      }
      bannedName(state, name, "declaration");
      // The declaration still rewrites: self-reference produces valid
      // virtual code, so the one error stands alone.
      const reference = selfReference(
        ts,
        state,
        declaration.initializer,
        bindingKey(state, name),
      );
      if (reference) {
        state.errors.set(
          reference,
          "A client script variable can't be referenced in its own " +
            "initializer.",
        );
      }
      const initializer = rewriteNode(ts, state, declaration.initializer);
      const identifier = ts.factory.createIdentifier(mangle(name.text));
      state.mappings.set(identifier, name);
      return {
        virtual: varDeclList(
          ts,
          node.flags,
          identifier,
          initializer.virtual as ts.Expression,
          // What the script said it was. Written by hand or not at all: a
          // script is checked as the code it looks like, and dropping this
          // would leave `let rows: Row[] = []` holding nothing it can hold.
          mapType(state, declaration.type),
        ),
        // The keyword is the kind, and `at` is the span a reader sees: the
        // whole statement where there is one, the list alone in a `for`.
        runtime: {
          type: "VariableDeclaration",
          loc: loc(at),
          kind: keyword,
          declarations: [
            {
              type: "VariableDeclarator",
              loc: loc(declaration),
              id: {
                type: "Identifier",
                loc: loc(declaration.name),
                name: name.text,
                key: bindingKey(state, name),
              } as ES.Identifier,
              init: initializer.runtime as ES.Expression,
            },
          ],
        },
      };
    }
    if (declaration) {
      destructuring(state, declaration.name);
      return unsupported();
    }
  }

  if (ts.isIfStatement(node)) {
    const condition = rewriteNode(ts, state, node.expression);
    const consequent = rewriteNode(ts, state, node.thenStatement);
    const alternate = node.elseStatement
      ? rewriteNode(ts, state, node.elseStatement)
      : null;
    return {
      virtual: ts.factory.createIfStatement(
        condition.virtual as ts.Expression,
        consequent.virtual as ts.Statement,
        alternate ? (alternate.virtual as ts.Statement) : undefined,
      ),
      runtime: {
        type: "IfStatement",
        loc: loc(node),
        test: condition.runtime as ES.Expression,
        consequent: consequent.runtime as ES.Statement,
        alternate: alternate ? (alternate.runtime as ES.Statement) : null,
      },
    };
  }

  if (ts.isWhileStatement(node)) {
    const condition = rewriteNode(ts, state, node.expression);
    const body = rewriteNode(ts, state, node.statement);
    return {
      virtual: ts.factory.createWhileStatement(
        condition.virtual as ts.Expression,
        body.virtual as ts.Statement,
      ),
      runtime: {
        type: "WhileStatement",
        loc: loc(node),
        test: condition.runtime as ES.Expression,
        body: body.runtime as ES.Statement,
      },
    };
  }

  if (ts.isForStatement(node)) {
    // Each header part is optional, and the virtual `for` keeps them where the
    // source put them: the initializer's binding scopes over the header and the
    // body, which a rewrite into a block would have to reproduce by hand.
    const initializer = node.initializer
      ? rewriteNode(ts, state, node.initializer)
      : null;
    const condition = node.condition
      ? rewriteNode(ts, state, node.condition)
      : null;
    const update = node.incrementor
      ? rewriteNode(ts, state, node.incrementor)
      : null;
    const body = rewriteNode(ts, state, node.statement);
    const runtimeOr = (part: RewrittenNode | null): ES.Expression | null =>
      part ? (part.runtime as ES.Expression) : null;
    return {
      virtual: ts.factory.createForStatement(
        initializer ? (initializer.virtual as ts.ForInitializer) : undefined,
        condition ? (condition.virtual as ts.Expression) : undefined,
        update ? (update.virtual as ts.Expression) : undefined,
        body.virtual as ts.Statement,
      ),
      runtime: {
        type: "ForStatement",
        loc: loc(node),
        init: runtimeOr(initializer),
        test: runtimeOr(condition),
        update: runtimeOr(update),
        body: body.runtime as ES.Statement,
      },
    };
  }

  if (ts.isBreakStatement(node) || ts.isContinueStatement(node)) {
    const keyword = ts.isBreakStatement(node) ? "break" : "continue";
    // A label names a loop further out; without labels there is one loop a
    // jump can mean, which is the one it is written in.
    if (node.label) {
      state.errors.set(
        node,
        `A labeled \`${keyword}\` isn't supported in a \`cs\` client script.`,
      );
      return unsupported();
    }
    return {
      virtual: ts.isBreakStatement(node)
        ? ts.factory.createBreakStatement()
        : ts.factory.createContinueStatement(),
      runtime: ts.isBreakStatement(node)
        ? { type: "BreakStatement", loc: loc(node), label: null }
        : { type: "ContinueStatement", loc: loc(node), label: null },
    };
  }

  if (ts.isExpressionStatement(node)) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createExpressionStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: {
        type: "ExpressionStatement",
        loc: loc(node),
        expression: expression.runtime as ES.Expression,
      },
    };
  }

  if (ts.isParenthesizedExpression(node)) {
    return rewriteNode(ts, state, node.expression);
  }

  if (ts.isAsExpression(node)) {
    const type = mapType(state, node.type);
    const asserted = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createAsExpression(
        asserted.virtual as ts.Expression,
        type,
      ),
      runtime: asserted.runtime,
    };
  }

  if (ts.isReturnStatement(node) && !node.expression) {
    return {
      virtual: ts.factory.createReturnStatement(),
      runtime: { type: "ReturnStatement", loc: loc(node), argument: null },
    };
  }

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createReturnStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: {
        type: "ReturnStatement",
        loc: loc(node),
        argument: expression.runtime as ES.Expression,
      },
    };
  }

  if (ts.isThrowStatement(node)) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createThrowStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: {
        type: "ThrowStatement",
        loc: loc(node),
        argument: expression.runtime as ES.Expression,
      },
    };
  }

  if (ts.isTryStatement(node)) {
    if (node.finallyBlock) {
      state.errors.set(
        node.finallyBlock,
        "`finally` isn't supported in a `cs` client script.",
      );
      return unsupported();
    }
    const clause = node.catchClause;
    if (!clause) {
      state.errors.set(
        node,
        "A `try` statement must have a `catch` clause in a `cs` client " +
          "script.",
      );
      return unsupported();
    }
    const declaration = clause.variableDeclaration;
    if (declaration && !ts.isIdentifier(declaration.name)) {
      destructuring(state, declaration.name);
      return unsupported();
    }
    if (declaration && ts.isIdentifier(declaration.name)) {
      bannedName(state, declaration.name, "declaration");
    }
    const block = rewriteNode(ts, state, node.tryBlock);
    let param: { virtual: ts.Identifier; runtime: ES.Identifier } | null = null;
    if (declaration && ts.isIdentifier(declaration.name)) {
      const name = declaration.name;
      const identifier = ts.factory.createIdentifier(mangle(name.text));
      state.mappings.set(identifier, name);
      param = {
        virtual: identifier,
        runtime: {
          type: "Identifier",
          loc: loc(name),
          name: name.text,
          key: bindingKey(state, name),
        } as ES.Identifier,
      };
    }
    const handler = rewriteNode(ts, state, clause.block);
    return {
      virtual: ts.factory.createTryStatement(
        block.virtual as ts.Block,
        ts.factory.createCatchClause(
          param?.virtual,
          handler.virtual as ts.Block,
        ),
        undefined,
      ),
      runtime: {
        type: "TryStatement",
        loc: loc(node),
        block: block.runtime as ES.BlockStatement,
        // The clause is its own node, as it is in TypeScript.
        handler: {
          type: "CatchClause",
          loc: loc(clause),
          param: param ? param.runtime : null,
          body: handler.runtime as ES.BlockStatement,
        },
        finalizer: null,
      },
    };
  }

  if (ts.isIdentifier(node)) {
    const splice = state.script.splices[node.text];
    if (splice != null) {
      // A `$`-prefixed host binding has no shorthand: `$$x` stacks sigils
      // unreadably, so it splices braced.
      if (
        splice.kind === "unbraced" &&
        splice.expression.text.startsWith("$")
      ) {
        state.errors.set(
          node,
          `Can't splice \`${splice.expression.text}\` unbraced: a ` +
            "`$`-prefixed host binding splices with braces, e.g. " +
            `\`\${${splice.expression.text}}\`.`,
        );
        return unsupported();
      }
      let argument: ts.Expression;
      if (splice.kind === "braced") {
        // A braced splice prints its `$0splice<n>` key; the assembler
        // replaces it with the host expression's verbatim source text
        // (mapped 1:1), recursing into any nested `cs` scripts it contains.
        argument = ts.factory.createIdentifier(splice.key);
      } else {
        // An unbraced splice prints the host binding its shorthand names —
        // a fresh identifier, because `splice.expression` already sits in
        // the emitted runtime's metadata tree.
        //
        // It prints parenthesized, as 1-char padding: offset translation
        // inside a mapped span is start-anchored, and `(count)` against
        // source `$count` starts the identifier at offset 1 — mirroring the
        // `$` sigil — so a completion's replacement span round-trips to the
        // bare name and the editor filters what follows the sigil against
        // the host entries (`$Po` matches `Point`).
        argument = ts.factory.createParenthesizedExpression(
          ts.factory.createIdentifier(splice.expression.text),
        );
        state.mappings.set(argument, node);
      }
      // The host value is checked, not what it becomes on the client: a host
      // function passes as a client function once spliced, but only a tag may
      // name one.
      //
      // `satisfies` rather than a constraint on `cs.splice`: one admitting
      // primitives would keep a literal a literal instead of widening it.
      //
      // `typeof cs.Spliceable` rather than a module, because this has to
      // resolve in the file the template was written in — and naming a
      // package would put that package in front of every user of the
      // transform.
      const satisfies = ts.factory.createSatisfiesExpression(
        argument,
        ts.factory.createTypeQueryNode(
          ts.factory.createQualifiedName(
            ts.factory.createIdentifier("cs"),
            ts.factory.createIdentifier("Spliceable"),
          ),
        ),
      );
      const virtual = call(ts, "cs", "splice", [satisfies]);
      state.codeInformation.set(virtual, { semantic: false });
      return {
        virtual,
        runtime: {
          type: "Splice",
          loc: loc(node),
          param: paramOf(state, splice.key),
        } satisfies Splice,
      };
    }

    // The global, which no binding may shadow — so an `undefined` reaching
    // here is always the literal.
    if (node.text === "undefined" && !state.bindings.has(node)) {
      return {
        virtual: ts.factory.createIdentifier("undefined"),
        runtime: { type: "Identifier", loc: loc(node), name: "undefined" },
      };
    }

    // Read off the client's global, as the name it is.
    if (!state.bindings.has(node) && globals.has(node.text)) {
      const virtual = ts.factory.createIdentifier(node.text);
      state.mappings.set(virtual, node);
      return {
        virtual,
        runtime: { type: "Identifier", loc: loc(node), name: node.text },
      };
    }

    // Any other name the resolver didn't bind is a host binding the script
    // forgot to splice, or a global a target provides.
    if (!state.bindings.has(node)) {
      state.errors.set(
        node,
        `Cannot find name '${node.text}'. A client script can only ` +
          "reference its own variables; splice host values with `${...}`.",
      );
    }

    return {
      // An unbound name (an error, above) keeps its unmangled text: a lib
      // name resolves in the virtual code, so the one error stands alone.
      virtual: ts.factory.createIdentifier(
        state.bindings.has(node) ? mangle(node.text) : node.text,
      ),
      runtime: {
        type: "Identifier",
        loc: loc(node),
        name: node.text,
        key: bindingKey(state, node),
      } as ES.Identifier,
    };
  }

  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const name = node.name.text;

    // `?.` propagates null one step, so a plain `.` after it has no
    // meaning. Rewritten as `?.` so the one error stands alone.
    if (ts.isOptionalChain(node) && !node.questionDotToken) {
      state.errors.set(
        node.name,
        "`.` after `?.` isn't supported in a `cs` client script; use `?.` " +
          "for each access in the chain.",
      );
    }
    const optional = ts.isOptionalChain(node);

    const expression = rewriteNode(ts, state, node.expression);
    const propertyName = ts.factory.createIdentifier(name);
    state.mappings.set(propertyName, node.name);
    const virtualReceiver = expression.virtual as ts.Expression;
    const access = optional
      ? ts.factory.createPropertyAccessChain(
          virtualReceiver,
          ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
          propertyName,
        )
      : ts.factory.createPropertyAccessExpression(
          virtualReceiver,
          propertyName,
        );
    return {
      virtual: access,
      runtime: accessNode(
        ts,
        state,
        node,
        name,
        expression.runtime as ES.Expression,
        optional,
      ),
    };
  }

  if (ts.isElementAccessExpression(node)) {
    // `a?.[i]` would have to say what a null `a` reads as. A null target is the
    // caller's to rule out, and `a?.b[i]` needs nothing here: the access is on
    // what `?.b` produced, which the typechecker already knows may be null.
    if (node.questionDotToken) {
      state.errors.set(
        node,
        "`?.[` isn't supported in a `cs` client script; check the target " +
          "for null instead.",
      );
      return unsupported();
    }
    const expression = rewriteNode(ts, state, node.expression);
    const key = rewriteNode(ts, state, node.argumentExpression);
    return {
      virtual: ts.factory.createElementAccessExpression(
        expression.virtual as ts.Expression,
        key.virtual as ts.Expression,
      ),
      runtime: {
        type: "MemberExpression",
        loc: loc(node),
        object: expression.runtime as ES.Expression,
        property: key.runtime as ES.Expression,
        computed: true,
        optional: false,
      },
    };
  }

  if (
    ts.isJsxElement(node) ||
    ts.isJsxSelfClosingElement(node) ||
    ts.isJsxFragment(node)
  ) {
    // A fragment has no tag to read and no attributes to write: it lowers to
    // its children, so only they are rewritten. Read as the absence of an
    // opening tag rather than off the node, so what is written below of a tag
    // and its attributes narrows to the one shape that has them.
    const opening: ts.JsxOpeningLikeElement | null = ts.isJsxFragment(node)
      ? null
      : ts.isJsxElement(node)
        ? node.openingElement
        : (node as ts.JsxSelfClosingElement);

    let tagName = "";
    let properties: readonly ts.JsxAttributeLike[] = [];
    if (opening !== null) {
      if (!ts.isIdentifier(opening.tagName)) {
        state.errors.set(
          opening.tagName,
          "A `cs` client script element's tag must be a plain name.",
        );
        return unsupported();
      }
      tagName = opening.tagName.text;
      properties = opening.attributes.properties;
    }

    // `<>` and `<Fragment>` lower the same way
    const isFragment = opening === null || isFragmentTag(tagName);
    // A component tag naming a binding: a function the script holds, called
    // with its props. Its attributes are client values of the props it takes,
    // so they are written as they are rather than lifted.
    const held =
      opening !== null &&
      !isFragment &&
      isComponentTag(tagName) &&
      state.bindings.has(opening.tagName as ts.Identifier);
    const lift = (expression: ts.Expression): ts.Expression =>
      held ? expression : call(ts, "cs", "lift", [expression]);

    // In source order, because a host may care that `type` precedes `value`.
    const attributes: {
      virtual: ts.JsxAttribute;
      runtime: JSX.JSXAttribute;
    }[] = [];
    for (const attribute of properties) {
      if (!ts.isJsxAttribute(attribute) || !ts.isIdentifier(attribute.name)) {
        state.errors.set(
          attribute,
          "A `cs` client script element's attributes are written " +
            "`name={...}`; `{...spread}` isn't supported.",
        );
        return unsupported();
      }
      const name = attribute.name.text;
      const initializer = attribute.initializer;
      // A valueless attribute is the `true` it means, so nothing downstream
      // reads an absence.
      const source =
        initializer === undefined
          ? ts.factory.createTrue()
          : ts.isJsxExpression(initializer)
            ? initializer.expression
            : initializer;
      if (source === undefined) {
        state.errors.set(attribute, "This attribute has no value.");
        return unsupported();
      }
      const value = rewriteNode(ts, state, source);
      // The name maps on its own, inside the attribute's own mapping: a prop is
      // something an editor asks about — what it takes, where it is declared —
      // and an answer has to come from the name rather than from wherever in
      // the element the offset happened to land.
      const written = ts.factory.createIdentifier(name);
      state.mappings.set(written, attribute.name);
      // Lifted, all of them: everything written in a script is client code,
      // and a prop admits it either as `Prop<T>`'s `Client` side or, for a
      // structured one, as a `Client` of the whole. A handler admits nothing
      // else — `Client<() => void>` has no plain form, which is what keeps a
      // host function out of a place only client code can go.
      const attributeVirtual = ts.factory.createJsxAttribute(
        written,
        ts.factory.createJsxExpression(
          undefined,
          lift(value.virtual as ts.Expression),
        ),
      );
      state.mappings.set(attributeVirtual, attribute);
      attributes.push({
        virtual: attributeVirtual,
        runtime: {
          type: "JSXAttribute",
          loc: loc(attribute),
          name: { type: "JSXIdentifier", loc: loc(attribute.name), name },
          value:
            initializer === undefined
              ? null
              : ts.isJsxExpression(initializer)
                ? {
                    type: "JSXExpressionContainer",
                    loc: loc(initializer),
                    expression: value.runtime as ES.Expression,
                  }
                : (value.runtime as ES.Literal),
        },
      });
    }

    // Whitespace-only text is dropped from the virtual code, as JSX drops it;
    // the runtime keeps the children as written.
    const children: JSX.JSXElement["children"] = [];
    const virtualChildren: ts.JsxChild[] = [];
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      for (const child of node.children) {
        if (ts.isJsxText(child)) {
          children.push({
            type: "JSXText",
            loc: loc(child),
            value: child.text,
            raw: child.text,
          });
          if (jsxText(child.text) === null) {
            continue;
          }
          virtualChildren.push(child);
          continue;
        }
        if (ts.isJsxExpression(child)) {
          if (child.expression === undefined) {
            children.push({
              type: "JSXExpressionContainer",
              loc: loc(child),
              expression: { type: "JSXEmptyExpression", loc: loc(child) },
            });
            continue;
          }
          const rewritten = rewriteNode(ts, state, child.expression);
          children.push({
            type: "JSXExpressionContainer",
            loc: loc(child),
            expression: rewritten.runtime as ES.Expression,
          });
          virtualChildren.push(
            ts.factory.createJsxExpression(
              undefined,
              lift(rewritten.virtual as ts.Expression),
            ),
          );
          continue;
        }
        const rewritten = rewriteNode(ts, state, child);
        children.push(rewritten.runtime as JSX.JSXElement | JSX.JSXFragment);
        virtualChildren.push(
          ts.factory.createJsxExpression(
            undefined,
            lift(rewritten.virtual as ts.Expression),
          ),
        );
      }
    }

    const props = ts.factory.createJsxAttributes(
      attributes.map((attribute) => attribute.virtual),
    );
    // A tag maps on its own, and each of the two a paired element has maps to
    // the one it is: a tag is where an editor asks what an element is, and
    // renaming one of a pair has to reach that one and not its partner.
    const tag = (source: ts.JsxTagNameExpression): ts.Identifier => {
      const written = ts.factory.createIdentifier(
        held ? mangle(tagName) : tagName,
      );
      state.mappings.set(written, source);
      return written;
    };
    const virtual =
      opening === null
        ? ts.factory.createJsxFragment(
            ts.factory.createJsxOpeningFragment(),
            virtualChildren,
            ts.factory.createJsxJsxClosingFragment(),
          )
        : virtualChildren.length === 0
          ? ts.factory.createJsxSelfClosingElement(
              tag(opening.tagName),
              undefined,
              props,
            )
          : ts.factory.createJsxElement(
              ts.factory.createJsxOpeningElement(
                tag(opening.tagName),
                undefined,
                props,
              ),
              virtualChildren,
              ts.factory.createJsxClosingElement(
                tag(
                  ts.isJsxElement(node)
                    ? node.closingElement.tagName
                    : opening.tagName,
                ),
              ),
            );
    state.mappings.set(virtual, node);

    return {
      virtual,
      // A tag as written, with the binding it names where the script holds
      // one. What a tag lowers to is the bundler's to decide.
      runtime:
        opening === null
          ? {
              type: "JSXFragment",
              loc: loc(node),
              openingFragment: {
                type: "JSXOpeningFragment",
                loc: loc((node as ts.JsxFragment).openingFragment),
              },
              children,
              closingFragment: {
                type: "JSXClosingFragment",
                loc: loc((node as ts.JsxFragment).closingFragment),
              },
            }
          : {
              type: "JSXElement",
              loc: loc(node),
              openingElement: {
                type: "JSXOpeningElement",
                loc: loc(opening),
                name: {
                  type: "JSXIdentifier",
                  loc: loc(opening.tagName),
                  name: tagName,
                  ...(held
                    ? {
                        key: bindingKey(
                          state,
                          opening.tagName as ts.Identifier,
                        ),
                      }
                    : isComponentTag(tagName) && !isFragment
                      ? { param: paramOf(state, tagName) }
                      : {}),
                },
                attributes: attributes.map((attribute) => attribute.runtime),
                selfClosing: !ts.isJsxElement(node),
              },
              children,
              closingElement: ts.isJsxElement(node)
                ? {
                    type: "JSXClosingElement",
                    loc: loc(node.closingElement),
                    name: {
                      type: "JSXIdentifier",
                      loc: loc(node.closingElement.tagName),
                      name: tagName,
                      ...(held
                        ? {
                            key: bindingKey(
                              state,
                              node.closingElement.tagName as ts.Identifier,
                            ),
                          }
                        : {}),
                    },
                  }
                : null,
            },
    };
  }

  if (ts.isCallExpression(node)) {
    // `$state<Row[]>([])` — written out where the initial would widen wrong,
    // and carried into all four calls built below as the script wrote it.
    const typeArguments = node.typeArguments?.map((one) => mapType(state, one));
    // `cb?.()` — an optional call: a null callee yields null, the
    // arguments unevaluated, mirroring an optional access.
    const optionalCall = node.questionDotToken != null;
    const args = node.arguments.map((arg) => rewriteNode(ts, state, arg));
    const runtimeArgs = args.map(
      (arg) => arg.runtime as ES.Expression | ES.SpreadElement,
    );

    if (
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.name)
    ) {
      const access = node.expression;
      // The property branch's one-step rule, copied: this access is
      // consumed inline.
      if (ts.isOptionalChain(access) && !access.questionDotToken) {
        state.errors.set(
          access.name,
          "`.` after `?.` isn't supported in a `cs` client script; use " +
            "`?.` for each access in the chain.",
        );
      }
      const optional = ts.isOptionalChain(access);
      const receiver = rewriteNode(ts, state, access.expression);
      const name = access.name.text;
      const propertyName = ts.factory.createIdentifier(name);
      state.mappings.set(propertyName, access.name);
      const virtualReceiver = receiver.virtual as ts.Expression;

      const calleeAccess = optional
        ? ts.factory.createPropertyAccessChain(
            virtualReceiver,
            ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
            propertyName,
          )
        : ts.factory.createPropertyAccessExpression(
            virtualReceiver,
            propertyName,
          );
      const inChain = optional || optionalCall;
      const virtualCall = inChain
        ? ts.factory.createCallChain(
            calleeAccess,
            optionalCall
              ? ts.factory.createToken(ts.SyntaxKind.QuestionDotToken)
              : undefined,
            typeArguments,
            args.map((arg) => arg.virtual as ts.Expression),
          )
        : ts.factory.createCallExpression(
            calleeAccess,
            typeArguments,
            args.map((arg) => arg.virtual as ts.Expression),
          );
      return {
        virtual: virtualCall,
        runtime: chained(ts, state, node, inChain, {
          type: "CallExpression",
          loc: loc(node),
          callee: accessNode(
            ts,
            state,
            access,
            name,
            receiver.runtime as ES.Expression,
            optional,
          ),
          arguments: runtimeArgs,
          optional: optionalCall,
        }),
      };
    }

    const callee = rewriteNode(ts, state, node.expression);
    const virtualCall = optionalCall
      ? ts.factory.createCallChain(
          callee.virtual as ts.Expression,
          ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
          typeArguments,
          args.map((arg) => arg.virtual as ts.Expression),
        )
      : ts.factory.createCallExpression(
          callee.virtual as ts.Expression,
          typeArguments,
          args.map((arg) => arg.virtual as ts.Expression),
        );
    return {
      virtual: virtualCall,
      runtime: chained(ts, state, node, ts.isOptionalChain(node), {
        type: "CallExpression",
        loc: loc(node),
        callee: callee.runtime as ES.Expression,
        arguments: runtimeArgs,
        optional: optionalCall,
      }),
    };
  }

  if (ts.isArrowFunction(node)) {
    let sawOptional = false;
    const params = node.parameters.map((param) => {
      // A rest parameter or a default would be silently dropped from the
      // bundle — a miscompile. The parameter still rewrites (without the
      // `...`/initializer), keeping the virtual mangled and mapped.
      if (param.dotDotDotToken) {
        state.errors.set(
          param,
          "A rest parameter isn't supported in a `cs` client script.",
        );
      }
      if (param.initializer) {
        state.errors.set(
          param,
          "A parameter default isn't supported in a `cs` client script; " +
            "use `?` and handle `null` instead.",
        );
      }
      // TypeScript's TS1016, enforced here to stay aligned with TS
      if (param.questionToken != null) {
        sawOptional = true;
      } else if (sawOptional) {
        state.errors.set(
          param.name,
          "A required parameter cannot follow an optional parameter.",
        );
      }
      if (ts.isIdentifier(param.name)) {
        bannedName(state, param.name, "parameter");
        let type = param.type;
        // Rewritten as `any` — the keyword error stands alone; the
        // `ClientValue` boundary check would otherwise repeat it coarsely.
        if (type && bannedVoid(ts, state, type)) {
          type = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
        }
        return {
          source: param,
          name: param.name,
          type,
          optional: param.questionToken != null,
        };
      }
      destructuring(state, param.name);
      return null;
    });

    if (params.every((param) => param != null)) {
      const virtualParams = params.map((param) => {
        const identifier = ts.factory.createIdentifier(mangle(param.name.text));
        state.mappings.set(identifier, param.name);
        // `?` marks an optional parameter: a call may omit it, and it binds
        // `undefined`.
        const declaration = ts.factory.createParameterDeclaration(
          undefined,
          undefined,
          identifier,
          param.optional
            ? ts.factory.createToken(ts.SyntaxKind.QuestionToken)
            : undefined,
          mapType(state, param.type),
          undefined,
        );
        state.mappings.set(declaration, param.source);
        return declaration;
      });
      const body = rewriteNode(ts, state, node.body);
      return {
        virtual: ts.factory.createArrowFunction(
          undefined,
          undefined,
          virtualParams,
          undefined,
          ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          body.virtual as ts.ConciseBody,
        ),
        runtime: {
          type: "ArrowFunctionExpression",
          loc: loc(node),
          params: params.map(
            (param) =>
              ({
                type: "Identifier",
                loc: loc(param.name),
                name: param.name.text,
                key: bindingKey(state, param.name),
              }) as ES.Identifier,
          ),
          body: body.runtime as ES.Expression | ES.BlockStatement,
          expression: !ts.isBlock(node.body),
        },
      };
    }

    return unsupported();
  }

  if (ts.isSpreadElement(node)) {
    const spread = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createSpreadElement(spread.virtual as ts.Expression),
      runtime: {
        type: "SpreadElement",
        loc: loc(node),
        argument: spread.runtime as ES.Expression,
      },
    };
  }

  if (ts.isArrayLiteralExpression(node)) {
    const elements = node.elements.map((element) =>
      rewriteNode(ts, state, element),
    );
    return {
      virtual: ts.factory.createArrayLiteralExpression(
        elements.map((element) => element.virtual as ts.Expression),
        false,
      ),
      runtime: {
        type: "ArrayExpression",
        loc: loc(node),
        elements: elements.map(
          (element) => element.runtime as ES.Expression | ES.SpreadElement,
        ),
      },
    };
  }

  if (ts.isObjectLiteralExpression(node)) {
    const properties = node.properties.map((property) => {
      // `...rest`, which is not a property but stands where one stands and
      // contributes however many the object it spreads has. `name` is null,
      // which is a name no property can have.
      if (ts.isSpreadAssignment(property)) {
        return {
          name: null,
          key: null,
          computed: false,
          source: property,
          value: rewriteNode(ts, state, property.expression),
        };
      }
      if (
        ts.isPropertyAssignment(property) &&
        (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
      ) {
        const name = ts.isIdentifier(property.name)
          ? ts.factory.createIdentifier(property.name.text)
          : ts.factory.createStringLiteral(property.name.text);
        state.mappings.set(name, property.name);
        return {
          name,
          key: ts.isIdentifier(property.name)
            ? ({
                type: "Identifier",
                loc: loc(property.name),
                name: property.name.text,
              } as ES.Expression)
            : ({
                type: "Literal",
                loc: loc(property.name),
                value: property.name.text,
              } as ES.Expression),
          computed: false,
          source: property,
          value: rewriteNode(ts, state, property.initializer),
        };
      }
      if (
        ts.isPropertyAssignment(property) &&
        ts.isComputedPropertyName(property.name)
      ) {
        const key = rewriteNode(ts, state, property.name.expression);
        const name = ts.factory.createComputedPropertyName(
          key.virtual as ts.Expression,
        );
        return {
          name,
          key: key.runtime as ES.Expression,
          computed: true,
          source: property,
          value: rewriteNode(ts, state, property.initializer),
        };
      }
      state.errors.set(
        property,
        "This object property isn't supported in a `cs` client script.",
      );
      return null;
    });

    if (properties.every((property) => property != null)) {
      return {
        virtual: ts.factory.createObjectLiteralExpression(
          properties.map((property) =>
            property.name === null
              ? ts.factory.createSpreadAssignment(
                  property.value.virtual as ts.Expression,
                )
              : ts.factory.createPropertyAssignment(
                  property.name,
                  property.value.virtual as ts.Expression,
                ),
          ),
          false,
        ),
        runtime: {
          type: "ObjectExpression",
          loc: loc(node),
          properties: properties.map(
            (property): ES.Property | ES.SpreadElement =>
              property.key === null
                ? {
                    type: "SpreadElement",
                    loc: loc(property.source),
                    argument: property.value.runtime as ES.Expression,
                  }
                : {
                    type: "Property",
                    loc: loc(property.source),
                    key: property.key,
                    value: property.value.runtime as ES.Expression,
                    kind: "init",
                    computed: property.computed,
                    method: false,
                    shorthand: false,
                  },
          ),
        },
      };
    }

    return unsupported();
  }

  if (ts.isConditionalExpression(node)) {
    const condition = rewriteNode(ts, state, node.condition);
    const consequent = rewriteNode(ts, state, node.whenTrue);
    const alternate = rewriteNode(ts, state, node.whenFalse);
    return {
      virtual: ts.factory.createConditionalExpression(
        condition.virtual as ts.Expression,
        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        consequent.virtual as ts.Expression,
        ts.factory.createToken(ts.SyntaxKind.ColonToken),
        alternate.virtual as ts.Expression,
      ),
      runtime: {
        type: "ConditionalExpression",
        loc: loc(node),
        test: condition.runtime as ES.Expression,
        consequent: consequent.runtime as ES.Expression,
        alternate: alternate.runtime as ES.Expression,
      },
    };
  }

  // `++` and `--` step a variable by one. `++i` answers the value after the
  // step, and `i++` the value before it.
  if (isStep(ts, node)) {
    const operator =
      node.operator === ts.SyntaxKind.PlusPlusToken ? "++" : "--";
    const postfix = ts.isPostfixUnaryExpression(node);
    const operand = rewriteNode(ts, state, node.operand);
    return {
      // As written, so TypeScript checks it as a step: a number, and a
      // variable that isn't `const`.
      virtual: postfix
        ? ts.factory.createPostfixUnaryExpression(
            operand.virtual as ts.Expression,
            node.operator,
          )
        : ts.factory.createPrefixUnaryExpression(
            node.operator,
            operand.virtual as ts.Expression,
          ),
      runtime: {
        type: "UpdateExpression",
        loc: loc(node),
        operator,
        prefix: !postfix,
        argument: operand.runtime as ES.Expression,
      },
    };
  }

  // `typeof x`, kept as written in the virtual code so that TypeScript narrows
  // by it, which is why its answers are JavaScript's own.
  if (ts.isTypeOfExpression(node)) {
    const operand = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createTypeOfExpression(
        operand.virtual as ts.Expression,
      ),
      runtime: {
        type: "UnaryExpression",
        loc: loc(node),
        operator: "typeof",
        prefix: true,
        argument: operand.runtime as ES.Expression,
      },
    };
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operand = rewriteNode(ts, state, node.operand);
    return {
      virtual: ts.factory.createPrefixUnaryExpression(
        node.operator,
        operand.virtual as ts.Expression,
      ),
      runtime: {
        type: "UnaryExpression",
        loc: loc(node),
        operator: ts.tokenToString(node.operator) as ES.UnaryOperator,
        prefix: true,
        argument: operand.runtime as ES.Expression,
      },
    };
  }

  if (ts.isVoidExpression(node)) {
    const operand = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createVoidExpression(
        operand.virtual as ts.Expression,
      ),
      runtime: {
        type: "UnaryExpression",
        loc: loc(node),
        operator: "void",
        prefix: true,
        argument: operand.runtime as ES.Expression,
      },
    };
  }

  if (ts.isDeleteExpression(node)) {
    const operand = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createDeleteExpression(
        operand.virtual as ts.Expression,
      ),
      runtime: {
        type: "UnaryExpression",
        loc: loc(node),
        operator: "delete",
        prefix: true,
        argument: operand.runtime as ES.Expression,
      },
    };
  }

  if (ts.isBinaryExpression(node)) {
    const kind = node.operatorToken.kind;
    // An assignment is a binary expression, as it is in TypeScript.
    const assignment =
      kind >= ts.SyntaxKind.FirstAssignment &&
      kind <= ts.SyntaxKind.LastAssignment;
    const lhs = rewriteNode(ts, state, node.left);
    const rhs = rewriteNode(ts, state, node.right);
    return {
      virtual: ts.factory.createBinaryExpression(
        lhs.virtual as ts.Expression,
        kind,
        rhs.virtual as ts.Expression,
      ),
      runtime: binary(
        loc(node),
        ts.tokenToString(kind)!,
        assignment,
        lhs.runtime as ES.Expression,
        rhs.runtime as ES.Expression,
      ),
    };
  }

  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return {
      virtual: ts.factory.createNull(),
      runtime: { type: "Literal", loc: loc(node), value: null },
    };
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: { type: "Literal", loc: loc(node), value: Number(node.text) },
    };
  }

  if (ts.isStringLiteral(node)) {
    return {
      virtual: ts.factory.createStringLiteral(node.text),
      runtime: { type: "Literal", loc: loc(node), value: node.text },
    };
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return {
      virtual: ts.factory.createTrue(),
      runtime: { type: "Literal", loc: loc(node), value: true },
    };
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return {
      virtual: ts.factory.createFalse(),
      runtime: { type: "Literal", loc: loc(node), value: false },
    };
  }

  state.errors.set(
    node,
    "This syntax isn't supported in a `cs` client script.",
  );
  return unsupported();
}

// `++` or `--`, before a variable or after it.
function isStep(
  ts: typeof import("typescript"),
  node: ts.Node,
): node is ts.PrefixUnaryExpression | ts.PostfixUnaryExpression {
  return (
    (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) &&
    (node.operator === ts.SyntaxKind.PlusPlusToken ||
      node.operator === ts.SyntaxKind.MinusMinusToken)
  );
}

// A name that unpacks a value: `const [a, b] = …`, `({ a }) => …`, `catch ({ message })`.
function destructuring(state: RewriteState, name: ts.BindingName): void {
  state.errors.set(
    name,
    "Destructuring isn't supported in a `cs` client script; declare each " +
      "variable on its own.",
  );
}

// ESTree splits the operators by what they do: an assignment, a logical
// operator, a sequence, or a binary one.
function binary(
  loc: ES.SourceLocation,
  operator: string,
  assignment: boolean,
  left: ES.Expression,
  right: ES.Expression,
): ES.Expression {
  if (assignment) {
    return {
      type: "AssignmentExpression",
      loc,
      operator: operator as ES.AssignmentOperator,
      left: left as ES.Pattern,
      right,
    };
  }
  switch (operator) {
    case "&&":
    case "||":
    case "??":
      return { type: "LogicalExpression", loc, operator, left, right };
    case ",":
      return { type: "SequenceExpression", loc, expressions: [left, right] };
    default:
      return {
        type: "BinaryExpression",
        loc,
        operator: operator as ES.BinaryOperator,
        left,
        right,
      };
  }
}
