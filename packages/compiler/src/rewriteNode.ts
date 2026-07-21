import type ts from "typescript";
import { isSupportedBinop } from "./binop.js";
import type { CodeInformation } from "./CodeInformation.js";
import { call, sourceLoc, varDecl } from "./nodeFactory.js";
import { ownReturn } from "./ownReturn.js";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import { terminates } from "./terminates.js";
import { mangle } from "./unmangle.js";

export interface RewriteState {
  script: ClientScript;
  bindings: BindingResolution;
  errors: Map<ts.Node, string>;
  mappings: Map<ts.Node, ts.Node>; // virtual -> source
  // virtual nodes whose mappings carry non-default editor behavior
  codeInformation: Map<ts.Node, CodeInformation>;
  // set while rewriting a condition's bare duplicate, so the duplicate
  // gets no checks of its own
  conditionDup?: boolean;
  // set while rewriting the statements of a body that returns a value,
  // where side effects — expression statements — are banned
  valueBody?: boolean;
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
  if (
    state.conditionDup ||
    isBooleanByConstruction(ts, source) ||
    virtual.pos >= 0
  ) {
    return virtual;
  }
  const dupState: RewriteState = {
    ...state,
    conditionDup: true,
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

// Whether `node` is the left operand of a `??` (through parens). That `??`
// already coalesces the `undefined` an optional chain produces, so the
// chain's auto `?? null` would nest as `(a ?? null) ?? b` — same meaning,
// but flagged by TypeScript (TS2871) — and is skipped.
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

// The initializer's first reference to the binding it declares (e.g. a
// method closing over the object that holds it) — rejected: checked value
// positions would force resolving the binding mid-inference (TS7022), and
// the pattern is spelled as a host `ClientObject` class instead.
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
    runtime: call(ts, "v", "null", [loc(node)]),
  });

  const loc = (target: ts.Node): ts.Expression =>
    sourceLoc(ts, state.script.toSourceLocation(target));

  if (ts.isBlock(node)) {
    const statements = node.statements.map((statement) =>
      rewriteNode(ts, state, statement),
    );
    return {
      virtual: ts.factory.createBlock(
        statements.map((statement) => statement.virtual as ts.Statement),
        true,
      ),
      runtime: call(ts, "v", "block", [
        loc(node),
        ts.factory.createArrayLiteralExpression(
          statements.map((statement) => statement.runtime as ts.Expression),
          false,
        ),
      ]),
    };
  }

  if (ts.isVariableStatement(node)) {
    const flags = node.declarationList.flags;
    if (flags !== ts.NodeFlags.Const && flags !== ts.NodeFlags.Let) {
      state.errors.set(
        node,
        "`var` isn't supported in a client script; use `const` or `let`.",
      );
      return unsupported();
    }
    const keyword = flags === ts.NodeFlags.Const ? "const" : "let";
    const declarations = node.declarationList.declarations;
    if (declarations.length !== 1) {
      state.errors.set(
        node,
        "A client script variable declaration must declare a single variable.",
      );
      return unsupported();
    }
    const [declaration] = declarations;
    if (declaration && ts.isIdentifier(declaration.name)) {
      if (!declaration.initializer) {
        state.errors.set(
          node,
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
        virtual: varDecl(
          ts,
          node.declarationList.flags,
          identifier,
          initializer.virtual as ts.Expression,
        ),
        runtime: call(ts, "v", "variableDeclaration", [
          loc(node),
          ts.factory.createStringLiteral(keyword),
          call(ts, "v", "identifier", [
            loc(declaration.name),
            ts.factory.createStringLiteral(name.text),
            ts.factory.createStringLiteral(bindingKey(state, name)),
          ]),
          initializer.runtime as ts.Expression,
        ]),
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
      runtime: call(ts, "v", "if", [
        loc(node),
        condition.runtime as ts.Expression,
        consequent.runtime as ts.Expression,
        alternate
          ? (alternate.runtime as ts.Expression)
          : ts.factory.createNull(),
      ]),
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
    // An expression statement is a side effect (or dead code). It still
    // rewrites so its splices don't dangle into "Cannot find name"
    // cascades.
    if (state.valueBody && !assignment) {
      state.errors.set(
        node,
        "A script that returns a value can't have side effects; run them " +
          "in an action — a block without `return`.",
      );
    }
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createExpressionStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: expression.runtime,
    };
  }

  if (ts.isParenthesizedExpression(node)) {
    return rewriteNode(ts, state, node.expression);
  }

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createReturnStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: call(ts, "v", "return", [
        loc(node),
        expression.runtime as ts.Expression,
      ]),
    };
  }

  if (ts.isThrowStatement(node)) {
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createThrowStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: call(ts, "v", "throw", [
        loc(node),
        expression.runtime as ts.Expression,
      ]),
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
        runtime: call(ts, "v", "identifier", [
          loc(name),
          ts.factory.createStringLiteral(name.text),
          ts.factory.createStringLiteral(bindingKey(state, name)),
        ]),
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
      runtime: call(ts, "v", "try", [
        loc(node),
        block.runtime as ts.Expression,
        param ? param.runtime : ts.factory.createNull(),
        handler.runtime as ts.Expression,
      ]),
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
      // The wrapper's frame claims only the splice delimiters (`${`/`}`,
      // or nothing for `$x`): hover must not resolve through it.
      // A splice whose parent (through parens) is a statement in a block
      // sits in statement position — the action position. The block check
      // matters: a bare-splice script is a statement of the file itself,
      // which is composition.
      let parent: ts.Node | undefined = node.parent;
      while (parent != null && ts.isParenthesizedExpression(parent)) {
        parent = parent.parent;
      }
      const statementPosition =
        parent != null &&
        ts.isExpressionStatement(parent) &&
        ts.isBlock(parent.parent);
      const virtual = call(
        ts,
        "cs",
        statementPosition ? "spliceAction" : "spliceValue",
        [argument],
      );
      state.codeInformation.set(virtual, { semantic: false });
      return {
        virtual,
        runtime: call(ts, "v", "splice", [
          loc(node),
          ts.factory.createStringLiteral(splice.key),
        ]),
      };
    }

    // Rewritten as `null` — the suggested fix — so the one error stands
    // alone, with no `undefined` type cascading into the value checks.
    if (bannedUndefined(state, node, "value")) {
      return {
        virtual: ts.factory.createNull(),
        runtime: call(ts, "v", "null", [loc(node)]),
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
      runtime: call(ts, "v", "identifier", [
        loc(node),
        ts.factory.createStringLiteral(node.text),
        ts.factory.createStringLiteral(bindingKey(state, node)),
      ]),
    };
  }

  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const name = node.name.text;

    // `?.` propagates null one step, so each access in a chain handles the
    // null its receiver may produce; a plain `.` after `?.` (which
    // JavaScript short-circuits past) has no meaning here. Rewritten as
    // `?.` — the suggested fix — so the one error stands alone.
    if (ts.isOptionalChain(node) && !node.questionDotToken) {
      state.errors.set(
        node.name,
        "`.` after `?.` isn't supported in a `cs` client script; use `?.` " +
          "for each access in the chain.",
      );
    }
    const optional = ts.isOptionalChain(node);

    const expression = rewriteNode(ts, state, node.expression);
    // Member access is virtualized: the receiver is viewed as `Virtualized<T>`
    // via `cs.virtualize`, so a host-typed receiver's members read as what
    // the client receives, while the access itself stays a real property
    // access (hover, rename, and completions on the name keep working).
    const propertyName = ts.factory.createIdentifier(name);
    state.mappings.set(propertyName, node.name);
    const virtualReceiver = call(ts, "cs", "virtualize", [
      expression.virtual as ts.Expression,
    ]);
    state.mappings.set(virtualReceiver, node.expression);
    // `a?.b` reads as null when `a` is null — the language has no
    // `undefined` — so the optional access carries `?? null`, unless a
    // user-written `??` already coalesces it.
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
      runtime: call(ts, "v", "propertyAccess", [
        loc(node),
        expression.runtime as ts.Expression,
        ts.factory.createStringLiteral(name),
        ...(optional ? [ts.factory.createTrue()] : []),
      ]),
    };
  }

  if (ts.isCallExpression(node)) {
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
      // The same one-step rule as the property branch: this access is
      // consumed inline, so it needs its own copy of the check (and the
      // same rewrite-as-`?.` recovery).
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
      // A method call goes through the same virtualized access: the member
      // is read off `cs.virtualize(receiver)`, then the call checks its
      // arguments and yields its return type. The runtime keeps the direct
      // property call, so receiver binding is unchanged. An optional
      // receiver (`a?.b(…)`) short-circuits a null `a` to null, so the
      // call carries `?? null` like an optional access.
      const propertyName = ts.factory.createIdentifier(name);
      state.mappings.set(propertyName, access.name);
      const virtualReceiver = call(ts, "cs", "virtualize", [
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
            undefined,
            args.map((arg) => arg.virtual as ts.Expression),
          )
        : ts.factory.createCallExpression(
            calleeAccess,
            undefined,
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
        runtime: call(ts, "v", "call", [
          loc(node),
          call(ts, "v", "propertyAccess", [
            loc(access),
            receiver.runtime as ts.Expression,
            ts.factory.createStringLiteral(name),
            ...(optional ? [ts.factory.createTrue()] : []),
          ]),
          runtimeArgs,
          ...(optionalCall ? [ts.factory.createTrue()] : []),
        ]),
      };
    }

    const callee = rewriteNode(ts, state, node.expression);
    const virtualCall = optionalCall
      ? ts.factory.createCallChain(
          callee.virtual as ts.Expression,
          ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
          undefined,
          args.map((arg) => arg.virtual as ts.Expression),
        )
      : ts.factory.createCallExpression(
          callee.virtual as ts.Expression,
          undefined,
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
      runtime: call(ts, "v", "call", [
        loc(node),
        callee.runtime as ts.Expression,
        runtimeArgs,
        ...(optionalCall ? [ts.factory.createTrue()] : []),
      ]),
    };
  }

  if (ts.isNewExpression(node)) {
    const rewrittenCallee = rewriteNode(ts, state, node.expression);

    const rewrittenArgs = (node.arguments ?? []).map((arg) =>
      rewriteNode(ts, state, arg),
    );

    // Lift each argument so the constructor receives `Client<…>` values;
    // `cs.value` keeps a bare action from riding in as data.
    const liftedArgs = rewrittenArgs.map((arg) =>
      call(ts, "cs", "liftValue", [arg.virtual as ts.Expression]),
    );

    return {
      virtual: ts.factory.createNewExpression(
        ts.factory.createParenthesizedExpression(
          rewrittenCallee.virtual as ts.Expression,
        ),
        undefined,
        liftedArgs,
      ),
      runtime: call(ts, "v", "new", [
        loc(node),
        rewrittenCallee.runtime as ts.Expression,
        ts.factory.createArrayLiteralExpression(
          rewrittenArgs.map((arg) => arg.runtime as ts.Expression),
          false,
        ),
      ]),
    };
  }

  if (ts.isArrowFunction(node)) {
    // TypeScript's own rule (TS1016), enforced here because the checker
    // never sees the script source — and the virtual's `= null` rewrite of
    // `?` would otherwise legalize the shape with the wrong arity.
    let sawOptional = false;
    const params = node.parameters.map((param) => {
      // A rest parameter or a default would be silently dropped from the
      // bundle — a miscompile, not a restriction to lift later. The
      // parameter still rewrites (without the `...`/initializer), so the
      // one error stands alone and the script keeps its mangled, mapped
      // virtual — a raw-source bail would lose highlighting and hover.
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
      if (param.questionToken != null) {
        sawOptional = true;
      } else if (sawOptional) {
        // The one error stands alone: the parameter stays required, which
        // is legal in the virtual after the preceding `= null` rewrite.
        state.errors.set(
          param.name,
          "A required parameter cannot follow an optional parameter.",
        );
      }
      if (ts.isIdentifier(param.name)) {
        bannedUndefined(state, param.name, "parameter");
        return {
          name: param.name,
          type: param.type,
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
      let bodyState = { ...state };
      if (ts.isBlock(node.body)) {
        const hasReturn = ownReturn(ts, node.body);
        const exits = terminates(ts, node.body);
        bodyState.valueBody = hasReturn || exits;
        if (hasReturn && !exits) {
          state.errors.set(node.body, "Not all code paths return a value.");
          return unsupported();
        }
      }
      const virtualParams = params.map((param) => {
        const identifier = ts.factory.createIdentifier(mangle(param.name.text));
        state.mappings.set(identifier, param.name);
        // `?` marks a nullable parameter: the virtual is `T | null = null`,
        // so callers may omit the argument and the body reads `T | null` —
        // the `= null` absorbs `undefined`, which the language doesn't have.
        // The union factory parenthesizes constituents only where the
        // grammar needs it (`(() => number) | null`), so keyword types stay
        // bare in hover.
        return ts.factory.createParameterDeclaration(
          undefined,
          undefined,
          identifier,
          undefined,
          param.optional && param.type
            ? ts.factory.createUnionTypeNode([
                param.type,
                ts.factory.createLiteralTypeNode(ts.factory.createNull()),
              ])
            : param.type,
          param.optional ? ts.factory.createNull() : undefined,
        );
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
        runtime: call(ts, "v", "arrow", [
          loc(node),
          ts.factory.createArrayLiteralExpression(
            params.map((param) =>
              call(ts, "v", "identifier", [
                loc(param.name),
                ts.factory.createStringLiteral(param.name.text),
                ts.factory.createStringLiteral(bindingKey(state, param.name)),
              ]),
            ),
            false,
          ),
          body.runtime as ts.Expression,
        ]),
      };
    }

    return unsupported();
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
      runtime: call(ts, "v", "array", [
        loc(node),
        ts.factory.createArrayLiteralExpression(
          elements.map((element) => element.runtime as ts.Expression),
          false,
        ),
      ]),
    };
  }

  if (ts.isObjectLiteralExpression(node)) {
    const properties = node.properties.map((property) => {
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
            ts.factory.createPropertyAssignment(
              property.name,
              property.value.virtual as ts.Expression,
            ),
          ),
          false,
        ),
        runtime: call(ts, "v", "object", [
          loc(node),
          ts.factory.createObjectLiteralExpression(
            properties.map((property) =>
              ts.factory.createPropertyAssignment(
                property.name,
                property.value.runtime as ts.Expression,
              ),
            ),
            false,
          ),
        ]),
      };
    }

    return unsupported();
  }

  if (ts.isBinaryExpression(node)) {
    const lhs = rewriteNode(ts, state, node.left);
    const rhs = rewriteNode(ts, state, node.right);

    if (
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isIdentifier(node.left)
    ) {
      return {
        virtual: ts.factory.createBinaryExpression(
          lhs.virtual as ts.Expression,
          ts.SyntaxKind.EqualsToken,
          rhs.virtual as ts.Expression,
        ),
        runtime: call(ts, "v", "assignment", [
          loc(node),
          lhs.runtime as ts.Expression,
          rhs.runtime as ts.Expression,
        ]),
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
        runtime: call(ts, "v", "binop", [
          loc(node),
          lhs.runtime as ts.Expression,
          ts.factory.createStringLiteral(operator),
          rhs.runtime as ts.Expression,
        ]),
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
      runtime: call(ts, "v", "null", [loc(node)]),
    };
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: call(ts, "v", "number", [
        loc(node),
        ts.factory.createNumericLiteral(node.text),
      ]),
    };
  }

  if (ts.isStringLiteral(node)) {
    return {
      virtual: ts.factory.createStringLiteral(node.text),
      runtime: call(ts, "v", "string", [
        loc(node),
        ts.factory.createStringLiteral(node.text),
      ]),
    };
  }

  if (
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword
  ) {
    const value = node.kind === ts.SyntaxKind.TrueKeyword;
    const literal = value ? ts.factory.createTrue() : ts.factory.createFalse();
    return {
      virtual: literal,
      runtime: call(ts, "v", "boolean", [loc(node), literal]),
    };
  }

  state.errors.set(
    node,
    "This syntax isn't supported in a `cs` client script.",
  );
  return unsupported();
}
