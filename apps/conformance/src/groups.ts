import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import type { Client } from "@backtickjs/core";
import { verdict, type Verdict } from "./Case.js";
import { topics } from "./cases/index.js";
import { compileCase } from "./test262/compileCase.js";

// Test262 as TC39 wrote it: a directory is a group, a file a case.
const TEST262 = join(import.meta.dir, "../test262");

function test262Groups(): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const entry of readdirSync(TEST262, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
    const group = `test262/${relative(TEST262, entry.parentPath)}`;
    groups.set(group, [...(groups.get(group) ?? []), entry.name].sort());
  }
  return groups;
}

const test262 = test262Groups();

/** Every group's name, in the order a page lists them. */
export const groupNames: string[] = [
  ...Object.keys(topics).map((topic) => `backtick/${topic}`),
  ...[...test262.keys()].sort(),
];

/** A case as its verdict script, and the name to report if that won't run. */
export type Judged = { name: string; script: Client<Verdict> };

/** A group's cases, or `null` for a group there is not. */
export function casesOf(group: string): Judged[] | null {
  const topic = topics[group.replace(/^backtick\//, "")];
  if (group.startsWith("backtick/") && topic) {
    return topic.map((test) => ({ name: test.name, script: verdict(test) }));
  }
  const files = test262.get(group);
  if (!files) return null;
  const dir = join(TEST262, group.replace(/^test262\//, ""));
  return files.map((file) => {
    const name = file.replace(/\.js$/, "");
    const source = readFileSync(join(dir, file), "utf8");
    return { name, script: compileCase(name, source) };
  });
}
