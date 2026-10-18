import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

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
 * what a build made from it now carries there, for `modulesOf`. Node only: an
 * Expo app calls it from `app.config.ts`, and passes it on in the config.
 *
 *     export default ({ config, projectRoot }: ConfigContext) => ({
 *       ...config,
 *       extra: {
 *         ...config.extra,
 *         backtick: { packages: installedPackages(projectRoot) },
 *       },
 *     });
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
