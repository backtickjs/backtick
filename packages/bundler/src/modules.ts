import semver from "semver";

/**
 * The modules a client provides, by specifier, each at the exact version of
 * the package it comes from: `{ "react/jsx-runtime": "19.2.3" }`.
 */
export type Modules = Readonly<Record<string, string>>;

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
