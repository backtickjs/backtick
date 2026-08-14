#!/usr/bin/env -S node --experimental-strip-types
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { format } from "prettier";
import { flatten, generate, type ClientSchema } from "../dist/index.js";

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
  mkdirSync(dirname(file.pathname), { recursive: true });
  writeFileSync(file, await format(body, { filepath: file.pathname }));
  console.log(`${path}: ${body.split("\n").length} lines`);
}

const reachable = flatten(schema);

// The host language's names, for the schema that declares them. A target
// inheriting core's globals re-declares nothing, so it writes no file at all.
if (Object.keys(schema.globals).length > 0) {
  await write("src/globals.ts", generate.globals(schema));
}

// The runtimes an app compiles against, for a schema that has elements. One
// with none is a base for other schemas rather than a client of its own, and a
// `jsx-runtime` naming no tag is a file nothing can write against.
if (Object.keys(reachable.elements).length > 0) {
  await write("src/jsx-runtime/index.ts", generate.jsx(schema));
  await write("src/jsx-dev-runtime/index.ts", generate.jsxDev());
}
