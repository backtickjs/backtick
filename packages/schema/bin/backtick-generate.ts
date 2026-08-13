#!/usr/bin/env -S node --experimental-strip-types
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { format } from "prettier";
import { emitJson, emitJsx, type Schema } from "../dist/index.js";

// Every target's `pnpm generate`, run from the package it generates for.
//
// `backtick-tsc` next door is a plain `#!/usr/bin/env node` launcher over its
// compiled `dist`. This one cannot be: the flag is for the *target's*
// `schema/index.ts`, which is TypeScript imported here at run time, so
// compiling this file would not remove the need for it. One place to drop the
// flag when stripping stops being experimental.
//
// By convention rather than by configuration: a target keeps its schema at
// `schema/index.ts` and gets the same artifacts in the same places, so there
// is one of these and not one per SDK. What differs between targets is the
// schema, which is the point.

const root = pathToFileURL(`${process.cwd()}/`);
const at = (path: string) => new URL(path, root);

const schema: Schema = await import(at("schema/index.ts").href);

/** Written formatted, so what is checked in is what `format:check` expects. */
async function write(path: string, body: string): Promise<void> {
  const file = at(path);
  writeFileSync(file, await format(body, { filepath: file.pathname }));
  console.log(`${path}: ${body.split("\n").length} lines`);
}

// What an app writes against.
await write("src/jsx-runtime/index.ts", emitJsx(schema));

// And what everything else reads: beside the schema it came from, so a change
// to what a target draws is a change someone can see in review.
await write("schema/index.json", emitJson(schema));
