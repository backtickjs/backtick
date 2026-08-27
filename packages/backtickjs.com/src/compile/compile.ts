import { transform } from "@backtickjs/compiler";
import * as core from "@backtickjs/core";
import * as jsxRuntime from "@backtickjs/web-sdk/jsx-runtime";

/** Where a complaint sits in what the reader wrote, and what it says. */
export interface Complaint {
  readonly message: string;
  readonly start: number;
  readonly length: number;
}

export type Compiled =
  | { readonly ok: true; readonly wire: string; readonly bytes: number }
  | { readonly ok: false; readonly complaints: readonly Complaint[] };

/**
 * Turning what somebody wrote into a bundle, without saying where.
 *
 * One thing is handed in, and it is the only thing a browser and a build
 * genuinely differ about: a parser, which is a script tag in one and an import
 * in the other. Everything past that — both passes, the module table, the way a
 * module is run — is written once here, so the bytes a build computes and the
 * bytes a browser computes are comparable rather than merely similar.
 */
export interface Host {
  readonly typescript: typeof import("typescript");
}

// The name a source is compiled under. It reaches the reader twice — in a
// complaint, and in the `filePath` the metadata carries — so it is a name that
// reads as one rather than a path that happens to be true.
const FILE = "playground.tsx";

// What a reader's imports may reach. Held rather than resolved, so what their
// code imports is the module this file imported: two copies of `cs-runtime` on
// one page would disagree about what a drawing is, and the disagreement would
// surface as a bundle that is subtly wrong rather than as an error.
// Imported rather than awaited, because the frame is bundled as one classic
// script and a top-level await has no format to be written in there.
const MODULES: Readonly<Record<string, unknown>> = {
  "@backtickjs/core": core,
  "@backtickjs/web-sdk/jsx-runtime": jsxRuntime,
};

export async function compile(source: string, host: Host): Promise<Compiled> {
  const ts = host.typescript;
  const raw: import("typescript").Diagnostic[] = [];

  // Two passes, and the second is not a formality.
  //
  // The first runs the transform and has to keep the reader's imports verbatim:
  // without that TypeScript elides `state`, because the source it read does not
  // appear to use it, while the metadata the transform wrote still names it.
  //
  // The second reads plain JavaScript that does use it, and writes the module
  // out as `require`/`exports`. It is what makes running the result a function
  // call rather than a module load — no import map, no blob, and nothing that
  // needs an origin, which is the whole reason the frame this runs in can be
  // sandboxed at all.
  const { outputText } = ts.transpileModule(source, {
    fileName: FILE,
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: "@backtickjs/web-sdk",
      verbatimModuleSyntax: true,
    },
    transformers: { before: [transform(ts, (one) => raw.push(one))] },
  });

  // A file the compiler complained about is not compiled, whatever else came
  // back: the emitted text for one is a guess about what was meant.
  if (raw.length > 0) {
    return { ok: false, complaints: raw.map(complaintOf) };
  }

  const { outputText: script } = ts.transpileModule(outputText, {
    fileName: "playground.js",
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.CommonJS,
    },
  });

  const drawing = await drawingOf(run(script));
  const wire = JSON.stringify(await core.bundler.run(drawing));
  return { ok: true, wire, bytes: new TextEncoder().encode(wire).length };
}

function complaintOf(one: import("typescript").Diagnostic): Complaint {
  return {
    message:
      typeof one.messageText === "string"
        ? one.messageText
        : one.messageText.messageText,
    start: one.start ?? 0,
    length: one.length ?? 0,
  };
}

function run(script: string): unknown {
  const exports: Record<string, unknown> = {};
  const require = (specifier: string): unknown => {
    const held = MODULES[specifier];
    if (held === undefined) {
      throw new Error(
        `the playground answers for \`@backtickjs/core\` and nothing else,` +
          ` and this asked for \`${specifier}\``,
      );
    }
    return held;
  };
  new Function("require", "exports", "module", script)(require, exports, {
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
