// Records the packages a build made from this code carries on each platform,
// so the server keeps bundling screens for it once the code moves on: run
// before a build for the stores, and commit the files it writes.
import { writeFileSync } from "node:fs";
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
  writeFileSync(file, JSON.stringify(packages, null, 2) + "\n");
  console.log(`Registered ${platform}: server/builds/${hash}.json`);
}
