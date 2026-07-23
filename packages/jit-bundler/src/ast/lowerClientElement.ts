import { type ClientElement, isSpliceable } from "@backtickjs/cs-runtime";
import type { Ast, AstElement } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

const nodeByElement = new WeakMap<ClientElement, AstElement>();

export function lowerClientElement(value: ClientElement): AstElement {
  const shared = nodeByElement.get(value);
  if (shared) {
    return shared;
  }

  const props: Record<string, Ast> = {};
  for (const [key, entry] of Object.entries(value.props)) {
    if (!isSpliceable(entry)) {
      throw new Error(
        `Can't bundle this <${value.type} /> element: the \`${key}\` prop ` +
          "isn't spliceable.",
      );
    }
    props[key] = lowerSpliceable(entry, "ClientValue");
  }
  const node: AstElement = {
    kind: "AstElement",
    type: value.type,
    key: value.key,
    props,
  };
  nodeByElement.set(value, node);
  return node;
}
