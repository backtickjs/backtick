// Enforces lockstep versioning: every published package — `@backtickjs/*` under
// `packages/` and `@backtickjs-internal/*` under `internal/` — shares one
// version, and every range pointing at one of them either uses the workspace
// protocol or pins that same version.
//
// The internal ones are in the set because they are published: a public package
// depends on them, so npm resolves them whether or not anyone imports one by
// name. A version that drifts there breaks an install the same way.
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
  ...manifests("internal"),
];
// examples and benchmarks model a real consumer install, so their ranges are
// checked but their own versions are not part of the release set.
//
// Found by looking rather than by naming a depth: a benchmark implementation
// sits several levels inside the layout its driver expects, and a guard that
// knows where consumers live is a guard that stops covering the next one.
function consumers(dir) {
  const base = join(root, dir);
  if (!existsSync(base)) return [];
  const found = [];
  for (const entry of readdirSync(base, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue;
    if (entry.isDirectory()) {
      found.push(...consumers(join(dir, entry.name)));
    } else if (entry.name === "package.json") {
      const file = join(base, entry.name);
      found.push({ file, json: JSON.parse(readFileSync(file, "utf8")) });
    }
  }
  return found;
}

const consuming = [...consumers("examples"), ...consumers("benchmarks")];

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

for (const { file, json } of [...released, ...consuming]) {
  for (const field of dependencyFields) {
    for (const [name, range] of Object.entries(json[field] ?? {})) {
      if (!name.startsWith("@backtickjs/") && !name.startsWith("@backtickjs-internal/"))
        continue;
      if (range.startsWith("workspace:")) continue;
      if (range === `^${expected}`) continue;
      errors.push(
        `${file.slice(root.length)}: ${field}["${name}"] is "${range}", ` +
          `expected "^${expected}" or a workspace: range`,
      );
    }
  }
}

// The compiler stamps this constant into every script it emits and a client
// compares scripts against it, so a value that drifts from the manifests would
// misreport every mismatch — in either direction.
const constantFile = "internal/client-script/src/version.ts";
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
