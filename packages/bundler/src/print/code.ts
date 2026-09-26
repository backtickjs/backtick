// What a bundle is written as, and the one place its conventions live: how a
// name is written, how a literal escapes, and how an element is written as JSX
// for the framework's compiler. Everything is code, as a string.

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

// A tag JSX reads as an intrinsic element, and a name it reads as an attribute.
const TAG = /^[a-z][A-Za-z0-9-]*(:[A-Za-z][A-Za-z0-9-]*)?$/;
const ATTRIBUTE = /^[A-Za-z_$][A-Za-z0-9_$-]*(:[A-Za-z_$][A-Za-z0-9_$-]*)?$/;

/**
 * What a bundle imports, keyed by specifier and export, each bound once, and
 * whether it draws a script a component drew (see `componentElement`).
 */
export interface Names {
  readonly imports: Map<string, { from: string; name: string; local: string }>;
  usesComponent: boolean;
}

export function createNames(): Names {
  return { imports: new Map(), usesComponent: false };
}

// A string, as a literal: `<` escaped, so no `</script>` or `<!--` appears
// when the bundle is inlined in a page.
export function string(value: string): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function literal(value: string | number | boolean | null): string {
  if (typeof value === "string") {
    return string(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error(`${value} has no literal`);
    }
    return Object.is(value, -0) ? "-0" : String(value);
  }
  return String(value);
}

export const undefinedValue = "void 0";

/** A member read by name: `.name` where it is an identifier, `["name"]` where not. */
export function member(object: string, name: string): string {
  return IDENTIFIER.test(name)
    ? `${object}.${name}`
    : `${object}[${string(name)}]`;
}

export function call(callee: string, args: readonly string[]): string {
  return `${callee}(${args.join(", ")})`;
}

// The body in parentheses, so one that is an object literal is not read as a
// block.
export function arrow(params: readonly string[], body: string): string {
  return `(${params.join(", ")}) => (${body})`;
}

export function thunk(body: string): string {
  return arrow([], body);
}

export function array(elements: readonly string[]): string {
  return `[${elements.join(", ")}]`;
}

/** An object literal, each key bare where it can be and a string where not. */
export function object(
  entries: readonly (readonly [string, string])[],
): string {
  const members = entries.map(
    ([key, value]) => `${IDENTIFIER.test(key) ? key : string(key)}: ${value}`,
  );
  return `{ ${members.join(", ")} }`;
}

/** An export of a module the client provides, imported by the bundle. */
export function imported(names: Names, from: string, name: string): string {
  const key = `${from}\0${name}`;
  let entry = names.imports.get(key);
  if (entry === undefined) {
    entry = { from, name, local: `$i${names.imports.size}` };
    names.imports.set(key, entry);
  }
  return entry.local;
}

/** An import declaration of one export under its local name. */
export function importDeclaration(
  from: string,
  name: string,
  local: string,
): string {
  const exported = IDENTIFIER.test(name) ? name : string(name);
  return `import { ${exported} as ${local} } from ${string(from)};`;
}

/**
 * An element as JSX: `<tag attr={value}>{child}</tag>`. What each attribute
 * and child may change is the framework compiler's to decide. A child that is
 * itself an element is written as one, which is how it is told apart: nothing
 * else a bundle writes starts with `<`.
 */
export function jsxElement(
  tag: string,
  attributes: readonly (readonly [string, string])[],
  children: readonly string[],
): string {
  if (!TAG.test(tag) && !tag.startsWith("$")) {
    throw new Error(`\`${tag}\` is not a tag JSX can write`);
  }
  let open = `<${tag}`;
  for (const [name, value] of attributes) {
    if (!ATTRIBUTE.test(name)) {
      throw new Error(`\`${name}\` is not a prop name JSX can write`);
    }
    open += ` ${name}={${value}}`;
  }
  if (children.length === 0) {
    return `${open} />`;
  }
  const inner = children
    .map((child) => (child.startsWith("<") ? child : `{${child}}`))
    .join("");
  return `${open}>${inner}</${tag}>`;
}

/**
 * A script a component drew, as an element: `<$Component body={() => …} />`,
 * a component whose body is that call, so it runs the way a component's does.
 */
export function componentElement(names: Names, body: string): string {
  names.usesComponent = true;
  return jsxElement("$Component", [["body", thunk(body)]], []);
}
