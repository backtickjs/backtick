import { EXAMPLE } from "../play/examples.js";
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
} from "../play/style.js";
import { ink, line, mono, muted, paper } from "../theme.js";

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
 * the columns and the editor itself. What it does not do is read what the reader
 * typed: a handler in this language is `() => void` and hands nothing over, so
 * the wiring is a script beside the bundle rather than part of it. That is the
 * one seam here, it is named in `docs/browser-playground.md`, and closing it is
 * a change to the schema rather than to this file.
 *
 * The two right-hand columns are left for that script to fill. It has every
 * example already compiled — the build did that — so what it puts there on load
 * costs no compiler and no megabyte, and the reader decides when to spend one by
 * typing.
 */
export async function Playground() {
  const first = EXAMPLE.source;

  return (
    <>
      <div style={SPLIT}>
        <div style={`${PANEL}; ${WRITING}`}>
          <div style={HEAD_ROW}>
            <p style={HEAD}>{"01 \u00b7 TRY EDITING"}</p>
            <p id="play-status" style={STATUS} />
          </div>
          <div style={WELL}>
            <pre id="play-ink" style={INK} aria-hidden="true">
              <code>{first}</code>
            </pre>
            <textarea
              id="play-source"
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
          <div id="play-complaints" style={COMPLAINTS} />
        </div>

        <div style={`${PANEL}; ${DRAWING}`}>
          <div style={HEAD_ROW}>
            <p style={HEAD}>{"02 \u00b7 SEE IT REDRAW"}</p>
            {/* Two views of one thing, so they share a slot and a frame. Which
                is up is the script's to say — the drawing has no state. */}
            <div>
              <button id="play-tab-screen" style={TAB_OFF}>
                {"PREVIEW"}
              </button>
              <button id="play-tab-bundle" style={TAB_OFF}>
                {"BUNDLE"}
              </button>
            </div>
          </div>
          <div id="play-device" style={DEVICE}>
            <div id="play-screen" style={SCREEN} />
            <div style={ISLAND} />
          </div>
          <pre id="play-bundle" style={BUNDLE} />
        </div>
      </div>
    </>
  );
}
