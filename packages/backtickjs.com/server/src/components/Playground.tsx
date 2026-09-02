import { For, cs, state } from "@backtickjs/core";
import type { BacktickElement, Client } from "@backtickjs/core";
import type { Example } from "../examples/Example.js";
import { type Diagnostic, compile, bundle } from "@backtickjs.com/schema";
import { ink, line, mono, muted, paper, wash } from "./theme.js";

// One corner for both panels, so the pair reads as two of the same thing. It
// is the radius the drawn card uses, which is the most prominent one on the
// page and the one the eye is already calibrated to.
const RADIUS = "22px";

/**
 * What the editor and its colouring are both set in.
 *
 * One string, used twice on purpose: a `<textarea>` and the `<pre>` behind it
 * line up only while every metric agrees, and two copies of these numbers is a
 * caret that sits half a character off the letter it is in front of.
 */
const TYPE =
  `font-family: ${mono}; font-size: 13px; line-height: 1.7;` +
  " tab-size: 2; letter-spacing: 0";

// One height for both, and no `resize`: the two elements have to agree about
// every metric, and a corner the reader can drag moves one of them.
const BOX =
  `margin: 0; padding: 16px 18px; border-radius: ${RADIUS};` +
  " height: 700px;" +
  " box-sizing: border-box; white-space: pre; overflow: auto;" +
  ` border: 1px solid ${line}`;

/** The colouring, behind the text and reading as it. */
const INK =
  `${BOX}; ${TYPE}; grid-area: 1 / 1; background: ${wash};` +
  ` color: ${ink}; pointer-events: none`;

/**
 * The text, over it and invisible — only the caret and the selection show.
 *
 * Positioned, and that is load-bearing: the colouring under this is moved with
 * a transform, which makes a stacking context of it, and a transformed sibling
 * paints over an unpositioned one however the two are written. Without this the
 * caret is behind the colouring and a reader cannot see where they are.
 */
const EDITOR =
  `${BOX}; ${TYPE}; grid-area: 1 / 1; background: transparent;` +
  " position: relative; z-index: 1;" +
  ` color: transparent; caret-color: ${ink}; resize: none;` +
  " border-color: transparent; outline: none";

const PANEL = "display: grid; gap: 12px; align-content: start; min-width: 0";

// No margin of its own: the row below owns the gap. Centring a flex item
// centres its margin box, so a bottom margin here rides the text up and leaves
// it sitting above the control beside it.
const HEAD =
  `margin: 0; font-family: ${mono}; font-size: 11.5px;` +
  ` letter-spacing: 0.06em; color: ${muted}`;

// One slot, two fillings. The device and the bundle swap in it, and both are
// the editor's height exactly, so the switch moves nothing on the page — which
// is also what fixes the width below rather than the height.
//
// A phone, where this was a plain bezel. What draws inside it today is the web
// client, and the shape is ahead of that on purpose: iOS and Android clients
// are what a bundle is for, and the roadmap is what says the alpha is web only.
// The honesty is carried there rather than by refusing to draw a notch here.
const TALL = "height: 700px; box-sizing: border-box";

/**
 * The device the screen sits in.
 *
 * The bezel is a padding rather than a border, so the corner outside and the
 * corner inside are two radii that can be tuned against each other — a border
 * would force one to be the other plus its width.
 */
const DEVICE =
  `${TALL}; justify-self: center; position: relative; width: 100%;` +
  // 336 against the 700 above is not a round number chosen for looking right:
  // it is what puts the screen inside on 19.5:9 exactly, once the bezel is
  // taken off both sides. The body that falls out of it is 1:2.083, which is an
  // iPhone 15 Pro to within a third of a percent.
  //
  // The radius is the screen's plus the bezel, so the two corners are
  // concentric — any other number and the inner curve drifts inside the outer.
  " max-width: 336px; padding: 12px; border-radius: 47px;" +
  " background: light-dark(#18181b, #050506);" +
  " box-shadow: inset 0 0 0 1px light-dark(#3f3f46, #27272a)," +
  " 0 20px 44px light-dark(rgba(0,0,0,.20), rgba(0,0,0,.55))";

/**
 * The island, over the screen rather than inside it.
 *
 * A sibling and not a child: the script fills the screen with
 * `replaceChildren`, and anything parked in there as chrome is wiped on the
 * first compile.
 */
const ISLAND =
  "position: absolute; top: 26px; left: 50%; width: 84px; height: 23px;" +
  " margin-left: -42px; border-radius: 999px; pointer-events: none;" +
  " background: light-dark(#18181b, #050506)";

/** What the bytes draw, in the middle the way a screen sits in a device. */
const SCREEN =
  `width: 100%; height: 100%; box-sizing: border-box; border-radius: 35px;` +
  ` background: ${wash}; display: grid; align-content: center;` +
  " justify-items: center; padding: 26px 10px; overflow: hidden";

/** The bytes themselves, in the same slot and at the same height. */
const BUNDLE =
  `${TALL}; display: block; overflow: auto; margin: 0; padding: 18px;` +
  ` background: ${wash}; border: 1px solid ${line};` +
  ` border-radius: ${RADIUS};` +
  ` font-family: ${mono}; font-size: 12px; line-height: 1.7;` +
  " word-break: break-all; white-space: pre-wrap";

// The two views, as a control that says which one is up.
const TAB =
  `padding: 4px 11px; border: 0; border-radius: 999px; cursor: pointer;` +
  ` font-family: ${mono}; font-size: 11px; letter-spacing: 0.06em`;

const TAB_ON = `${TAB}; background: ${ink}; color: ${paper}`;
const TAB_OFF = `${TAB}; background: transparent; color: ${muted}`;

/**
 * The label and the control, on one line above the frame.
 *
 * Both columns use it, including the one with no control: two headers built
 * the same way are two headers that cannot drift apart.
 */
const HEAD_ROW =
  "display: flex; align-items: center; justify-content: space-between;" +
  " gap: 12px; min-height: 26px; margin-bottom: 10px";

/**
 * What the colouring paints, by what a token is.
 *
 * Colour and nothing else. A tint behind the half that ships was here and is
 * gone: a background on a run of spans paints the words and not the leading
 * whitespace between them, so what it drew was a ragged column of blocks down
 * the indent rather than a region. `cs` and its backticks carry the boundary
 * instead, which is one mark in one colour and reads as the marker it is.
 */
const PALETTE: Readonly<Record<string, string>> = {
  plain: ink,
  comment: muted,
  string: "light-dark(#0a7c4a, #4ade80)",
  keyword: "light-dark(#7c3aed, #c4b5fd)",
  type: "light-dark(#0e7490, #67e8f9)",
  number: "light-dark(#b45309, #fbbf24)",
  splice: "light-dark(#b91c1c, #f87171)",
  tag: "light-dark(#1d4ed8, #93c5fd)",
  attribute: "light-dark(#0e7490, #67e8f9)",
  tagged: "light-dark(#8a6100, #dbb774)",
};

// One name per colour the scanner reaches for. Spliced rather than looked up:
// a palette read by a key computed at run time is an index expression, and a
// name is a value.
const plainColour = PALETTE["plain"]!;
const comment = PALETTE["comment"]!;
const stringColour = PALETTE["string"]!;
const keyword = PALETTE["keyword"]!;
const type = PALETTE["type"]!;
const number = PALETTE["number"]!;
const splice = PALETTE["splice"]!;
const tag = PALETTE["tag"]!;
const attribute = PALETTE["attribute"]!;
const tagged = PALETTE["tagged"]!;

/**
 * The schema's `Diagnostic`, mapped.
 *
 * The shape is still the schema's — this restates only that it is an object.
 * The generator writes an interface, and an interface has no implicit index
 * signature where a `ClientValue` wants one, so the interface itself cannot be
 * held in state or spliced.
 */
type Said = { [K in keyof Diagnostic]: Diagnostic[K] };

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

// The words the scanner colours, kept here rather than in the script: a
// list is a value to splice, and forty-eight of them written inline would be
// forty-eight lines of a template that is already long.
const KEYWORDS: string[] = [
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "keyof",
  "let",
  "new",
  "null",
  "of",
  "readonly",
  "return",
  "satisfies",
  "static",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
];

const TYPES: string[] = [
  "any",
  "bigint",
  "boolean",
  "never",
  "number",
  "object",
  "string",
  "symbol",
  "unknown",
];

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
 * Compiling is the one thing that cannot be state, because running what
 * somebody wrote needs an origin this page will not give it. So it is not done
 * here at all: `compile` and `bundle` are the site's own builtins, and
 * where a client runs them is that client's business rather than this file's.
 */
// The return type written out rather than inferred: what `cs` answers is named
// in a schema this package does not depend on, and a declaration naming it is
// one a consumer cannot resolve. `core` is the surface, so it says `core`.
export async function Playground({
  // Whole, rather than the text of it: what the editor opens on is one file of
  // an example, and which one that is, is the example's to say. It is the only
  // thing a page decides — everything else here is the same on every one.
  example,
}: {
  example: Example;
}): Promise<Client<BacktickElement>> {
  return cs`{
    // What the reader has typed, and what the build already drew — both read off
    // the example itself, which crosses whole. The drawing is of the text beside
    // it by construction, rather than by two props agreeing.
    const source = $state($example.files[0].sourceText);
    const bundle = $state($example.bundle);
    const diagnostics = $state($noDiagnostics);
    const status = $state("");
    const showing = $state("screen");
    const down = $state(0);
    const across = $state(0);

    // Which request is the live one. A keystroke that lands while an answer is
    // out bumps this, so the answer that comes back late is dropped.
    const asked = $state(0);
    const settling = $state(0);

    // What the tab says beside the word. A string knows its own length, so the
    // page works this out rather than being told it.
    const sized = (n: number) =>
      n < 1024
        ? " \u00b7 " + n.toString() + " B"
        : " \u00b7 " + (n / 1024).toFixed(1) + " KB";

    // The colouring, ported from the scanner that used to run beside the bundle.
    // Two things had to change and both are the language being what it is: there
    // are no regexes, so a word is a comparison; and an array cannot be pushed
    // to, so a token list is one that was concatenated onto.
    //
    // Approximate by design, as the one it came from said of itself: a compiler's
    // opinion reaches a reader as a complaint with an exact span, and this only
    // has to make code look like code while they type. Where that one kept a
    // stack per nested template, this keeps a count — a script inside a splice
    // inside a script ends its colouring early, and nothing else notices.
    const word = (c: string) =>
      (c >= "a" && c <= "z") ||
      (c >= "A" && c <= "Z") ||
      (c >= "0" && c <= "9") ||
      c === "_" ||
      c === "$";

    const digit = (c: string) => c >= "0" && c <= "9";

    const ends = (src: string, from: number, quote: string) => {
      let end = from + 1;
      while (end < src.length) {
        const c = src.charAt(end);
        if (c === "\\") {
          end = end + 2;
        } else if (c === quote || (quote !== "\u0060" && c === "\n")) {
          return end + 1;
        } else {
          end = end + 1;
        }
      }
      return src.length;
    };

    const runOf = (src: string, from: number, dotted: boolean) => {
      let end = from;
      while (
        end < src.length &&
        (word(src.charAt(end)) || (dotted && src.charAt(end) === "."))
      ) {
        end = end + 1;
      }
      return end;
    };

    const tokensOf = (src: string) => {
      let out: { text: string; colour: string }[] = [];
      let at = 0;
      let plain = 0;
      // Below zero outside a cs template; otherwise how deep the splices go.
      let script = 0 - 1;
      let tags = 0;
      let braces = 0;

      while (at < src.length) {
        const c = src.charAt(at);
        const next = src.charAt(at + 1);
        const before = at === 0 ? "" : src.charAt(at - 1);
        let to = 0 - 1;
        let colour = "";

        if (c === "/" && next === "/") {
          const stop = src.indexOf("\n", at);
          to = stop === 0 - 1 ? src.length : stop;
          colour = $comment;
        } else if (c === "/" && next === "*") {
          const stop = src.indexOf("*/", at + 2);
          to = stop === 0 - 1 ? src.length : stop + 2;
          colour = $comment;
        } else if (c === '"' || c === "'") {
          to = ends(src, at, c);
          colour = $stringColour;
        } else if (
          c === "c" &&
          next === "s" &&
          src.charAt(at + 2) === "\u0060" &&
          !word(before)
        ) {
          to = at + 3;
          colour = $tagged;
          script = 0;
        } else if (c === "\u0060") {
          if (script === 0) {
            to = at + 1;
            colour = $tagged;
            script = 0 - 1;
          } else {
            to = ends(src, at, "\u0060");
            colour = $stringColour;
          }
        } else if (script >= 0 && c === "$" && next === "{") {
          to = at + 2;
          colour = $splice;
          script = script + 1;
        } else if (script >= 0 && c === "$" && word(next) && !word(before)) {
          to = runOf(src, at + 1, false);
          colour = $splice;
        } else if (c === "<" && next === "/" && word(src.charAt(at + 2))) {
          to = runOf(src, at + 2, true);
          colour = $tag;
          tags = tags + 1;
        } else if (c === "<" && word(next)) {
          to = runOf(src, at + 1, true);
          colour = $tag;
          tags = tags + 1;
        } else if (
          tags > 0 &&
          braces === 0 &&
          (c === ">" || (c === "/" && next === ">"))
        ) {
          to = c === ">" ? at + 1 : at + 2;
          colour = $tag;
          tags = tags - 1;
        } else if (
          tags > 0 &&
          braces === 0 &&
          word(c) &&
          !word(before) &&
          !digit(c)
        ) {
          to = runOf(src, at, false);
          colour = $attribute;
        } else if (c === "{" && tags > 0) {
          braces = braces + 1;
          at = at + 1;
        } else if (c === "}" && tags > 0 && braces > 0) {
          braces = braces - 1;
          at = at + 1;
        } else if (c === "}" && script > 0) {
          to = at + 1;
          colour = $splice;
          script = script - 1;
        } else if (digit(c) && !word(before)) {
          let end = at;
          while (
            end < src.length &&
            "0123456789._exXbo".indexOf(src.charAt(end)) >= 0
          ) {
            end = end + 1;
          }
          to = end;
          colour = $number;
        } else if (word(c) && !word(before)) {
          const end = runOf(src, at, false);
          const said = src.slice(at, end);
          if ($KEYWORDS.indexOf(said) >= 0) {
            to = end;
            colour = $keyword;
          } else if ($TYPES.indexOf(said) >= 0) {
            to = end;
            colour = $type;
          } else {
            at = end;
          }
        } else {
          at = at + 1;
        }

        if (to >= 0) {
          if (at > plain) {
            out = out.concat([
              { text: src.slice(plain, at), colour: $plainColour },
            ]);
          }
          out = out.concat([{ text: src.slice(at, to), colour: colour }]);
          at = to;
          plain = to;
        }
      }

      if (src.length > plain) {
        out = out.concat([
          { text: src.slice(plain, src.length), colour: $plainColour },
        ]);
      }
      return out;
    };

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
              <code>
                <For each={tokensOf(source.read())}>
                  {(t: { text: string; colour: string }) => (
                    <span style={"color: " + t.colour}>{t.text}</span>
                  )}
                </For>
                {"\n"}
              </code>
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
                clearTimeout(settling.read());
                settling.write(
                  setTimeout(() => {
                    const id = asked.read() + 1;
                    asked.write(id);
                    status.write("compiling\u2026");
                    const said = (diagnostic: Said[]) => {
                      if (id === asked.read()) {
                        status.write("");
                        bundle.write("");
                        diagnostics.write(diagnostic);
                      }
                    };
                    $compile(
                      $example.files[0].fileName,
                      source.read(),
                      (javascript) => {
                        // Compiled. Whether it draws anything is the next
                        // question, and a later keystroke may have made this
                        // answer stale before it is asked.
                        if (id !== asked.read()) {
                          return;
                        }
                        $bundle(
                          javascript,
                          (drawn) => {
                            if (id === asked.read()) {
                              status.write("");
                              diagnostics.write($noDiagnostics);
                              bundle.write(drawn);
                            }
                          },
                          said,
                        );
                      },
                      said,
                    );
                  }, $SETTLE),
                );
              }}
            >
              {/* The example, once. A textarea's value is its text content, so
                  drawing this from state would rewrite the node a reader is
                  typing into on every keystroke, and the caret goes wherever the
                  browser puts it after that. What they type is theirs; the state
                  follows it rather than the other way round. */}
              {$example.files[0].sourceText}
            </textarea>
          </div>

          <div style={$COMPLAINTS}>
            <For each={diagnostics.read()}>
              {(said: Said) => <p style={$COMPLAINT}>{said.message}</p>}
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
                {"BUNDLE" +
                  (bundle.read() === "" ? "" : sized(bundle.read().length))}
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
              <For each={[bundle.read()]}>
                {(drawn: string) => (
                  <>
                    <script type="application/json">{drawn}</script>
                    <backtick-bundle />
                  </>
                )}
              </For>
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
      </div>
    );
  }`;
}

// Spliced rather than written, because an empty one of each still has to have a
// type the script can read a member off.
const noDiagnostics: Said[] = [];
