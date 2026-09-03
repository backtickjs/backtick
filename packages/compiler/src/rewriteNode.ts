import type ts from "typescript";
import { isSupportedBinop } from "./binop.js";
import type { CodeInformation } from "./CodeInformation.js";
import { astNode, call, sourceLoc, varDeclList } from "./nodeFactory.js";
import { bodyKind, partialReturn } from "./bodyKind.js";
import { isComponentTag } from "./isComponentTag.js";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import { mangle } from "./unmangle.js";
import { isFragmentTag } from "./isFragmentTag.js";

// Every name the language provides, written here rather than read off a
// schema: the compiler's vocabulary is its own and closed, and it is the host
// lib's and nothing else. What the framework or an app provides arrives as a
// value an app splices — `$state`, imported and handed to the script — and
// never as a name recognised here. What may be read off one of these is not
// this question: `Receiver` narrows the members, from the schema.
//
// Written in the shape `schema/src/generators/builtins.ts` writes its own: a
// trailing dot is a front, and a name without one is already whole. The two are
// one list read for different purposes — this one says what a script may write,
// that one says what needs a value to import — and keeping them the same shape
// is what makes a name added to one visibly missing from the other.
//
// A front is only the front of a name: a script writes `Math.floor`, which is a
// single name the client answers, and there is no `Math` for a read to yield —
// so an access folds into the whole name below, and the front standing alone is
// an error. A whole name has nothing to fold in and reads as a value.
//
// The four kinds a member is read off — `string.`, `array.` and the rest — are
// not here: those are reached off a value rather than written, so they are
// `receivers.ts`'s and never an identifier this resolves.
const language = new Set([
  "Array.",
  "JSON.",
  "Math.",
  "Number.",
  "String.",
  "clearInterval",
  "clearTimeout",
  "setInterval",
  "setTimeout",
]);

export interface RewriteState {
  script: ClientScript;
  bindings: BindingResolution;
  errors: Map<ts.Node, string>;
  mappings: Map<ts.Node, ts.Node>; // virtual -> source
  // virtual nodes whose mappings carry non-default editor behavior
  codeInformation: Map<ts.Node, CodeInformation>;
  // set while rewriting a condition's bare duplicate, so nested conditions
  // aren't re-duplicated (the copy would otherwise grow exponentially)
  dup?: boolean;
  // the enclosing body's classification: a value body bans side-effect
  // statements, and its returns take the value check
  bodyKind: "value" | "action";
  // the binding keys this script captures from enclosing scripts — not
  // assignable: a nested script captures the value, not the variable
  captures?: Set<string>;
}

// The front of a whole builtin name, where a script wrote one: `Math` in
// `Math.floor`. A bound name is the script's own and shadows the namespace.
function namespaceOf(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Expression,
): string | undefined {
  return ts.isIdentifier(node) &&
    !state.bindings.has(node) &&
    language.has(`${node.text}.`)
    ? node.text
    : undefined;
}

/**
 * One member read, as the runtime carries it.
 *
 * A member of a namespace is a whole name the client answers — `Math.floor` —
 * so the front and the member travel as that one name rather than as a read of
 * something and a member of it. Anything else is the read it looks like.
 *
 * Built here because a property access and a method call reach the same read
 * by different routes — a call consumes its access inline, to keep the virtual
 * code a call on a member rather than a call on a parenthesised one — and what
 * the wire gets has to be the same either way.
 */
function accessNode(
  ts: typeof import("typescript"),
  state: RewriteState,
  access: ts.PropertyAccessExpression,
  name: string,
  receiver: ts.Expression,
  optional: boolean,
): ts.Expression {
  const at = sourceLoc(ts, state.script.toSourceLocation(access));
  const namespace = namespaceOf(ts, state, access.expression);
  if (namespace === undefined) {
    return astNode(ts, optional ? "?." : ".", {
      loc: at,
      expression: receiver,
      name: ts.factory.createStringLiteral(name),
    });
  }
  // A namespace is never null, so `?.` has nothing to short-circuit.
  if (optional) {
    state.errors.set(
      access,
      `\`${namespace}\` is never null, so \`?.\` has nothing to check ` +
        "here; use a plain `.`.",
    );
  }
  return astNode(ts, "bltn", {
    loc: at,
    name: ts.factory.createStringLiteral(`${namespace}.${name}`),
  });
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
 * A synthetic node is not one of these: `pos` is -1 where nothing was written,
 * and there is no source for it to be read back to. Rewriting a type is where
 * that arises — a banned keyword becomes `any`, which is the compiler's word
 * and not the script's.
 */
function mapType<T extends ts.TypeNode | undefined>(
  state: RewriteState,
  type: T,
): T {
  if (type !== undefined && type.pos >= 0) {
    state.mappings.set(type, type);
  }
  return type;
}

// Whether an access has already taken this name as its front, which is the one
// place a namespace may be written: `Math.floor` names something and `Math`
// alone names nothing.
function isNamespaceFront(
  ts: typeof import("typescript"),
  node: ts.Identifier,
): boolean {
  const parent = node.parent;
  return (
    ts.isPropertyAccessExpression(parent) &&
    parent.expression === node &&
    ts.isIdentifier(parent.name)
  );
}

// Boolean by construction, so no check needed: a comparison yields boolean,
// `&&`/`||` check their own operands, and a boolean literal is one. `??` is
// absent — its type is the union of its operands.
function isBooleanByConstruction(
  ts: typeof import("typescript"),
  node: ts.Node,
): boolean {
  while (ts.isParenthesizedExpression(node)) {
    node = node.expression;
  }
  if (
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword
  ) {
    return true;
  }
  if (
    ts.isPrefixUnaryExpression(node) &&
    node.operator === ts.SyntaxKind.ExclamationToken
  ) {
    return true;
  }
  if (ts.isBinaryExpression(node)) {
    switch (ts.tokenToString(node.operatorToken.kind)) {
      case "&&":
      case "||":
      case "===":
      case "!==":
      case "<":
      case "<=":
      case ">":
      case ">=": {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  return false;
}

// A tested position — an `if` condition, an operand of `&&`/`||` — must be
// boolean: the language has no truthiness. Wrapping the condition in the
// check would defeat the checker's narrowing in the code it guards, so the
// position becomes `(cs.condition(<condition>) && <dup>)`: the checked real
// copy, then a bare duplicate whose conjunct carries the narrowing. The
// duplicate sits second because a leading always-truthy operand (a spliced
// `true`, say) would draw TS2872; a trailing operand isn't flagged.
function checkedCondition(
  ts: typeof import("typescript"),
  state: RewriteState,
  source: ts.Expression,
  virtual: ts.Expression,
): ts.Expression {
  // A source-positioned virtual is the unsupported-syntax fallback, already
  // carrying its own error.
  if (state.dup || isBooleanByConstruction(ts, source) || virtual.pos >= 0) {
    return virtual;
  }
  const dupState: RewriteState = {
    ...state,
    dup: true,
    errors: new Map(),
    mappings: new Map(),
    codeInformation: new Map(),
  };
  const dup = rewriteNode(ts, dupState, source).virtual as ts.Expression;
  if (dup.pos >= 0) {
    return virtual;
  }
  // The duplicate's shield: unmapped text is attributed to the enclosing
  // frame's leftover source — the duplicate's diagnostics would pin just
  // after the condition — so one all-off mapping claims the whole copy and
  // drops them; the real copy's own mappings report each diagnostic once.
  state.mappings.set(dup, source);
  state.codeInformation.set(dup, {
    semantic: false,
    completion: false,
    navigation: false,
    verification: false,
  });
  return ts.factory.createParenthesizedExpression(
    ts.factory.createBinaryExpression(
      call(ts, "cs", "condition", [virtual]),
      ts.SyntaxKind.AmpersandAmpersandToken,
      dup,
    ),
  );
}

// The left operand of a `??` (through parens): that `??` already coalesces
// an optional chain's `undefined`, so the auto `?? null` skips (TS2871).
function nullCoalescedLeft(
  ts: typeof import("typescript"),
  node: ts.Node,
): boolean {
  let child: ts.Node = node;
  let parent: ts.Node | undefined = node.parent;
  while (parent != null && ts.isParenthesizedExpression(parent)) {
    child = parent;
    parent = parent.parent;
  }
  return (
    parent != null &&
    ts.isBinaryExpression(parent) &&
    parent.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken &&
    parent.left === child
  );
}

// The globally unique binding key the resolver assigned this identifier. An
// unbound name (a "Cannot find name" error) keeps its original text.
function bindingKey(state: RewriteState, identifier: ts.Identifier): string {
  return state.bindings.get(identifier) ?? identifier.text;
}

// `undefined` doesn't exist in the language — `null` is the absent value.
// A value use hints the fix; a name use gets TypeScript's own
// not-allowed-as-a-name wording.
function bannedUndefined(
  state: RewriteState,
  name: ts.Identifier,
  position: "value" | "declaration" | "parameter",
): boolean {
  if (name.text !== "undefined") {
    return false;
  }
  state.errors.set(
    name,
    position === "value"
      ? "`undefined` isn't supported in a `cs` client script; use `null` " +
          "instead."
      : `\`undefined\` is not allowed as a ${
          position === "declaration" ? "variable declaration" : "parameter"
        } name.`,
  );
  return true;
}

// `undefined`/`void` name no client value — `null` is the absent value.
// Keyword check with a precise span; a host alias can still smuggle them.
function bannedTypeKeywords(
  ts: typeof import("typescript"),
  state: RewriteState,
  type: ts.Node,
): boolean {
  if (
    type.kind === ts.SyntaxKind.UndefinedKeyword ||
    type.kind === ts.SyntaxKind.VoidKeyword
  ) {
    state.errors.set(
      type,
      type.kind === ts.SyntaxKind.UndefinedKeyword
        ? "`undefined` isn't supported in a `cs` client script; use `null` " +
            "instead."
        : "`void` isn't supported in a `cs` client script.",
    );
    return true;
  }
  let found = false;
  ts.forEachChild(type, (child) => {
    found = bannedTypeKeywords(ts, state, child) || found;
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
  runtime: ts.Node;
}

// JSX text as JSX reads it, or null where it reads as nothing. Not `trim()`:
// the rule is per line — leading whitespace goes from every line but the first,
// trailing from every line but the last, a line left empty drops, and what
// remains joins with one space. So `<p>a b</p>` written across three lines is
// `"a b"`, and the space in `<p>{x} {y}</p>` survives, where trimming would
// take one and lose the other.
function jsxText(text: string): string | null {
  const lines = text.split(/\r\n|[\n\r]/);
  const kept: string[] = [];
  for (let at = 0; at < lines.length; at++) {
    let line = lines[at];
    if (at !== 0) {
      line = line.replace(/^[\t ]+/, "");
    }
    if (at !== lines.length - 1) {
      line = line.replace(/[\t ]+$/, "");
    }
    if (line.length > 0) {
      kept.push(line);
    }
  }
  return kept.length === 0 ? null : kept.join(" ");
}

export function rewriteNode(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
): RewrittenNode {
  const rewritten = rewriteNodeImpl(ts, state, node);
  if (rewritten.virtual.pos < 0) {
    state.mappings.set(rewritten.virtual, node);
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
    runtime: astNode(ts, "null", {
      loc: loc(node),
    }),
  });

  const loc = (target: ts.Node): ts.Expression =>
    sourceLoc(ts, state.script.toSourceLocation(target));

  if (ts.isBlock(node)) {
    if (
      (ts.isSourceFile(node.parent) || ts.isArrowFunction(node.parent)) &&
      partialReturn(ts, node)
    ) {
      state.errors.set(node, "Not all code paths return a value.");
    }
    const statements = node.statements.map((statement) =>
      rewriteNode(ts, state, statement),
    );
    return {
      virtual: ts.factory.createBlock(
        statements.map((statement) => statement.virtual as ts.Statement),
        true,
      ),
      runtime: astNode(ts, "{}", {
        loc: loc(node),
        statements: ts.factory.createArrayLiteralExpression(
          statements.map((statement) => statement.runtime as ts.Expression),
          false,
        ),
      }),
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
      bannedUndefined(state, name, "declaration");
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
          // A value position must hold a value — a call can produce `void` —
          // and a `const` is where that is checked. A `let` is left as it was
          // written: an unbound wrapper checked nothing, and what the initial
          // widens to is the declaration's to decide, as it is in TypeScript.
          keyword === "const"
            ? call(ts, "cs", keyword, [initializer.virtual as ts.Expression])
            : (initializer.virtual as ts.Expression),
          // What the script said it was. Written by hand or not at all: a
          // script is checked as the code it looks like, and dropping this
          // would leave `let rows: Row[] = []` holding nothing it can hold.
          mapType(state, declaration.type),
        ),
        // The keyword is the kind, and `at` is the span a reader sees: the
        // whole statement where there is one, the list alone in a `for`.
        runtime: astNode(ts, keyword, {
          loc: loc(at),
          name: astNode(ts, "id", {
            loc: loc(declaration.name),
            text: ts.factory.createStringLiteral(name.text),
            bindingKey: ts.factory.createStringLiteral(bindingKey(state, name)),
          }),
          initializer: initializer.runtime as ts.Expression,
        }),
      };
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
        checkedCondition(
          ts,
          state,
          node.expression,
          condition.virtual as ts.Expression,
        ),
        consequent.virtual as ts.Statement,
        alternate ? (alternate.virtual as ts.Statement) : undefined,
      ),
      runtime: astNode(ts, "if", {
        loc: loc(node),
        expression: condition.runtime as ts.Expression,
        thenStatement: consequent.runtime as ts.Expression,
        elseStatement: alternate
          ? (alternate.runtime as ts.Expression)
          : ts.factory.createNull(),
      }),
    };
  }

  if (ts.isWhileStatement(node)) {
    const condition = rewriteNode(ts, state, node.expression);
    const body = rewriteNode(ts, state, node.statement);
    return {
      virtual: ts.factory.createWhileStatement(
        checkedCondition(
          ts,
          state,
          node.expression,
          condition.virtual as ts.Expression,
        ),
        body.virtual as ts.Statement,
      ),
      runtime: astNode(ts, "while", {
        loc: loc(node),
        expression: condition.runtime as ts.Expression,
        statement: body.runtime as ts.Expression,
      }),
    };
  }

  if (ts.isForStatement(node)) {
    // Each header part is optional, and the virtual `for` keeps them where the
    // source put them: the initializer's binding scopes over the header and the
    // body, which a rewrite into a block would have to reproduce by hand.
    const conditionNode = node.condition;
    const initializer = node.initializer
      ? rewriteNode(ts, state, node.initializer)
      : null;
    const condition = conditionNode
      ? rewriteNode(ts, state, conditionNode)
      : null;
    const update = node.incrementor
      ? rewriteNode(ts, state, node.incrementor)
      : null;
    const body = rewriteNode(ts, state, node.statement);
    const runtimeOr = (part: RewrittenNode | null): ts.Expression =>
      part ? (part.runtime as ts.Expression) : ts.factory.createNull();
    return {
      virtual: ts.factory.createForStatement(
        initializer ? (initializer.virtual as ts.ForInitializer) : undefined,
        condition && conditionNode
          ? checkedCondition(
              ts,
              state,
              conditionNode,
              condition.virtual as ts.Expression,
            )
          : undefined,
        update ? (update.virtual as ts.Expression) : undefined,
        body.virtual as ts.Statement,
      ),
      runtime: astNode(ts, "for", {
        loc: loc(node),
        initializer: runtimeOr(initializer),
        condition: runtimeOr(condition),
        incrementor: runtimeOr(update),
        statement: body.runtime as ts.Expression,
      }),
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
      runtime: astNode(ts, ts.isBreakStatement(node) ? "break" : "continue", {
        loc: loc(node),
      }),
    };
  }

  if (ts.isExpressionStatement(node)) {
    let inner = node.expression;
    while (ts.isParenthesizedExpression(inner)) {
      inner = inner.expression;
    }
    const assignment =
      ts.isBinaryExpression(inner) &&
      inner.operatorToken.kind === ts.SyntaxKind.EqualsToken;
    const expression = rewriteNode(ts, state, node.expression);
    // A statement discards its expression, which is only silent for
    // `void`. Assignments are language statements.
    const checked = assignment
      ? (expression.virtual as ts.Expression)
      : call(ts, "cs", "statement", [expression.virtual as ts.Expression]);
    return {
      virtual: ts.factory.createExpressionStatement(checked),
      runtime: expression.runtime,
    };
  }

  if (ts.isParenthesizedExpression(node)) {
    return rewriteNode(ts, state, node.expression);
  }

  if (ts.isReturnStatement(node) && !node.expression) {
    // A bare `return` exits an action early. In a value script it returns
    // nothing where a value is due — rewritten as `return null`, the
    // suggested fix, so the one error stands alone.
    if (state.bodyKind === "value") {
      state.errors.set(
        node,
        "A script that returns a value can't `return` without one.",
      );
    }
    return {
      virtual:
        state.bodyKind === "value"
          ? ts.factory.createReturnStatement(ts.factory.createNull())
          : ts.factory.createReturnStatement(),
      runtime: astNode(ts, "return", {
        loc: loc(node),
        expression: astNode(ts, "null", {
          loc: loc(node),
        }),
      }),
    };
  }

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createReturnStatement(
        state.bodyKind === "value"
          ? call(ts, "cs", "const", [expression.virtual as ts.Expression])
          : (expression.virtual as ts.Expression),
      ),
      runtime: astNode(ts, "return", {
        loc: loc(node),
        expression: expression.runtime as ts.Expression,
      }),
    };
  }

  if (ts.isThrowStatement(node)) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createThrowStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: astNode(ts, "throw", {
        loc: loc(node),
        expression: expression.runtime as ts.Expression,
      }),
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
      state.errors.set(
        declaration,
        "This catch binding isn't supported in a `cs` client script.",
      );
      return unsupported();
    }
    if (declaration && ts.isIdentifier(declaration.name)) {
      bannedUndefined(state, declaration.name, "declaration");
    }
    const block = rewriteNode(ts, state, node.tryBlock);
    let param: { virtual: ts.Identifier; runtime: ts.Expression } | null = null;
    if (declaration && ts.isIdentifier(declaration.name)) {
      const name = declaration.name;
      const identifier = ts.factory.createIdentifier(mangle(name.text));
      state.mappings.set(identifier, name);
      param = {
        virtual: identifier,
        runtime: astNode(ts, "id", {
          loc: loc(name),
          text: ts.factory.createStringLiteral(name.text),
          bindingKey: ts.factory.createStringLiteral(bindingKey(state, name)),
        }),
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
      runtime: astNode(ts, "try", {
        loc: loc(node),
        tryBlock: block.runtime as ts.Expression,
        // The clause is its own node, as it is in TypeScript.
        catchClause: astNode(ts, "catch", {
          loc: loc(clause),
          variableDeclaration: param ? param.runtime : ts.factory.createNull(),
          block: handler.runtime as ts.Expression,
        }),
      }),
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
      // `satisfies` lets you type-check a value against a type without
      // changing what TypeScript infers it to be.
      const virtual = ts.factory.createSatisfiesExpression(
        call(ts, "cs", "splice", [argument]),
        ts.factory.createImportTypeNode(
          ts.factory.createLiteralTypeNode(
            ts.factory.createStringLiteral("@backtickjs/core"),
          ),
          undefined,
          ts.factory.createIdentifier("ClientUnknown"),
        ),
      );
      state.codeInformation.set(virtual, { semantic: false });
      return {
        virtual,
        runtime: astNode(ts, "splice", {
          loc: loc(node),
          key: ts.factory.createStringLiteral(splice.key),
        }),
      };
    }

    // Rewritten as `null` — the suggested fix — so the one error stands
    // alone, with no `undefined` type cascading into the value checks.
    if (bannedUndefined(state, node, "value")) {
      return {
        virtual: ts.factory.createNull(),
        runtime: astNode(ts, "null", {
          loc: loc(node),
        }),
      };
    }

    // One exception to "there are no globals", and it is a list rather than a
    // rule: a name here is one this language provides itself, and what it means
    // is written down rather than inherited from whatever the host's own
    // happens to be.
    //
    // A front reaching here has not been taken by an access, and there is
    // nothing for it to be: the name the client answers is the whole of
    // `Math.floor`, so a front on its own reads no value the format can carry.
    // The virtual code still names the host's lib plainly — narrowing it is
    // `Receiver`'s job, where the access reads it — so the one error stands
    // alone.
    if (!state.bindings.has(node) && language.has(`${node.text}.`)) {
      if (!isNamespaceFront(ts, node)) {
        state.errors.set(
          node,
          `\`${node.text}\` is a namespace, not a value: a client script can ` +
            "only write it followed by a member.",
        );
      }
      // Named plainly, as the lib global it is; narrowing it is the access's.
      const virtual = ts.factory.createIdentifier(node.text);
      state.mappings.set(virtual, node);
      return {
        virtual,
        runtime: astNode(ts, "bltn", {
          loc: loc(node),
          name: ts.factory.createStringLiteral(node.text),
        }),
      };
    }

    // The same exception said for a whole name rather than a front. Nothing
    // folds in below one, so it needs no check that something did — and it has
    // no access to be narrowed at either, which is why this one carries
    // `cs.receiver` itself. Without it a script typechecks against whichever
    // timer the project's lib happens to declare, and node's answers with a
    // `Timeout`, which is no value this format can carry.
    if (!state.bindings.has(node) && language.has(node.text)) {
      const named = ts.factory.createIdentifier(node.text);
      state.mappings.set(named, node);
      const virtual = call(ts, "cs", "receiver", [named]);
      state.mappings.set(virtual, node);
      return {
        virtual,
        runtime: astNode(ts, "bltn", {
          loc: loc(node),
          name: ts.factory.createStringLiteral(node.text),
        }),
      };
    }

    // There are no globals: a name the resolver didn't bind belongs to no
    // scope, whether it's a host binding or a lib global like `String`.
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
      runtime: astNode(ts, "id", {
        loc: loc(node),
        text: ts.factory.createStringLiteral(node.text),
        bindingKey: ts.factory.createStringLiteral(bindingKey(state, node)),
      }),
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
    // The receiver reads as its client-side view (`Receiver<T>`), while the
    // access stays a real property access so hover, rename, and completions
    // on the name keep working.
    const propertyName = ts.factory.createIdentifier(name);
    state.mappings.set(propertyName, node.name);
    const virtualReceiver = call(ts, "cs", "receiver", [
      expression.virtual as ts.Expression,
    ]);
    state.mappings.set(virtualReceiver, node.expression);
    // `a?.b` reads as null for a null `a` — never `undefined` — so the
    // access carries `?? null` unless a user `??` already coalesces it.
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
    const virtual =
      optional && !nullCoalescedLeft(ts, node)
        ? ts.factory.createParenthesizedExpression(
            ts.factory.createBinaryExpression(
              access,
              ts.SyntaxKind.QuestionQuestionToken,
              ts.factory.createNull(),
            ),
          )
        : access;
    return {
      virtual,
      // Only the runtime node folds: the virtual code still writes the access
      // out, which is what keeps hover, rename and completion on the member
      // working and leaves `Receiver` to narrow what may be read off the name.
      runtime: accessNode(
        ts,
        state,
        node,
        name,
        expression.runtime as ts.Expression,
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
      // `cs.index` reads the receiver as its client-side view and checks the
      // key against what that view names, which a real `a[i]` would not: to
      // TypeScript a numeric string literal is a numeric index, so `a["0"]`
      // would pass there and read null here. An in-range read is the element
      // type — TypeScript's own rule, the one the language follows wherever
      // TypeScript has one.
      virtual: call(ts, "cs", "index", [
        expression.virtual as ts.Expression,
        key.virtual as ts.Expression,
      ]),
      runtime: astNode(ts, "[]", {
        loc: loc(node),
        expression: expression.runtime as ts.Expression,
        argumentExpression: key.runtime as ts.Expression,
      }),
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

    // In source order, because a host may care that `type` precedes `value`.
    const attributes: { virtual: ts.JsxAttribute; runtime: ts.Expression }[] =
      [];
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
          call(ts, "cs", "lift", [value.virtual as ts.Expression]),
        ),
      );
      state.mappings.set(attributeVirtual, attribute);
      attributes.push({
        virtual: attributeVirtual,
        runtime: ts.factory.createObjectLiteralExpression(
          [
            ts.factory.createPropertyAssignment(
              "name",
              ts.factory.createStringLiteral(name),
            ),
            ts.factory.createPropertyAssignment(
              "initializer",
              value.runtime as ts.Expression,
            ),
          ],
          true,
        ),
      });
    }

    // Whitespace-only text is dropped, as JSX drops it; what is left is text,
    // an expression, or another element.
    const children: ts.Expression[] = [];
    const virtualChildren: ts.JsxChild[] = [];
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      for (const child of node.children) {
        if (ts.isJsxText(child)) {
          const text = jsxText(child.text);
          if (text === null) {
            continue;
          }
          children.push(
            astNode(ts, "string", {
              loc: loc(child),
              text: ts.factory.createStringLiteral(text),
            }),
          );
          virtualChildren.push(child);
          continue;
        }
        if (ts.isJsxExpression(child)) {
          if (child.expression === undefined) {
            continue;
          }
          const rewritten = rewriteNode(ts, state, child.expression);
          children.push(rewritten.runtime as ts.Expression);
          virtualChildren.push(
            ts.factory.createJsxExpression(
              undefined,
              call(ts, "cs", "lift", [rewritten.virtual as ts.Expression]),
            ),
          );
          continue;
        }
        const rewritten = rewriteNode(ts, state, child);
        children.push(rewritten.runtime as ts.Expression);
        virtualChildren.push(
          ts.factory.createJsxExpression(
            undefined,
            call(ts, "cs", "lift", [rewritten.virtual as ts.Expression]),
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
      const written = ts.factory.createIdentifier(tagName);
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

    // A fragment is its children: they go where it stood, and a list of them
    // already says that, so nothing of it reaches the client.
    if (isFragment) {
      return {
        virtual,
        runtime:
          children.length === 1
            ? children[0]
            : astNode(ts, "arr", {
                loc: loc(node),
                elements: ts.factory.createArrayLiteralExpression(
                  children,
                  false,
                ),
              }),
      };
    }

    return {
      virtual,
      runtime: astNode(ts, "jsx", {
        loc: loc(node),
        // An element of the target is its own name; a component tag is the
        // host binding it names, which the script reaches by splice under the
        // key `getDirectSplices` minted for it.
        type:
          opening !== null && isComponentTag(tagName)
            ? astNode(ts, "splice", {
                loc: loc(opening.tagName),
                key: ts.factory.createStringLiteral(`$${tagName}`),
              })
            : astNode(ts, "string", {
                loc: opening === null ? loc(node) : loc(opening.tagName),
                text: ts.factory.createStringLiteral(tagName),
              }),
        attributes: ts.factory.createArrayLiteralExpression(
          attributes.map((attribute) => attribute.runtime),
          false,
        ),
        children: ts.factory.createArrayLiteralExpression(children, false),
      }),
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
    const runtimeArgs = ts.factory.createArrayLiteralExpression(
      args.map((arg) => arg.runtime as ts.Expression),
      false,
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
      // A method call reads the member off `cs.receiver(...)`; the runtime
      // keeps the direct property call, so receiver binding is unchanged.
      // An optional receiver or callee short-circuits null, so the call
      // carries `?? null` like an optional access.
      const propertyName = ts.factory.createIdentifier(name);
      state.mappings.set(propertyName, access.name);
      const virtualReceiver = call(ts, "cs", "receiver", [
        receiver.virtual as ts.Expression,
      ]);
      state.mappings.set(virtualReceiver, access.expression);

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
      const virtual =
        inChain && !nullCoalescedLeft(ts, node)
          ? ts.factory.createParenthesizedExpression(
              ts.factory.createBinaryExpression(
                virtualCall,
                ts.SyntaxKind.QuestionQuestionToken,
                ts.factory.createNull(),
              ),
            )
          : virtualCall;
      return {
        virtual,
        runtime: astNode(ts, optionalCall ? "?.()" : "()", {
          loc: loc(node),
          expression: accessNode(
            ts,
            state,
            access,
            name,
            receiver.runtime as ts.Expression,
            optional,
          ),
          arguments: runtimeArgs,
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
      virtual:
        optionalCall && !nullCoalescedLeft(ts, node)
          ? ts.factory.createParenthesizedExpression(
              ts.factory.createBinaryExpression(
                virtualCall,
                ts.SyntaxKind.QuestionQuestionToken,
                ts.factory.createNull(),
              ),
            )
          : virtualCall,
      runtime: astNode(ts, optionalCall ? "?.()" : "()", {
        loc: loc(node),
        expression: callee.runtime as ts.Expression,
        arguments: runtimeArgs,
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
        bannedUndefined(state, param.name, "parameter");
        let type = param.type;
        // Rewritten as `any` — the keyword error stands alone; the
        // `ClientValue` boundary check would otherwise repeat it coarsely.
        if (type && bannedTypeKeywords(ts, state, type)) {
          type = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
        }
        return {
          source: param,
          name: param.name,
          type,
          optional: param.questionToken != null,
        };
      }
      state.errors.set(
        param,
        "This parameter isn't supported in a `cs` client script.",
      );
      return null;
    });

    if (params.every((param) => param != null)) {
      // An arrow's body classifies on its own — never inherited from the
      // enclosing body.
      const bodyState: RewriteState = {
        ...state,
        bodyKind: bodyKind(ts, node.body),
      };
      const virtualParams = params.map((param) => {
        const identifier = ts.factory.createIdentifier(mangle(param.name.text));
        state.mappings.set(identifier, param.name);
        // `?` marks a nullable parameter — sugar for `T | null`, not an
        // optional argument: the virtual parameter stays required
        const declaration = ts.factory.createParameterDeclaration(
          undefined,
          undefined,
          identifier,
          undefined,
          param.optional && param.type
            ? ts.factory.createUnionTypeNode([
                mapType(state, param.type),
                ts.factory.createLiteralTypeNode(ts.factory.createNull()),
              ])
            : mapType(state, param.type),
          undefined,
        );
        state.mappings.set(declaration, param.source);
        return declaration;
      });
      const body = rewriteNode(ts, bodyState, node.body);
      return {
        virtual: ts.factory.createArrowFunction(
          undefined,
          undefined,
          virtualParams,
          undefined,
          ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          body.virtual as ts.ConciseBody,
        ),
        runtime: astNode(ts, "=>", {
          loc: loc(node),
          parameters: ts.factory.createArrayLiteralExpression(
            params.map((param) =>
              astNode(ts, "param", {
                loc: loc(param.source),
                name: astNode(ts, "id", {
                  loc: loc(param.name),
                  text: ts.factory.createStringLiteral(param.name.text),
                  bindingKey: ts.factory.createStringLiteral(
                    bindingKey(state, param.name),
                  ),
                }),
              }),
            ),
            false,
          ),
          body: body.runtime as ts.Expression,
        }),
      };
    }

    return unsupported();
  }

  if (ts.isSpreadElement(node)) {
    const spread = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createSpreadElement(spread.virtual as ts.Expression),
      runtime: astNode(ts, "...", {
        loc: loc(node),
        expression: spread.runtime as ts.Expression,
      }),
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
      runtime: astNode(ts, "arr", {
        loc: loc(node),
        elements: ts.factory.createArrayLiteralExpression(
          elements.map((element) => element.runtime as ts.Expression),
          false,
        ),
      }),
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
          text: null,
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
          text: property.name.text,
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
        runtime: astNode(ts, "obj", {
          loc: loc(node),
          properties: ts.factory.createArrayLiteralExpression(
            properties.map((property) =>
              property.text === null
                ? astNode(ts, "...", {
                    loc: loc(property.source),
                    expression: property.value.runtime as ts.Expression,
                  })
                : astNode(ts, ":", {
                    loc: loc(property.source),
                    name: ts.factory.createStringLiteral(property.text),
                    initializer: property.value.runtime as ts.Expression,
                  }),
            ),
            false,
          ),
        }),
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
        checkedCondition(
          ts,
          state,
          node.condition,
          condition.virtual as ts.Expression,
        ),
        ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        consequent.virtual as ts.Expression,
        ts.factory.createToken(ts.SyntaxKind.ColonToken),
        alternate.virtual as ts.Expression,
      ),
      runtime: astNode(ts, "?:", {
        loc: loc(node),
        condition: condition.runtime as ts.Expression,
        whenTrue: consequent.runtime as ts.Expression,
        whenFalse: alternate.runtime as ts.Expression,
      }),
    };
  }

  if (ts.isPrefixUnaryExpression(node)) {
    const negation = node.operator === ts.SyntaxKind.MinusToken;
    if (node.operator !== ts.SyntaxKind.ExclamationToken && !negation) {
      state.errors.set(
        node,
        "This operator isn't supported in a `cs` client script.",
      );
      return unsupported();
    }
    const operand = rewriteNode(ts, state, node.operand);
    return {
      virtual: ts.factory.createPrefixUnaryExpression(
        node.operator,
        // `!` tests its operand, so it takes the boolean check every tested
        // position takes. `-` takes one of its own: TypeScript checks a binary
        // arithmetic operand but not a prefixed one, so `-name` would type as a
        // number and coerce at runtime.
        negation
          ? call(ts, "cs", "number", [operand.virtual as ts.Expression])
          : checkedCondition(
              ts,
              state,
              node.operand,
              operand.virtual as ts.Expression,
            ),
      ),
      runtime: astNode(ts, "unop", {
        loc: loc(node),
        operator: ts.factory.createStringLiteral(negation ? "-" : "!"),
        operand: operand.runtime as ts.Expression,
      }),
    };
  }

  if (ts.isBinaryExpression(node)) {
    const lhs = rewriteNode(ts, state, node.left);
    const rhs = rewriteNode(ts, state, node.right);

    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      // An assignment is a binary expression over `=`, as it is in TypeScript,
      // but only a variable can be assigned to: a member and an element are
      // both reads here, since an object and an array are values.
      if (!ts.isIdentifier(node.left)) {
        state.errors.set(
          node.left,
          "Only a variable can be assigned to in a `cs` client script.",
        );
        return unsupported();
      }
      // A script's own variables are assignable anywhere within it, but a
      // captured one isn't: the write would mutate the nested script's
      // copy and silently not propagate. An unresolved target keeps the
      // resolver's own "Cannot find name".
      const target = state.bindings.get(node.left);
      if (target != null && state.captures?.has(target)) {
        state.errors.set(
          node.left,
          "Can't assign to a variable captured from an enclosing script: " +
            "a nested script captures the value, not the variable.",
        );
      }
      return {
        virtual: ts.factory.createBinaryExpression(
          lhs.virtual as ts.Expression,
          ts.SyntaxKind.EqualsToken,
          call(ts, "cs", "const", [rhs.virtual as ts.Expression]),
        ),
        runtime: astNode(ts, "binop", {
          loc: loc(node),
          left: lhs.runtime as ts.Expression,
          operatorToken: ts.factory.createStringLiteral("="),
          right: rhs.runtime as ts.Expression,
        }),
      };
    }

    const operator = ts.tokenToString(node.operatorToken.kind);
    if (operator != null && isSupportedBinop(operator)) {
      let virtualLeft = lhs.virtual as ts.Expression;
      let virtualRight = rhs.virtual as ts.Expression;
      if (operator === "&&" || operator === "||") {
        virtualLeft = checkedCondition(ts, state, node.left, virtualLeft);
        virtualRight = checkedCondition(ts, state, node.right, virtualRight);
      }
      return {
        virtual: ts.factory.createBinaryExpression(
          virtualLeft,
          node.operatorToken.kind,
          virtualRight,
        ),
        runtime: astNode(ts, "binop", {
          loc: loc(node),
          left: lhs.runtime as ts.Expression,
          operatorToken: ts.factory.createStringLiteral(operator),
          right: rhs.runtime as ts.Expression,
        }),
      };
    }
    state.errors.set(
      node,
      "This operator isn't supported in a `cs` client script.",
    );
    return unsupported();
  }

  if (node.kind === ts.SyntaxKind.NullKeyword) {
    return {
      virtual: ts.factory.createNull(),
      runtime: astNode(ts, "null", {
        loc: loc(node),
      }),
    };
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: astNode(ts, "number", {
        loc: loc(node),
        value: ts.factory.createNumericLiteral(node.text),
      }),
    };
  }

  if (ts.isStringLiteral(node)) {
    return {
      virtual: ts.factory.createStringLiteral(node.text),
      runtime: astNode(ts, "string", {
        loc: loc(node),
        text: ts.factory.createStringLiteral(node.text),
      }),
    };
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return {
      virtual: ts.factory.createTrue(),
      runtime: astNode(ts, "true", {
        loc: loc(node),
      }),
    };
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return {
      virtual: ts.factory.createFalse(),
      runtime: astNode(ts, "false", {
        loc: loc(node),
      }),
    };
  }

  state.errors.set(
    node,
    "This syntax isn't supported in a `cs` client script.",
  );
  return unsupported();
}
