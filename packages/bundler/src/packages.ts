import semver from "semver";

/** The package a module specifier is in: `react` for `react/jsx-runtime`. */
export function packageOf(specifier: string): string {
  const segments = specifier.split("/");
  return segments.slice(0, specifier.startsWith("@") ? 2 : 1).join("/");
}

/**
 * Whether a client with `packageVersions` provides `pkg` at a version in
 * `range`: the check a bundle's every import passes, so a server choosing
 * what to draw for a client can ask it first.
 */
export function supports(
  packageVersions: Readonly<Record<string, string>>,
  pkg: string,
  range: string,
): boolean {
  const provided = packageVersions[pkg];
  return provided !== undefined && semver.satisfies(provided, range);
}
