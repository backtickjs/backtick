// Enforces lockstep versioning: every `@backtickjs/*` package under
// `packages/` shares one version, and every range pointing at one of them
// either uses the workspace protocol or pins that same version.
//
// The plugins are published separately from core but are only ever compatible
// with the core they were built against, so a version that drifts is a bug
// users hit at runtime, not a cosmetic inconsistency.
//
// Adapters, under `adapters/`, are the exception: an adapter's version is its
// framework's, which it pins exactly.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;

function manifests(dir) {
  const base = join(root, dir);
  if (!existsSync(base)) return [];
  return readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(base, entry.name, "package.json"))
    .filter((file) => existsSync(file))
    .map((file) => ({ file, json: JSON.parse(readFileSync(file, "utf8")) }));
}

// What's an adapter is where it lives, so a new one is checked without being
// listed here.
const released = manifests("packages");
const adapters = manifests("adapters");
const packages = [...released, ...adapters];
const isAdapter = (name) => adapters.some(({ json }) => json.name === name);
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

const consuming = [
  ...consumers("examples"),
  ...consumers("benchmarks"),
  ...consumers("apps"),
];

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

// The framework is whichever dependency an adapter pins at its own version:
// `react` for `@backtickjs/react` 19.2.3, which also pins `react-dom` there.
for (const { file, json } of adapters) {
  const pinned = Object.values(json.dependencies ?? {});
  if (!pinned.includes(json.version)) {
    errors.push(
      `${file.slice(root.length)}: version is "${json.version}", expected ` +
        `the version of the framework it pins, but no dependency is pinned ` +
        `at it`,
    );
  }
}

// What a range pointing at each package must pin.
const expectedOf = (name) =>
  isAdapter(name)
    ? adapters.find(({ json }) => json.name === name)?.json.version
    : expected;

const dependencyFields = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

for (const { file, json } of [...packages, ...consuming]) {
  for (const field of dependencyFields) {
    for (const [name, range] of Object.entries(json[field] ?? {})) {
      if (!name.startsWith("@backtickjs/")) continue;
      if (range.startsWith("workspace:")) continue;
      if (range === `^${expectedOf(name)}`) continue;
      errors.push(
        `${file.slice(root.length)}: ${field}["${name}"] is "${range}", ` +
          `expected "^${expectedOf(name)}" or a workspace: range`,
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
    `${adapters.length} adapter(s) at their framework's version, ` +
    `all @backtickjs ranges consistent`,
);
