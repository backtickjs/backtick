import type { JsxElement, Spliceable } from "@backtickjs/core";

// Runs a host component and answers with what it drew, each time an element
// is drawn, as React renders an element each place it stands. The component
// itself never leaves the host: a server component expands away here, and
// only the client component it bottoms out in reaches the bundle.
export async function expandJsxElement(
  jsx: JsxElement,
  component: (props: never) => unknown,
): Promise<Spliceable> {
  return (await component(jsx.props as never)) as Spliceable;
}
