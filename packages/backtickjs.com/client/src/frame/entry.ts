import { built, type Diagnostic } from "../bundleOf.js";

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
declare const BACKTICK_COMPILER: typeof import("../browserTranspile.js");

export type Asked = {
  readonly id: number;
  readonly source: string;
};

/**
 * One answer, flat.
 *
 * Flat because the page that reads it is a bundle: narrowing a union is a thing
 * the language would rather not do, and every field here is a value a script can
 * read without asking which shape it got. An empty `diagnostics` is a bundle.
 */
export type Answered = {
  readonly id: number;
  readonly bundle: string;
  readonly diagnostics: Diagnostic[];
};

// One question, one answer carrying the id of what it answers. The frame keeps
// nothing between two of them, so there is no protocol here beyond that.
addEventListener("message", (event: MessageEvent) => {
  const asked = event.data as Partial<Asked> | null;
  if (typeof asked?.id !== "number" || typeof asked.source !== "string") {
    return;
  }
  const { id, source } = asked;
  void built(BACKTICK_COMPILER.browserTranspile, source).then((result) => {
    const reply: Answered = result.ok
      ? { id, bundle: result.bundle, diagnostics: [] }
      : { id, bundle: "", diagnostics: [...result.diagnostics] };
    // A sandboxed frame has no origin to name and the asker is on one this
    // frame cannot name either, so `*` is the only target there is. It carries
    // nothing the asker did not ask for.
    (event.source as WindowProxy | null)?.postMessage(reply, "*");
  });
});
