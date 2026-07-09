import { isSpliceable, type JSXElement } from "../../cs-runtime/index.js";
import { buildAst } from "./buildAst.js";
import type { AstRoot } from "./nodes/AstNode.js";
import { RuntimeJSXElement } from "./nodes/RuntimeJSXElement.js";

const nodeByElement = new WeakMap<JSXElement, RuntimeJSXElement>();

export function buildJSXElement(value: JSXElement): RuntimeJSXElement {
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
  const node = new RuntimeJSXElement(value.type, value.key, props);
  nodeByElement.set(value, node);
  return node;
}
