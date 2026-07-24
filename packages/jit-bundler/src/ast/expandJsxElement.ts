import { type JsxElement, isSpliceable } from "@backtickjs/cs-runtime";
import type { Ast, AstElement } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The in-flight promise, so two references to one element share the expansion
// instead of racing into duplicate subtrees (see `lowerClientObject`).
const nodeByElement = new WeakMap<JsxElement, Promise<AstElement>>();

// Runs the element's component and lowers what it names. The component itself
// never leaves the host: a server component expands away here, and only the
// client component it bottoms out in reaches the bundle.
export function expandJsxElement(value: JsxElement): Promise<AstElement> {
  const shared = nodeByElement.get(value);
  if (shared) {
    return shared;
  }
  const node = buildElement(value);
  nodeByElement.set(value, node);
  return node;
}

async function buildElement(value: JsxElement): Promise<AstElement> {
  // Where the tag runs, and the one suspension point in the whole lowering.
  const result = value.component(value.props as never);

  // A server component resolves to another element asynchronously: awaited
  // here, on the host, and the element it built is what the bundle carries.
  if (result instanceof Promise) {
    return expandJsxElement(await result);
  }

  // A client component names the element the interpreter renders, and the props
  // it hands back are the ones the element carries.
  const { type } = result;
  const props = Object.fromEntries(
    await Promise.all(
      Object.entries(result.props).map(async ([key, entry]): Promise<[string, Ast]> => {
        if (!isSpliceable(entry)) {
          throw new Error(
            `Can't bundle this <${type} /> element: the \`${key}\` prop ` +
              "isn't spliceable.",
          );
        }
        return [key, await lowerSpliceable(entry, "ClientValue")];
      }),
    ),
  );
  return {
    kind: "AstElement",
    type,
    key: value.key,
    props,
  };
}
