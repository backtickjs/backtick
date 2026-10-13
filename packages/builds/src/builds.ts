import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { type Platform, platforms } from "./moduleMap.js";
import { buildIdOf, installedPackages, type Packages } from "./packages.js";

/** A registered build: the packages it carries, and what's known of it. */
export type Build = {
  // when it was first registered, as an ISO date
  createdAt: string;
  // set to true by hand to stop drawing for it: its users are asked to update
  deprecated: boolean;
  packages: Packages;
};

/**
 * A build its server can't draw for: it doesn't know the packages it
 * carries. Fatal: every build is registered before it ships, so one a server
 * doesn't know means it, or the build, was deployed wrong.
 */
export class UnknownBuild extends Error {
  constructor(readonly buildId: string | null) {
    super(
      buildId === null
        ? "No build id was sent: the app's code predates build ids, or doesn't send its own."
        : `No packages for build ${JSON.stringify(buildId)}: it isn't registered here.`,
    );
  }
}

/** A build its server no longer draws for, on purpose: its users are asked to update. */
export class DeprecatedBuild extends Error {
  constructor(readonly buildId: string) {
    super(`Build ${JSON.stringify(buildId)} is deprecated.`);
  }
}

/** Where an app keeps its registered builds, one file each: `builds/`. */
export function buildsDirectory(projectRoot: string): string {
  return join(projectRoot, "builds");
}

/** The builds registered in `directory`, by id. */
export function readBuilds(directory: string): Map<string, Build> {
  if (!existsSync(directory)) return new Map();
  return new Map(
    readdirSync(directory)
      .filter((file) => file.endsWith(".json"))
      .map((file) => [
        file.slice(0, -".json".length),
        JSON.parse(readFileSync(join(directory, file), "utf8")) as Build,
      ]),
  );
}

/** The id of the build the app at `projectRoot` now makes, on each platform. */
export function buildIds(projectRoot: string): Record<Platform, string> {
  return Object.fromEntries(
    platforms.map((platform) => [
      platform,
      buildIdOf(installedPackages(projectRoot, platform)),
    ]),
  ) as Record<Platform, string>;
}

/** The builds of the app at `projectRoot`, as its server resolves them. */
export type Builds = {
  /**
   * The packages of the build with id `buildId`, however it was sent: a
   * registered build's, or one this code makes. Throws `DeprecatedBuild` for
   * one marked deprecated, and `UnknownBuild` for one this server doesn't
   * know, or none.
   */
  packagesOf(buildId: string | null): Packages;
  /** The packages the build this code makes for `platform` carries. */
  installed(platform: Platform): Packages;
  /**
   * Why the build this code makes for `platform` can't ship, or null: its
   * server wouldn't know it once the code moves on, or it's deprecated.
   */
  unregistered(platform: Platform): string | null;
};

/**
 * The builds of the app at `projectRoot`, for its server: the registered
 * ones, read once, and the ones this code makes, worked out only when an id
 * isn't registered, as in development after a package change.
 */
export function createBuilds({ projectRoot }: { projectRoot: string }): Builds {
  const registered = readBuilds(buildsDirectory(projectRoot));
  const installed = new Map<Platform, Packages>();
  const installedOn = (platform: Platform) => {
    let packages = installed.get(platform);
    if (packages === undefined) {
      packages = installedPackages(projectRoot, platform);
      installed.set(platform, packages);
    }
    return packages;
  };
  return {
    packagesOf(buildId) {
      const build = buildId === null ? undefined : registered.get(buildId);
      if (build?.deprecated) throw new DeprecatedBuild(buildId!);
      if (build !== undefined) return build.packages;
      const current = platforms
        .map(installedOn)
        .find((packages) => buildIdOf(packages) === buildId);
      if (current === undefined) throw new UnknownBuild(buildId);
      return current;
    },
    installed: installedOn,
    unregistered(platform) {
      const packages = installedOn(platform);
      const id = buildIdOf(packages);
      const build = registered.get(id);
      if (build === undefined) {
        return `No builds/${id}.json for ${platform}: run backtick-builds register and commit what it writes.`;
      }
      if (build.deprecated) {
        return `builds/${id}.json, ${platform}'s build, is deprecated: its users would only be asked to update.`;
      }
      if (!isDeepStrictEqual(build.packages, packages)) {
        return `builds/${id}.json isn't ${platform}'s packages: run backtick-builds register.`;
      }
      return null;
    },
  };
}

/**
 * Registers the builds the app at `projectRoot` now makes, one file per id
 * in its `builds/`, for its server to keep drawing for them once the code
 * moves on. A build already registered keeps when it was, and whether it's
 * deprecated. Answers each platform's id and file.
 */
export function register(
  projectRoot: string,
): { platform: Platform; id: string; file: string }[] {
  const directory = buildsDirectory(projectRoot);
  mkdirSync(directory, { recursive: true });
  return platforms.map((platform) => {
    const packages = installedPackages(projectRoot, platform);
    const id = buildIdOf(packages);
    const file = join(directory, `${id}.json`);
    const recorded: Partial<Build> = existsSync(file)
      ? JSON.parse(readFileSync(file, "utf8"))
      : {};
    const build: Build = {
      createdAt: recorded.createdAt ?? new Date().toISOString(),
      deprecated: recorded.deprecated ?? false,
      packages,
    };
    writeFileSync(file, JSON.stringify(build, null, 2) + "\n");
    return { platform, id, file };
  });
}
