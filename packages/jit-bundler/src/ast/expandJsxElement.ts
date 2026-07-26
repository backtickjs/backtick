import {
  isClientElement,
  type JsxElement,
  isSpliceable,
  withJsxElement,
} from "@backtickjs/cs-runtime";
import type { Ast, AstElement, AstFragment } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The in-flight promise, so two references to one element share the expansion
// instead of racing into duplicate subtrees (see `lowerClientObject`).
const nodeByElement = new WeakMap<
  JsxElement,
  Promise<AstFragment | AstElement>
>();

// Runs the element's component and lowers what it names. The component itself
// never leaves the host: a server component expands away here, and only the
// client component it bottoms out in reaches the bundle.
export function expandJsxElement(
  value: JsxElement,
): Promise<AstFragment | AstElement> {
  const shared = nodeByElement.get(value);
  if (shared) {
    return shared;
  }
  const node = buildElement(value);
  nodeByElement.set(value, node);
  return node;
}

async function buildElement(
  jsx: JsxElement,
): Promise<AstFragment | AstElement> {
  const type = jsx.type;

  // The key lowers like a prop: a static key to its literal node, a client
  // key to its script (evaluated per instance). A missing key lowers null.
  const key = await lowerSpliceable(jsx.key, "ClientValue");

  if (isClientElement(type)) {
    const element = type;

    // A client component names the element the interpreter renders, and the props
    // it hands back are the ones the element carries.
    const props = Object.fromEntries(
      await Promise.all(
        Object.entries(jsx.props).map(
          async ([key, entry]): Promise<[string, Ast]> => {
            if (!isSpliceable(entry)) {
              throw new Error(
                `Can't bundle this <${element.id} /> element: the \`${key}\` ` +
                  "prop isn't spliceable.",
              );
            }
            return [key, await lowerSpliceable(entry, "ClientValue")];
          },
        ),
      ),
    );

    return {
      kind: "AstElement",
      id: element.id,
      key,
      props,
    };
  } else {
    const component = type;

    // A server component resolves to another element asynchronously: awaited
    // here, on the host, and the element it built is what the bundle carries.
    const element = await withJsxElement(jsx, () =>
      component(jsx.props as never),
    );

    return {
      kind: "AstFragment",
      key,
      child: await expandJsxElement(element),
    };
  }
}
