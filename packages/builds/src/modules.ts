import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Modules } from "@backtickjs/bundler";

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
 * The installed version of each of the app's dependencies, at `projectRoot`:
 * what a build made from it now carries there, for `modulesOf`.
 */
export function installedPackages(projectRoot: string): Record<string, string> {
  const { dependencies = {} } = JSON.parse(
    readFileSync(join(projectRoot, "package.json"), "utf8"),
  ) as { dependencies?: Record<string, string> };
  return Object.fromEntries(
    Object.keys(dependencies).map((name) => [
      name,
      (
        JSON.parse(readFileSync(installed(projectRoot, name), "utf8")) as {
          version: string;
        }
      ).version,
    ]),
  );
}

/**
 * The modules a build sent, `modulesOf` as JSON:
 * `{ "react/jsx-runtime": "19.2.3" }`. Throws for none, or anything
 * else, as from an app that doesn't send them.
 */
export function parseModules(text: string | null | undefined): Modules {
  if (!text) {
    throw new Error(
      "No modules were sent: the app's code predates them, or doesn't send its own.",
    );
  }
  let modules: unknown;
  try {
    modules = JSON.parse(text);
  } catch {
    throw new Error(`The modules sent aren't JSON: ${text.slice(0, 80)}`);
  }
  if (
    typeof modules !== "object" ||
    modules === null ||
    Array.isArray(modules) ||
    !Object.values(modules).every((version) => typeof version === "string")
  ) {
    throw new Error(
      `The modules sent aren't { specifier: version }: ${text.slice(0, 80)}`,
    );
  }
  return modules as Modules;
}
