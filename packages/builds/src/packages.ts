import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { packageOf } from "@backtickjs/bundler";
import { moduleMapFile, type Platform, readModuleMap } from "./moduleMap.js";

/** Package names and the versions of them a build carries. */
export type Packages = Readonly<Record<string, string>>;

/**
 * The versions of the packages the module map for `platform` offers, as
 * installed in the app at `projectRoot`: what a build made from it now
 * carries there.
 */
export function installedPackages(
  projectRoot: string,
  platform: Platform,
): Packages {
  const specifiers = readModuleMap(moduleMapFile(projectRoot, platform));
  const names = [...new Set(specifiers.map(packageOf))].sort();
  return Object.fromEntries(
    names.map((name) => {
      const file = join(projectRoot, "node_modules", name, "package.json");
      const { version } = JSON.parse(readFileSync(file, "utf8")) as {
        version: string;
      };
      return [name, version];
    }),
  );
}

/**
 * The id of a build that carries `packages`: a hash of them, so two builds
 * that carry the same share it, and a build always names exactly what it
 * has.
 */
export function buildIdOf(packages: Packages): string {
  const sorted = Object.keys(packages)
    .sort()
    .map((name) => [name, packages[name]]);
  return createHash("sha256")
    .update(JSON.stringify(sorted))
    .digest("hex")
    .slice(0, 16);
}
