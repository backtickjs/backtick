import type { Answered, Asked, Ready } from "../compile/entry.js";
import type { Compiled, Complaint } from "../compile/compile.js";
import { highlight } from "./highlight.js";
import { PALETTE } from "./style.js";
import { line, muted } from "../theme.js";

/**
 * The wiring the bundle cannot do yet.
 *
 * Every handler in the schema is `() => void`, so a script drawn by the bundle
 * can be told a button was pressed and cannot be told what is in a text field.
 * Until that changes this page reads the editor from outside its own drawing —
 * which is the ugly half of the arrangement, and the half with a plan against it.
 */

const FRAME = "/compile/";
const SETTLE = 350;

/**
 * Every example, already compiled — the build ran the same `compile` this frame
 * runs, so a reader who only reads never asks for a compiler. Written in by the
 * build rather than imported, so the sources are in this file once instead of
 * once here and once in the bundle.
 */
declare const BACKTICK_EXAMPLE: string;

interface Prepared {
  readonly source: string;
  readonly result: Compiled;
}

const EXAMPLE = JSON.parse(BACKTICK_EXAMPLE) as Prepared;

function node<T extends HTMLElement>(id: string): T {
  const held = document.getElementById(id);
  if (held === null) {
    throw new Error(`backtick: the page drew no \`${id}\``);
  }
  return held as T;
}

const source = node<HTMLTextAreaElement>("play-source");
const ink = node("play-ink");
const status = node("play-status");
const complaints = node("play-complaints");
const wire = node("play-wire");
const wireHead = node("play-wire-head");
const screen = node("play-screen");

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

// The bundle, drawn by the client this page was drawn by. A fresh element each
// time: `connectedCallback` is what draws, so what redraws is a new one.
function draw(bundle: string): void {
  const held = document.createElement("script");
  held.type = "application/json";
  held.textContent = bundle.replaceAll("<", "\\u003c");
  screen.replaceChildren(held, document.createElement("backtick-bundle"));
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
  status.textContent =
    opening === undefined ? "fetching the compiler…" : "compiling…";
  const frame = await compiler();
  if (mine !== inFlight) {
    return;
  }
  status.textContent = "compiling…";
  const result = await ask(frame, source.value);
  // A keystroke landed while this was out. Its answer is the one that counts.
  if (mine !== inFlight) {
    return;
  }
  show(result);
}

/** What the three columns say about one answer, whoever computed it. */
function show(result: Compiled): void {
  if (result.ok) {
    complaints.replaceChildren();
    wire.textContent = result.wire;
    // The count lives here and only here. It is the same number the status line
    // used to carry, and a page saying it twice is a page saying it once badly.
    wireHead.textContent = `THE WIRE — ${result.bytes.toString()} BYTES`;
    status.textContent = "";
    draw(result.wire);
    return;
  }
  wire.textContent = "";
  wireHead.textContent = "THE WIRE";
  screen.replaceChildren();
  complain(result.complaints);
  const count = result.complaints.length;
  status.textContent =
    count === 1 ? "1 complaint" : `${count.toString()} complaints`;
}

function start(): void {
  // What the bundle drew, normally. A `<textarea>`'s value is its text content,
  // which is a thing the drawing does rather than a prop it sets, so this is the
  // one place worth not assuming.
  if (source.value.trim() === "") {
    source.value = EXAMPLE.source;
  }
  paint();
  // The build's answer for what the bundle drew, which costs nothing to show.
  show(EXAMPLE.result);

  source.addEventListener("scroll", () => {
    ink.scrollTop = source.scrollTop;
    ink.scrollLeft = source.scrollLeft;
  });

  let settling: ReturnType<typeof setTimeout> | undefined;
  source.addEventListener("input", () => {
    paint();
    clearTimeout(settling);
    settling = setTimeout(() => void compile(), SETTLE);
  });
}

start();
