import * as core from "@backtickjs/core";
import * as webSdk from "@backtickjs/web-sdk";
import * as jsxRuntime from "@backtickjs/web-sdk/jsx-runtime";
import type { browserTranspile } from "@backtickjs/browser-compiler";
import type ts from "typescript";

// The name an example is compiled under. It reaches a reader twice — in a
// complaint, and in the `filePath` the metadata carries — so it is a name that
// reads as one rather than a path that happens to be true.
export const EXAMPLE = "example.tsx";

/**
 * Where a complaint sits in what a reader wrote, and what it says.
 *
 * A flattened `ts.Diagnostic`, because this is what crosses `postMessage` — a
 * structured clone carries data and the real one is a graph with a source file
 * hanging off it.
 */
export interface Complaint {
  readonly message: string;
  readonly start: number;
  readonly length: number;
}

/**
 * What a size reads as beside the word `BUNDLE`.
 *
 * Here rather than in whoever draws it, because two of them draw it: the build
 * writes the first one and the frame answers with every one after, and a reader
 * who types a character should not watch the units change.
 */
export function sizeOf(bytes: number): string {
  return bytes < 1024
    ? ` \u00b7 ${bytes.toString()} B`
    : ` \u00b7 ${(bytes / 1024).toFixed(1)} KB`;
}

/** A bundle, or the reasons there is none. */
export type Built =
  | { readonly ok: true; readonly bundle: string; readonly bytes: number }
  | { readonly ok: false; readonly complaints: readonly Complaint[] };

// What a reader's imports may reach. Held rather than resolved, so what their
// code imports is the module this file imported: two copies of `cs-runtime` on
// one page would disagree about what a drawing is, and the disagreement would
// surface as a bundle that is subtly wrong rather than as an error.
const MODULES: Readonly<Record<string, unknown>> = {
  "@backtickjs/core": core,
  // The one a person writes, for the event types a handler's parameter is
  // annotated with, and the one the compiler emits for JSX. A reader who
  // imports the first should not be told the playground has never heard of it.
  "@backtickjs/web-sdk": webSdk,
  "@backtickjs/web-sdk/jsx-runtime": jsxRuntime,
};

/**
 * One example, compiled and then run for the bundle it draws.
 *
 * The compiler is handed in rather than imported: in a browser it is a global
 * the other script defines, and importing it here would put a second parser in
 * this bundle. On a build it is the import, and the two are the same function.
 *
 * Running is the half the compiler does not do. It is also the half that needs
 * `new Function`, which is why it is here rather than in a package a page might
 * want to load without giving anything permission to evaluate.
 */
export async function built(
  transpile: typeof browserTranspile,
  source: string,
): Promise<Built> {
  const diagnostics: ts.Diagnostic[] = [];
  let js: string;
  try {
    js = transpile(EXAMPLE, source, (diagnostic) =>
      diagnostics.push(diagnostic),
    );
  } catch (thrown: unknown) {
    // The parser never arrived, or threw on its way in. Said the same way a
    // complaint is, because from the page next door it is the same thing.
    return { ok: false, complaints: [complaintOf(thrown)] };
  }
  // A file the compiler complained about is not compiled, whatever else came
  // back: the emitted text for one is a guess about what was meant.
  if (diagnostics.length > 0) {
    return { ok: false, complaints: diagnostics.map(flattened) };
  }
  try {
    const drawing = await drawingOf(run(js));
    const bundle = JSON.stringify(await core.bundler.run(drawing));
    return { ok: true, bundle, bytes: new TextEncoder().encode(bundle).length };
  } catch (thrown: unknown) {
    // What the reader wrote threw while it ran. That is something to say about
    // this source rather than a broken playground, so it goes back the way a
    // compiler's complaint does.
    return { ok: false, complaints: [complaintOf(thrown)] };
  }
}

/** Anything thrown, said the way a complaint is. */
function complaintOf(thrown: unknown): Complaint {
  return { message: String(thrown), start: 0, length: 0 };
}

function flattened(one: ts.Diagnostic): Complaint {
  return {
    message:
      typeof one.messageText === "string"
        ? one.messageText
        : one.messageText.messageText,
    start: one.start ?? 0,
    length: one.length ?? 0,
  };
}

function run(js: string): unknown {
  const exports: Record<string, unknown> = {};
  const require = (specifier: string): unknown => {
    const held = MODULES[specifier];
    if (held === undefined) {
      throw new Error(
        `the playground answers for \`@backtickjs/core\` and` +
          ` \`@backtickjs/web-sdk\` and nothing else,` +
          ` and this asked for \`${specifier}\``,
      );
    }
    return held;
  };
  new Function("require", "exports", "module", js)(require, exports, {
    exports,
  });
  return exports;
}

// What `export default` may hold: a drawing, or a component to run for one.
// Both, because both read naturally — `export default <Screen />` alongside
// `export default Screen` — and a component runs on the host either way. It is
// also what every fixture under `e2e/test/fixtures/valid` already spells, so a
// reader who has read one is writing what they saw.
async function drawingOf(module: unknown): Promise<never> {
  const held = (module as { default?: unknown }).default;
  if (held === undefined) {
    throw new Error(
      "nothing to draw: the playground draws what a file `export default`s",
    );
  }
  const drawing = typeof held === "function" ? await held({}) : held;
  return drawing as never;
}
