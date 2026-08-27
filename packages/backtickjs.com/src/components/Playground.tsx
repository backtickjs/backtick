import { EXAMPLE } from "../play/examples.js";
import {
  DISCLOSURE,
  EDITOR,
  HEAD,
  INK,
  PANEL,
  SCREEN,
  SUMMARY,
  WIRE,
} from "../play/style.js";
import { ink, line, mono, muted, paper } from "../theme.js";

// The editor beside what it draws, which is the pairing that matters: a reader
// changes a line and looks right, not down.
//
// Flex rather than a grid of columns, because the two want different shares of
// the room and neither may have a media query to say so — the bases add up to
// less than the page until they don't, and then they wrap.
const SPLIT = "display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch";

// The editor takes what is left: 80 columns is the width the code is
// formatted to, and the bezel only ever holds a 280px card.
const WRITING = "flex: 1 1 420px; min-width: 0";
const DRAWING = "flex: 0 1 360px; min-width: 0";

// The editor is two elements in one place: a `<pre>` holding the colouring and a
// transparent `<textarea>` over it. They share `EDITOR`, so the two can only
// ever line up — a font or a padding written twice is a caret that drifts.
const WELL = "display: grid; min-width: 0";

const STATUS = `margin: 12px 0 0; font-family: ${mono}; font-size: 12.5px; color: ${muted}`;

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
          <p style={HEAD}>{"01 \u00b7 WHAT YOU WROTE"}</p>
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
          <p id="play-status" style={STATUS} />
          <div id="play-complaints" style={COMPLAINTS} />
        </div>

        <div style={`${PANEL}; ${DRAWING}`}>
          <p style={HEAD}>{"02 \u00b7 WHAT IT DRAWS"}</p>
          <div id="play-screen" style={SCREEN} />
        </div>
      </div>

      {/* A drawing rather than something the script opens: `<details>` is in the
          schema, so the fold works whether or not anything else on this page
          does. */}
      <details style={DISCLOSURE}>
        <summary id="play-wire-head" style={SUMMARY}>
          {"THE WIRE"}
        </summary>
        <pre id="play-wire" style={WIRE} />
      </details>
    </>
  );
}
