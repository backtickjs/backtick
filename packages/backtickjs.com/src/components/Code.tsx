import { line, mono, wash } from "../theme.js";
const BLOCK =
  "margin: 0; padding: 18px 20px; overflow-x: auto;" +
  ` background: ${wash}; border: 1px solid ${line};` +
  ` border-radius: 10px; font-family: ${mono}; font-size: 13.5px;` +
  " line-height: 1.65; tab-size: 2";

// A listing. Its own component so every page spells one the same way, and
// because what a `<pre>` holds is text: it goes onto the wire as a string and
// is drawn with `createTextNode`, so nothing in it needs escaping.
//
// `wrap` is for a listing with no line breaks to speak of — a bundle — where
// scrolling sideways forever is worse than a paragraph of it.
export async function Code({
  source,
  wrap,
}: {
  source: string;
  wrap?: boolean;
}) {
  return (
    <pre
      style={
        wrap === true
          ? BLOCK +
            "; max-height: 260px; overflow: auto; word-break: break-all;" +
            " white-space: pre-wrap"
          : BLOCK
      }
    >
      <code>{source}</code>
    </pre>
  );
}
