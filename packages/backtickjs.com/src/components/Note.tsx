import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";
import { line, muted } from "../theme.js";

const NOTE = `margin: 0 0 20px; padding: 14px 18px;
  border-left: 2px solid ${line}; font-size: 15px; color: ${muted}`;

/** An aside: the objection nobody asks out loud, answered anyway. */
export async function Note({
  children,
}: {
  children: NonNullable<FragmentProps["children"]>;
}) {
  return <p style={NOTE}>{children}</p>;
}
