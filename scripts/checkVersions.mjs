// Enforces lockstep versioning: every `@backtickjs/*` package under
// `packages/` shares one version, and every range pointing at one of them
// either uses the workspace protocol or pins that same version.
//
// The plugins are published separately from core but are only ever compatible
// with the core they were built against, so a version that drifts is a bug
// users hit at runtime, not a cosmetic inconsistency.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

function manifests(dir) {
  const base = join(root, dir);
  if (!existsSync(base)) return [];
  return readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "language-tools")
    .map((entry) => join(base, entry.name, "package.json"))
    .filter((file) => existsSync(file))
    .map((file) => ({ file, json: JSON.parse(readFileSync(file, "utf8")) }));
}

const released = [
  ...manifests("packages"),
  ...manifests("packages/language-tools"),
];
// examples and benchmarks model a real consumer install, so their ranges are
// checked but their own versions are not part of the release set
const consumers = [...manifests("examples"), ...manifests("benchmarks")];

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

for (const { file, json } of [...released, ...consumers]) {
  for (const field of dependencyFields) {
    for (const [name, range] of Object.entries(json[field] ?? {})) {
      if (!name.startsWith("@backtickjs/")) continue;
      if (range.startsWith("workspace:")) continue;
      if (range === `^${expected}`) continue;
      errors.push(
        `${file.slice(root.length)}: ${field}["${name}"] is "${range}", ` +
          `expected "^${expected}" or a workspace: range`,
      );
    }
  }
}

// The compiler stamps this constant into every script it emits and cs-runtime
// compares scripts against it, so a value that drifts from the manifests would
// misreport every mismatch — in either direction.
const constantFile = "packages/cs-runtime/src/version.ts";
const declared = readFileSync(join(root, constantFile), "utf8").match(
  /export const version = "([^"]*)"/,
)?.[1];

if (declared !== expected) {
  errors.push(
    `${constantFile} declares "${declared}", ` +
      `expected "${expected}" to match the package versions`,
  );
}

if (errors.length > 0) {
  console.error(`✗ ${errors.join("\n✗ ")}`);
  process.exit(1);
}

console.log(
  `✓ ${released.length} packages at ${expected}, constant in sync, ` +
    `all @backtickjs ranges consistent`,
);
