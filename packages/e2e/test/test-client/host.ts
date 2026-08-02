import type { RendererOptions } from "solid-js/universal";

// A host of plain objects: the same ten operations a browser answers with the
// DOM, answered here with objects a test can read. What the suite exercises is
// the interpreter — one implementation, the one every target runs — so what
// this adds is somewhere for it to build, and nothing else.
export interface TestNode {
  // The tag, or `#text` for a text node. Text is the one node that isn't an
  // element, and the host is what knows the difference.
  readonly id: string;
  readonly props: { [prop: string]: unknown };
  readonly children: TestNode[];
  parent: TestNode | null;
  text: string | null;
}

export function isTestNode(value: unknown): value is TestNode {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "props" in value &&
    "children" in value
  );
}

export function isText(node: TestNode): boolean {
  return node.id === "#text";
}

export const testHost: RendererOptions<TestNode> = {
  createElement: (id) => ({
    id,
    props: {},
    children: [],
    parent: null,
    text: null,
  }),
  createTextNode: (value) => ({
    id: "#text",
    props: {},
    children: [],
    parent: null,
    text: value,
  }),
  replaceText: (node, value) => {
    node.text = value;
  },
  isTextNode: isText,
  setProperty: (node, name, value) => {
    node.props[name] = value;
  },
  insertNode: (parent, node, anchor) => {
    // Inserting a node that is already somewhere moves it, as `insertBefore`
    // does: a reordered list is the same nodes in a new order, and leaving the
    // old entry in place would make one node two.
    const held = node.parent?.children;
    const was = held?.indexOf(node) ?? -1;
    if (held !== undefined && was !== -1) {
      held.splice(was, 1);
    }
    node.parent = parent;
    const at = anchor === undefined ? -1 : parent.children.indexOf(anchor);
    if (at === -1) {
      parent.children.push(node);
      return;
    }
    parent.children.splice(at, 0, node);
  },
  removeNode: (parent, node) => {
    const at = parent.children.indexOf(node);
    if (at !== -1) {
      parent.children.splice(at, 1);
    }
    node.parent = null;
  },
  getParentNode: (node) => node.parent ?? undefined,
  getFirstChild: (node) => node.children[0],
  getNextSibling: (node) => {
    const siblings = node.parent?.children;
    if (siblings === undefined) {
      return undefined;
    }
    return siblings[siblings.indexOf(node) + 1];
  },
};
