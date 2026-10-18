// Enforces lockstep versioning: every `@backtickjs/*` package under
// `packages/` shares one version, and every reference to a workspace project,
// anywhere in the workspace, is `^` and its version, linked to it.
//
// The plugins are published separately from core but are only ever compatible
// with the core they were built against, so a version that drifts is a bug
// users hit at runtime, not a cosmetic inconsistency.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

// Every project in the workspace, and how pnpm resolved each of its
// dependencies.
const projects = JSON.parse(
  execFileSync("pnpm", ["ls", "-r", "--depth", "0", "--json"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  }),
).map((project) => {
  const file = join(project.path, "package.json");
  return { ...project, file, json: JSON.parse(readFileSync(file, "utf8")) };
});
const versionOf = new Map(
  projects
    .filter(({ name }) => name)
    .map(({ name, version }) => [name, version]),
);

// What's released is where it lives, so a new package is checked without
// being listed here.
const released = projects.filter(
  ({ path }) => dirname(path) === join(root, "packages"),
);

const errors = [];

const versions = new Map();
for (const { json } of released) {
  if (!versions.has(json.version)) versions.set(json.version, []);
  versions.get(json.version).push(json.name);
}

if (versions.size > 1) {
  const groups = [...versions]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([version, names]) => `  ${version}  ${names.join(", ")}`)
    .join("\n");
  // reported on its own: with no agreed version, every range looks wrong
  // against whichever one we happened to pick, which buries the real fault
  console.error(`✗ Workspace versions have drifted apart:\n${groups}`);
  process.exit(1);
}

const [expected] = versions.keys();

const dependencyFields = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

// One form for every reference to a workspace project, the one a user writes:
// `^` and that project's version, as `"@backtickjs/core": "^0.1.8"`.
for (const { file, json } of projects) {
  for (const field of dependencyFields) {
    for (const [name, range] of Object.entries(json[field] ?? {})) {
      if (!versionOf.has(name) || range === `^${versionOf.get(name)}`) continue;
      errors.push(
        `${file.slice(root.length)}: ${field}["${name}"] is "${range}", ` +
          `expected "^${versionOf.get(name)}"`,
      );
    }
  }
}

// And each of those references linked to the project itself: a range the
// local version doesn't satisfy would be installed from npm without a word,
// and tests would run against what's published rather than what's here.
for (const { file, ...resolved } of projects) {
  for (const field of [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
  ]) {
    for (const [name, { version }] of Object.entries(resolved[field] ?? {})) {
      if (!versionOf.has(name) || version.startsWith("link:")) continue;
      errors.push(
        `${file.slice(root.length)}: ${field}["${name}"] resolved to ` +
          `${version} from the registry, not to the workspace's own`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(`✗ ${errors.join("\n✗ ")}`);
  process.exit(1);
}

console.log(
  `✓ ${released.length} packages at ${expected}, ` +
    `every workspace reference "^<version>" and linked`,
);
