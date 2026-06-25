import { dirname, resolve } from "node:path";

// The following import needs to always be `type` imports, as we always want to import it dynamically
import type * as prettier from "prettier";

type PackageVersion = {
  full: string;
  major: number;
  minor: number;
  patch: number;
};

let isTrusted = true;

export function setIsTrusted(_isTrusted: boolean) {
  isTrusted = _isTrusted;
}

export type PackageInfo = {
  entrypoint: string;
  directory: string;
  version: PackageVersion;
};

/**
 * Get the path of a package's directory from the paths in `fromPath`, if `root` is set to false, it will return the path of the package's entry point
 */
export function getPackageInfo(
  packageName: string,
  fromPath: string[],
): PackageInfo | undefined {
  const paths = [];
  if (isTrusted) {
    paths.unshift(...fromPath);
  }

  try {
    const packageJSON = require.resolve(`${packageName}/package.json`, {
      paths,
    });
    return {
      directory: dirname(packageJSON),
      entrypoint: require.resolve(packageName, { paths }),
      version: parsePackageVersion(require(packageJSON).version),
    };
  } catch {
    return undefined;
  }
}

export function importPrettier(fromPath: string): typeof prettier | undefined {
  let prettierPkg = getPackageInfo("prettier", [fromPath, __dirname]);

  if (!prettierPkg) {
    return undefined;
  }

  if (prettierPkg.version.major < 3) {
    console.error(
      `Prettier version ${prettierPkg.version.full} from ${prettierPkg.directory} is not supported, please update to at least version 3.0.0. Falling back to bundled version to ensure formatting works correctly.`,
    );

    prettierPkg = getPackageInfo("prettier", [__dirname]);
    if (!prettierPkg) {
      return undefined;
    }
  }

  return require(prettierPkg.entrypoint);
}

export function getPrettierPluginPath(fromPath: string): string | undefined {
  const prettierPluginPath = getPackageInfo("@backtick/prettier-plugin", [
    fromPath,
    __dirname,
  ])?.entrypoint;

  if (!prettierPluginPath) {
    return undefined;
  }

  return prettierPluginPath;
}

export function getWorkspacePnpPath(workspacePath: string): string | null {
  try {
    const possiblePath = resolve(workspacePath, ".pnp.cjs");
    require.resolve(possiblePath);
    return possiblePath;
  } catch {
    return null;
  }
}

export function parsePackageVersion(version: string): PackageVersion {
  let [major, minor, patch] = version.split(".");

  if (patch.includes("-")) {
    const patchParts = patch.split("-");
    patch = patchParts[0];
  }

  return {
    full: version,
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
  };
}
