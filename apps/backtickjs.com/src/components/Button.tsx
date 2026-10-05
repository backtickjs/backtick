import { cs } from "@backtickjs/core";
import { ink, paper } from "./theme.js";

const BASE =
  "display: inline-block; padding: 13px 22px; border-radius: 999px;" +
  ` border: 1px solid ${ink}; font-size: 15.5px; font-weight: 600;` +
  " text-decoration: none; transition: transform .15s, box-shadow .15s";

// Filled or outlined, which is the only thing a caller decides — a page with
// two ways of saying the same button is a page with two of everything.
export async function Button({
  href,
  solid,
  label,
}: {
  href: string;
  solid?: boolean;
  label: string;
}) {
  // Decided here, so only the look in use is bundled.
  const look =
    solid === true
      ? BASE + `; background: ${ink}; color: ${paper}`
      : BASE + `; color: ${ink}`;

  return cs`(
    <a class="bt-lift" href={$href} style={$look}>
      {$label}
    </a>
  )`;
}
