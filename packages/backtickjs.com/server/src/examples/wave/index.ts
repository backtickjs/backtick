import { type Example, fileOf } from "../Example.js";

/**
 * What the editor opens on.
 *
 * Short enough to read without scrolling — a reader deciding whether to keep
 * reading will not scroll a code box to find the point. That budget is what
 * picked the design: a card whose whole surface is the control, because a
 * segmented switch or a chart costs six style constants and this costs three.
 */
export const WAVE: Example = {
  files: [await fileOf("wave/Wave.tsx")],
};
