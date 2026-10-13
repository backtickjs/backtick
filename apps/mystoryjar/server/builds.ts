import { readdirSync, readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { fileURLToPath } from "node:url";
import semver from "semver";
import {
  installedPackages,
  type Packages,
  packagesHash,
  type Platform,
  platforms,
} from "./packages.js";

/** A registered build: the packages it carries, and what's known of it. */
export type Build = {
  // when `pnpm register-build` first recorded it, as an ISO date
  createdAt: string;
  // set to true by hand to stop drawing for it: its users are asked to update
  deprecated: boolean;
  packages: Packages;
};

/**
 * The builds registered in `directory`, by id: one file each, written by
 * `pnpm register-build` and committed with the build's code.
 */
export function readBuilds(directory: URL): Map<string, Build> {
  return new Map(
    readdirSync(directory)
      .filter((file) => file.endsWith(".json"))
      .map((file) => [
        file.slice(0, -".json".length),
        JSON.parse(readFileSync(new URL(file, directory), "utf8")) as Build,
      ]),
  );
}

const registered = readBuilds(new URL("./builds/", import.meta.url));

/** This project's packages, for each platform: what a build made now carries. */
export const installed = Object.fromEntries(
  platforms.map((platform) => [
    platform,
    installedPackages(fileURLToPath(new URL("..", import.meta.url)), platform),
  ]),
) as Record<Platform, Packages>;
const current = new Map(
  Object.values(installed).map((packages) => [
    packagesHash(packages),
    packages,
  ]),
);

/**
 * Why the build this code makes for `platform` can't ship yet, or null: the
 * server wouldn't know it once the code moves on. The tests and every EAS
 * build but a development one check it.
 */
export function unregistered(platform: Platform): string | null {
  const id = packagesHash(installed[platform]);
  const build = registered.get(id);
  if (build === undefined) {
    return `No server/builds/${id}.json for ${platform}: run pnpm register-build and commit what it writes.`;
  }
  if (build.deprecated) {
    return `server/builds/${id}.json, ${platform}'s build, is deprecated: its users would only be asked to update.`;
  }
  if (!isDeepStrictEqual(build.packages, installed[platform])) {
    return `server/builds/${id}.json isn't ${platform}'s packages: run pnpm register-build.`;
  }
  return null;
}

/**
 * A build this server can't draw for: it doesn't know the packages it
 * carries. Fatal: the tests and EAS builds check every build is registered,
 * so one this server doesn't know means it, or the build, was deployed wrong.
 */
export class UnknownBuild extends Error {
  constructor(readonly buildId: string | null) {
    super(`No packages for build ${JSON.stringify(buildId)}.`);
  }
}

/**
 * A build its server no longer draws for, on purpose: its users are asked to
 * update, as the app shows for the 426 this answers.
 */
export class DeprecatedBuild extends Error {
  constructor(readonly buildId: string) {
    super(`Build ${JSON.stringify(buildId)} is deprecated.`);
  }
}

/**
 * The packages of the build with id `buildId`, however it was sent: one made
 * from this code, or one registered in `builds`. Throws `DeprecatedBuild` for
 * one marked deprecated, and `UnknownBuild` for one this server doesn't
 * know, or none.
 */
export function packagesOf(
  buildId: string | null,
  builds: ReadonlyMap<string, Build> = registered,
): Packages {
  const build = buildId === null ? undefined : builds.get(buildId);
  if (build?.deprecated) throw new DeprecatedBuild(buildId!);
  const packages =
    (buildId !== null && current.get(buildId)) || build?.packages;
  if (packages === undefined) throw new UnknownBuild(buildId);
  return packages;
}

/** Whether a build's packages include `name` at a version in `range`. */
export function supports(packages: Packages, name: string, range: string) {
  const version = packages[name];
  return version !== undefined && semver.satisfies(version, range);
}
