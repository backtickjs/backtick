import type ts from "typescript";
import { isSupportedBinop } from "./binop.js";
import type { CodeInformation } from "./CodeInformation.js";
import { call, sourceLoc, varDecl } from "./nodeFactory.js";
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

// The globally unique binding key the resolver assigned this identifier. Only
// bound variables get a key; a free host capture is absent from the map and
// keeps its original text, which is how the runtime scope provides it.
function bindingKey(state: RewriteState, identifier: ts.Identifier): string {
  return state.bindings.get(identifier) ?? identifier.text;
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
        condition.virtual as ts.Expression,
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
      const virtual = call(ts, "cs", "splice", [argument]);
      state.codeInformation.set(virtual, { semantic: false });
      return {
        virtual,
        runtime: call(ts, "v", "splice", [
          loc(node),
          ts.factory.createStringLiteral(splice.key),
        ]),
      };
    }

    return {
      // Only a bound identifier is mangled: a free host reference (e.g.
      // `String`) keeps its name so the virtual code resolves it against the
      // environment, mirroring the runtime's global-object fallback.
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
    return {
      virtual: ts.factory.createPropertyAccessExpression(
        virtualReceiver,
        propertyName,
      ),
      runtime: call(ts, "v", "propertyAccess", [
        loc(node),
        expression.runtime as ts.Expression,
        ts.factory.createStringLiteral(name),
      ]),
    };
  }

  if (ts.isCallExpression(node)) {
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
      const receiver = rewriteNode(ts, state, access.expression);
      const name = access.name.text;
      // A method call goes through the same virtualized access: the member
      // is read off `cs.virtualize(receiver)`, then the call checks its
      // arguments and yields its return type. The runtime keeps the direct
      // property call, so receiver binding is unchanged.
      const propertyName = ts.factory.createIdentifier(name);
      state.mappings.set(propertyName, access.name);
      const virtualReceiver = call(ts, "cs", "virtualize", [
        receiver.virtual as ts.Expression,
      ]);
      state.mappings.set(virtualReceiver, access.expression);

      return {
        virtual: ts.factory.createCallExpression(
          ts.factory.createPropertyAccessExpression(
            virtualReceiver,
            propertyName,
          ),
          undefined,
          args.map((arg) => arg.virtual as ts.Expression),
        ),
        runtime: call(ts, "v", "call", [
          loc(node),
          call(ts, "v", "propertyAccess", [
            loc(access),
            receiver.runtime as ts.Expression,
            ts.factory.createStringLiteral(name),
          ]),
          runtimeArgs,
        ]),
      };
    }

    const callee = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createCallExpression(
        callee.virtual as ts.Expression,
        undefined,
        args.map((arg) => arg.virtual as ts.Expression),
      ),
      runtime: call(ts, "v", "call", [
        loc(node),
        callee.runtime as ts.Expression,
        runtimeArgs,
      ]),
    };
  }

  if (ts.isNewExpression(node)) {
    const rewrittenCallee = rewriteNode(ts, state, node.expression);

    const rewrittenArgs = (node.arguments ?? []).map((arg) =>
      rewriteNode(ts, state, arg),
    );

    // Lift each argument so the constructor receives `Client<…>` values
    const liftedArgs = rewrittenArgs.map((arg) =>
      call(ts, "cs", "lift", [arg.virtual as ts.Expression]),
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
    const params = node.parameters.map((param) => {
      if (ts.isIdentifier(param.name)) {
        return { name: param.name, type: param.type };
      }
      state.errors.set(
        param,
        "This parameter isn't supported in a `cs` client script.",
      );
      return null;
    });

    if (params.every((param) => param != null)) {
      const virtualParams = params.map((param) => {
        const identifier = ts.factory.createIdentifier(mangle(param.name.text));
        state.mappings.set(identifier, param.name);
        return ts.factory.createParameterDeclaration(
          undefined,
          undefined,
          identifier,
          undefined,
          param.type,
        );
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
      return {
        virtual: ts.factory.createBinaryExpression(
          lhs.virtual as ts.Expression,
          node.operatorToken.kind,
          rhs.virtual as ts.Expression,
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
