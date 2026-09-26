import type { JsxElement, Spliceable } from "@backtickjs/core";

// The in-flight promise, so two references to one element run its component
// once.
const drawnByElement = new WeakMap<JsxElement, Promise<Spliceable>>();

// Runs a host component and answers with what it drew. The component itself
// never leaves the host: a server component expands away here, and only the
// client component it bottoms out in reaches the bundle.
export function expandJsxElement(
  jsx: JsxElement,
  component: (props: never) => unknown,
): Promise<Spliceable> {
  const shared = drawnByElement.get(jsx);
  if (shared) {
    return shared;
  }
  const drawn = Promise.resolve(
    component(jsx.props as never) as Spliceable | Promise<Spliceable>,
  );
  drawnByElement.set(jsx, drawn);
  return drawn;
}
