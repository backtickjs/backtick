import type ts from "typescript";
import type { CodeInformation } from "./CodeInformation.js";
import { call, varDeclList } from "./nodeFactory.js";
import {
  isComponentTag,
  isFragmentTag,
  jsxText,
} from "@backtickjs/client-script";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import { mangle } from "./unmangle.js";


export interface RewriteState {
  script: ClientScript;
  bindings: BindingResolution;
  errors: Map<ts.Node, string>;
  mappings: Map<ts.Node, ts.Node>; // virtual -> source
  // virtual nodes whose mappings carry non-default editor behavior
  codeInformation: Map<ts.Node, CodeInformation>;
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
  });

  if (ts.isBlock(node)) {
    const statements = node.statements.map((statement) =>
      rewriteNode(ts, state, statement),
    );
    return {
      virtual: ts.factory.createBlock(
        statements.map((statement) => statement.virtual as ts.Statement),
        true,
      ),
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
    return {
      virtual: ts.factory.createForStatement(
        initializer ? (initializer.virtual as ts.ForInitializer) : undefined,
        condition ? (condition.virtual as ts.Expression) : undefined,
        update ? (update.virtual as ts.Expression) : undefined,
        body.virtual as ts.Statement,
      ),
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
    };
  }

  if (ts.isExpressionStatement(node)) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createExpressionStatement(
        expression.virtual as ts.Expression,
      ),
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
    };
  }

  if (ts.isReturnStatement(node) && !node.expression) {
    return {
      virtual: ts.factory.createReturnStatement(),
    };
  }

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createReturnStatement(
        expression.virtual as ts.Expression,
      ),
    };
  }

  if (ts.isThrowStatement(node)) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createThrowStatement(
        expression.virtual as ts.Expression,
      ),
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
    let param: { virtual: ts.Identifier } | null = null;
    if (declaration && ts.isIdentifier(declaration.name)) {
      const name = declaration.name;
      const identifier = ts.factory.createIdentifier(mangle(name.text));
      state.mappings.set(identifier, name);
      param = {
        virtual: identifier,
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
        // the metadata `cs.create` is written with.
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
      };
    }

    // The global, which no binding may shadow — so an `undefined` reaching
    // here is always the literal. TypeScript has no `globalThis.undefined`.
    if (node.text === "undefined" && !state.bindings.has(node)) {
      return {
        virtual: ts.factory.createIdentifier("undefined"),
      };
    }

    // A name the script didn't bind is the client's global, read off
    // `cs.globalThis`: it typechecks only where the project declares it — its
    // libs, `@types`, a `declare global` — so a host binding the script forgot
    // to splice, which is no global, is reported where it is written.
    if (!state.bindings.has(node)) {
      const name = ts.factory.createIdentifier(node.text);
      state.mappings.set(name, node);
      return {
        virtual: ts.factory.createPropertyAccessExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createIdentifier("cs"),
            "globalThis",
          ),
          name,
        ),
      };
    }

    return {
      virtual: ts.factory.createIdentifier(mangle(node.text)),
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
    const attributes: ts.JsxAttribute[] = [];
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
      attributes.push(attributeVirtual);
    }

    // Whitespace-only text is dropped, as JSX drops it.
    const virtualChildren: ts.JsxChild[] = [];
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      for (const child of node.children) {
        if (ts.isJsxText(child)) {
          if (jsxText(child.text) === null) {
            continue;
          }
          virtualChildren.push(child);
          continue;
        }
        if (ts.isJsxExpression(child)) {
          if (child.expression === undefined) {
            continue;
          }
          const rewritten = rewriteNode(ts, state, child.expression);
          virtualChildren.push(
            ts.factory.createJsxExpression(
              undefined,
              lift(rewritten.virtual as ts.Expression),
            ),
          );
          continue;
        }
        const rewritten = rewriteNode(ts, state, child);
        virtualChildren.push(
          ts.factory.createJsxExpression(
            undefined,
            lift(rewritten.virtual as ts.Expression),
          ),
        );
      }
    }

    const props = ts.factory.createJsxAttributes(attributes);
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
      };
    }

    return unsupported();
  }

  if (ts.isSpreadElement(node)) {
    const spread = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createSpreadElement(spread.virtual as ts.Expression),
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
    };
  }

  // `++` and `--` step a variable by one. `++i` answers the value after the
  // step, and `i++` the value before it.
  if (isStep(ts, node)) {
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
    };
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const operand = rewriteNode(ts, state, node.operand);
    return {
      virtual: ts.factory.createPrefixUnaryExpression(
        node.operator,
        operand.virtual as ts.Expression,
      ),
    };
  }

  if (ts.isVoidExpression(node)) {
    const operand = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createVoidExpression(
        operand.virtual as ts.Expression,
      ),
    };
  }

  if (ts.isDeleteExpression(node)) {
    const operand = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createDeleteExpression(
        operand.virtual as ts.Expression,
      ),
    };
  }

  if (ts.isBinaryExpression(node)) {
    const kind = node.operatorToken.kind;
    // An assignment is a binary expression, as it is in TypeScript.
    const lhs = rewriteNode(ts, state, node.left);
    const rhs = rewriteNode(ts, state, node.right);
    return {
      virtual: ts.factory.createBinaryExpression(
        lhs.virtual as ts.Expression,
        kind,
        rhs.virtual as ts.Expression,
      ),
    };
  }

  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return {
      virtual: ts.factory.createNull(),
    };
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
    };
  }

  if (ts.isStringLiteral(node)) {
    return {
      virtual: ts.factory.createStringLiteral(node.text),
    };
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return {
      virtual: ts.factory.createTrue(),
    };
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return {
      virtual: ts.factory.createFalse(),
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
