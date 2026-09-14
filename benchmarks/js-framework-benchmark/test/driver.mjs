import { render } from "@backtickjs/test-vm";

// The driver, as the benchmark's own driver would be if there were no browser:
// it opens the app, finds elements by selector, and clicks them. What it drives
// is the interpreter against a host of plain objects, so what a click costs is
// the operations the host was asked for — the same ten a DOM answers with, and
// nothing underneath them.
//
// Upstream's driver talks to Chrome through `clickElement(page, selector)` and
// `checkElementContainsText(page, selector, text)`. The cases here are written
// against the same two, with the same selectors, so a case reads as the
// benchmark defines it rather than as this file makes it convenient.

// Enough of a selector to say what upstream's cases say: an id, a tag, a class,
// `>` for a child, and `:nth-of-type(n)` for which of them.
function parse(selector) {
  return selector.split(">").map((part) => {
    const step = { tag: null, id: null, className: null, nth: null };
    const nth = part.match(/:nth-of-type\((\d+)\)/);
    if (nth !== null) {
      step.nth = Number(nth[1]);
      part = part.replace(nth[0], "");
    }
    const [head, className] = part.split(".");
    step.className = className ?? null;
    if (head.startsWith("#")) {
      step.id = head.slice(1);
    } else if (head !== "") {
      step.tag = head;
    }
    return step;
  });
}

function fits(node, step) {
  if (step.tag !== null && node.tag !== step.tag) return false;
  if (step.id !== null && node.props.id !== step.id) return false;
  if (step.className !== null && node.props.class !== step.className) {
    return false;
  }
  return true;
}

// The nodes a step selects, out of one node's children: `:nth-of-type` counts
// within a tag, as CSS does, so the count runs over the children that share the
// tag rather than over the ones that matched.
function step(nodes, at) {
  const found = [];
  for (const node of nodes) {
    let seen = 0;
    for (const child of node.children) {
      if (child.tag === at.tag || at.tag === null) seen++;
      if (!fits(child, at)) continue;
      if (at.nth !== null && seen !== at.nth) continue;
      found.push(child);
    }
  }
  return found;
}

/**
 * Opens the app: the bundle drawn into plain objects, and the driver that
 * clicks around in it.
 */
export function open(bundle) {
  // Every node the host made, in the order it made them: what a selector
  // searches, since nothing here is a document with a root to descend from.
  const made = [];
  let events = null;

  const record = (event) => {
    if (events !== null) events.push(event);
  };
  const name = (node) => (node === undefined || node === null ? "—" : node.tag);
  // A prop as the log carries it. A handler is a closure, and one closure is
  // not another, so what is written is that it is one.
  const shown = (value) =>
    typeof value === "function"
      ? "[function]"
      : (JSON.stringify(value) ?? "null");

  const element = (tag) => {
    const node = { tag, props: {}, children: [], parent: null, text: null };
    made.push(node);
    return node;
  };

  const host = {
    createElement: (tag) => {
      record(`createElement   ${tag}`);
      return element(tag);
    },
    createTextNode: (value) => {
      // The app's labels are `Math.random()`'s, so what a text node says is not
      // the same twice and is no part of the log.
      record(`createTextNode`);
      const node = element("#text");
      node.text = value;
      return node;
    },
    replaceText: (node, value) => {
      record(`replaceText     ${name(node)}`);
      node.text = value;
    },
    isTextNode: (node) => {
      record(`isTextNode      ${name(node)}`);
      return node.tag === "#text";
    },
    setProperty: (node, prop, value) => {
      record(`setProperty     ${name(node)} ${prop}=${shown(value)}`);
      node.props[prop] = value;
    },
    insertNode: (parent, node, anchor) => {
      record(
        `insertNode      ${name(parent)} <- ${name(node)}` +
          (anchor === undefined ? "" : ` before ${name(anchor)}`),
      );
      // Inserting a node that is already somewhere moves it, as `insertBefore`
      // does: a reordered list is the same nodes in a new order.
      const held = node.parent?.children;
      const was = held?.indexOf(node) ?? -1;
      if (was !== -1) held.splice(was, 1);
      node.parent = parent;
      const at = anchor === undefined ? -1 : parent.children.indexOf(anchor);
      if (at === -1) parent.children.push(node);
      else parent.children.splice(at, 0, node);
    },
    removeNode: (parent, node) => {
      record(`removeNode      ${name(parent)} -> ${name(node)}`);
      const at = parent.children.indexOf(node);
      if (at !== -1) parent.children.splice(at, 1);
      node.parent = null;
    },
    getParentNode: (node) => {
      record(`getParentNode   ${name(node)}`);
      return node.parent ?? undefined;
    },
    getFirstChild: (node) => {
      record(`getFirstChild   ${name(node)}`);
      return node.children[0];
    },
    getNextSibling: (node) => {
      record(`getNextSibling  ${name(node)}`);
      const siblings = node.parent?.children;
      if (siblings === undefined) return undefined;
      return siblings[siblings.indexOf(node) + 1];
    },
  };

  // Somewhere for the drawing to stand. The app's root is a fragment — children
  // where it stands — which is a root that draws more than one node and so has
  // no one value to hand back. Not made by the host, so it stays out of `made`
  // and out of what a selector searches.
  const root = {
    tag: "#root",
    props: {},
    children: [],
    parent: null,
    text: null,
  };
  render(bundle, root, { host });

  // The first step is a search — there is no document to descend from, so it
  // runs over every node the host made — and each step after it is a child of
  // what the one before found.
  const findAll = (selector) => {
    const [first, ...rest] = parse(selector);
    let nodes = made.filter((node) => fits(node, first));
    for (const at of rest) nodes = step(nodes, at);
    return nodes;
  };

  const find = (selector) => {
    const [node] = findAll(selector);
    if (node === undefined) throw new Error(`no element at \`${selector}\``);
    return node;
  };

  // What a node says, its descendants included: a row's `<a>` holds one text
  // node, and a `<td>` holds the text under it.
  const textOf = (node) =>
    node.tag === "#text"
      ? (node.text ?? "")
      : node.children.map(textOf).join("");

  return {
    /**
     * Clicks an element, as a browser dispatches one: the handler is whichever
     * ancestor holds one, since the benchmark clicks the `<span>` inside the
     * remove link and the handler is on the `<a>`.
     */
    click(selector) {
      let node = find(selector);
      for (; node !== null; node = node.parent) {
        const onclick = node.props.onclick;
        if (typeof onclick === "function") {
          onclick();
          return;
        }
      }
      throw new Error(`nothing handles a click at \`${selector}\``);
    },
    exists: (selector) => findAll(selector).length > 0,
    count: (selector) => findAll(selector).length,
    text: (selector) => textOf(find(selector)),
    hasClass: (selector, className) =>
      String(find(selector).props.class ?? "")
        .split(" ")
        .includes(className),
    /**
     * Runs `act` with the host writing down everything it is told, and hands
     * back what it wrote. Only the measured half of a case is recorded — what
     * `init` costs is the benchmark's setup, not its subject.
     */
    record(act) {
      events = [];
      act();
      const written = events;
      events = null;
      return written;
    },
  };
}
