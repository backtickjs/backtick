import semver from "semver";

/**
 * The modules a client provides, by specifier, each at the exact version of
 * the package it comes from: `{ "react/jsx-runtime": "19.2.3" }`.
 */
export type Modules = Readonly<Record<string, string>>;

/**
 * Whether `value` is `Modules`: often what a client sent, parsed as it came.
 */
export function isModules(value: unknown): value is Modules {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((version) => typeof version === "string")
  );
}

/**
 * Whether a client with `modules` provides `specifier` at a version in
 * `range`: the check a bundle's every import passes, so a server choosing
 * what to draw for a client can ask it first.
 */
export function supports(
  modules: Modules,
  specifier: string,
  range: string,
): boolean {
  const provided = modules[specifier];
  return provided !== undefined && semver.satisfies(provided, range);
}

/**
 * A script's import the client can't run: `imported` from the module `from`,
 * typed against `version`, where the client provides the module at
 * `provided`, a version the import isn't typed for (an earlier one, or
 * another major), or doesn't provide it at all. The client can't change, so
 * the server draws it something else: it catches this to answer differently,
 * or branches with `supports` before drawing.
 */
export class ClientVersionMismatch extends Error {
  constructor(
    readonly from: string,
    readonly imported: string,
    readonly version: string,
    modules: Modules,
  ) {
    const provided = modules[from];
    const listed = Object.entries(modules)
      .map(([specifier, at]) => `${specifier}@${at}`)
      .join(", ");
    const problem =
      provided === undefined
        ? `the client provides ${listed || "no modules"}`
        : `it's typed against ${version}, and the client provides ${from}@${provided}`;
    const fix = `supports(modules, "${from}", "^${version}")`;
    super(
      `Can't import \`${imported}\` from "${from}": ${problem}. ` +
        `Check \`${fix}\` first.`,
    );
    this.name = "ClientVersionMismatch";
    this.provided = provided;
  }

  // the version the client provides, or none
  readonly provided: string | undefined;
}
