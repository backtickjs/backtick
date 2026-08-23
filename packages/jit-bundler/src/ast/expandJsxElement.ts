import {
  isFragment,
  type JsxElement,
  type Spliceable,
} from "@backtickjs/cs-runtime";
import { withInstance } from "../Instance.js";
import type { Ast, AstInstance } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The in-flight promise, so two references to one element share the expansion
// instead of racing into duplicate subtrees.
const nodeByElement = new WeakMap<JsxElement, Promise<Ast>>();

// Runs the element's component and lowers what it names. The component itself
// never leaves the host: a server component expands away here, and only the
// client component it bottoms out in reaches the bundle.
export function expandJsxElement(value: JsxElement): Promise<Ast> {
  const shared = nodeByElement.get(value);
  if (shared) {
    return shared;
  }
  const node = buildElement(value);
  nodeByElement.set(value, node);
  return node;
}

// The props an element carries, lowered. What a value may be is
// `lowerSpliceable`'s to say — it refuses by dispatching on what it was handed,
// where a check here could only predict the same answer — so this adds where a
// failure happened and claims nothing about why.
async function buildTag(jsx: JsxElement, id: string): Promise<Ast> {
  const props = Object.fromEntries(
    await Promise.all(
      Object.entries(jsx.props).map(
        async ([key, entry]): Promise<[string, Ast]> => {
          try {
            return [
              key,
              await lowerSpliceable(entry as Spliceable, "ClientValue"),
            ];
          } catch (cause) {
            // A component runs while its props lower, so what surfaces here may
            // be the app's own failure rather than a value that cannot cross —
            // and app code may throw anything, not only an error.
            const said = cause instanceof Error ? cause.message : String(cause);
            throw new Error(`In the \`${key}\` prop of <${id} />: ${said}`, {
              cause,
            });
          }
        },
      ),
    ),
  );

  return { kind: "AstElement", id, props };
}

async function buildElement(jsx: JsxElement): Promise<Ast> {
  const type = jsx.type;

  // A fragment lowers to what it held: its children go where it stood, which is
  // what a list of them already means. Nothing of it reaches the client.
  if (isFragment(type)) {
    const children = jsx.props["children"];
    return children === undefined
      ? { kind: "AstNull" }
      : lowerSpliceable(children as never, "ClientValue");
  }


  // An element is its own name — `<div>` is `"div"`, the same string a client
  // script's element already writes.
  if (typeof type === "string") {
    return buildTag(jsx, type);
  } else {
    // The node stands for the invocation, so it is built before the invocation
    // happens: it is what the component's `state()` calls record as their
    // owner, and only its child waits on what the component returned. Nothing
    // reads the child in between — the run produces it.
    const instance: AstInstance = { kind: "AstInstance", child: null };

    // A server component resolves to another element asynchronously: awaited
    // here, on the host, and the element it built is what the bundle carries.
    // Null is rendering nothing, so the child it never got stands as it is.
    const element = await withInstance(instance, () =>
      type(jsx.props as never),
    );

    if (element !== null) {
      instance.child = await lowerSpliceable(element, "ClientValue");
    }

    return instance;
  }
}
