import type { Diagnostic, SiteBuiltins } from "@backtickjs.com/schema";
import type { browserTranspile } from "@backtickjs.com/compiler";
import type ts from "typescript";

// Where the page said the parser is. Read while the client is running, which is
// the only moment a script can ask which one it is.
const at = (document.currentScript as HTMLScriptElement | null)?.dataset[
  "compiler"
];

type Transpile = typeof browserTranspile;

let asked: Promise<Transpile> | undefined;

/**
 * The parser, fetched the first time somebody types and held after that.
 *
 * A script tag rather than an import: it is three and a half megabytes, and a
 * page that is only read should never pay for it. Same origin, so the policy
 * that already allows the client allows this too.
 */
function parser(): Promise<Transpile> {
  asked ??= new Promise((resolve, reject) => {
    if (at === undefined) {
      reject(
        new Error("backtick: this page did not say where the compiler is"),
      );
      return;
    }
    const tag = document.createElement("script");
    tag.src = at;
    tag.addEventListener("load", () => {
      const held = (
        window as unknown as {
          BACKTICK_COMPILER?: { browserTranspile: Transpile };
        }
      ).BACKTICK_COMPILER;
      if (held === undefined) {
        reject(new Error(`backtick: ${at} left no compiler behind`));
        return;
      }
      resolve(held.browserTranspile);
    });
    tag.addEventListener("error", () =>
      reject(new Error(`backtick: no compiler at ${at}`)),
    );
    document.head.append(tag);
  });
  return asked;
}

/** Anything thrown, said the way a diagnostic is, pointing nowhere. */
function thrownAs(thrown: unknown): Diagnostic {
  return { message: String(thrown), start: null, length: null };
}

/**
 * What this site answers for, beside what the web does.
 *
 * `compile` is text in and text out, and nothing about it needs `eval` — which
 * is why it is the half that can be answered from the page itself.
 *
 * `evalAndBundle` is the half that cannot: running what somebody wrote is
 * `new Function`, and a content policy is per-document, so a document of its
 * own is what makes it possible at all.
 *
 * `SiteBuiltins` and not `Builtins`, which is every name in scope: a name added
 * to this site's schema stops this file compiling until it is answered.
 */
export const builtins: SiteBuiltins = {
  compile: (fileName, sourceText, onJavascript, onDiagnostics) => {
    void parser().then(
      (transpile) => {
        const diagnostics: ts.Diagnostic[] = [];
        let javascript: string;
        try {
          javascript = transpile(fileName, sourceText, (one) =>
            diagnostics.push(one),
          );
        } catch (thrown: unknown) {
          // The parser threw on its way in. Said the way a diagnostic is,
          // because to whoever asked it is the same thing.
          onDiagnostics([thrownAs(thrown)]);
          return;
        }
        // A file the compiler had something to say about is not compiled,
        // whatever came back: the emitted text for one is a guess at what was
        // meant.
        if (diagnostics.length > 0) {
          // Flattened on the way out: what crosses is data, and a
          // `ts.Diagnostic` is a graph with a source file hanging off it.
          onDiagnostics(
            diagnostics.map((one) => ({
              message:
                typeof one.messageText === "string"
                  ? one.messageText
                  : one.messageText.messageText,
              start: one.start ?? 0,
              length: one.length ?? 0,
            })),
          );
          return;
        }
        onJavascript(javascript);
      },
      (thrown: unknown) => onDiagnostics([thrownAs(thrown)]),
    );
  },
  evalAndBundle: () => {
    throw new Error("backtick: nothing here runs what was compiled yet");
  },
};
