// What a drawing writes to the page, as the page reports it to an observer.
//
// These tests pin how much a change costs rather than what it ends up drawing:
// a list that rebuilds every row to change one draws the same page as one that
// changes the one. An observer reports every write, including one that sets
// what was already there, so a write nothing needed shows up as a line.

// A node as a record names it: an element by tag and id, a text node by what
// it says.
function named(node: Node | null): string {
  if (node === null) {
    return "end";
  }
  if (node instanceof Element) {
    return node.id === "" ? node.localName : `${node.localName}#${node.id}`;
  }
  return JSON.stringify(node.nodeValue);
}

function described(record: MutationRecord): string[] {
  const target = named(record.target);
  if (record.type === "attributes") {
    const now = (record.target as Element).getAttribute(record.attributeName!);
    return [
      `${target} ${record.attributeName}: ${JSON.stringify(record.oldValue)} → ${JSON.stringify(now)}`,
    ];
  }
  if (record.type === "characterData") {
    return [
      `text: ${JSON.stringify(record.oldValue)} → ${named(record.target)}`,
    ];
  }
  return [
    ...[...record.removedNodes].map((node) => `${target} − ${named(node)}`),
    ...[...record.addedNodes].map(
      (node) =>
        `${target} + ${named(node)} before ${named(record.nextSibling)}`,
    ),
  ];
}

/**
 * Watches everything under `node`, and hands back a function that returns
 * what was written since it was last called.
 */
export function watchWrites(node: Node): () => string[] {
  const records: MutationRecord[] = [];
  // Kept as they arrive: a click is awaited, and the observer reports
  // meanwhile.
  const observer = new MutationObserver((arrived) => records.push(...arrived));
  observer.observe(node, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  });
  return () =>
    [...records.splice(0), ...observer.takeRecords()].flatMap(described);
}
