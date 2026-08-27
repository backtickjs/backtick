import { compile, type Compiled, type Host } from "./compile.js";

/**
 * The compiler, as a document that answers questions.
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

// Written by the document, because the document is what knows where the build
// put things.
declare const BACKTICK_TYPESCRIPT_URL: string;

// A megabyte, asked for on the first compile rather than on load: a reader who
// opens the page and types nothing pays for the harness and not for the parser.
//
// A classic script for the reason above, and because that is what TypeScript
// ships anyway: `lib/typescript.js` closes over a `module` shim and leaves `ts`
// on the global. Every attempt to make it an ES module instead goes through its
// `browser` field, which maps `os` to nothing, and it dies reading
// `os.platform()` before it has compiled anything.
let loading: Promise<typeof import("typescript")> | undefined;

function typescript(): Promise<typeof import("typescript")> {
  loading ??= new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = BACKTICK_TYPESCRIPT_URL;
    tag.onload = () => {
      const held = (globalThis as { ts?: typeof import("typescript") }).ts;
      if (held === undefined) {
        reject(new Error("the parser loaded and left no `ts` behind"));
        return;
      }
      resolve(held);
    };
    tag.onerror = () => reject(new Error("the parser did not load"));
    document.head.append(tag);
  });
  return loading;
}

export async function host(): Promise<Host> {
  return { typescript: await typescript() };
}

export interface Asked {
  readonly id: number;
  readonly source: string;
}

export interface Answered {
  readonly id: number;
  readonly result: Compiled;
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

async function answer(source: string): Promise<Compiled> {
  try {
    return await compile(source, await host());
  } catch (thrown: unknown) {
    // What the reader wrote threw while it ran, or the parser never arrived.
    // Either way it is something to say about this source rather than a broken
    // frame, so it goes back the way a compiler's complaint does.
    return {
      ok: false,
      complaints: [{ message: String(thrown), start: 0, length: 0 }],
    };
  }
}

// Nothing asks for this and it is not part of the protocol — it is here so that
// "the frame never answered" and "the frame never ran" are different sentences
// on the page next door.
parent.postMessage({ backtick: "ready" } satisfies Ready, "*");
