// The workspace as the version scripts see it: `checkVersions.mjs` checks it
// and `bump.mjs` rewrites it, from the same projects and the same exception.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const root = new URL("..", import.meta.url).pathname;

// Every project in the workspace, and how pnpm resolved each of its
// dependencies.
export const projects = JSON.parse(
  execFileSync("pnpm", ["ls", "-r", "--depth", "0", "--json"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  }),
).map((project) => {
  const file = join(project.path, "package.json");
  return { ...project, file, json: JSON.parse(readFileSync(file, "utf8")) };
});

export const versionOf = new Map(
  projects
    .filter(({ name }) => name)
    .map(({ name, version }) => [name, version]),
);

// Installed from npm where it's deployed, so held to published versions
// instead: it moves to a new one after its release.
export const consumers = new Set([
  join(root, "apps/mcp.backtickjs.com/sandbox"),
]);

// What's released is where it lives, so a new package is covered without
// being listed here.
export const released = projects.filter(
  ({ path }) => dirname(path) === join(root, "packages"),
);

export const dependencyFields = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];
