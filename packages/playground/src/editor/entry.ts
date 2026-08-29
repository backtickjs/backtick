import type { Built, Complaint } from "../frame/bundle.js";
import type { Answered, Asked, Ready } from "../frame/entry.js";
import { highlight } from "../highlight.js";
import { PALETTE, SHOWN, TAB_OFF, TAB_ON } from "../style.js";
import { line, muted } from "../theme.js";

/**
 * The wiring the bundle cannot do yet.
 *
 * Every handler in the schema is `() => void`, so a script drawn by the bundle
 * can be told a button was pressed and cannot be told what is in a text field.
 * Until that changes this page reads the editor from outside its own drawing —
 * which is the ugly half of the arrangement, and the half with a plan against it.
 */

// Written in by the build, because where these files are served from is one
// string this package and the page it is on both have to agree about.
declare const BACKTICK_FRAME_URL: string;

const FRAME = BACKTICK_FRAME_URL;
const SETTLE = 350;

/**
 * How long "compiling…" stays up, whatever the compile took.
 *
 * A compile lands in about twenty milliseconds, which is faster than the eye
 * reads a word: cleared on arrival it would appear and vanish inside a frame,
 * which reads as a flicker rather than a state. The status is the only report a
 * compile gets now, so it is the one thing worth holding.
 *
 * What is held is the label, never the answer — that goes up the moment it
 * lands.
 */
const HOLD = 450;

/**
 * A size as a reader counts one.
 *
 * `KB`, never `Kb`: a lowercase `b` is a bit, and a bundle measured in those
 * would read eight times larger than it is. Divided by a thousand rather than
 * 1024, because that is what a browser means by the number beside a request.
 */
function size(count: number): string {
  return count < 1000
    ? `${count.toString()} B`
    : `${(count / 1000).toFixed(1)} KB`;
}

function rest(ms: number): Promise<void> {
  return ms <= 0
    ? Promise.resolve()
    : new Promise((wake) => setTimeout(wake, ms));
}

/**
 * One playground's example, already compiled, as the component drew it.
 *
 * Read out of the page rather than written into this script, which is what lets
 * the script be the same bytes on every page: the component ran the same
 * `compile` the frame runs and left the answer beside the editor, so a reader
 * who only reads never asks for a compiler.
 */
interface Prepared {
  readonly source: string;
  readonly result: Built;
}

/** The frame, and the promise that it is running rather than merely loaded. */
function open(): Promise<Window> {
  return new Promise((resolve, reject) => {
    const frame = document.createElement("iframe");
    // No `allow-same-origin`: what runs in there is on an origin of its own and
    // reaches nothing of this page's.
    frame.sandbox.add("allow-scripts");
    frame.style.cssText = "width: 0; height: 0; border: 0; position: absolute";
    const timer = setTimeout(() => {
      removeEventListener("message", listen);
      reject(new Error("the compiler did not start"));
    }, 20_000);
    const listen = (event: MessageEvent): void => {
      if ((event.data as Partial<Ready> | null)?.backtick !== "ready") {
        return;
      }
      clearTimeout(timer);
      removeEventListener("message", listen);
      const held = frame.contentWindow;
      if (held === null) {
        reject(new Error("the compiler started and then went away"));
        return;
      }
      resolve(held);
    };
    addEventListener("message", listen);
    frame.src = FRAME;
    document.body.append(frame);
  });
}

let opening: Promise<Window> | undefined;

// The compiler arrives on the first thing the build could not answer, which is
// the first keystroke. Everything before that — the page, all three examples —
// is bytes somebody already computed.
function compiler(): Promise<Window> {
  opening ??= open();
  return opening;
}

let asked = 0;

function ask(frame: Window, text: string): Promise<Answered["result"]> {
  const id = ++asked;
  return new Promise((resolve) => {
    const listen = (event: MessageEvent): void => {
      const answered = event.data as Partial<Answered> | null;
      if (answered?.id !== id || answered.result === undefined) {
        return;
      }
      removeEventListener("message", listen);
      resolve(answered.result);
    };
    addEventListener("message", listen);
    frame.postMessage({ id, source: text } satisfies Asked, "*");
  });
}

/**
 * One playground, wired to the ids the page drew it under.
 *
 * Everything a playground keeps is in here, so a page may hold two of them and
 * neither reaches the other's textarea. What they do share is above: one
 * compiler frame, because a second would be a second megabyte for the same
 * answers.
 */
function wire(name: string, prepared: Prepared): void {
  function node<T extends HTMLElement>(part: string): T {
    const id = `${name}-${part}`;
    const held = document.getElementById(id);
    if (held === null) {
      throw new Error(`backtick: the page drew no \`${id}\``);
    }
    return held as T;
  }

  const source = node<HTMLTextAreaElement>("source");
  const ink = node("ink");
  const status = node("status");
  const complaints = node("complaints");
  const bundle = node("bundle");
  const screen = node("screen");
  const device = node("device");
  const tabs = {
    screen: node<HTMLButtonElement>("tab-screen"),
    bundle: node<HTMLButtonElement>("tab-bundle"),
  };

  /**
   * Which of the two views is up.
   *
   * The slot holds one of the two and `display` is what hides the other, so each
   * is shown again with the value it was drawn with — a `<pre>` is not a grid and
   * would come back laid out as one.
   *
   * The device is what is hidden on this side, never the screen inside it: the
   * screen is where a drawing lands, and hiding it would leave the phone standing
   * in the slot with nothing in it.
   */
  function view(which: "screen" | "bundle"): void {
    device.style.display = which === "screen" ? SHOWN["screen"]! : "none";
    bundle.style.display = which === "bundle" ? SHOWN["bundle"]! : "none";
    tabs.screen.style.cssText = which === "screen" ? TAB_ON : TAB_OFF;
    tabs.bundle.style.cssText = which === "bundle" ? TAB_ON : TAB_OFF;
  }

  /** Repaints the colouring under the text, and keeps it scrolled where the text is. */
  function paint(): void {
    const text = source.value;
    const code = document.createElement("code");
    for (const token of highlight(text)) {
      const span = document.createElement("span");
      span.textContent = text.slice(token.at, token.to);
      span.style.color = PALETTE[token.ink] ?? PALETTE["plain"]!;
      code.append(span);
    }
    // A trailing line the text has and the colouring does not is a last row the
    // caret can sit on with nothing painted behind it.
    code.append(document.createTextNode("\n"));
    ink.replaceChildren(code);
    ink.scrollTop = source.scrollTop;
    ink.scrollLeft = source.scrollLeft;
  }

  // The bundle, drawn by the client this page was drawn by. The same element
  // throughout: the bundle is a prop, so telling it a new one is what redraws.
  function draw(bundle: string): void {
    const held =
      screen.firstElementChild ??
      screen.appendChild(document.createElement("backtick-renderer"));
    held.setAttribute("bundle", bundle);
  }

  function complain(all: readonly Complaint[]): void {
    complaints.replaceChildren(
      ...all.map((one) => {
        const row = document.createElement("button");
        row.style.cssText =
          "display: block; width: 100%; text-align: left; cursor: pointer;" +
          ` padding: 10px 12px; border-radius: 8px; border: 1px solid ${line};` +
          " background: transparent; color: inherit; font: inherit;" +
          " font-size: 13.5px; line-height: 1.5";
        const where = document.createElement("span");
        where.style.cssText = `color: ${muted}`;
        where.textContent = `${lineOf(one.start)}  `;
        row.append(where, document.createTextNode(one.message));
        // The compiler answered with a span, so the least this can do is go there.
        row.onclick = () => {
          source.focus();
          source.setSelectionRange(one.start, one.start + one.length);
        };
        complaints.append(row);
        return row;
      }),
    );
  }

  function lineOf(at: number): string {
    const before = source.value.slice(0, at);
    const row = before.split("\n").length;
    return `line ${row.toString()}`;
  }

  let inFlight = 0;

  async function compile(): Promise<void> {
    const mine = ++inFlight;
    status.textContent = "compiling…";
    const frame = await compiler();
    if (mine !== inFlight) {
      return;
    }
    status.textContent = "compiling…";
    // Measured around the round trip, which is what a reader is waiting on —
    // the transform, the evaluation and the bundling all happen inside it.
    const at = performance.now();
    const result = await ask(frame, source.value);
    // A keystroke landed while this was out. Its answer is the one that counts.
    if (mine !== inFlight) {
      return;
    }
    // The answer goes up the moment it lands — a compile is about twenty
    // milliseconds and there is no reason to sit on it.
    show(result);
    // Only the status waits, and only long enough to be read.
    await rest(HOLD - (performance.now() - at));
    if (mine !== inFlight) {
      return;
    }
    status.textContent = settled(result);
  }

  /** What the three columns say about one answer, whoever computed it. */
  /**
   * The answer, put up. Says nothing about the status line: what happened is
   * shown the moment it lands, and what is *happening* is settled after the hold
   * — otherwise "compiling…" is replaced twenty milliseconds after it appears,
   * which reads as a flicker rather than a state.
   */
  function show(result: Built): void {
    if (result.ok) {
      complaints.replaceChildren();
      bundle.textContent = result.bundle;
      // The size rides on the tab that shows the bytes, which is where a reader
      // asks how many there are.
      tabs.bundle.textContent = `BUNDLE \u00b7 ${size(result.bytes)}`;
      draw(result.bundle);
      return;
    }
    bundle.textContent = "";
    tabs.bundle.textContent = "BUNDLE";
    screen.replaceChildren();
    complain(result.complaints);
  }

  /** What the status line reads once the hold is over. */
  function settled(result: Built): string {
    if (result.ok) {
      return "";
    }
    const count = result.complaints.length;
    return count === 1 ? "1 complaint" : `${count.toString()} complaints`;
  }

  // What the bundle drew, normally. A `<textarea>`'s value is its text content,
  // which is a thing the drawing does rather than a prop it sets, so this is the
  // one place worth not assuming.
  if (source.value.trim() === "") {
    source.value = prepared.source;
  }
  view("screen");
  tabs.screen.onclick = () => view("screen");
  tabs.bundle.onclick = () => view("bundle");

  paint();
  // The build's answer for what the bundle drew, which costs nothing to show.
  // Said as "at build" rather than a number: what the build took on somebody
  // else's machine is not what this reader is being told about.
  show(prepared.result);

  source.addEventListener("scroll", () => {
    ink.scrollTop = source.scrollTop;
    ink.scrollLeft = source.scrollLeft;
  });

  let settling: ReturnType<typeof setTimeout> | undefined;
  source.addEventListener("input", () => {
    paint();
    clearTimeout(settling);
    settling = setTimeout(() => {
      // A compiler that never arrives is the one failure with nothing else to
      // report it: the status would otherwise read "compiling…" for good.
      compile().catch((thrown: unknown) => {
        status.textContent = String(thrown);
      });
    }, SETTLE);
  });
}

/**
 * Every playground the page drew, wired once.
 *
 * A page holding two of them draws this script twice, and a second copy of the
 * same url runs a second time — so the first run does the work and marks the
 * window, and the second finds the mark and returns. Cheaper than asking the
 * component to draw a script only once, which it has no way to know.
 *
 * On a later task rather than now: the component draws this script inside the
 * tree it is drawing, so at the moment it runs the playground after it may not
 * be there yet.
 */
const MARK = "__backtickPlaygroundWired";

if (!(MARK in globalThis)) {
  (globalThis as Record<string, unknown>)[MARK] = true;
  setTimeout(() => {
    for (const held of document.querySelectorAll(
      'script[type="application/json"][id$="-example"]',
    )) {
      wire(
        held.id.slice(0, -"-example".length),
        JSON.parse(held.textContent ?? "{}") as Prepared,
      );
    }
  });
}
