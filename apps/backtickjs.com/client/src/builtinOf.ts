import type { Diagnostic, SiteBuiltins } from "@backtickjs.com/schema";
import type { BacktickElement, Bundle, ClientValue } from "@backtickjs/core";
import type ts from "typescript";

const currentScript = document.currentScript as HTMLScriptElement;
const compilerUrl = currentScript.dataset["compiler"] as string;
const sandboxUrl = currentScript.dataset["sandbox"] as string;

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

let sandbox: Promise<Window> | undefined;
let inside: Window | null = null;

/**
 * A document of its own, because a content policy is per-document and the one
 * here forbids `eval`. Sandboxed without `allow-same-origin`, so what runs in
 * there has an origin of its own and a message is the only way across.
 */
function fetchSandbox(): Promise<Window> {
  sandbox ??= new Promise<Window>((resolve, reject) => {
    const tag = document.createElement("iframe");
    tag.setAttribute("sandbox", "allow-scripts");
    tag.setAttribute("aria-hidden", "true");
    tag.style.cssText = "position: absolute; width: 0; height: 0; border: 0";
    tag.addEventListener("load", () => {
      inside = tag.contentWindow;
      resolve(inside as Window);
    });
    tag.addEventListener("error", () =>
      reject(new Error(`backtick: error loading the sandbox`)),
    );
    tag.src = sandboxUrl;
    document.body.append(tag);
  });
  return sandbox;
}

let asked = 0;
const waiting = new Map<
  number,
  {
    onBundle: (bundle: Bundle<BacktickElement>) => void;
    onDiagnostics: (diagnostics: Diagnostic[]) => void;
  }
>();

// Only what the sandbox says: a message from anywhere else is somebody else's.
window.addEventListener("message", (event: MessageEvent) => {
  if (event.source !== inside) {
    return;
  }
  const answer = event.data as {
    id: number;
    bundle?: string;
    message?: string;
  };
  const back = waiting.get(answer.id);
  if (back === undefined) {
    return;
  }
  waiting.delete(answer.id);
  if (typeof answer.bundle === "string") {
    back.onBundle(JSON.parse(answer.bundle));
    return;
  }
  back.onDiagnostics([
    { message: String(answer.message), start: null, length: null },
  ]);
});

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

// This site's names, answered the way the client answers the web's: a `case`
// per name, each checked against the contract, and nothing an object would
// answer for besides.
export function builtinOf(name: string): ClientValue {
  const known = name as keyof SiteBuiltins;
  switch (known) {
    case "compile":
      return ((fileName, sourceText, onJavascript, onDiagnostics) => {
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
            onDiagnostics([
              { message: String(error), start: null, length: null },
            ]);
          },
        );
      }) satisfies SiteBuiltins[typeof known];

    case "bundle":
      return ((javascript, onBundle, onDiagnostics) => {
        const id = ++asked;
        waiting.set(id, { onBundle, onDiagnostics });
        void fetchSandbox().then(
          // `*` because the sandbox has an origin of its own and no name to give.
          (into) => into.postMessage({ id, javascript }, "*"),
          (error: unknown) => {
            waiting.delete(id);
            onDiagnostics([
              { message: String(error), start: null, length: null },
            ]);
          },
        );
      }) satisfies SiteBuiltins[typeof known];

    default:
      known satisfies never;
      return undefined;
  }
}
