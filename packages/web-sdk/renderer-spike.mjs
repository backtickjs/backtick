// The DOM half handed to `solid-js/universal`, as `solid-spike.mjs` did for the
// graph: our shape modelled on the library's primitives, to find out what is
// left for us to write.
//
// `createRenderer` takes ten node operations and returns `render`, `insert`,
// `spread`, `effect` — the whole of dom-expressions' reconciliation over
// whatever a node is. The nodes here are plain objects, so this runs under Node
// and the tree can be read back and asserted on.
//
// Run with `node --conditions=browser`: `universal.js` imports a bare
// `solid-js`, which Node otherwise resolves to the server build, where a write
// does nothing and says nothing about it.
import { createRenderer } from "solid-js/universal";
import { createSignal, createMemo, mapArray, createRoot } from "solid-js";

const log = [];
const say = (what) => log.push(what);

// The ten primitives. Every one is a line, and the only one carrying a decision
// is `setProperty` — which is the point: our attribute conventions stay ours
// rather than becoming a library's to map onto.
let made = 0;
const { insert, effect, setProp, createElement, insertNode } = createRenderer({
  createElement: (tag) => ({ tag, props: {}, children: [], parent: null, n: ++made }),
  createTextNode: (value) => ({ text: value, parent: null, n: ++made }),
  replaceText: (node, value) => {
    node.text = value;
  },
  isTextNode: (node) => node.text !== undefined,
  setProperty: (node, name, value) => {
    // Ours, unchanged: an element names its own events, and everything else is
    // an attribute. This is the whole of what the library asks us to decide.
    if (name.startsWith("on") && typeof value === "function") {
      node.props[name] = "[handler]";
      return;
    }
    if (value === null || value === undefined || value === false) {
      delete node.props[name];
      return;
    }
    node.props[name] = value;
  },
  insertNode: (parent, node, anchor) => {
    // `insertBefore` moves a node that is already placed rather than copying
    // it, and the reconciler leans on that when it reorders — so this takes it
    // out of where it was first.
    const held = node.parent?.children.indexOf(node) ?? -1;
    if (held !== -1) node.parent.children.splice(held, 1);
    node.parent = parent;
    const at = anchor ? parent.children.indexOf(anchor) : -1;
    if (at === -1) parent.children.push(node);
    else parent.children.splice(at, 0, node);
  },
  removeNode: (parent, node) => {
    const at = parent.children.indexOf(node);
    if (at !== -1) parent.children.splice(at, 1);
    node.parent = null;
  },
  getParentNode: (node) => node.parent ?? undefined,
  getFirstChild: (node) => node.children?.[0],
  getNextSibling: (node) => {
    const kids = node.parent?.children ?? [];
    return kids[kids.indexOf(node) + 1];
  },
});

// The benchmark's row, built the way the interpreter would build it once props
// and children are accessors: one effect per dynamic prop, statics written
// straight in. Eight elements, three dynamic props — the real shape.
let propRuns = 0;
let rowBuilds = 0;

function TableRow(row, selected) {
  rowBuilds++;
  const tr = createElement("tr");
  // A dynamic prop: an effect the *renderer* owns, over an accessor the
  // interpreter hands it. Nothing is pushed and nothing is notified.
  effect(() => {
    propRuns++;
    setProp(tr, "class", selected() === row.id ? "danger" : "");
  });

  const id = createElement("td");
  setProp(id, "class", "col-md-1"); // static: no effect at all
  insert(id, () => row.id);
  insertNode(tr, id);

  const labelCell = createElement("td");
  setProp(labelCell, "class", "col-md-4");
  const anchor = createElement("a");
  setProp(anchor, "onclick", () => {});
  insert(anchor, () => row.label);
  insertNode(labelCell, anchor);
  insertNode(tr, labelCell);

  const removeCell = createElement("td");
  setProp(removeCell, "class", "col-md-1");
  const removeLink = createElement("a");
  setProp(removeLink, "onclick", () => {});
  const glyph = createElement("span");
  setProp(glyph, "class", "glyphicon glyphicon-remove");
  setProp(glyph, "aria-hidden", "true");
  insertNode(removeLink, glyph);
  insertNode(removeCell, removeLink);
  insertNode(tr, removeCell);

  const spare = createElement("td");
  setProp(spare, "class", "col-md-6");
  insertNode(tr, spare);
  return tr;
}

const root = createElement("tbody");
let app;
const dispose = createRoot((dispose) => {
  const [rows, setRows] = createSignal([
    { id: 1, label: "one" },
    { id: 2, label: "two" },
    { id: 3, label: "three" },
  ]);
  const [selected, setSelected] = createSignal(0);
  // Keyed identity is `mapArray`'s: one owner per row, kept across a removal.
  const drawn = createMemo(mapArray(rows, (row) => TableRow(row, selected)));
  insert(root, drawn);
  app = { setRows, setSelected, rows };
  return dispose;
});

const ids = () => root.children.map((tr) => tr.children[0].children[0].text);
const nodes = () => root.children.map((tr) => tr.n);
const classes = () => root.children.map((tr) => tr.props.class ?? "");

say(`built      rows=${ids()} nodes=${nodes()} builds=${rowBuilds}`);

const before = nodes();
propRuns = 0;
rowBuilds = 0;
app.setSelected(2);
say(`select 2   class=${JSON.stringify(classes())} propRuns=${propRuns} rebuilds=${rowBuilds}`);
say(`           nodes unchanged: ${JSON.stringify(nodes()) === JSON.stringify(before)}`);

rowBuilds = 0;
app.setRows((was) => was.filter((r) => r.id !== 2));
say(`remove 2   rows=${ids()} nodes=${nodes()} rebuilds=${rowBuilds}`);
say(`           kept row 1 and 3 nodes: ${nodes()[0] === before[0] && nodes()[1] === before[2]}`);

rowBuilds = 0;
app.setRows((was) => [was[1], was[0]]);
say(`swap       rows=${ids()} nodes=${nodes()} rebuilds=${rowBuilds}`);

rowBuilds = 0;
propRuns = 0;
dispose();
app.setSelected(1);
say(`disposed   propRuns after write=${propRuns} (expect 0)`);

console.log(log.join("\n"));
