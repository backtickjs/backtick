import { type ClientElement, isSpliceable } from "@backtickjs/cs-runtime";
import type { AstElement } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// The in-flight promise, so two references to one element share the lowering
// instead of racing into duplicate subtrees (see `lowerClientObject`).
const nodeByElement = new WeakMap<ClientElement, Promise<AstElement>>();

export function lowerClientElement(value: ClientElement): Promise<AstElement> {
  const shared = nodeByElement.get(value);
  if (shared) {
    return shared;
  }
  const node = buildElement(value);
  nodeByElement.set(value, node);
  return node;
}

async function buildElement(value: ClientElement): Promise<AstElement> {
  const props = Object.fromEntries(
    await Promise.all(
      Object.entries(value.props).map(async ([key, entry]) => {
        if (!isSpliceable(entry)) {
          throw new Error(
            `Can't bundle this <${value.type} /> element: the \`${key}\` prop ` +
              "isn't spliceable.",
          );
        }
        return [key, await lowerSpliceable(entry, "ClientValue")];
      }),
    ),
  );
  return {
    kind: "AstElement",
    type: value.type,
    key: value.key,
    props,
  };
}
