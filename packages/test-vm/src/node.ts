// What a test can ask of a node a bundle drew, over and above what the DOM
// answers: whether a value is a node at all, and what a handler prop became.
//
// A drawing is a real DOM — happy-dom's — so a test reads it the way a page
// would. These are the two questions a page never has to ask and a test does.
//
// The node types come from happy-dom rather than being written again here: what
// a test holds is one of its nodes, and a shape of our own would be a second
// answer to what a node is.

import type { Node } from "happy-dom";

export type { Document, Element, Node } from "happy-dom";

/**
 * Whether a value a bundle answered with is one of the document's nodes.
 *
 * By shape rather than `instanceof`: the nodes came from a page of this test's
 * own, so its `Node` is not this module's, and a realm is not what is being
 * asked about.
 */
export function isNode(value: unknown): value is Node {
  return (
    typeof value === "object" &&
    value !== null &&
    "nodeType" in value &&
    "childNodes" in value
  );
}

/** Whether a node is text, which is the one node that holds no tag. */
export function isText(node: Node): boolean {
  return node.nodeType === 3;
}

// Where happy-dom keeps what `addEventListener` registered: an own symbol,
// unregistered, holding a `Map` per phase. Internal to it, so it is read in one
// place — a snapshot of a drawing says which elements a bundle put a handler
// on, and that is worth what the coupling costs.
type Listeners = { bubbling: Map<string, unknown[]> };

// Found once, off a node that just registered one, and the same symbol for
// every window: happy-dom's own, so asking a node for its own symbols is no use
// — a `<form>` is a proxy there, and answers with none of them.
let symbol: symbol | undefined;

function listenerSymbol(node: Node): symbol {
  if (symbol === undefined) {
    const probe = node.ownerDocument.createElement("div");
    probe.addEventListener("backtick:probe", () => {});
    const found = Object.getOwnPropertySymbols(probe).find(
      (held) => held.description === "listeners",
    );
    if (found === undefined) {
      throw new Error(
        "backtick: happy-dom no longer keeps listeners under `Symbol(listeners)`",
      );
    }
    symbol = found;
  }
  return symbol;
}

function heldBy(node: Node): Listeners | undefined {
  return (
    (node as unknown as Record<symbol, Listeners>)[listenerSymbol(node)] ??
    undefined
  );
}

/**
 * The events this node was given a handler for.
 *
 * A page would ask by firing one; a snapshot cannot, so it asks here. Empty
 * where a node carries none, which is every node a drawing left alone.
 */
export function listenersOf(node: Node): readonly string[] {
  const held = heldBy(node);
  if (held === undefined) {
    return [];
  }
  return [...held.bubbling]
    .filter(([, registered]) => registered.length > 0)
    .map(([event]) => event);
}
