import type ts from "typescript";
import type { Splice } from "./parseFile.js";

/**
 * Computes a script's free variables: identifiers referenced (read or written)
 * that are not bound by a declaration in the script, and so must be captured
 * from the enclosing scope.
 *
 * This is plain lexical scoping with hoisted declarations, matching JavaScript:
 *  - `let`/`const` introduce a binding for their whole block regardless of
 *    textual position (hoisting), so a use before the declaration still refers
 *    to the local binding — not a free variable.
 *  - a bare assignment (`x = ...`) does not introduce a binding; it references
 *    whatever `x` resolves to lexically, so an undeclared assignment target is
 *    free.
 *
 * Splice placeholders are not variables: they evaluate host code in the
 * enclosing scope, so their own captures are not the script's concern.
 */
export function freeVars(
  ts: typeof import("typescript"),
  splices: { [placeholder: string]: Splice },
  node: ts.Expression | ts.Block,
): string[] {
  const free = new Set<string>();

  // `scopes` is the chain of declared-name sets from the current block out to
  // the script root. A reference bound by any of them is not free.
  const reference = (name: string, scopes: Set<string>[]): void => {
    if (splices[name] != null) {
      return;
    }
    if (!scopes.some((scope) => scope.has(name))) {
      free.add(name);
    }
  };

  // Names declared directly in a block. Declarations are hoisted, so they are
  // gathered before the body is walked; a declaration in a nested block belongs
  // to that block, not this one.
  const declarations = (block: ts.Block): Set<string> => {
    const declared = new Set<string>();
    for (const statement of block.statements) {
      if (ts.isVariableStatement(statement)) {
        const [declaration] = statement.declarationList.declarations;
        if (declaration && ts.isIdentifier(declaration.name)) {
          declared.add(declaration.name.text);
        }
      }
    }
    return declared;
  };

  const walkBlock = (block: ts.Block, scopes: Set<string>[]): void => {
    const inner = [...scopes, declarations(block)];
    for (const statement of block.statements) {
      walkStatement(statement, inner);
    }
  };

  const walkStatement = (node: ts.Statement, scopes: Set<string>[]): void => {
    if (ts.isBlock(node)) {
      walkBlock(node, scopes);
    } else if (ts.isVariableStatement(node)) {
      // The name is already declared in this scope; only the initializer
      // contributes references.
      const [declaration] = node.declarationList.declarations;
      if (declaration?.initializer) {
        walkExpression(declaration.initializer, scopes);
      }
    } else if (ts.isIfStatement(node)) {
      walkExpression(node.expression, scopes);
      walkStatement(node.thenStatement, scopes);
      if (node.elseStatement) {
        walkStatement(node.elseStatement, scopes);
      }
    } else if (ts.isReturnStatement(node)) {
      if (node.expression) {
        walkExpression(node.expression, scopes);
      }
    } else if (ts.isExpressionStatement(node)) {
      walkExpression(node.expression, scopes);
    }
  };

  const walkExpression = (node: ts.Expression, scopes: Set<string>[]): void => {
    if (ts.isParenthesizedExpression(node)) {
      walkExpression(node.expression, scopes);
    } else if (ts.isIdentifier(node)) {
      reference(node.text, scopes);
    } else if (ts.isPropertyAccessExpression(node)) {
      walkExpression(node.expression, scopes); // the property name is not a variable
    } else if (ts.isBinaryExpression(node)) {
      // A bare identifier on either side is a reference, whether it is read
      // (`a + b`) or assigned (`x = ...`); an undeclared target is still free.
      if (ts.isIdentifier(node.left)) {
        reference(node.left.text, scopes);
      } else {
        walkExpression(node.left, scopes);
      }
      walkExpression(node.right, scopes);
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) {
          walkExpression(property.initializer, scopes);
        } else if (ts.isShorthandPropertyAssignment(property)) {
          reference(property.name.text, scopes);
        }
      }
    }
    // Numeric/boolean literals and other leaf nodes reference no variables.
  };

  if (ts.isBlock(node)) {
    walkBlock(node, []);
  } else {
    walkExpression(node, []);
  }

  return orderByFirstUse(ts, node, free);
}

// Membership is decided by the scope walk above; this just emits the free
// variables in the order they first appear, so the metadata reads naturally.
function orderByFirstUse(
  ts: typeof import("typescript"),
  node: ts.Node,
  free: Set<string>,
): string[] {
  const ordered: string[] = [];
  const seen = new Set<string>();

  const visit = (current: ts.Node): void => {
    if (ts.isPropertyAccessExpression(current)) {
      visit(current.expression); // skip the property name
      return;
    }
    if (ts.isIdentifier(current)) {
      if (free.has(current.text) && !seen.has(current.text)) {
        seen.add(current.text);
        ordered.push(current.text);
      }
      return;
    }
    current.forEachChild(visit);
  };
  visit(node);

  return ordered;
}
