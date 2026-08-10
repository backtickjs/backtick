import type { Children, JsxElement, Prop } from "@backtickjs/core";

// What every page in this app looks like: a title, then whatever the page is.
//
// An ordinary server component, so it leaves no trace of itself in the bundle —
// what ships is the `div` and the `h1`, exactly as if each page had written
// them. Composing pages costs nothing at runtime because this runs while
// bundling, not while drawing.
//
// `Prop<string>` is a string or a script that yields one, which is why
// `Counter` can hand its live count straight to the title. `Children<JsxElement>`
// is elements and nothing else: a page says what it holds in tags, so bare text
// under the heading would be a paragraph someone forgot to write.
export async function Page({
  title,
  children,
}: {
  title: Prop<string>;
  children: Children<JsxElement>;
}) {
  return (
    <div style="display: grid; gap: 8px; padding: 24px; justify-items: start">
      <h1 style="margin: 0; font-size: 24px">{title}</h1>
      {children}
    </div>
  );
}
