import { type ClientUIElement, isSpliceable } from "@backtickjs/cs-runtime";
import type { Ast, AstElement } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

const nodeByElement = new WeakMap<ClientUIElement, AstElement>();

export function lowerClientUIElement(value: ClientUIElement): AstElement {
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
    props[key] = lowerSpliceable(entry);
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
