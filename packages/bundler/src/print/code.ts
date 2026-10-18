import type { ClientImport } from "@backtickjs/core";
import { ClientVersionMismatch, type Modules, supports } from "../modules.js";

// What a bundle is written as, and the one place its conventions live: how a
// name is written, how a literal escapes, and how an element is written as JSX
// for the framework's compiler. Everything is code, as a string.

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * What a bundle imports, keyed by specifier and export, each bound once; and
 * the modules it may import them from, which the client provides, by version.
 */
export interface Names {
  readonly imports: Map<string, { from: string; name: string; local: string }>;
  readonly modules: Modules;
  // whether a script executes another bundle, which `$exec` does
  exec: boolean;
}

export function createNames(modules: Modules): Names {
  return { imports: new Map(), modules, exec: false };
}

// A string, as a literal: `<` escaped, so no `</script>` or `<!--` appears
// when the bundle is inlined in a page, and the line and paragraph separators,
// which JSON leaves bare and not every engine reads inside a string.
export function string(value: string): string {
  return JSON.stringify(value).replace(
    /[<\u2028\u2029]/g,
    (unit) => `\\u${unit.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}

export function literal(
  value: string | number | bigint | boolean | null | undefined,
): string {
  if (typeof value === "string") {
    return string(value);
  }
  if (typeof value === "number") {
    // `String` writes NaN and the infinities by name, but -0 as "0".
    return Object.is(value, -0) ? "-0" : String(value);
  }
  if (typeof value === "bigint") {
    return `${value}n`;
  }
  return String(value);
}

export function call(callee: string, args: readonly string[]): string {
  return `${callee}(${args.join(", ")})`;
}

// The body in parentheses, so one that is an object literal is not read as a
// block.
export function arrow(params: readonly string[], body: string): string {
  return `(${params.join(", ")}) => (${body})`;
}

export function array(elements: readonly string[]): string {
  return `[${elements.join(", ")}]`;
}

/** An object literal, each key bare where it can be and a string where not. */
export function object(
  entries: readonly (readonly [string, string])[],
): string {
  const members = entries.map(([key, value]) => `${member(key)}: ${value}`);
  return `{ ${members.join(", ")} }`;
}

// A key as an object literal writes it. `__proto__`, bare or quoted, would set
// the object's prototype instead, so a key a user may have chosen is computed,
// which makes it the object's own.
function member(key: string): string {
  if (key === "__proto__") {
    return `[${string(key)}]`;
  }
  return IDENTIFIER.test(key) ? key : string(key);
}

/** An export of a module the client provides, imported by the bundle. */
export function imported(
  names: Names,
  { from, name, version }: ClientImport<unknown>,
): string {
  // Where a script's import is written: a plugin's own (a framework's compile
  // step) are the plugin's, trusted as it is. Typed against one version, it
  // works with a later one of the same major.
  if (!supports(names.modules, from, `^${version}`)) {
    throw new ClientVersionMismatch(from, name, version, names.modules);
  }
  const key = `${from}\0${name}`;
  let entry = names.imports.get(key);
  if (entry === undefined) {
    entry = { from, name, local: `$i${names.imports.size}` };
    names.imports.set(key, entry);
  }
  return entry.local;
}

/** An import declaration of one export, or the namespace (`*`), by its local name. */
export function importDeclaration(
  from: string,
  name: string,
  local: string,
): string {
  if (name === "*") {
    return `import * as ${local} from ${string(from)};`;
  }
  const exported = IDENTIFIER.test(name) ? name : string(name);
  return `import { ${exported} as ${local} } from ${string(from)};`;
}

// The same import as CommonJS writes it: `const { name: local } = require(…);`.
export function requireDeclaration(
  from: string,
  name: string,
  local: string,
): string {
  if (name === "*") {
    return `const ${local} = require(${string(from)});`;
  }
  const exported = IDENTIFIER.test(name) ? name : string(name);
  return `const { ${exported}: ${local} } = require(${string(from)});`;
}
