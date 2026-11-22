#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Self-contained, as an app's postinstall runs it before anything is built.

// Where a package is installed for the app in `root`, as Node and Metro find
// it: in its node_modules, or the nearest above, as a workspace hoists it.
function installed(root, name) {
  for (let directory = root; ; directory = dirname(directory)) {
    const file = join(directory, "node_modules", name, "package.json");
    if (existsSync(file)) {
      return file;
    }
    if (dirname(directory) === directory) {
      throw new Error(`${root}: ${name} isn't installed`);
    }
  }
}

const root = process.cwd();
const { dependencies = {} } = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
);
const versions = Object.fromEntries(
  Object.keys(dependencies).map((name) => [
    name,
    JSON.parse(readFileSync(installed(root, name), "utf8")).version,
  ]),
);

// The app's dependencies at their installed versions, as JSON, for its
// postinstall: backtick-installed-packages > installed-packages.json
process.stdout.write(`${JSON.stringify(versions, null, 2)}\n`);
