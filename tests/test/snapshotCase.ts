import { mkdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { TestContext } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import type { BacktickElement, Spliceable } from "@backtickjs/core";
import prettier from "prettier";
import { evaluate, render } from "@backtickjs/solid-js/testing";
import { isNode } from "./node.ts";
import { renderDrawing } from "./renderMarkup.ts";
import { renderValue } from "./renderValue.ts";

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

  // Formatted, so a change to what is printed reads as the code it changed.
  const code = await bundler.run(value, { transform });
  record(await prettier.format(code, { parser: "babel" }), "bundle");
  const evaluated = await evaluate(value);
  const drawn =
    isNode(evaluated) || (Array.isArray(evaluated) && evaluated.some(isNode));
  // Rendered only once evaluating it showed it draws.
  record(
    `${drawn ? renderDrawing((await render(value as BacktickElement)).container) : renderValue(evaluated)}\n`,
    "value",
  );
}
