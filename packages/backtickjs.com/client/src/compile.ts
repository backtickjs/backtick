import type { Diagnostic } from "./bundleOf.js";
import type { Answered, Asked } from "./frame/entry.js";

/**
 * How this client answers `compile`.
 *
 * The schema says nothing about any of this, and that is the point: what it
 * declares is a name and two callbacks, and a frame in the corner is only how
 * this client happens to answer. A worker, or a round trip to a server, would
 * answer the same name.
 *
 * A frame because running what somebody wrote is `new Function`, which a page
 * saying `default-src 'self'` may not do — and a content policy is per-document,
 * so a document is the unit that can be allowed to evaluate while the page
 * around it is not.
 */

// Written in by the build, because where the frame is served from is one string
// this and the document that publishes it both have to agree about.
declare const BACKTICK_FRAME_URL: string;

let opening: Promise<Window> | undefined;

/** The frame, and the promise that it is there rather than merely asked for. */
function frame(): Promise<Window> {
  opening ??= new Promise((resolve, reject) => {
    const held = document.createElement("iframe");
    // No `allow-same-origin`: what runs in there is on an origin of its own and
    // reaches nothing of this page's.
    held.sandbox.add("allow-scripts");
    held.style.cssText = "width: 0; height: 0; border: 0; position: absolute";
    held.addEventListener("load", () => {
      const window = held.contentWindow;
      if (window === null) {
        reject(new Error("backtick: the compiler started and then went away"));
        return;
      }
      resolve(window);
    });
    held.src = BACKTICK_FRAME_URL;
    document.body.append(held);
  });
  return opening;
}

// One frame for the page, however many things ask: a second would be a second
// three and a half megabytes for the same answers. It arrives on the first
// question and not before, so a reader who asks nothing pays nothing.
let asked = 0;

export function compile(
  source: string,
  onBundle: (bundle: string) => void,
  onDiagnostics: (diagnostics: Diagnostic[]) => void,
): void {
  const id = ++asked;
  void frame().then((window) => {
    const listen = (event: MessageEvent): void => {
      const answered = event.data as Partial<Answered> | null;
      if (answered?.id !== id || answered.diagnostics === undefined) {
        return;
      }
      removeEventListener("message", listen);
      if (answered.diagnostics.length > 0) {
        onDiagnostics(answered.diagnostics);
        return;
      }
      onBundle(answered.bundle ?? "");
    };
    addEventListener("message", listen);
    window.postMessage({ id, source } satisfies Asked, "*");
  });
}
