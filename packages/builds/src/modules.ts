import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Modules } from "@backtickjs/bundler";
import { moduleMapFile, type Platform, readModuleMap } from "./moduleMap.js";

// The package a module specifier is in: `react` for `react/jsx-runtime`.
function packageOf(specifier: string): string {
  const segments = specifier.split("/");
  return segments.slice(0, specifier.startsWith("@") ? 2 : 1).join("/");
}

// Where a package is installed for the app at `projectRoot`, as Node finds
// it: in its node_modules, or the nearest above, as a workspace hoists it.
function installed(projectRoot: string, name: string): string {
  for (let directory = projectRoot; ; directory = dirname(directory)) {
    const file = join(directory, "node_modules", name, "package.json");
    if (existsSync(file)) return file;
    if (dirname(directory) === directory) {
      throw new Error(`${projectRoot}: ${name} isn't installed`);
    }
  }
}

/**
 * The modules the module map for `platform` offers, each at the installed
 * version of the package it comes from, in the app at `projectRoot`: what a
 * build made from it now carries there.
 */
export function installedModules(
  projectRoot: string,
  platform: Platform,
): Modules {
  const specifiers = readModuleMap(moduleMapFile(projectRoot, platform));
  const versions = new Map<string, string>();
  const versionOf = (name: string) => {
    let version = versions.get(name);
    if (version === undefined) {
      const file = installed(projectRoot, name);
      version = (JSON.parse(readFileSync(file, "utf8")) as { version: string })
        .version;
      versions.set(name, version);
    }
    return version;
  };
  return Object.fromEntries(
    [...specifiers]
      .sort()
      .map((specifier) => [specifier, versionOf(packageOf(specifier))]),
  );
}

/**
 * The id of a build that carries `modules`: a hash of them, so two builds
 * that carry the same share it, and a build always names exactly what it
 * has.
 */
export function buildIdOf(modules: Modules): string {
  const sorted = Object.keys(modules)
    .sort()
    .map((specifier) => [specifier, modules[specifier]]);
  return createHash("sha256")
    .update(JSON.stringify(sorted))
    .digest("hex")
    .slice(0, 16);
}
