import type ts from "typescript";
import type { ClientScript } from "./parseFile.js";
import { isComponentTag } from "@backtickjs/client-script";
import { isFragmentTag } from "@backtickjs/client-script";

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
 *    the rewrite reads it as a global or reports it as unresolvable.
 *
 *  - `spliceParams`: for each splice, the script's own bindings a fragment
 *    landing at that hole can reach — what the hole must hand whatever arrives.
 *    Unlike counting what actually reached a hole in one bundle, it is a fact
 *    about the script alone.
 *
 *    Two filters, and both matter. Declared *above* the hole, not merely in
 *    scope: `declareBlock` hoists a block's declarations before walking it, so
 *    the scope chain at a hole already holds ones the source has not reached,
 *    and handing those over would name a binding inside its own initializer.
 *    And captured by something, somewhere: a binding no fragment ever wants is
 *    dead weight in every thunk written for that hole.
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
  spliceParams: Map<ClientScript, { [splice: string]: string[] }>;
  // Per script, the component tags no scope binds: host components, the only
  // tags whose splice a script needs.
  hostTags: Map<ClientScript, Set<string>>;
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
  // Not reported: what a reader needs is which of them a given hole can see,
  // which is `spliceParams`. They are kept here to build it.
  const declarations = new Map<ClientScript, string[]>();

  // What each splice hole can hand out, recorded as the walk reaches it and
  // narrowed once the walk is done.
  const spliceParams = new Map<ClientScript, { [splice: string]: string[] }>();
  const hostTags = new Map<ClientScript, Set<string>>();

  // Every binding some nested script captures, whatever hole it was written at.
  // Narrows the scopes above at the end: a hole only has to hand over bindings
  // that a fragment could actually want, and one nothing captures is dead weight
  // in every thunk written for that hole.
  const escaped = new Set<string>();

  // Binding keys the walk has passed the declaration of. A block's declarations
  // are hoisted into its scope before its body is walked, so the scope chain
  // cannot answer "is this bound *here*"; this can. Keys leave again when their
  // block, arrow or handler does.
  const live = new Set<string>();

  const enliven = (scope: Scope): (() => void) => {
    const added = [...scope.values()].filter((key) => !live.has(key));
    for (const key of added) {
      live.add(key);
    }
    return () => {
      for (const key of added) {
        live.delete(key);
      }
    };
  };

  const capture = (script: ClientScript, name: string): void => {
    const seen = seenCaptures.get(script);
    if (seen && !seen.has(name)) {
      seen.add(name);
      captures.get(script)?.push(name);
    }
    escaped.add(name);
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
  // bound by none returns null (a global, or unresolvable).
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
      // Bound by nothing: a global or a "Cannot find name", which the rewrite
      // decides — nothing to capture.
      return;
    }
    bindings.set(node, bound);
    // Captured by the script that reads it and by every one between it and the
    // script that declared it: a script whose own body never mentions a binding
    // still carries it, because the fragment nested inside it does and this is
    // what hands it over.
    const from = owner.get(bound);
    if (from !== script) {
      for (let i = nesting.length - 1; i >= 0; i--) {
        const enclosing = nesting[i];
        if (enclosing === undefined || enclosing === from) {
          break;
        }
        capture(enclosing, bound);
      }
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

  // The scripts enclosing the one being walked, innermost last. A binding read
  // deep in the nest reaches every script between the reader and the one that
  // declared it, because each of those is what hands it to the next.
  const nesting: ClientScript[] = [];

  const walkScript = (script: ClientScript, scopes: Scope[]): void => {
    nesting.push(script);
    try {
      walkScriptBody(script, scopes);
    } finally {
      nesting.pop();
    }
  };

  const walkScriptBody = (script: ClientScript, scopes: Scope[]): void => {
    if (!captures.has(script)) {
      captures.set(script, []);
      seenCaptures.set(script, new Set());
      declarations.set(script, []);
      spliceParams.set(script, {});
      hostTags.set(script, new Set());
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
    const declared = declareBlock(block, script);
    const inner = [...scopes, declared];
    const added: string[] = [];
    for (const statement of block.statements) {
      walkStatement(script, statement, inner);
      // After the statement, not before: an initializer does not see its own
      // binding, and a hole inside one must not be handed it.
      if (ts.isVariableStatement(statement)) {
        const [declaration] = statement.declarationList.declarations;
        const key =
          declaration && ts.isIdentifier(declaration.name)
            ? declared.get(declaration.name.text)
            : undefined;
        if (key !== undefined && !live.has(key)) {
          live.add(key);
          added.push(key);
        }
      }
    }
    for (const key of added) {
      live.delete(key);
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
    } else if (ts.isWhileStatement(node)) {
      walkExpression(script, node.expression, scopes);
      walkStatement(script, node.statement, scopes);
    } else if (ts.isForStatement(node)) {
      // A header declaration isn't a statement of the enclosing block, so
      // `declareBlock` never saw it: it scopes over the rest of the header and
      // the body only, like a catch binding over its handler.
      const scope: Scope = new Map();
      const initializer = node.initializer;
      if (initializer && ts.isVariableDeclarationList(initializer)) {
        const [declaration] = initializer.declarations;
        if (declaration && ts.isIdentifier(declaration.name)) {
          const unique = declare(declaration.name.text, script);
          scope.set(declaration.name.text, unique);
          bindings.set(declaration.name, unique);
          if (declaration.initializer) {
            // Before the binding is live: an initializer does not see its own.
            walkExpression(script, declaration.initializer, scopes);
          }
        }
      } else if (initializer) {
        walkExpression(script, initializer, scopes);
      }
      const release = enliven(scope);
      const inner = [...scopes, scope];
      if (node.condition) {
        walkExpression(script, node.condition, inner);
      }
      if (node.incrementor) {
        walkExpression(script, node.incrementor, inner);
      }
      walkStatement(script, node.statement, inner);
      release();
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
        const release = enliven(scope);
        walkBlock(script, clause.block, [...scopes, scope]);
        release();
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
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) {
      walkExpression(script, node.expression, scopes);
    } else if (ts.isIdentifier(node)) {
      const splice = script.splices[node.text];
      if (splice != null) {
        // A splice evaluates host code in the enclosing scope; descend into any
        // nested scripts it contains so their free variables resolve against
        // this scope chain, but the placeholder itself is not a variable.
        const params = spliceParams.get(script);
        if (params !== undefined) {
          // Only what a fragment here could name. A binding an inner scope
          // shadows is still bound, but unreachable by name from this point —
          // and reaching it anyway would mean emitting code no one could write,
          // so it is not offered.
          const reachable = new Set<string>();
          const named = new Set<string>();
          for (let i = scopes.length - 1; i >= 0; i--) {
            for (const [name, key] of scopes[i]) {
              // Innermost first, so the first binding a name reaches is the one
              // it means here; an outer one under the same name is shadowed.
              if (!named.has(name)) {
                named.add(name);
                reachable.add(key);
              }
            }
          }
          params[node.text] = (declarations.get(script) ?? []).filter(
            (key) => live.has(key) && reachable.has(key),
          );
        }
        for (const nested of splice.scripts) {
          walkScript(nested, scopes);
        }
        return;
      }
      reference(node, script, scopes);
    } else if (ts.isPropertyAccessExpression(node)) {
      walkExpression(script, node.expression, scopes); // the name is not a variable
    } else if (ts.isElementAccessExpression(node)) {
      // Unlike a property name, a key is an expression and can name anything
      // in scope.
      walkExpression(script, node.expression, scopes);
      walkExpression(script, node.argumentExpression, scopes);
    } else if (
      ts.isJsxElement(node) ||
      ts.isJsxSelfClosingElement(node) ||
      ts.isJsxFragment(node)
    ) {
      // A tag names what the host's JSX namespace answers for — unless a
      // component tag names a binding in scope, which makes it a reference to a
      // function the script holds. Everything written inside is ordinary client
      // code, so an attribute's expression and an expression child resolve like
      // any other. A fragment has no tag and no attributes.
      const opening = ts.isJsxFragment(node)
        ? null
        : ts.isJsxElement(node)
          ? node.openingElement
          : node;
      const tags =
        opening === null
          ? []
          : ts.isJsxElement(node)
            ? [opening.tagName, node.closingElement.tagName]
            : [opening.tagName];
      for (const tag of tags) {
        if (
          ts.isIdentifier(tag) &&
          isComponentTag(tag.text) &&
          !isFragmentTag(tag.text)
        ) {
          if (resolve(tag.text, scopes) === null) {
            hostTags.get(script)?.add(tag.text);
          } else {
            reference(tag, script, scopes);
          }
        }
      }
      for (const attribute of opening?.attributes.properties ?? []) {
        if (!ts.isJsxAttribute(attribute)) {
          continue;
        }
        const initializer = attribute.initializer;
        if (
          initializer !== undefined &&
          ts.isJsxExpression(initializer) &&
          initializer.expression !== undefined
        ) {
          walkExpression(script, initializer.expression, scopes);
        }
      }
      if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
        for (const child of node.children) {
          if (ts.isJsxExpression(child)) {
            if (child.expression !== undefined) {
              walkExpression(script, child.expression, scopes);
            }
          } else if (!ts.isJsxText(child)) {
            walkExpression(script, child, scopes);
          }
        }
      }
    } else if (ts.isCallExpression(node)) {
      walkExpression(script, node.expression, scopes);
      for (const arg of node.arguments) {
        walkExpression(script, arg, scopes);
      }
    } else if (
      ts.isPrefixUnaryExpression(node) ||
      ts.isPostfixUnaryExpression(node)
    ) {
      walkExpression(script, node.operand, scopes);
    } else if (ts.isTypeOfExpression(node)) {
      walkExpression(script, node.expression, scopes);
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
      const release = enliven(params);
      if (ts.isBlock(node.body)) {
        walkBlock(script, node.body, inner);
      } else {
        walkExpression(script, node.body, inner);
      }
      release();
    } else if (ts.isSpreadElement(node)) {
      // `...xs` contributes no name of its own; what it spreads is an
      // ordinary expression and reaches whatever that references.
      walkExpression(script, node.expression, scopes);
    } else if (ts.isArrayLiteralExpression(node)) {
      for (const element of node.elements) {
        walkExpression(script, element, scopes);
      }
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) {
          // A written key isn't a variable; a computed one is an expression.
          if (ts.isComputedPropertyName(property.name)) {
            walkExpression(script, property.name.expression, scopes);
          }
          walkExpression(script, property.initializer, scopes);
        } else if (ts.isShorthandPropertyAssignment(property)) {
          reference(property.name, script, scopes);
        } else if (ts.isSpreadAssignment(property)) {
          // What is spread is an expression like any other, and the names in it
          // are the script's own to find.
          walkExpression(script, property.expression, scopes);
        }
      }
    }
    // Numeric/boolean/string literals and other leaf nodes reference no variables.
  };

  for (const script of scripts) {
    walkScript(script, []);
  }

  // Narrowed only now: whether anything captures a binding is not known until
  // the walk has passed every script that could.
  for (const scopes of spliceParams.values()) {
    for (const [splice, keys] of Object.entries(scopes)) {
      scopes[splice] = keys.filter((key) => escaped.has(key));
    }
  }

  return { bindings, captures, spliceParams, hostTags };
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
