import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { Spliceable } from "@backtickjs/core";
import type { JSX as Solid } from "solid-js";
import { bundle } from "./bundle.js";
import type { JSX } from "./jsx-runtime.js";

/** What a bundle's default export answers: Solid's own element for a drawing. */
export type Drawn<T> = T extends JSX.Element ? Solid.Element : T;

/**
 * A value as a page runs it, for Solid Testing Library or Solid itself to
 * run: bundled, and the bundle imported, whose default export draws it.
 *
 *     render(await draw(<Counter from={0} />));
 *
 * The bundle is imported from a file in the project's
 * `node_modules/.cache/backtick/`, named for its content, so its imports
 * (`solid-js/web`) resolve through the project's own modules, as the test's
 * do.
 */
export async function draw<T>(value: Spliceable<T>): Promise<() => Drawn<T>> {
  const { code } = await bundle(value as Spliceable);
  const directory = join(process.cwd(), "node_modules", ".cache", "backtick");
  const file = join(
    directory,
    `${createHash("sha256").update(code).digest("hex")}.js`,
  );
  await mkdir(directory, { recursive: true });
  await writeFile(file, code);
  return (
    (await import(pathToFileURL(file).href)) as { default: () => Drawn<T> }
  ).default;
}
