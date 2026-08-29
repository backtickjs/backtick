import { built, type Built } from "./bundle.js";

/**
 * The frame, as a document that answers questions.
 *
 * It is the one document on this site that runs what somebody else wrote, which
 * is why it is a document and not a module: a frame carrying `sandbox` without
 * `allow-same-origin` has an origin of its own, and nothing it evaluates can
 * reach the page that asked. The asking page keeps `default-src 'self'` and
 * never evaluates anything, because what comes back over `postMessage` is JSON
 * — the same thing that would have come back over a network.
 *
 * Everything here loads as a classic script, and that is forced rather than
 * chosen. An opaque origin makes every module script a cross-origin fetch, and a
 * module script is CORS-checked where a classic script is not — so on a host
 * that sets no headers, which is every static host, a `<script type="module">`
 * in this frame silently never runs.
 */

// The compiler, which is the other script this document loads. Named by the
// build rather than imported, because it is bundled separately: it carries a
// parser, and importing it here would put a second copy of one in this bundle.
// What it resolves to is the name that package puts itself on.
declare const BACKTICK_COMPILER: typeof import("@backtickjs/browser-compiler");

export interface Asked {
  readonly id: number;
  readonly source: string;
}

export interface Answered {
  readonly id: number;
  readonly result: Built;
}

/** Said once, so a page that gets no answer can tell why it got none. */
export interface Ready {
  readonly backtick: "ready";
}

// One question, one answer carrying the id of what it answers. The frame keeps
// nothing between two of them, so there is no protocol here beyond that.
addEventListener("message", (event: MessageEvent) => {
  const asked = event.data as Partial<Asked> | null;
  if (typeof asked?.id !== "number" || typeof asked.source !== "string") {
    return;
  }
  const { id, source } = asked;
  void answer(source)
    .then((result): Answered => ({ id, result }))
    .then((reply) => {
      // A sandboxed frame has no origin to name and the asker is on one this
      // frame cannot name either, so `*` is the only target there is. It carries
      // nothing the asker did not ask for.
      (event.source as WindowProxy | null)?.postMessage(reply, "*");
    });
});

function answer(source: string): Promise<Built> {
  return built(BACKTICK_COMPILER.browserTranspile, source);
}

// Nothing asks for this and it is not part of the protocol — it is here so that
// "the frame never answered" and "the frame never ran" are different sentences
// on the page next door.
parent.postMessage({ backtick: "ready" } satisfies Ready, "*");
