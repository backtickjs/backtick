import { ink, line, mono, muted, paper, wash } from "./theme.js";

/**
 * What the editor and its colouring are both set in.
 *
 * One string, used twice on purpose: a `<textarea>` and the `<pre>` behind it
 * line up only while every metric agrees, and two copies of these numbers is a
 * caret that sits half a character off the letter it is in front of.
 */
// One corner for both panels, so the pair reads as two of the same thing. It
// is the radius the drawn card uses, which is the most prominent one on the
// page and the one the eye is already calibrated to.
const RADIUS = "22px";

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
export const INK =
  `${BOX}; ${TYPE}; grid-area: 1 / 1; background: ${wash};` +
  ` color: ${ink}; pointer-events: none`;

/** The text, over it and invisible — only the caret and the selection show. */
export const EDITOR =
  `${BOX}; ${TYPE}; grid-area: 1 / 1; background: transparent;` +
  ` color: transparent; caret-color: ${ink}; resize: none;` +
  " border-color: transparent; outline: none";

export const PANEL =
  "display: grid; gap: 12px; align-content: start; min-width: 0";

// No rule under it: the editor and the bezel carry borders of their own, and a
// line above each was a second edge saying the same thing.
/** The track the sweep runs along, and the sweep. */
/**
 * The divider, and the only report a compile gets.
 *
 * At rest it is the hairline that separates the demo from what is above it. A
 * compile runs the sweep along it, so the thing that marks the section is the
 * thing that says work is happening — one line doing both, rather than a rule
 * and an indicator saying it twice.
 */
export const TRACK =
  `position: relative; height: 1px; overflow: hidden; margin-bottom: 30px;` +
  ` background: ${line}`;

export const SWEEP =
  `position: absolute; inset: 0 auto 0 0; width: 28%; opacity: 0;` +
  ` background: ${ink}; transition: transform 450ms ease-in-out,` +
  " opacity 200ms ease";

// No margin of its own: the row below owns the gap. Centring a flex item
// centres its margin box, so a bottom margin here rides the text up and leaves
// it sitting above the control beside it.
export const HEAD =
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
export const DEVICE =
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
export const ISLAND =
  "position: absolute; top: 26px; left: 50%; width: 84px; height: 23px;" +
  " margin-left: -42px; border-radius: 999px; pointer-events: none;" +
  " background: light-dark(#18181b, #050506)";

/** What the bytes draw, in the middle the way a screen sits in a device. */
export const SCREEN =
  `width: 100%; height: 100%; box-sizing: border-box; border-radius: 35px;` +
  ` background: ${wash}; display: grid; align-content: center;` +
  " justify-items: center; padding: 26px 10px; overflow: hidden";

/** The bytes themselves, in the same slot and at the same height. */
export const BUNDLE =
  `${TALL}; display: block; overflow: auto; margin: 0; padding: 18px;` +
  ` background: ${wash}; border: 1px solid ${line};` +
  ` border-radius: ${RADIUS};` +
  ` font-family: ${mono}; font-size: 12px; line-height: 1.7;` +
  " word-break: break-all; white-space: pre-wrap";

/** How each is shown again — `display` is what hides the other. */
export const SHOWN: Readonly<Record<string, string>> = {
  screen: "block",
  bundle: "block",
};

// The two views, as a control that says which one is up.
const TAB =
  `padding: 4px 11px; border: 0; border-radius: 999px; cursor: pointer;` +
  ` font-family: ${mono}; font-size: 11px; letter-spacing: 0.06em`;

export const TAB_ON = `${TAB}; background: ${ink}; color: ${paper}`;
export const TAB_OFF = `${TAB}; background: transparent; color: ${muted}`;

/**
 * The label and the control, on one line above the frame.
 *
 * Both columns use it, including the one with no control: two headers built
 * the same way are two headers that cannot drift apart.
 */
export const HEAD_ROW =
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
export const PALETTE: Readonly<Record<string, string>> = {
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
