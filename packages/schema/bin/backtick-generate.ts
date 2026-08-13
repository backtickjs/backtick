#!/usr/bin/env -S node --experimental-strip-types
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { format } from "prettier";
import { generate, type ClientSchema } from "../dist/index.js";

// Every project's `pnpm generate`, run from the project it generates for.
//
// Not a compiled launcher like `backtick-tsc` next door: the flag is for the
// project's schema, which is TypeScript imported here at run time, so
// compiling this file would not remove the need for it.
//
// By convention rather than by configuration: a project keeps its schema
// beside its `package.json` and gets the same artifacts in the same places, so
// there is one of these and not one per SDK.

const SOURCE = "backtick.schema.ts";

const root = pathToFileURL(`${process.cwd()}/`);
const at = (path: string) => new URL(path, root);

// One export rather than the module itself, so the annotation on it is what
// checks the shape: the specifier here is built at run time, so nothing
// resolves it and a missing field would otherwise reach the artifact.
const module: { schema?: ClientSchema } = await import(at(SOURCE).href);
const { schema } = module;
if (schema === undefined) {
  throw new Error(`${SOURCE} must export a schema.`);
}

/** Written formatted, so what is checked in is what `format:check` expects. */
async function write(path: string, body: string): Promise<void> {
  const file = at(path);
  writeFileSync(file, await format(body, { filepath: file.pathname }));
  console.log(`${path}: ${body.split("\n").length} lines`);
}

await write("src/jsx-runtime/index.ts", generate.jsx(schema));

// Beside the schema it came from, so a change to what a client can do is a
// change someone can see in review.
await write("backtick.schema.json", generate.json(schema));
