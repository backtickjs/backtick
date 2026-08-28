import ts from "typescript";
import { compile } from "./compile/compile.js";
import { EDITOR_URL } from "./static.js";
import {
  HEAD_ROW,
  DEVICE,
  EDITOR,
  HEAD,
  INK,
  ISLAND,
  PANEL,
  SCREEN,
  TAB_OFF,
  BUNDLE,
} from "./style.js";
import { ink, line, mono, muted, paper } from "./theme.js";

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

// The editor is two elements in one place: a `<pre>` holding the colouring and a
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

/**
 * The playground: an editor, the bytes it makes, and the screen those bytes
 * draw.
 *
 * A bundle, like everything else on this page — it draws the chrome, the chips,
 * the columns and the editor itself. What it does not do is the wiring, which is
 * a script beside the bundle rather than part of it.
 *
 * Reading what the reader typed used to be why. It is not any more: a handler is
 * handed the event the DOM sends it, and `currentTarget` is the element it is
 * on, so `event.currentTarget.value` is a thing a script can say. What is left
 * is the rest of the arrangement — a sandboxed frame, a `postMessage` to it, a
 * parser fetched into it — none of which the language declares a way to reach,
 * and none of which it should reach by walking the host's own objects. Those
 * want to be builtins this target hands over, which is the unfinished half of
 * `docs/builtins.md`.
 *
 * The two right-hand columns are left for that script to fill. It has every
 * example already compiled — the build did that — so what it puts there on load
 * costs no compiler and no megabyte, and the reader decides when to spend one by
 * typing.
 */
/**
 * How many have been drawn, so each gets ids of its own.
 *
 * A counter rather than something the caller names: a page may hold two of
 * these and neither should have to be told about the other. It counts while the
 * bundle is built, so the same page draws the same names every time.
 */
let drawn = 0;

export async function Playground({ example }: { example: string }) {
  const name = `playground-${(++drawn).toString()}`;

  // Compiled here, while the bundle is built, by the same `compile` the frame
  // in the corner runs on a keystroke. It is why a reader who only reads never
  // asks for a compiler, and why the page draws something rather than nothing
  // before the megabyte behind the editor has been thought about.
  const prepared = JSON.stringify({
    source: example,
    result: await compile(example, { typescript: ts }),
  });

  const first = example;

  return (
    <>
      <div style={SPLIT}>
        <div style={`${PANEL}; ${WRITING}`}>
          <div style={HEAD_ROW}>
            <p style={HEAD}>{"01 \u00b7 TRY EDITING"}</p>
            <p id={`${name}-status`} style={STATUS} />
          </div>
          <div style={WELL}>
            <pre id={`${name}-ink`} style={INK} aria-hidden="true">
              <code>{first}</code>
            </pre>
            <textarea
              id={`${name}-source`}
              style={EDITOR}
              // The string, not the boolean: this client writes a `false`
              // boolean by removing the attribute, and a removed `spellcheck`
              // is spellcheck on — red underlining on every line of an editor.
              spellcheck="false"
              autocapitalize="off"
              autocorrect="off"
              wrap="off"
              rows={20}
            >
              {first}
            </textarea>
          </div>
          <div id={`${name}-complaints`} style={COMPLAINTS} />

          {/* What this one opens on, and what the build already made of it.
              Read out of the page by the script below, so the script is the
              same bytes whatever any page puts in front of it. */}
          <script type="application/json" id={`${name}-example`}>
            {prepared}
          </script>
        </div>

        <div style={`${PANEL}; ${DRAWING}`}>
          <div style={HEAD_ROW}>
            <p style={HEAD}>{"02 \u00b7 SEE IT REDRAW"}</p>
            {/* Two views of one thing, so they share a slot and a frame. Which
                is up is the script's to say — the drawing has no state. */}
            <div>
              <button id={`${name}-tab-screen`} style={TAB_OFF}>
                {"PREVIEW"}
              </button>
              <button id={`${name}-tab-bundle`} style={TAB_OFF}>
                {"BUNDLE"}
              </button>
            </div>
          </div>
          <div id={`${name}-device`} style={DEVICE}>
            <div id={`${name}-screen`} style={SCREEN} />
            <div style={ISLAND} />
          </div>
          <pre id={`${name}-bundle`} style={BUNDLE} />
        </div>
      </div>

      {/* Its own, so a page holding one of these owes it nothing but the files
          under `/playground/`. Drawn once per playground and run once per page:
          the script marks the window and a second copy returns. */}
      <script defer src={EDITOR_URL} />
    </>
  );
}
