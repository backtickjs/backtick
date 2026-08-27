import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";

const LEDE =
  "margin: 0 0 28px; max-width: 36em; font-size: 19px;" +
  " letter-spacing: -0.01em";

/** The sentence under a section title, set larger than the body. */
export async function Lede({
  children,
}: {
  children: NonNullable<FragmentProps["children"]>;
}) {
  return <p style={LEDE}>{children}</p>;
}
