import type { BacktickNode } from "@backtickjs/core";
import { accent, accentEdge, accentFill, mono } from "./theme.js";

// Tinted rather than filled: the colour says which family this belongs to
// without the pill becoming the brightest thing in the header, where the two
// real destinations are.
//
// The edge is the same violet again, carried further. A translucent line rather
// than `line` so the shape holds together on a page that has no other rule near
// it, and so the border cannot end up a different hue from what it encloses.
const BADGE =
  "display: inline-block; padding: 3px 8px; border-radius: 999px;" +
  ` background: ${accentFill}; border: 1px solid ${accentEdge};` +
  ` font-family: ${mono}; font-size: 10.5px; font-weight: 500;` +
  ` line-height: 1.4; letter-spacing: 0.09em; color: ${accent};` +
  " white-space: nowrap";

// A label next to the mark. The wordmark fills its own box top to bottom and
// has no descenders, so centring against that box is also centring against its
// caps, and the pill needs no optical nudge of its own.
export async function Badge({ children }: { children: BacktickNode }) {
  return <span style={BADGE}>{children}</span>;
}
