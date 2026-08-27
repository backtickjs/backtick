import { ink, line, mono, muted, wash } from "../theme.js";

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
  "margin: 0; padding: 16px 18px; border-radius: 10px; height: 700px;" +
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
export const HEAD =
  `margin: 0 0 10px; font-family: ${mono}; font-size: 11.5px;` +
  ` letter-spacing: 0.06em; color: ${muted}`;

export const WIRE =
  `margin: 12px 0 0; max-height: 300px; overflow: auto;` +
  ` font-family: ${mono}; font-size: 12px; line-height: 1.7;` +
  " word-break: break-all; white-space: pre-wrap";

/** The wire, folded away: it is evidence, and evidence is read once. */
export const DISCLOSURE = `margin-top: 22px; border-top: 1px solid ${line}; padding-top: 14px`;

export const SUMMARY =
  `cursor: pointer; font-family: ${mono}; font-size: 11.5px;` +
  ` letter-spacing: 0.06em; color: ${muted}`;

// A bezel, not a phone: this is drawn by the web client, and a notch would be
// claiming a platform that has not shipped yet.
// No height of its own beside the editor — the row stretches them alike — and
// the card sits in the middle of it, the way a screen sits in a device.
export const SCREEN =
  `display: grid; align-content: center; justify-items: center;` +
  ` min-height: 420px; height: 100%; padding: 22px 11px;` +
  ` box-sizing: border-box; background: ${wash}; border: 1px solid ${line};` +
  ` border-radius: 21px`;

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
