import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";

const CAPTION = "margin: 14px 0 0; font-size: 14px; color: var(--muted)";

/** The line that says what the thing under it is. */
export async function Caption({
  children,
}: {
  children: NonNullable<FragmentProps["children"]>;
}) {
  return <p style={CAPTION}>{children}</p>;
}
