import type { ClientImport } from "@backtickjs/core";
import semver from "semver";

// What a bundle is written as, and the one place its conventions live: how a
// name is written, how a literal escapes, and how an element is written as JSX
// for the framework's compiler. Everything is code, as a string.

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * What a bundle imports, keyed by specifier and export, each bound once; and
 * the packages it may import them from, which the client provides, by version.
 */
export interface Names {
  readonly imports: Map<string, { from: string; name: string; local: string }>;
  readonly packageVersions: Readonly<Record<string, string>>;
}

export function createNames(
  packageVersions: Readonly<Record<string, string>>,
): Names {
  return { imports: new Map(), packageVersions };
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

// The package a module is in: its specifier's first segment, or first two
// when scoped (`solid-js/web` → `solid-js`, `@scope/pkg/x` → `@scope/pkg`).
function packageOf(from: string): string {
  const segments = from.split("/");
  return segments.slice(0, from.startsWith("@") ? 2 : 1).join("/");
}

/** An export of a module the client provides, imported by the bundle. */
export function imported(
  names: Names,
  { from, name, version }: ClientImport<unknown>,
): string {
  // Where a script's import is written: a plugin's own (a framework's compile
  // step) are the plugin's, trusted as it is.
  const pkg = packageOf(from);
  const provided = names.packageVersions[pkg];
  if (provided === undefined) {
    const packages = Object.entries(names.packageVersions).map(
      ([provided, at]) => `${provided}@${at}`,
    );
    throw new Error(
      `Can't import \`${name}\` from "${from}": the client provides ` +
        `${packages.join(", ") || "no packages"}.`,
    );
  }
  if (!semver.satisfies(provided, version)) {
    throw new Error(
      `Can't import \`${name}\` from "${from}": it needs ${pkg}@${version}, ` +
        `and the client provides ${pkg}@${provided}.`,
    );
  }
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

// The same import as CommonJS writes it: `const { name: local } = require(…);`.
export function requireDeclaration(
  from: string,
  name: string,
  local: string,
): string {
  const exported = IDENTIFIER.test(name) ? name : string(name);
  return `const { ${exported}: ${local} } = require(${string(from)});`;
}
