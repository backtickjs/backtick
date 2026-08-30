import { readFile } from "node:fs/promises";

/** One file of one, named the way the compiler will be told to name it. */
export interface ExampleFile {
  readonly fileName: string;
  readonly sourceText: string;
}

/**
 * A thing the playground opens on.
 *
 * The files are read rather than imported, because what an example is, is its
 * text: the browser compiles that, and importing one would hand this the module
 * it became instead. They are still real files — the same compiler that checks
 * the page checks these, so an example that does not build is a build that does
 * not pass, rather than an editor drawing an error.
 */
export interface Example {
  // Written so that there is always a first: the entry, which is the one the
  // editor opens on, and after it whatever that reaches for.
  readonly files: readonly [ExampleFile, ...ExampleFile[]];
}

// `tspc` emits `dist` and copies nothing else, so an example's text is only ever
// in the tree it was written in. The hop back to that tree is made here rather
// than in each example, which is why this takes a path and not a URL.
const written = new URL("../../src/examples/", import.meta.url);

/** One of those files, under the name it is written beside its example with. */
export async function fileOf(path: string): Promise<ExampleFile> {
  return {
    fileName: path.slice(path.lastIndexOf("/") + 1),
    sourceText: await readFile(new URL(path, written), "utf8"),
  };
}
