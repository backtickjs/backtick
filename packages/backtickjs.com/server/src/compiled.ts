import { browserTranspile } from "@backtickjs/browser-compiler";
import { built } from "@backtickjs.com/client/bundleOf";

/**
 * An example, compiled while the page is built.
 *
 * The same pipeline the client answers `compile` with, run here instead of
 * there: a reader who only reads never asks for a compiler, and the page draws
 * something rather than nothing before the megabyte behind the editor has been
 * thought about.
 *
 * A page that cannot compile its own example has drawn an editor it cannot
 * answer for, so this throws rather than drawing an empty one.
 */
export async function bundleFor(source: string): Promise<string> {
  const result = await built(browserTranspile, source);
  if (!result.ok) {
    throw new Error(
      `backtick: an example does not compile — ${result.diagnostics
        .map((one) => one.message)
        .join("; ")}`,
    );
  }
  return result.bundle;
}
