import {
  isClientElement,
  type JsxElement,
  isSpliceable,
} from "@backtickjs/cs-runtime";
import { withInstance } from "../Instance.js";
import type { Ast, AstElement, AstInstance } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The in-flight promise, so two references to one element share the expansion
// instead of racing into duplicate subtrees (see `lowerClientObject`).
const nodeByElement = new WeakMap<
  JsxElement,
  Promise<AstInstance | AstElement>
>();

// Runs the element's component and lowers what it names. The component itself
// never leaves the host: a server component expands away here, and only the
// client component it bottoms out in reaches the bundle.
export function expandJsxElement(
  value: JsxElement,
): Promise<AstInstance | AstElement> {
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
): Promise<AstInstance | AstElement> {
  const type = jsx.type;

  // The key lowers like a prop: a static key to its literal node, a client
  // key to its script (evaluated per instance). A missing key lowers null.
  const key = await lowerSpliceable(jsx.key, "ClientValue");

  if (isClientElement(type)) {
    // A client component names the element the interpreter renders, and the props
    // it hands back are the ones the element carries.
    const props = Object.fromEntries(
      await Promise.all(
        Object.entries(jsx.props).map(
          async ([key, entry]): Promise<[string, Ast]> => {
            if (!isSpliceable(entry)) {
              throw new Error(
                `Can't bundle this <${type.id} /> element: the \`${key}\` ` +
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
      id: type.id,
      key,
      props,
    };
  } else {
    // The node stands for the invocation, so it is built before the invocation
    // happens: it is what the component's `state()` calls record as their
    // owner, and only its child waits on what the component returned. Nothing
    // reads the child in between — the run produces it.
    const instance: AstInstance = { kind: "AstInstance", key, child: null };

    // A server component resolves to another element asynchronously: awaited
    // here, on the host, and the element it built is what the bundle carries.
    // Null is rendering nothing, so the child it never got stands as it is.
    const element = await withInstance(instance, () =>
      type(jsx.props as never),
    );

    if (element !== null) {
      instance.child = await expandJsxElement(element);
    }

    return instance;
  }
}
