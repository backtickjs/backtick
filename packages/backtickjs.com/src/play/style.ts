import { ink, line, mono, muted, paper, wash } from "../theme.js";

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

// One frame, two fillings. The screen and the wire swap in the same slot, so
// every metric they share is written once: a pair that jumped by a pixel on
// the switch would read as two places rather than two views of one thing.
//
// A bezel, not a phone: this is drawn by the web client, and a notch would be
// claiming a platform that has not shipped yet.
const FRAME =
  // No `height: 100%` beside the min: it resolved to `auto` here anyway, so
  // the frame was always this tall — and as a percentage against a grid area
  // inside a stretched flex item it had nothing definite to measure, which on
  // a phone grew without stopping and took the page's scroll with it.
  `min-height: 420px; box-sizing: border-box;` +
  ` background: ${wash}; border: 1px solid ${line};` +
  ` border-radius: ${RADIUS}`;

/** What the bytes draw, sitting in the middle the way a screen sits in a device. */
export const SCREEN =
  `${FRAME}; display: grid; align-content: center;` +
  " justify-items: center; padding: 22px 11px";

/** The bytes themselves, in the same frame. */
export const WIRE =
  `${FRAME}; display: block; overflow: auto; margin: 0; padding: 18px;` +
  ` font-family: ${mono}; font-size: 12px; line-height: 1.7;` +
  " word-break: break-all; white-space: pre-wrap";

/** How each is shown again — `display` is what hides the other. */
export const SHOWN: Readonly<Record<string, string>> = {
  screen: "grid",
  wire: "block",
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
