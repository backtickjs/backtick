import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { cyan, mono, muted } from "./theme.js";

const SECTION = "padding: 96px 0 0";

const EYEBROW =
  `margin: 0 0 14px; font-family: ${mono}; font-size: 12px;` +
  ` letter-spacing: 0.12em; text-transform: uppercase; color: ${cyan}`;

const TITLE =
  "margin: 0; max-width: 18em; font-size: clamp(30px, 4.6vw, 44px);" +
  " line-height: 1.1; letter-spacing: -0.03em; font-weight: 700";

const LEDE = `margin: 18px 0 0; max-width: 36em; font-size: 18px; color: ${muted}`;

const BODY = "margin-top: 40px";

// One heading style for every section below the hero, so they read as a set.
export async function Section({
  id = "",
  eyebrow,
  title,
  lede,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lede: string;
  children: JSX.Element;
}) {
  return cs`(
    <section id={$id} style={$SECTION}>
      <p style={$EYEBROW}>{$eyebrow}</p>
      <h2 style={$TITLE}>{$title}</h2>
      <p style={$LEDE}>{$lede}</p>
      <div style={$BODY}>{$children}</div>
    </section>
  )`;
}
