import { isElement } from "@backtickjs/js-interpreter";
import type { Element } from "@backtickjs/js-interpreter";

// How each element id renders in a browser. A client dispatches on `id` to pick
// a native component; here the native components are DOM tags.
//
// `Fragment` is the reserved id for a group: it renders its children with no
// node of its own, so it maps to no tag at all.
const tags: { readonly [id: string]: string } = {
  View: "div",
  Text: "span",
  Image: "img",
  Link: "a",
};

const FRAGMENT = "Fragment";

// Props that are wiring rather than attributes, handled on their own.
const handled = new Set(["children", "style", "onPress", "testID", "source"]);

// Style values that are lengths: a bare number means pixels, as in the native
// clients, rather than the unitless value CSS would otherwise read.
const lengths = new Set([
  "borderRadius",
  "borderWidth",
  "bottom",
  "flexBasis",
  "fontSize",
  "gap",
  "height",
  "left",
  "letterSpacing",
  "lineHeight",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "maxHeight",
  "maxWidth",
  "minHeight",
  "minWidth",
  "padding",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "right",
  "top",
  "width",
]);

// Builds the DOM for an element tree. Rebuilt wholesale on a change rather than
// diffed: a preview shows a tree that is small and already fully evaluated, so
// the work is proportional to what is on screen and the fidelity of a real
// reconciler buys nothing here.
export function renderInto(container: globalThis.Element, tree: unknown): void {
  container.replaceChildren(...nodes(tree));
}

function nodes(value: unknown): Node[] {
  if (value === null || value === undefined || value === false) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(nodes);
  }
  if (isElement(value)) {
    return element(value);
  }
  return [document.createTextNode(String(value))];
}

function element(source: Element): Node[] {
  const children = nodes(source.props.children);
  if (source.id === FRAGMENT) {
    return children;
  }
  const tag = tags[source.id];
  if (tag === undefined) {
    throw new Error(
      `No web rendering for <${source.id} />. The web client renders ` +
        `${Object.keys(tags).join(", ")} and ${FRAGMENT}.`,
    );
  }
  const node = document.createElement(tag);

  // A view lays out as a column by default, matching the native clients rather
  // than the block layout a `div` would otherwise take.
  if (source.id === "View") {
    node.style.display = "flex";
    node.style.flexDirection = "column";
  }
  if (source.id === "Image") {
    const image = node as HTMLImageElement;
    const uri = (source.props.source as { uri?: unknown } | undefined)?.uri;
    if (typeof uri === "string") {
      image.src = uri;
    }
    const fit = source.props.resizeMode;
    if (typeof fit === "string") {
      image.style.objectFit = fit === "stretch" ? "fill" : fit;
    }
  }

  applyStyle(node, source.props.style);
  if (typeof source.props.testID === "string") {
    node.dataset.testid = source.props.testID;
  }
  // An action reaches the client as a function, so a press is a plain listener.
  if (typeof source.props.onPress === "function") {
    const press = source.props.onPress as () => void;
    node.style.cursor = "pointer";
    node.addEventListener("click", () => press());
  }
  for (const [prop, value] of Object.entries(source.props)) {
    if (handled.has(prop) || value === null || value === undefined) {
      continue;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      node.setAttribute(prop.toLowerCase(), String(value));
    }
  }

  node.append(...children);
  return [node];
}

function applyStyle(node: HTMLElement, style: unknown): void {
  if (style === null || typeof style !== "object") {
    return;
  }
  for (const [prop, value] of Object.entries(style)) {
    if (value === null || value === undefined) {
      continue;
    }
    const text =
      typeof value === "number" && lengths.has(prop) ? `${value}px` : value;
    node.style.setProperty(
      prop.replace(/[A-Z]/g, (upper) => `-${upper.toLowerCase()}`),
      String(text),
    );
  }
}
