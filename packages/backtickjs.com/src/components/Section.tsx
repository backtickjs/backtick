import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";
import { line, muted } from "../theme.js";

const RULE = `padding: 40px 0; border-top: 1px solid ${line}`;

const EYEBROW =
  "margin: 0 0 8px; font-size: 13px; font-weight: 600;" +
  ` letter-spacing: 0.12em; text-transform: uppercase; color: ${muted}`;

// A titled band with a rule above it. The title is small caps rather than a
// heading's size, so the page reads as one column with markers down it.
export async function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: NonNullable<FragmentProps["children"]>;
}) {
  // Two shapes rather than `id={id ?? null}`: this language has no
  // `undefined`, so a prop a caller left out is not a prop with nothing in it —
  // it is a prop the element does not carry.
  const body = (
    <>
      <h2 style={EYEBROW}>{title}</h2>
      {children}
    </>
  );

  return id === undefined ? (
    <section style={RULE}>{body}</section>
  ) : (
    <section id={id} style={RULE}>
      {body}
    </section>
  );
}
