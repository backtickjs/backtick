import type * as ES from "estree";

// The ESTree a script and a bundle are built as, and the one place their
// conventions live: how a name is written, how a literal escapes, and what
// `jsx` is handed. The compiler builds a script's body with these, and the
// bundler what composes scripts.

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// A tag or prop name that can be printed as a string without escaping.
const NAME = /^[A-Za-z][A-Za-z0-9_:-]*$/;

/**
 * What a bundle names, registered as the bundler builds it and named when it
 * is printed: a binding may have to be renamed away from a builtin or from
 * what the bundle itself names, and a label is numbered once every binding is
 * known. A script's own body is closed, so the compiler builds it without one.
 */
export interface Names {
  readonly bindings: ES.Identifier[];
  readonly labels: Map<ES.Identifier, string>;
  readonly builtins: Set<string>;
  readonly data: string[];
}

export function createNames(): Names {
  return { bindings: [], labels: new Map(), builtins: new Set(), data: [] };
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

// What only data can carry: a name the host computed that is not a plain one.
// A script's own names are its source, and are written as strings.
function data(names: Names | null, value: string): ES.Expression {
  if (names === null) {
    return stringLiteral(value);
  }
  names.data.push(value);
  return index(identifier("$d"), numberLiteral(names.data.length - 1));
}

/** A tag, as a string where it is a plain name and read from `data` otherwise. */
export function tagName(names: Names | null, text: string): ES.Expression {
  return NAME.test(text) ? stringLiteral(text) : data(names, text);
}

// A string a script wrote, as a literal: `<` escaped, so no `</script>` or
// `<!--` appears when the bundle is inlined in a page.
export function stringLiteral(value: string): ES.Literal {
  return {
    type: "Literal",
    value,
    raw: JSON.stringify(value).replace(/</g, "\\u003c"),
  };
}

// A negative number is the negation of one, as JavaScript writes it.
export function numberLiteral(value: number): ES.Expression {
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

function getter(
  key: ES.Expression,
  value: ES.Expression,
  computed: boolean,
): ES.Property {
  return {
    type: "Property",
    key,
    value: {
      type: "FunctionExpression",
      params: [],
      body: {
        type: "BlockStatement",
        body: [{ type: "ReturnStatement", argument: value }],
      },
    },
    kind: "get",
    computed,
    method: false,
    shorthand: false,
  };
}

// The calls that build an element, which are made once and never change.
const elements = new WeakSet<ES.Node>();

/**
 * Whether what a position holds can change after it has first been read: a
 * literal, a function and an element cannot, and neither can an array or an
 * object of them.
 */
export function isFixed(node: ES.Node): boolean {
  switch (node.type) {
    case "Literal":
    case "ArrowFunctionExpression":
    case "FunctionExpression":
      return true;
    case "UnaryExpression":
      return node.operator === "-" && node.argument.type === "Literal";
    case "ArrayExpression":
      return node.elements.every(
        (element) =>
          element !== null &&
          element.type !== "SpreadElement" &&
          isFixed(element),
      );
    case "ObjectExpression":
      return node.properties.every(
        (member) =>
          member.type === "Property" &&
          !member.computed &&
          isFixed(member.value),
      );
    default:
      return elements.has(node);
  }
}

// A child that can change is a function of nothing, so the client decides
// when to read it.
function child(node: ES.Expression): ES.Expression {
  return node.type === "ArrayExpression"
    ? {
        type: "ArrayExpression",
        elements: node.elements.map((one) =>
          one === null || one.type === "SpreadElement" ? one : child(one),
        ),
      }
    : isFixed(node)
      ? node
      : thunk(node);
}

// A prop's key: bare where it can be, a string where it is a plain name, and
// read from `data` otherwise.
function propKey(
  names: Names | null,
  key: string,
): { key: ES.Expression; computed: boolean } {
  return IDENTIFIER.test(key)
    ? { key: identifier(key), computed: false }
    : NAME.test(key)
      ? { key: stringLiteral(key), computed: false }
      : { key: data(names, key), computed: true };
}

/**
 * The props `jsx` is handed: what cannot change is a property, what can is a
 * getter. `children` is a getter unless it is a literal, so a client reads it
 * where it draws, and in an array of them what can change is a function of
 * nothing.
 */
function props(
  names: Names | null,
  written: readonly (readonly [string, ES.Expression])[],
  children: ES.Expression | null,
): ES.ObjectExpression {
  const members = written.map(([name, value]) => {
    const { key, computed } = propKey(names, name);
    return isFixed(value)
      ? property(key, value, computed)
      : getter(key, value, computed);
  });
  // A `null` child is no children at all.
  if (
    children !== null &&
    !(children.type === "Literal" && children.value === null)
  ) {
    const key = identifier("children");
    members.push(
      children.type === "Literal"
        ? property(key, children)
        : getter(
            key,
            children.type === "ArrayExpression" ? child(children) : children,
            false,
          ),
    );
  }
  return { type: "ObjectExpression", properties: members };
}

/** An element: `jsx(tag, props)`, or its children where it is a fragment. */
export function jsxElement(
  names: Names | null,
  tag: string,
  written: readonly (readonly [string, ES.Expression])[],
  children: ES.Expression | null,
): ES.Expression {
  if (tag === "Fragment") {
    return children === null ? nullLiteral() : child(children);
  }
  const node = call(identifier("jsx"), [
    tagName(names, tag),
    props(names, written, children),
  ]);
  elements.add(node);
  return node;
}

/** A component: `jsx(component, props)`. */
export function jsxComponent(
  names: Names | null,
  component: ES.Expression,
  written: readonly (readonly [string, ES.Expression])[],
  children: ES.Expression | null,
): ES.Expression {
  return call(identifier("jsx"), [component, props(names, written, children)]);
}
