import { type Spliceable } from "@backtickjs/language";
import { type JsxElement } from "@backtickjs/ui";
import type { Ast } from "./Ast.js";
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
            return [key, await lowerSpliceable(entry as Spliceable)];
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

  // An element is its own name — `<div>` is `"div"`, the same string a client
  // script's element already writes.
  if (typeof type === "string") {
    return buildTag(jsx, type);
  } else {
    // A server component resolves to another element asynchronously: awaited
    // here, on the host, and what it built is what the bundle carries. The
    // component itself leaves nothing behind — what it drew stands where the
    // tag stood, and drawing nothing is the language's absent value.
    const children = await type(jsx.props as never);
    const drawn = await lowerSpliceable(children);
    // A script is what runs on the client; an element it drew instead has no
    // setup of its own to guard.
    return drawn.kind === "AstScript"
      ? { kind: "AstComponentCall", body: drawn }
      : drawn;
  }
}
