// Moves the release to a new version: every project at the current one (the
// packages, and what's versioned with them) and every reference to one,
// except the sandbox's, which follows a release once it's on npm.
// `pnpm bump 0.3.1`.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import {
  consumers,
  dependencyFields,
  projects,
  released,
  root,
} from "./workspace.mjs";

const next = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(next ?? "")) {
  console.error("Usage: pnpm bump <version>, as pnpm bump 0.3.1");
  process.exit(1);
}

const current = released[0].json.version;
const bumped = new Set(
  projects
    .filter(({ json }) => json.name && json.version === current)
    .map(({ json }) => json.name),
);

for (const { path, file, json } of projects) {
  if (consumers.has(path)) continue;
  if (bumped.has(json.name)) json.version = next;
  for (const field of dependencyFields) {
    for (const name of Object.keys(json[field] ?? {})) {
      if (bumped.has(name)) json[field][name] = next;
    }
  }
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
}

execFileSync("pnpm", ["install"], { cwd: root, stdio: "inherit" });
execFileSync("node", ["scripts/checkVersions.mjs"], {
  cwd: root,
  stdio: "inherit",
});
console.log(
  `Bumped ${current} to ${next}: commit, push main, then publish a GitHub release with a new tag v${next} on main.`,
);
