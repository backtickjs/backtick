// Records the packages a build made from this code carries on each platform,
// so the server keeps bundling screens for it once the code moves on: run
// before a build for the stores, and commit the files it writes. A build
// already recorded keeps when it was, and whether it's deprecated.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  installedPackages,
  packagesHash,
  platforms,
} from "../server/packages.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
for (const platform of platforms) {
  const packages = installedPackages(root, platform);
  const hash = packagesHash(packages);
  const file = new URL(`../server/builds/${hash}.json`, import.meta.url);
  const recorded = existsSync(file)
    ? JSON.parse(readFileSync(file, "utf8"))
    : {};
  const build = {
    createdAt: recorded.createdAt ?? new Date().toISOString(),
    deprecated: recorded.deprecated ?? false,
    packages,
  };
  writeFileSync(file, JSON.stringify(build, null, 2) + "\n");
  console.log(`Registered ${platform}: server/builds/${hash}.json`);
}
