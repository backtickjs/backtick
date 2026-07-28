import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";

/**
 * A single lexical-scope pass over every client script in a file. It produces
 * three things from the one walk:
 *
 *  - `bindings`: every *bound* variable identifier — a declaration, an arrow
 *    parameter, or a reference that resolves to one of those — mapped to a
 *    stable, globally unique binding key. This key is what the emitted runtime
 *    carries as an identifier's `binding` (`v.identifier`, `v.variableDeclaration`,
 *    `v.arrow` params); the virtual code the type-checker sees is untouched.
 *
 *  - `captures`: for each script, the free variables it references but does not
 *    itself declare — the values it must capture from the enclosing scope, as
 *    binding keys. They are ordered by first use, which falls out of the
 *    source-order walk. A name bound by no script at all is not a capture:
 *    there are no globals, and the rewrite reports it as unresolvable.
 *
 *  - `declarations`: for each script, the binding keys it declares itself — every
 *    variable declaration and arrow parameter, at any depth, but not those of
 *    nested scripts (each owns its own). With `captures`, every binding the
 *    script's body can refer to; one it never reads is still a declaration.
 *
 *  - `captured`: the declarations some nested script captures — this script's
 *    bindings that escape into a fragment written inside it. The inverse of
 *    `captures`, read off the same `owner` tags, and what tells a splice hole
 *    which of the entry's bindings its thunk must be handed.
 *
 * They come from one traversal because they are the same analysis:
 * a reference is free for the script it appears in exactly when the binding it
 * resolves to was declared in an *enclosing* script (or in none at all). Every
 * binding is therefore tagged with its declaring script, and a reference is a
 * capture of the current script whenever that tag differs.
 *
 * Uniqueness of keys has two axes. A per-file counter distinguishes bindings
 * *within* a file; a hash of the file's text (see `hashText`) distinguishes
 * bindings *across* files — necessary because the compiler runs one file at a
 * time and so cannot hand out globally coordinated numbers. Together
 * `<name>$<fileHash>$<n>` is
 * unique across the whole program, so fragments composed from different scripts
 * (even different files) never collide, and the serializer never has to rename a
 * capture to dodge a same-named binding it threads through.
 *
 * Resolution spans scripts: a reference in a nested script
 * (`cs`{ const x = 0; return ${cs`x`}; }``) resolves to the enclosing binding
 * and so shares its key, keeping independently rewritten scripts consistent. A
 * splice placeholder is not a variable — it evaluates host code in the enclosing
 * scope — so it is never captured, though the pass descends into any scripts
 * nested inside it so their references resolve against this scope chain.
 */
export type BindingResolution = Map<ts.Identifier, string>;

export interface ResolvedScopes {
  bindings: BindingResolution;
  captures: Map<ClientScript, string[]>;
  declarations: Map<ClientScript, string[]>;
  captured: Map<ClientScript, string[]>;
}

// A scope's in-scope names mapped to the binding key of their declaration.
type Scope = Map<string, string>;

export function resolveBindings(
  ts: typeof import("typescript"),
  scripts: ClientScript[],
  fileHash: string,
): ResolvedScopes {
  const bindings: BindingResolution = new Map();

  // Per-script free variables, in first-use order, deduplicated. `owner` records
  // which script declared each binding key, so a reference can tell whether the
  // binding it resolves to is local (declared in the same script) or captured
  // from an enclosing one.
  const captures = new Map<ClientScript, string[]>();
  const seenCaptures = new Map<ClientScript, Set<string>>();
  const owner = new Map<string, ClientScript>();

  // Per-script declared binding keys, in declaration order. Every `declare`
  // appends the fresh key to its script; keys are unique, so no dedup is needed.
  const declarations = new Map<ClientScript, string[]>();

  // Per-script declarations that escape, recorded as they are captured — so in
  // first-capture order, the same convention `captures` uses for first use. A
  // binding key is unique across the file, so one set records each escape once
  // however many scripts capture it; no per-owner bookkeeping is needed.
  const captured = new Map<ClientScript, string[]>();
  const escaped = new Set<string>();

  const capture = (
    script: ClientScript,
    name: string,
    from: ClientScript,
  ): void => {
    const seen = seenCaptures.get(script);
    if (seen && !seen.has(name)) {
      seen.add(name);
      captures.get(script)?.push(name);
    }
    if (!escaped.has(name)) {
      escaped.add(name);
      captured.get(from)?.push(name);
    }
  };

  // A per-file counter, incremented in source order, makes each binding's name
  // unique within the file and stable across runs.
  let next = 0;
  const declare = (name: string, script: ClientScript): string => {
    const unique = `${name}$${fileHash}$${next++}`;
    owner.set(unique, script);
    declarations.get(script)?.push(unique);
    return unique;
  };

  // `scopes` is the chain from the current scope out to the file root, innermost
  // last. A reference bound by any of them uses that binding's unique name; one
  // bound by none returns null (unresolvable — there are no globals).
  const resolve = (name: string, scopes: Scope[]): string | null => {
    for (let i = scopes.length - 1; i >= 0; i--) {
      const found = scopes[i].get(name);
      if (found != null) {
        return found;
      }
    }
    return null;
  };

  // Records a reference to `name` from within `script`: maps the identifier to
  // its binding key (if bound) and captures it when the binding is not the
  // script's own but an enclosing script's.
  const reference = (
    node: ts.Identifier,
    script: ClientScript,
    scopes: Scope[],
  ): void => {
    const bound = resolve(node.text, scopes);
    if (bound == null) {
      // Bound by nothing: there are no globals, so the rewrite reports
      // "Cannot find name" — nothing to capture.
      return;
    }
    bindings.set(node, bound);
    // Every bound key was declared, so it has an owner; capturing is what
    // happens when that owner is some enclosing script rather than this one.
    const from = owner.get(bound);
    if (from !== undefined && from !== script) {
      capture(script, bound, from);
    }
  };

  // Names declared directly in a block. Declarations are hoisted, so they are
  // allocated before the body is walked; a reference before its declaration
  // still resolves to the local binding.
  const declareBlock = (block: ts.Block, script: ClientScript): Scope => {
    const scope: Scope = new Map();
    for (const statement of block.statements) {
      if (ts.isVariableStatement(statement)) {
        const [declaration] = statement.declarationList.declarations;
        if (declaration && ts.isIdentifier(declaration.name)) {
          const name = declaration.name.text;
          // One binding per name per block, even if (illegally) redeclared.
          const unique = scope.get(name) ?? declare(name, script);
          scope.set(name, unique);
          bindings.set(declaration.name, unique);
        }
      }
    }
    return scope;
  };

  const walkScript = (script: ClientScript, scopes: Scope[]): void => {
    if (!captures.has(script)) {
      captures.set(script, []);
      seenCaptures.set(script, new Set());
      declarations.set(script, []);
      captured.set(script, []);
    }
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
    const inner = [...scopes, declareBlock(block, script)];
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
    } else if (ts.isThrowStatement(node)) {
      walkExpression(script, node.expression, scopes);
    } else if (ts.isTryStatement(node)) {
      walkBlock(script, node.tryBlock, scopes);
      const clause = node.catchClause;
      if (clause) {
        // The catch binding scopes over the handler only, like an arrow
        // parameter over its body.
        const scope: Scope = new Map();
        const declaration = clause.variableDeclaration;
        if (declaration && ts.isIdentifier(declaration.name)) {
          const unique = declare(declaration.name.text, script);
          scope.set(declaration.name.text, unique);
          bindings.set(declaration.name, unique);
        }
        walkBlock(script, clause.block, [...scopes, scope]);
      }
      if (node.finallyBlock) {
        walkBlock(script, node.finallyBlock, scopes);
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
      reference(node, script, scopes);
    } else if (ts.isPropertyAccessExpression(node)) {
      walkExpression(script, node.expression, scopes); // the name is not a variable
    } else if (ts.isCallExpression(node)) {
      walkExpression(script, node.expression, scopes);
      for (const arg of node.arguments) {
        walkExpression(script, arg, scopes);
      }
    } else if (ts.isNewExpression(node)) {
      // The callee is a splice (the constructed class), which the walk below
      // treats as host code; only the arguments are client expressions.
      walkExpression(script, node.expression, scopes);
      for (const arg of node.arguments ?? []) {
        walkExpression(script, arg, scopes);
      }
    } else if (ts.isBinaryExpression(node)) {
      // A bare identifier on either side is a reference, read (`a + b`) or
      // assigned (`x = ...`); an undeclared target is unresolvable.
      walkExpression(script, node.left, scopes);
      walkExpression(script, node.right, scopes);
    } else if (ts.isConditionalExpression(node)) {
      walkExpression(script, node.condition, scopes);
      walkExpression(script, node.whenTrue, scopes);
      walkExpression(script, node.whenFalse, scopes);
    } else if (ts.isArrowFunction(node)) {
      const params: Scope = new Map();
      for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
          const unique = declare(param.name.text, script);
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
    } else if (ts.isArrayLiteralExpression(node)) {
      for (const element of node.elements) {
        walkExpression(script, element, scopes);
      }
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) {
          walkExpression(script, property.initializer, scopes); // key isn't a variable
        } else if (ts.isShorthandPropertyAssignment(property)) {
          reference(property.name, script, scopes);
        }
      }
    }
    // Numeric/boolean/string literals and other leaf nodes reference no variables.
  };

  for (const script of scripts) {
    walkScript(script, []);
  }

  return { bindings, captures, declarations, captured };
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
