import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";

const LIST =
  "display: grid; gap: 24px; margin: 0; padding: 0; list-style: none;" +
  " grid-template-columns: repeat(auto-fit, minmax(190px, 1fr))";

const ORDINAL =
  "display: block; margin-bottom: 10px; font-family: var(--mono);" +
  " font-size: 13px; color: var(--muted)";

const TITLE = "margin: 0 0 4px; font-size: 16px; font-weight: 600";

const BODY = "margin: 0; font-size: 15px; color: var(--muted)";

/** Numbered stages, as many across as the width allows. */
export async function Steps({
  children,
}: {
  children: NonNullable<FragmentProps["children"]>;
}) {
  return <ol style={LIST}>{children}</ol>;
}

export async function Step({
  ordinal,
  title,
  children,
}: {
  ordinal: string;
  title: string;
  children: NonNullable<FragmentProps["children"]>;
}) {
  return (
    <li>
      <span style={ORDINAL}>{ordinal}</span>
      <h3 style={TITLE}>{title}</h3>
      <p style={BODY}>{children}</p>
    </li>
  );
}
