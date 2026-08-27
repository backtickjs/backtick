import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";
import { muted } from "../theme.js";

const CAPTION = `margin: 14px 0 0; max-width: 42em; font-size: 14px; color: ${muted}`;

/** The line that says what the thing under it is. */
export async function Caption({
  children,
}: {
  children: NonNullable<FragmentProps["children"]>;
}) {
  return <p style={CAPTION}>{children}</p>;
}
