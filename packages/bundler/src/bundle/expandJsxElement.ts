import type { JsxElement, Spliceable } from "@backtickjs/core";

// The in-flight promise, so two references to one element run its component
// once. Per bundle, like a function's expansion: an element held at module
// level is the same object in every bundle, and what its component drew for
// one request (the request's user) is not the next one's.
export type ElementExpansions = WeakMap<JsxElement, Promise<Spliceable>>;

// Runs a host component and answers with what it drew. The component itself
// never leaves the host: a server component expands away here, and only the
// client component it bottoms out in reaches the bundle.
export function expandJsxElement(
  jsx: JsxElement,
  component: (props: never) => unknown,
  expansions: ElementExpansions,
): Promise<Spliceable> {
  const shared = expansions.get(jsx);
  if (shared) {
    return shared;
  }
  const expansion = Promise.resolve(
    component(jsx.props as never) as Spliceable | Promise<Spliceable>,
  );
  expansions.set(jsx, expansion);
  return expansion;
}
