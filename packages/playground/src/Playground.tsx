import { browserTranspile } from "@backtickjs/browser-compiler";
import { For, cs, state } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { window as win } from "@backtickjs/web-sdk";
import type { HtmlNode, MessageEvent, Window } from "@backtickjs/web-sdk";
import type { Answered } from "./frame/entry.js";
import { built, sizeOf } from "./frame/bundle.js";
import { FRAME_URL } from "./static.js";
import {
  HEAD_ROW,
  DEVICE,
  EDITOR,
  HEAD,
  INK,
  ISLAND,
  PANEL,
  SCREEN,
  TAB_ON,
  TAB_OFF,
  BUNDLE,
} from "./style.js";
import { line, mono, muted } from "./theme.js";

// The editor beside what it draws, which is the pairing that matters: a reader
// changes a line and looks right, not down.
//
// Flex rather than a grid of columns, because the two want different shares of
// the room and neither may have a media query to say so — the bases add up to
// less than the page until they don't, and then they wrap.
const SPLIT = "display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch";

// Both are capped, and the pair is centred in what is left. The code is
// formatted to 80 columns, so an editor wider than that is empty gutter, and
// the bezel only ever holds a 280px card.
const WRITING = "flex: 1 1 620px; min-width: 0; max-width: 760px";
const DRAWING = "flex: 1 1 380px; min-width: 0; max-width: 460px";

// The editor is two elements in one place: a `<pre>` holding the text and a
// transparent `<textarea>` over it. They share `EDITOR`, so the two can only
// ever line up — a font or a padding written twice is a caret that drifts.
const WELL = "display: grid; min-width: 0";

// In the editor's own header, where there was empty room and a reader is
// already looking. It says what is happening, which is only worth reading
// while something is.
const STATUS =
  `margin: 0; font-family: ${mono}; font-size: 11.5px;` +
  ` letter-spacing: 0.04em; color: ${muted}`;

const COMPLAINTS = "display: grid; gap: 6px; margin-top: 12px";

const COMPLAINT =
  "display: block; width: 100%; text-align: left;" +
  ` padding: 10px 12px; border-radius: 8px; border: 1px solid ${line};` +
  " background: transparent; color: inherit; font: inherit;" +
  " font-size: 13.5px; line-height: 1.5";

// The frame is a corner of the page rather than a thing to look at: it holds
// the compiler and answers questions, and nothing it draws is ever seen.
const CORNER = "width: 0; height: 0; border: 0; position: absolute";

// Long enough that a reader who is still typing is not compiling on every key,
// short enough that stopping feels like it answered.
const SETTLE = 250;

/**
 * The playground: an editor, the bytes it makes, and the screen those bytes
 * draw.
 *
 * One bundle and nothing else. What a reader types is state, what the state
 * compiles to is state, and every part of this — the colouring under the text,
 * which of the two views is up, where the text is scrolled — is drawn from it.
 * There is no script beside this one, no element to find by id, and nothing
 * that reaches into what was drawn: a handler is handed its own element, and
 * everything else it needs it already holds.
 *
 * The compiler is a frame in the corner. It is the one thing that cannot be
 * state, because running what somebody wrote needs an origin this page will not
 * give it — so it is drawn like anything else, told what to compile with
 * `postMessage`, and answers the same way.
 */
// The return type written out rather than inferred: what `cs` answers is named
// in a schema this package does not depend on, and a declaration naming it is
// one a consumer cannot resolve. `core` is the surface, so it says `core`.
export async function Playground({
  example,
}: {
  example: string;
}): Promise<Client<HtmlNode>> {
  // Compiled while the bundle is built, by the same transpiler the frame in the
  // corner runs on a keystroke. It is why a reader who only reads never asks for
  // a compiler, and why the page draws something rather than nothing before the
  // megabyte behind the editor has been thought about.
  const prepared = await built(browserTranspile, example);
  const firstBundle = prepared.ok ? prepared.bundle : "";
  const firstSize = prepared.ok ? sizeOf(prepared.bytes) : "";

  return cs`{
    const source = $state($example);
    const bundle = $state($firstBundle);
    const sized = $state($firstSize);
    const complaints = $state($noComplaints);
    const status = $state("");
    const showing = $state("screen");
    const down = $state(0);
    const across = $state(0);

    // The frame's window, once it has one. Held rather than looked up: the load
    // handler is given the element it fired on, and this is what it kept.
    const frame = $state($noWindow);
    const asked = $state(0);
    const settling = $state(0);

    // Whether a compiler has been asked for at all. False until a reader types,
    // because everything before that is bytes the build already computed — and
    // the compiler is three and a half megabytes that a reader who only reads
    // should never pay for.
    const wanted = $state(false);

    return (
      <div style={$SPLIT}>
        <div style={$PANEL + "; " + $WRITING}>
          <div style={$HEAD_ROW}>
            <p style={$HEAD}>{"01 · TRY EDITING"}</p>
            <p style={$STATUS}>{status.read()}</p>
          </div>

          <div style={$WELL}>
            {/* Under the text and moved with it: what the textarea scrolls, this
                is translated by, so the two never come apart. */}
            <pre
              style={
                $INK +
                "; transform: translate(" +
                (0 - across.read()) +
                "px, " +
                (0 - down.read()) +
                "px)"
              }
              aria-hidden="true"
            >
              <code>{source.read() + "\n"}</code>
            </pre>

            <textarea
              style={$EDITOR}
              spellcheck="false"
              autocapitalize="off"
              autocorrect="off"
              wrap="off"
              rows={20}
              onscroll={(e) => {
                down.write(e.currentTarget.scrollTop);
                across.write(e.currentTarget.scrollLeft);
              }}
              oninput={(e) => {
                source.write(e.currentTarget.value);
                wanted.write(true);
                clearTimeout(settling.read());
                settling.write(
                  setTimeout(() => {
                    const held = frame.read();
                    if (held !== null) {
                      const id = asked.read() + 1;
                      asked.write(id);
                      status.write("compiling…");
                      held.postMessage(
                        { id: id, source: source.read() },
                        "*",
                      );
                    }
                  }, $SETTLE),
                );
              }}
            >
              {/* The example, once. A textarea's value is its text content, so
                  drawing this from state would rewrite the node a reader is
                  typing into on every keystroke, and the caret goes wherever the
                  browser puts it after that. What they type is theirs; the state
                  follows it rather than the other way round. */}
              {$example}
            </textarea>
          </div>

          <div style={$COMPLAINTS}>
            <For each={complaints.read()}>
              {(said: string) => <p style={$COMPLAINT}>{said}</p>}
            </For>
          </div>
        </div>

        <div style={$PANEL + "; " + $DRAWING}>
          <div style={$HEAD_ROW}>
            <p style={$HEAD}>{"02 · SEE IT REDRAW"}</p>
            {/* Two views of one thing, so they share a slot. Which is up is a
                value here rather than a style somebody reaches in and sets. */}
            <div>
              <button
                style={showing.read() === "screen" ? $TAB_ON : $TAB_OFF}
                onclick={() => showing.write("screen")}
              >
                {"PREVIEW"}
              </button>
              <button
                style={showing.read() === "bundle" ? $TAB_ON : $TAB_OFF}
                onclick={() => showing.write("bundle")}
              >
                {"BUNDLE" + sized.read()}
              </button>
            </div>
          </div>

          <div
            style={
              $DEVICE +
              "; display: " +
              (showing.read() === "screen" ? "grid" : "none")
            }
          >
            <div style={$SCREEN}>
              <backtick-renderer bundle={bundle.read()} />
            </div>
            <div style={$ISLAND} />
          </div>

          <pre
            style={
              $BUNDLE +
              "; display: " +
              (showing.read() === "bundle" ? "block" : "none")
            }
          >
            {bundle.read()}
          </pre>
        </div>

        {/* The compiler, in the corner, once somebody has typed. It says it is
            ready and then answers what it is asked; the listener goes up when it
            loads, because a script that returns a value may not do that on its
            own. Whatever was typed while it was arriving is asked for there
            too, since the keystroke that summoned it came and went first. */}
        {wanted.read() ? (
            <iframe
            style={$CORNER}
            sandbox="allow-scripts"
            src={$FRAME_URL}
            onload={(e) => {
              const held = e.currentTarget.contentWindow;
              frame.write(held);
              $win.addEventListener("message", (m: MessageEvent<Answered>) => {
                if (m.data.id === asked.read()) {
                  status.write("");
                  sized.write(m.data.size);
                  bundle.write(m.data.bundle);
                  complaints.write(m.data.complaints);
                }
              });
              if (held !== null) {
                const id = asked.read() + 1;
                asked.write(id);
                status.write("compiling\u2026");
                held.postMessage({ id: id, source: source.read() }, "*");
              }
            }}
          />
        ) : null}
      </div>
    );
  }`;
}

// Spliced rather than written, because an empty one of each still has to have a
// type the script can read a member off.
const noComplaints: string[] = [];
const noWindow: Window | null = null;
