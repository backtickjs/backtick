import semver from "semver";

/**
 * The modules a client provides, by specifier, each at the exact version of
 * the package it comes from: `{ "react/jsx-runtime": "19.2.3" }`.
 */
export type Modules = Readonly<Record<string, string>>;

/**
 * Whether `value` is `Modules`: often what a client sent, parsed as it came.
 * Each version must be one, so comparing them can't throw.
 */
export function isModules(value: unknown): value is Modules {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(
      (version) =>
        typeof version === "string" && semver.valid(version) !== null,
    )
  );
}
