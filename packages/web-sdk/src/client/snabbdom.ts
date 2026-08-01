// A spike: the structural half of the renderer, done by snabbdom instead of by
// `dom.ts`. Same two entry points, so `mount` can't tell them apart.
import {
  init,
  h,
  attributesModule,
  eventListenersModule,
  type VNode,
} from "snabbdom";
import { isElement } from "@backtickjs/js-interpreter";
import type { Change, Element } from "@backtickjs/js-interpreter";

const patch = init([attributesModule, eventListenersModule]);
const FRAGMENT_ID = "Fragment";

// The node an element was drawn as, so a prop change still costs one attribute
// rather than a tree — the part snabbdom has no API for.
function drewAs(element: Element, node: Node): void {
  (element as unknown as { node?: Node }).node = node;
}
function drawnAs(element: Element): Node | undefined {
  return (element as unknown as { node?: Node }).node;
}

const trees = new WeakMap<globalThis.Element, VNode>();

function children(value: unknown, into: (VNode | string)[] = []) {
  if (value === null || value === undefined || value === false) return into;
  if (Array.isArray(value)) {
    for (const each of value) children(each, into);
    return into;
  }
  if (isElement(value)) {
    if (value.id === FRAGMENT_ID) return children(value.props.children, into);
    into.push(vnode(value));
    return into;
  }
  into.push(String(value));
  return into;
}

function vnode(element: Element): VNode {
  const attrs: Record<string, string | number | boolean> = {};
  const on: Record<string, () => void> = {};
  for (const prop in element.props) {
    if (prop === "children") continue;
    const value = element.props[prop];
    if (typeof value === "function") {
      if (prop.startsWith("on")) on[prop.slice(2)] = value as () => void;
      continue;
    }
    if (value === null || value === undefined || typeof value === "object")
      continue;
    attrs[prop.toLowerCase()] = value as string | number | boolean;
  }
  return h(
    element.id,
    {
      attrs,
      on,
      key: element.key ?? undefined,
      hook: {
        create: (_: VNode, made: VNode) => drewAs(element, made.elm as Node),
        update: (_: VNode, made: VNode) => drewAs(element, made.elm as Node),
      },
    },
    children(element.props.children),
  );
}

export function renderInto(container: globalThis.Element, tree: unknown): void {
  const sel =
    container.tagName.toLowerCase() +
    (container.id ? `#${container.id}` : "") +
    [...container.classList].map((each) => `.${each}`).join("");
  const next = h(sel, {}, children(tree));
  patch(trees.get(container) ?? container, next);
  trees.set(container, next);
}

export function applyChange(change: Change): void {
  if (change.kind !== "prop") return;
  const node = drawnAs(change.element);
  if (node === undefined || change.prop === "children") return;
  const { prop, value } = change;
  if (
    typeof value === "function" ||
    (typeof value === "object" && value !== null)
  )
    return;
  const element = node as globalThis.Element;
  if (value === null || value === undefined || value === false) {
    element.removeAttribute(prop.toLowerCase());
  } else if (value === true) {
    element.setAttribute(prop.toLowerCase(), "");
  } else {
    element.setAttribute(prop.toLowerCase(), String(value));
  }
}
