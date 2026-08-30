import { readFile } from "node:fs/promises";
import { bundler, type Spliceable } from "@backtickjs/core";

/**
 * One file of one, named the way the compiler will be told to name it.
 *
 * Written as an alias rather than an interface, which is what lets a script
 * hold it: only a type literal gets the index signature a `ClientValue` wants,
 * so an interface here is a value the seam will not take.
 */
export type ExampleFile = {
  readonly fileName: string;
  readonly sourceText: string;
};

/**
 * A thing the playground opens on.
 *
 * The files are read rather than imported, because what an example is, is its
 * text: the browser compiles that, and importing one would hand this the module
 * it became instead. They are still real files — the same compiler that checks
 * the page checks these, so an example that does not build is a build that does
 * not pass, rather than an editor drawing an error.
 *
 * Every part of it is a value a script can hold, so the playground splices the
 * whole thing rather than being handed the two strings it wants: what a page
 * gives it and what the editor opens on are then the same object.
 */
export type Example = {
  // In the order they were listed, which is the order a reader meets them: the
  // first is what the editor opens on. Listed rather than found, because a
  // directory read back is in whatever order the filesystem answers in.
  readonly files: readonly [ExampleFile, ...ExampleFile[]];
  // What it draws, folded while the site is built. Here rather than worked out
  // by whoever shows the example, so the drawing on the page is always of the
  // text beside it — the two cannot be given out separately and so cannot
  // disagree.
  readonly bundle: string;
};

// `tspc` emits `dist` and copies nothing else, so an example's text is only ever
// in the tree it was written in. The hop back to that tree is made here rather
// than in each example, which is why this takes a path and not a URL.
const written = new URL("../../src/examples/", import.meta.url);

/**
 * Which example asked, from the url of the module that did.
 *
 * An example is a directory beside this file, so the name of that directory is
 * everything needed to find what was written in it — the emitted tree and the
 * written one differ in a segment above here, never in this one, because
 * `rootDir` and `outDir` mirror each other.
 */
function directoryOf(from: string): string {
  const here = new URL(".", import.meta.url).href;
  const at = new URL(".", from).href;
  if (!at.startsWith(here) || at === here) {
    throw new Error(
      "backtick: an example is a directory beside `Example.ts`, and this one" +
        ` says it is at \`${from}\``,
    );
  }
  return at.slice(here.length);
}

async function fileOf(
  directory: string,
  fileName: string,
): Promise<ExampleFile> {
  const inside = new URL(directory, written);
  const at = new URL(fileName, inside);
  // `new URL` resolves a `..` rather than refusing it, so a name that climbs
  // out of the example would read a real file and draw the wrong one. Naming
  // these beside their index is only worth anything if they cannot be another's.
  if (!at.href.startsWith(inside.href)) {
    throw new Error(
      `backtick: an example lists \`${fileName}\`, which is not a file in` +
        ` \`src/examples/${directory}\``,
    );
  }
  try {
    return { fileName, sourceText: await readFile(at, "utf8") };
  } catch (thrown: unknown) {
    // A listed file that is not there is a typo, and it is worth saying so:
    // what node says on its own is a stack trace through `fs`, which names the
    // path but not what asked for it.
    if ((thrown as NodeJS.ErrnoException).code !== "ENOENT") {
      throw thrown;
    }
    throw new Error(
      `backtick: an example lists \`${fileName}\`, and there is no such file` +
        ` in \`src/examples/${directory}\``,
    );
  }
}

/**
 * An example, drawn and read.
 *
 * Given the drawing as well as the files, because the two are the same source
 * seen the two ways this needs it: `tspc` has already compiled it, so what it
 * draws is had by drawing it — no second parser, and nothing evaluated. The
 * text is only ever read as text, for the editor to open on.
 */
export async function exampleOf(
  // The url of the index declaring it, which is how this knows whose files
  // these are. Named from there rather than written out, so a list can only
  // ever name files of the example it is in.
  from: string,
  {
    root,
    files,
  }: {
    // What it draws, which is the root of it — the same thing a page would put
    // in its own markup, so an example is written the way anything else is.
    root: Spliceable;
    // Every file it is, in reading order, beside the index that lists them.
    files: readonly [string, ...string[]];
  },
): Promise<Example> {
  const directory = directoryOf(from);
  const [entry, ...rest] = files;
  return {
    files: [
      await fileOf(directory, entry),
      ...(await Promise.all(rest.map((name) => fileOf(directory, name)))),
    ],
    bundle: JSON.stringify(await bundler.run(root)),
  };
}
