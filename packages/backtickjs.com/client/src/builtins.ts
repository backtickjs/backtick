import type { Diagnostic, SiteBuiltins } from "@backtickjs.com/schema";
import type ts from "typescript";

const self = document.currentScript as HTMLScriptElement;
const compilerUrl = self.dataset["compiler"] as string;

type Compile = (
  fileName: string,
  sourceText: string,
  addDiagnostic?: (diagnostic: ts.Diagnostic) => void,
) => string;

// What the parser leaves on the window, which is how a classic script hands
// anything over. Not there until it has loaded — reading it early is a
// `ReferenceError`, which is the right thing to say about a page that asked for
// a compiler and got something else.
declare const BACKTICK_COMPILER: { browserTranspile: Compile };

let compile: Promise<Compile> | undefined;

/**
 * A script tag rather than an import: it is three and a half megabytes, and a
 * page that is only read should never pay for it. Same origin, so the policy
 * that already allows the client allows this too.
 */
function fetchCompile(): Promise<Compile> {
  compile ??= new Promise<void>((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = compilerUrl;
    tag.addEventListener("load", () => resolve());
    tag.addEventListener("error", () =>
      reject(new Error(`backtick: error loading the compiler`)),
    );
    document.head.append(tag);
  }).then(() => BACKTICK_COMPILER.browserTranspile);
  return compile;
}

function normalizeDiagnostic(diagnostic: ts.Diagnostic): Diagnostic {
  return {
    message:
      typeof diagnostic.messageText === "string"
        ? diagnostic.messageText
        : diagnostic.messageText.messageText,
    start: diagnostic.start ?? null,
    length: diagnostic.length ?? null,
  };
}

export const builtins: SiteBuiltins = {
  compile: (fileName, sourceText, onJavascript, onDiagnostics) => {
    void fetchCompile().then(
      (compile) => {
        const diagnostics: ts.Diagnostic[] = [];
        const javascript = compile(fileName, sourceText, (one) =>
          diagnostics.push(one),
        );
        if (diagnostics.length > 0) {
          onDiagnostics(diagnostics.map(normalizeDiagnostic));
          return;
        }
        onJavascript(javascript);
      },
      (error: unknown) => {
        onDiagnostics([{ message: String(error), start: null, length: null }]);
      },
    );
  },
  evalAndBundle: () => {
    throw new Error("backtick: nothing here runs what was compiled yet");
  },
};
