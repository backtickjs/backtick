import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";

/**
 * Maps every *bound* client-script variable identifier — a declaration, an arrow
 * parameter, or a reference that resolves to one of those — to a stable,
 * globally unique binding key. This key is what the emitted runtime carries as an
 * identifier's `binding` (`v.identifier`, `v.variableDeclaration`, `v.arrow`
 * params); the virtual code the type-checker sees is untouched.
 *
 * Uniqueness has two axes. A per-file counter distinguishes bindings *within* a
 * file; a salt derived from the file path distinguishes bindings *across* files
 * — necessary because the compiler runs one file at a time and so cannot hand
 * out globally coordinated numbers. Together `<name>$<salt>_<n>` is unique across
 * the whole program, so fragments composed from different scripts (even different
 * files) never collide, and the serializer no longer has to rename captures to
 * dodge a same-named binding they thread through.
 *
 * Resolution spans scripts: a reference in a nested script
 * (`cs`{ const x = 0; return ${cs`x`}; }``) resolves to the enclosing binding
 * and so shares its key, keeping independently rewritten scripts consistent. A
 * reference that resolves to no binding is a free host capture; it is left out of
 * the map so it keeps its original name, which is how the host runtime provides
 * it.
 */
export type BindingResolution = Map<ts.Identifier, string>;

// A scope's in-scope names mapped to the binding key of their declaration.
type Scope = Map<string, string>;

export function resolveBindings(
  ts: typeof import("typescript"),
  scripts: ClientScript[],
  fileName: string,
): BindingResolution {
  const bindings: BindingResolution = new Map();

  const salt = hashPath(fileName);

  // A per-file counter, incremented in source order, makes each binding's name
  // unique within the file and stable across runs.
  let next = 0;
  const fresh = (name: string): string => `${name}$${salt}_${next++}`;

  // `scopes` is the chain from the current scope out to the file root, innermost
  // last. A reference bound by any of them uses that binding's unique name; one
  // bound by none is a free host capture (returns null; keeps its own name).
  const resolve = (name: string, scopes: Scope[]): string | null => {
    for (let i = scopes.length - 1; i >= 0; i--) {
      const found = scopes[i].get(name);
      if (found != null) {
        return found;
      }
    }
    return null;
  };

  // Names declared directly in a block. Declarations are hoisted, so they are
  // allocated before the body is walked; a reference before its declaration
  // still resolves to the local binding.
  const declareBlock = (block: ts.Block): Scope => {
    const scope: Scope = new Map();
    for (const statement of block.statements) {
      if (ts.isVariableStatement(statement)) {
        const [declaration] = statement.declarationList.declarations;
        if (declaration && ts.isIdentifier(declaration.name)) {
          const name = declaration.name.text;
          // One binding per name per block, even if (illegally) redeclared.
          const unique = scope.get(name) ?? fresh(name);
          scope.set(name, unique);
          bindings.set(declaration.name, unique);
        }
      }
    }
    return scope;
  };

  const walkScript = (script: ClientScript, scopes: Scope[]): void => {
    const root = scriptRoot(ts, script);
    if (!root) {
      return;
    }
    if (ts.isBlock(root)) {
      walkBlock(script, root, scopes);
    } else {
      walkExpression(script, root, scopes);
    }
  };

  const walkBlock = (
    script: ClientScript,
    block: ts.Block,
    scopes: Scope[],
  ): void => {
    const inner = [...scopes, declareBlock(block)];
    for (const statement of block.statements) {
      walkStatement(script, statement, inner);
    }
  };

  const walkStatement = (
    script: ClientScript,
    node: ts.Statement,
    scopes: Scope[],
  ): void => {
    if (ts.isBlock(node)) {
      walkBlock(script, node, scopes);
    } else if (ts.isVariableStatement(node)) {
      // The name is already declared in this scope; only the initializer
      // contributes references.
      const [declaration] = node.declarationList.declarations;
      if (declaration?.initializer) {
        walkExpression(script, declaration.initializer, scopes);
      }
    } else if (ts.isIfStatement(node)) {
      walkExpression(script, node.expression, scopes);
      walkStatement(script, node.thenStatement, scopes);
      if (node.elseStatement) {
        walkStatement(script, node.elseStatement, scopes);
      }
    } else if (ts.isReturnStatement(node)) {
      if (node.expression) {
        walkExpression(script, node.expression, scopes);
      }
    } else if (ts.isExpressionStatement(node)) {
      walkExpression(script, node.expression, scopes);
    }
  };

  const walkExpression = (
    script: ClientScript,
    node: ts.Expression,
    scopes: Scope[],
  ): void => {
    if (ts.isParenthesizedExpression(node)) {
      walkExpression(script, node.expression, scopes);
    } else if (ts.isIdentifier(node)) {
      const splice = script.splices[node.text];
      if (splice != null) {
        // A splice evaluates host code in the enclosing scope; descend into any
        // nested scripts it contains so their free variables resolve against
        // this scope chain, but the placeholder itself is not a variable.
        for (const nested of splice.scripts) {
          walkScript(nested, scopes);
        }
        return;
      }
      const bound = resolve(node.text, scopes);
      if (bound != null) {
        bindings.set(node, bound);
      }
    } else if (ts.isPropertyAccessExpression(node)) {
      walkExpression(script, node.expression, scopes); // the name is not a variable
    } else if (ts.isCallExpression(node)) {
      walkExpression(script, node.expression, scopes);
      for (const arg of node.arguments) {
        walkExpression(script, arg, scopes);
      }
    } else if (ts.isBinaryExpression(node)) {
      // A bare identifier on either side is a reference, read (`a + b`) or
      // assigned (`x = ...`); an undeclared target is still a free capture.
      walkExpression(script, node.left, scopes);
      walkExpression(script, node.right, scopes);
    } else if (ts.isArrowFunction(node)) {
      const params: Scope = new Map();
      for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
          const unique = fresh(param.name.text);
          params.set(param.name.text, unique);
          bindings.set(param.name, unique);
        }
      }
      const inner = [...scopes, params];
      if (ts.isBlock(node.body)) {
        walkBlock(script, node.body, inner);
      } else {
        walkExpression(script, node.body, inner);
      }
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) {
          walkExpression(script, property.initializer, scopes); // key isn't a variable
        } else if (ts.isShorthandPropertyAssignment(property)) {
          const bound = resolve(property.name.text, scopes);
          if (bound != null) {
            bindings.set(property.name, bound);
          }
        }
      }
    }
    // Numeric/boolean/string literals and other leaf nodes reference no variables.
  };

  for (const script of scripts) {
    walkScript(script, []);
  }

  return bindings;
}

function scriptRoot(
  ts: typeof import("typescript"),
  script: ClientScript,
): ts.Expression | ts.Block | undefined {
  const [statement] = script.fileWithPlaceholders.statements;
  if (statement && ts.isExpressionStatement(statement)) {
    return statement.expression;
  }
  if (statement && ts.isBlock(statement)) {
    return statement;
  }
  return undefined;
}

// A short, stable, identifier-safe salt for a file. Hashing the *path* (not the
// contents) keeps a file's names steady as its body is edited, and paths are
// unique by construction so two files never share a salt. FNV-1a, base36.
function hashPath(path: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < path.length; i++) {
    hash ^= path.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}
