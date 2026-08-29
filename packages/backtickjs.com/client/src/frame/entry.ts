import { bundled, compiled, type Diagnostic } from "../bundleOf.js";

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

/**
 * One question. `source` asks for javascript; `javascript` asks for a bundle.
 *
 * Two questions rather than one because they answer different things and fail
 * in different ways — and what passes between them is a string, so the frame
 * holds nothing between two of them.
 */
export type Asked = {
  readonly id: number;
  readonly source?: string;
  readonly javascript?: string;
};

/**
 * One answer, flat.
 *
 * Flat because the page that reads it is a bundle: narrowing a union is a thing
 * the language would rather not do, and every field here is a value a script can
 * read without asking which shape it got. An empty `diagnostics` means the
 * `answer` is the one that was asked for.
 */
export type Answered = {
  readonly id: number;
  readonly answer: string;
  readonly diagnostics: Diagnostic[];
};

// The frame keeps nothing between two questions, so there is no protocol here
// beyond an id and which field was filled in.
addEventListener("message", (event: MessageEvent) => {
  const asked = event.data as Partial<Asked> | null;
  if (typeof asked?.id !== "number") {
    return;
  }
  const { id } = asked;
  const reply = (answered: Answered): void => {
    // A sandboxed frame has no origin to name and the asker is on one this
    // frame cannot name either, so `*` is the only target there is. It carries
    // nothing the asker did not ask for.
    (event.source as WindowProxy | null)?.postMessage(answered, "*");
  };

  if (typeof asked.source === "string") {
    const result = compiled(BACKTICK_COMPILER.browserTranspile, asked.source);
    reply(
      result.ok
        ? { id, answer: result.javascript, diagnostics: [] }
        : { id, answer: "", diagnostics: [...result.diagnostics] },
    );
    return;
  }
  if (typeof asked.javascript === "string") {
    void bundled(asked.javascript).then((result) => {
      reply(
        result.ok
          ? { id, answer: result.bundle, diagnostics: [] }
          : { id, answer: "", diagnostics: [...result.diagnostics] },
      );
    });
  }
});
