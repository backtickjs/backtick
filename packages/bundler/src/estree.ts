import type * as ES from "estree";

// The ESTree a script and a bundle are built as, and the one place their
// conventions live: how a name is written, how a literal escapes, and how an
// element is written as JSX for the framework's compiler.

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// A tag JSX reads as an intrinsic element, and a name it reads as an attribute.
const TAG = /^[a-z][A-Za-z0-9-]*(:[A-Za-z][A-Za-z0-9-]*)?$/;
const ATTRIBUTE = /^[A-Za-z_$][A-Za-z0-9_$-]*(:[A-Za-z_$][A-Za-z0-9_$-]*)?$/;

/**
 * What a bundle names, registered as the bundler builds it and named when it
 * is printed: a binding may have to be renamed away from a builtin or from
 * what the bundle itself names, and a label is numbered once every binding is
 * known. Imports are keyed by specifier and export, each bound once.
 */
export interface Names {
  readonly bindings: ES.Identifier[];
  readonly labels: Map<ES.Identifier, string>;
  readonly builtins: Set<string>;
  readonly imports: Map<string, { from: string; name: string; local: string }>;
  drawsScript: boolean;
}

export function createNames(): Names {
  return {
    bindings: [],
    labels: new Map(),
    builtins: new Set(),
    imports: new Map(),
    drawsScript: false,
  };
}

export function identifier(name: string): ES.Identifier {
  return { type: "Identifier", name };
}

/** A name a script or the bundle binds, printed as itself where it can be. */
export function binding(names: Names, name: string): ES.Identifier {
  const node = identifier(name);
  names.bindings.push(node);
  return node;
}

/** A `functions` entry, by the label the bundler keys it under. */
export function label(names: Names, key: string): ES.Identifier {
  const node = identifier(key);
  names.labels.set(node, key);
  return node;
}

// `eval` read as a value, so a call of it is indirect: a bundle closes over
// nothing, and a direct call would hand it this one's scope.
/** A builtin, read as the global of its name. */
export function builtin(names: Names | null, name: string): ES.Expression {
  if (name === "eval") {
    return {
      type: "SequenceExpression",
      expressions: [numberLiteral(0), identifier("eval")],
    };
  }
  if (!IDENTIFIER.test(name)) {
    return index(identifier("globalThis"), stringLiteral(name));
  }
  names?.builtins.add(name);
  return identifier(name);
}

// A string a script wrote, as a literal: `<` escaped, so no `</script>` or
// `<!--` appears when the bundle is inlined in a page.
function stringLiteral(value: string): ES.Literal {
  return {
    type: "Literal",
    value,
    raw: JSON.stringify(value).replace(/</g, "\\u003c"),
  };
}

// A negative number is the negation of one, as JavaScript writes it.
function numberLiteral(value: number): ES.Expression {
  if (!Number.isFinite(value)) {
    throw new Error(`${value} has no literal`);
  }
  return value < 0 || Object.is(value, -0)
    ? {
        type: "UnaryExpression",
        operator: "-",
        prefix: true,
        argument: { type: "Literal", value: -value },
      }
    : { type: "Literal", value };
}

export function literal(value: string | number | boolean): ES.Expression {
  return typeof value === "string"
    ? stringLiteral(value)
    : typeof value === "number"
      ? numberLiteral(value)
      : { type: "Literal", value };
}

export const nullLiteral: () => ES.Literal = () => ({
  type: "Literal",
  value: null,
});

export function undefinedValue(): ES.Expression {
  return {
    type: "UnaryExpression",
    operator: "void",
    prefix: true,
    argument: numberLiteral(0),
  };
}

/** A member read by name: `.name` where it is an identifier, `["name"]` where not. */
export function member(
  object: ES.Expression,
  name: string,
  optional: boolean,
): ES.MemberExpression {
  return IDENTIFIER.test(name)
    ? {
        type: "MemberExpression",
        object,
        property: identifier(name),
        computed: false,
        optional,
      }
    : {
        type: "MemberExpression",
        object,
        property: stringLiteral(name),
        computed: true,
        optional,
      };
}

export function index(
  object: ES.Expression,
  key: ES.Expression,
): ES.MemberExpression {
  return {
    type: "MemberExpression",
    object,
    property: key,
    computed: true,
    optional: false,
  };
}

export function call(
  callee: ES.Expression,
  args: (ES.Expression | ES.SpreadElement)[],
): ES.SimpleCallExpression {
  return { type: "CallExpression", callee, arguments: args, optional: false };
}

// An optional link is a chain of its own: `a?.b` and `a?.b()` short-circuit
// themselves and nothing outside.
export function chain(node: ES.ChainElement): ES.Expression {
  return { type: "ChainExpression", expression: node };
}

export function arrow(
  params: ES.Pattern[],
  body: ES.Expression | ES.BlockStatement,
): ES.ArrowFunctionExpression {
  return {
    type: "ArrowFunctionExpression",
    params,
    body,
    expression: body.type !== "BlockStatement",
  };
}

/** An export of a module the client provides, imported by the bundle. */
export function imported(
  names: Names,
  from: string,
  name: string,
): ES.Identifier {
  const key = `${from}\0${name}`;
  let entry = names.imports.get(key);
  if (entry === undefined) {
    entry = { from, name, local: `$i${names.imports.size}` };
    names.imports.set(key, entry);
  }
  return identifier(entry.local);
}

// Code written elsewhere — a script's entry, as the compiler emitted it — as a
// node `printBundle` writes as it is.
export function raw(code: string): ES.Expression {
  return { type: "Raw", code } as unknown as ES.Expression;
}

export function thunk(body: ES.Expression): ES.ArrowFunctionExpression {
  return arrow([], body);
}

/** A key as an object literal writes it: bare where it can be, a string where not. */
export function objectKey(key: string): ES.Expression {
  return IDENTIFIER.test(key) ? identifier(key) : stringLiteral(key);
}

export function property(
  key: ES.Expression,
  value: ES.Expression,
  computed = false,
): ES.Property {
  return {
    type: "Property",
    key,
    value,
    kind: "init",
    computed,
    method: false,
    shorthand: false,
  };
}

/**
 * An element as JSX: `<tag attr={value}>{child}</tag>`. What each attribute
 * and child may change is the framework compiler's to decide.
 */
export interface JsxElement {
  readonly type: "JsxElement";
  readonly tag: ES.Identifier | string;
  readonly attributes: readonly (readonly [string, ES.Expression])[];
  readonly children: readonly ES.Expression[];
}

export function jsxElement(
  tag: ES.Identifier | string,
  attributes: readonly (readonly [string, ES.Expression])[],
  children: ES.Expression | null,
): ES.Expression {
  if (typeof tag === "string" && !TAG.test(tag)) {
    throw new Error(`\`${tag}\` is not a tag JSX can write`);
  }
  for (const [name] of attributes) {
    if (!ATTRIBUTE.test(name)) {
      throw new Error(`\`${name}\` is not a prop name JSX can write`);
    }
  }
  const node: JsxElement = {
    type: "JsxElement",
    tag,
    attributes,
    // A `null` child is no children at all.
    children:
      children === null ||
      (children.type === "Literal" && children.value === null)
        ? []
        : children.type === "ArrayExpression"
          ? children.elements.map((one) => {
              if (one === null || one.type === "SpreadElement") {
                throw new Error("a hole or spread among children");
              }
              return one;
            })
          : [children],
  };
  return node as unknown as ES.Expression;
}

/**
 * A script a component drew, as an element: `<$Script run={() => …} />`, so
 * its body runs the way a component's does.
 */
export function scriptElement(names: Names, run: ES.Expression): ES.Expression {
  names.drawsScript = true;
  return jsxElement(identifier("$Script"), [["run", thunk(run)]], null);
}
