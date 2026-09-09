#!/usr/bin/env -S node --experimental-strip-types
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { format } from "prettier";
import { flatten } from "../dist/flatten.js";
import { generate } from "../dist/generate.js";
import type { Schema } from "../dist/index.js";

// Every project's `pnpm generate`, run from the project it generates for.
//
// Not a compiled launcher like `backtick-tsc` next door: the flag is for the
// project's schema, which is TypeScript imported here at run time, so
// compiling this file would not remove the need for it.
//
// The schema is named and the artifacts are not: a project says which file
// declares it and gets the same files in the same places, so there is one of
// these and not one per SDK. Both ends are read from the working directory,
// which is the project a package manager runs this in.

const source = process.argv[2];
if (source === undefined) {
  throw new Error("usage: backtick-generate <path to a file exporting schema>");
}

const root = pathToFileURL(`${process.cwd()}/`);
const at = (path: string) => new URL(path, root);

// One export rather than the module itself, so the annotation on it is what
// checks the shape: the specifier here is built at run time, so nothing
// resolves it and a missing field would otherwise reach the artifact.
const module: { schema?: Schema } = await import(at(source).href);
const { schema } = module;
if (schema === undefined) {
  throw new Error(`${source} must export a schema.`);
}

/** Written formatted, so what is checked in is what `format:check` expects. */
async function write(path: string, body: string): Promise<void> {
  const file = at(path);
  mkdirSync(dirname(file.pathname), { recursive: true });
  writeFileSync(file, await format(body, { filepath: file.pathname }));
  console.log(`${path}: ${body.split("\n").length} lines`);
}

// Everything the schema says: its types, its elements and its contract. One
// that declares none of them is a schema in name only, and writes no file.
if (
  Object.keys(schema.types).length > 0 ||
  Object.keys(schema.elements).length > 0 ||
  Object.keys(schema.builtins).length > 0
) {
  await write("src/declarations.generated.ts", generate.declarations(schema));
}

// The values an app imports to splice. Written only where there is one to
// write: a schema whose builtins are all the language's own — a member of a
// value, a member of a namespace — declares nothing a script reaches this way,
// and an empty file is a name for an app to import from and find nothing in.
const values = generate.builtins(schema);
if (values !== "") {
  await write("src/builtins.generated.ts", values);
}

// The same schema for a reader that is not this process: a native client, a
// generator written in something else, a diff in review.
//
// Flattened, because a document naming a package it does not contain is one a
// reader cannot finish — what a target draws is everything it and its bases
// declare, and `extends` is this repository's business rather than theirs.
//
// Checked in, so a change to what a client must answer for is a change someone
// can see.
await write("schema.generated.json", generate.json(flatten(schema)));
