// The slice of the DOM the vendored vanillajs implementation reaches for,
// modelled rather than imported so the comparison needs no browser — the same
// approach `web-client/test/dom.test.ts` takes.
//
// Every method here is one `vendor/vanillajs/Main.js` actually calls. Anything
// it doesn't call is deliberately absent, and the selector engine throws on
// what it can't answer, so a gap in the model surfaces as a crash rather than
// as a quietly wrong comparison.

export type DomNode = TextNode | ElementNode;

export interface TextNode {
  readonly kind: "text";
  nodeValue: string;
  parentNode: ElementNode | null;
}

export interface ElementNode {
  readonly kind: "element";
  readonly tagName: string;
  id: string;
  className: string;
  readonly attributes: Map<string, string>;
  readonly listeners: Map<string, ((event: DomEvent) => void)[]>;
  childNodes: DomNode[];
  parentNode: ElementNode | null;
  // The expando `Main.js` hangs the row's id on. A real element takes one the
  // same way; the model has to allow it or `getParentId` finds nothing.
  data_id?: number;

  readonly firstChild: DomNode | null;
  readonly nextSibling: DomNode | null;
  textContent: string;
  innerHTML: string;
  appendChild(child: DomNode): DomNode;
  insertBefore(child: DomNode, reference: DomNode | null): DomNode;
  remove(): void;
  cloneNode(deep: boolean): ElementNode;
  matches(selector: string): boolean;
  addEventListener(kind: string, listener: (event: DomEvent) => void): void;
}

export interface DomEvent {
  readonly target: DomNode;
  stopPropagation(): void;
}

export function text(value: string): TextNode {
  return { kind: "text", nodeValue: value, parentNode: null };
}

export function element(tagName: string): ElementNode {
  const self: ElementNode = {
    kind: "element",
    // Uppercase, because `Main.js` compares against "TR" and "TD".
    tagName: tagName.toUpperCase(),
    id: "",
    className: "",
    attributes: new Map(),
    listeners: new Map(),
    childNodes: [],
    parentNode: null,

    get firstChild() {
      return self.childNodes[0] ?? null;
    },

    get nextSibling() {
      const parent = self.parentNode;
      if (parent === null) {
        return null;
      }
      return parent.childNodes[parent.childNodes.indexOf(self) + 1] ?? null;
    },

    get textContent(): string {
      return self.childNodes
        .map((child) =>
          child.kind === "text" ? child.nodeValue : child.textContent,
        )
        .join("");
    },

    // Only ever set to "" — how `removeAllRows` empties the table.
    set textContent(value: string) {
      for (const child of self.childNodes) {
        child.parentNode = null;
      }
      self.childNodes = value === "" ? [] : [text(value)];
    },

    get innerHTML(): string {
      throw new Error("innerHTML is write-only in this model");
    },

    set innerHTML(html: string) {
      for (const child of self.childNodes) {
        child.parentNode = null;
      }
      self.childNodes = [];
      for (const child of parse(html)) {
        self.appendChild(child);
      }
    },

    appendChild(child: DomNode): DomNode {
      return self.insertBefore(child, null);
    },

    // Moves, as the DOM does: `swapRows` exchanges two rows by inserting nodes
    // that are already in the tree, and only a move gives the right answer.
    insertBefore(child: DomNode, reference: DomNode | null): DomNode {
      detach(child);
      const at =
        reference === null
          ? self.childNodes.length
          : self.childNodes.indexOf(reference);
      if (at < 0) {
        throw new Error("insertBefore: reference node is not a child");
      }
      self.childNodes.splice(at, 0, child);
      child.parentNode = self;
      return child;
    },

    remove(): void {
      detach(self);
    },

    cloneNode(deep: boolean): ElementNode {
      const copy = element(tagName);
      copy.id = self.id;
      copy.className = self.className;
      for (const [name, value] of self.attributes) {
        copy.attributes.set(name, value);
      }
      if (deep) {
        for (const child of self.childNodes) {
          copy.appendChild(
            child.kind === "text"
              ? text(child.nodeValue)
              : child.cloneNode(true),
          );
        }
      }
      return copy;
    },

    // `Main.js` only ever asks `#id`. Anything else is a hole in the model.
    matches(selector: string): boolean {
      if (!selector.startsWith("#")) {
        throw new Error(`unsupported selector ${selector}`);
      }
      return self.id === selector.slice(1);
    },

    addEventListener(kind: string, listener: (event: DomEvent) => void): void {
      const existing = self.listeners.get(kind) ?? [];
      existing.push(listener);
      self.listeners.set(kind, existing);
    },
  };
  return self;
}

function detach(node: DomNode): void {
  const parent = node.parentNode;
  if (parent === null) {
    return;
  }
  parent.childNodes.splice(parent.childNodes.indexOf(node), 1);
  node.parentNode = null;
}

export interface FakeDocument {
  createElement(tag: string): ElementNode;
  createTextNode(value: string): TextNode;
  getElementById(id: string): ElementNode | null;
  getElementsByTagName(tag: string): ElementNode[];
}

export function createDocument(root: ElementNode): FakeDocument {
  return {
    createElement: element,
    createTextNode: text,
    getElementById: (id) => search(root, (node) => node.id === id),
    getElementsByTagName: (tag) => {
      const wanted = tag.toUpperCase();
      const found: ElementNode[] = [];
      walk(root, (node) => {
        if (node.tagName === wanted) {
          found.push(node);
        }
      });
      return found;
    },
  };
}

export function walk(
  node: ElementNode,
  visit: (node: ElementNode) => void,
): void {
  visit(node);
  for (const child of node.childNodes) {
    if (child.kind === "element") {
      walk(child, visit);
    }
  }
}

function search(
  node: ElementNode,
  match: (node: ElementNode) => boolean,
): ElementNode | null {
  let found: ElementNode | null = null;
  walk(node, (candidate) => {
    if (found === null && match(candidate)) {
      found = candidate;
    }
  });
  return found;
}

// Enough HTML to read the one template `Main.js` assigns to `innerHTML`: open
// and close tags with single-quoted attributes, and text between them. It is
// not a parser for the language, and says so when it meets anything else.
function parse(html: string): DomNode[] {
  const roots: DomNode[] = [];
  const open: ElementNode[] = [];
  const push = (node: DomNode): void => {
    const parent = open[open.length - 1];
    if (parent === undefined) {
      roots.push(node);
    } else {
      parent.appendChild(node);
    }
  };

  let at = 0;
  while (at < html.length) {
    const next = html.indexOf("<", at);
    if (next < 0) {
      pushText(html.slice(at));
      break;
    }
    if (next > at) {
      pushText(html.slice(at, next));
    }
    const close = html.indexOf(">", next);
    if (close < 0) {
      throw new Error("unterminated tag");
    }
    const tag = html.slice(next + 1, close).trim();
    at = close + 1;
    if (tag.startsWith("/")) {
      const finished = open.pop();
      if (
        finished === undefined ||
        finished.tagName !== tag.slice(1).toUpperCase()
      ) {
        throw new Error(`mismatched </${tag.slice(1)}>`);
      }
      continue;
    }
    const [name = "", ...rest] = tag.split(/\s+/);
    const node = element(name);
    for (const [, attribute, value] of rest
      .join(" ")
      .matchAll(/([\w-]+)='([^']*)'/g)) {
      if (attribute === "class") {
        node.className = value ?? "";
      } else if (attribute === "id") {
        node.id = value ?? "";
      } else {
        node.attributes.set(attribute ?? "", value ?? "");
      }
    }
    push(node);
    open.push(node);
  }
  if (open.length > 0) {
    throw new Error("unclosed tag");
  }
  return roots;

  function pushText(value: string): void {
    if (value.length > 0) {
      push(text(value));
    }
  }
}
