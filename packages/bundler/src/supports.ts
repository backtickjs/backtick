import { AsyncLocalStorage } from "node:async_hooks";
import { BundlerError } from "./errors.js";
import semver from "semver";
import type { Modules } from "./modules.js";

// The modules of the client a build is for, while it runs server components.
const building = new AsyncLocalStorage<Modules>();

/** Runs `build` with `modules` as the client's, for `supports`. */
export function buildingFor<T>(modules: Modules, build: () => T): T {
  return building.run(modules, build);
}

/**
 * Whether the client the bundler is drawing for provides `specifier` at a
 * version in `range`: the check every import passes, for a server component
 * choosing what to draw for that client. Called while `bundler.build` runs
 * server components; outside one, there's no client to ask about.
 *
 *     supports("expo-haptics", "^15") ? cs`…` : cs`…`;
 */
export function supports(specifier: string, range: string): boolean {
  const modules = building.getStore();
  if (modules === undefined) {
    throw new BundlerError(
      `supports("${specifier}", "${range}") asks about the client a build is for: call it in a server component, while bundler.build runs it.`,
    );
  }
  const provided = modules[specifier];
  return provided !== undefined && semver.satisfies(provided, range);
}
