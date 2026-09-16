// What a test can ask of a node a bundle drew, over and above what the DOM
// answers: whether a value is a node at all, and what a handler prop became.
//
// A drawing is a real DOM — jsdom's — so a test reads it the way a page
// would. These are the two questions a page never has to ask and a test does.
//
// Typed as the DOM's own nodes rather than jsdom's: what a test holds is what
// `screen` and `userEvent` take.

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

// Where jsdom keeps what `addEventListener` registered: on the node's
// implementation, reached through an own symbol, as a list per event type.
// Internal to it, so it is read in one place — a snapshot of a drawing says
// which elements a bundle put a handler on, and that is worth what the
// coupling costs.
type Implementation = { _eventListeners?: Record<string, unknown[]> };

function implementationOf(node: Node): Implementation {
  const symbol = Object.getOwnPropertySymbols(node).find(
    (held) => held.description === "impl",
  );
  if (symbol === undefined) {
    throw new Error(
      "backtick: jsdom no longer keeps a node's implementation under `Symbol(impl)`",
    );
  }
  return (node as unknown as Record<symbol, Implementation>)[symbol]!;
}

/**
 * The events this node was given a handler for.
 *
 * A page would ask by firing one; a snapshot cannot, so it asks here. Empty
 * where a node carries none, which is every node a drawing left alone.
 */
export function listenersOf(node: Node): readonly string[] {
  const held = implementationOf(node)._eventListeners ?? {};
  return Object.entries(held)
    .filter(([, registered]) => registered.length > 0)
    .map(([event]) => event);
}
