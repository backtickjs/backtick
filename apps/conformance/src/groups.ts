import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Client } from "@backtickjs/core";
import type { Verdict } from "./Case.js";

// Test262 as `pnpm generate` wrote it: a directory is a group, a file a case.
const GENERATED = join(import.meta.dir, "../.cache/test262");
if (!existsSync(join(GENERATED, "groups.json"))) {
  throw new Error("run `pnpm generate` to write the Test262 groups");
}
const test262: string[] = JSON.parse(
  readFileSync(join(GENERATED, "groups.json"), "utf8"),
);

/** Every group's name, in the order a page lists them. */
export const groupNames: string[] = test262.map((group) => `test262/${group}`);

/** A case as its verdict script, and the name to report if that won't run. */
export type Judged = { name: string; script: Client<Verdict> };

/** A group's cases, or `null` for a group there is not. */
export async function casesOf(group: string): Promise<Judged[] | null> {
  const held = group.replace(/^test262\//, "");
  if (!group.startsWith("test262/") || !test262.includes(held)) return null;
  // By a path the type checker doesn't follow: what it holds is untyped.
  const path = join(GENERATED, `${held}.ts`);
  const { cases } = (await import(path)) as { cases: Judged[] };
  return cases;
}
