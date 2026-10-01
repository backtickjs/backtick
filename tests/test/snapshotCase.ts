import { mkdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { TestContext } from "node:test";
import type { Spliceable } from "@backtickjs/core";
import prettier from "prettier";
import { isNode } from "./node.ts";
import { renderBundleMappings } from "./renderBundleMappings.ts";
import { renderDrawing } from "./renderMarkup.ts";
import { renderValue } from "./renderValue.ts";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { bundle, evaluate } from "./evaluate.ts";
import { inRoot } from "./inRoot.tsx";
import { render } from "@solidjs/testing-library";

// Written as given: each artifact is text meant to be read in its own file.
const verbatim = [(value: unknown) => value as string];

/**
 * Records what `value` prints as, and what it draws or evaluates to, next to
 * the test: `__snapshots__/<test file>/<name>.<artifact>`.
 *
 * None of it records a source position. What the test file compiles to is
 * recorded once for the whole file, by `compiler.test.ts`.
 */
export async function snapshotCase(
  t: TestContext,
  name: string,
  value: Spliceable,
): Promise<void> {
  const file = t.filePath!;
  const dir = join(
    dirname(file),
    "__snapshots__",
    basename(file).replace(/\.test\.tsx$/, ""),
  );
  mkdirSync(dir, { recursive: true });
  const record = (text: string, artifact: string) =>
    t.assert.fileSnapshot(text, join(dir, `${name}.${artifact}`), {
      serializers: verbatim,
    });

  // Formatted, so a change to what is printed reads as the code it changed;
  // its map, against the code as it was printed. The value as bundled.
  const { code, map } = await bundle(value);
  record(await prettier.format(code, { parser: "babel" }), "bundle");
  record(`${renderBundleMappings(code, map)}\n`, "bundle.sourcemap");
  // Run in a root, in client code, as every value test is.
  const evaluated = await evaluate(inRoot(value));
  const drawn =
    isNode(evaluated) || (Array.isArray(evaluated) && evaluated.some(isNode));
  // Rendered only once evaluating it showed it draws.
  record(
    `${drawn ? renderDrawing(render(await evaluate(() => value as JSX.Element)).container) : renderValue(evaluated)}\n`,
    "value",
  );
}
