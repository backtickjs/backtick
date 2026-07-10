import { isSpliceable, type JSXElement } from "../../cs-runtime/index.js";
import type { AstElement, AstRoot } from "./AstNode.js";
import { buildAst } from "./buildAst.js";

const nodeByElement = new WeakMap<JSXElement, AstElement>();

export function buildJSXElement(value: JSXElement): AstElement {
  const shared = nodeByElement.get(value);
  if (shared) {
    return shared;
  }

  const props: Record<string, AstRoot> = {};
  for (const [key, entry] of Object.entries(value.props)) {
    if (!isSpliceable(entry)) {
      throw new Error(
        `Can't bundle this <${value.type} /> element: the \`${key}\` prop ` +
          "isn't spliceable.",
      );
    }
    props[key] = buildAst(entry);
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
