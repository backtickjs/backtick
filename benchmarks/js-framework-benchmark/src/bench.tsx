import { bundle } from "@backtickjs/core";
import { evaluate, isElement } from "@backtickjs/js-interpreter";
import type { Element } from "@backtickjs/js-interpreter";
import { Main } from "./Main.js";

// The benchmark's operations, timed without a browser.
//
// A client is the interpreter plus a host that draws what it evaluates, and the
// interpreter is the same one every host runs — so the cost measured here is
// the cost every client pays before it touches a screen. What a browser adds on
// top is the DOM work, and `rebuilt` is the size of it: the web client replaces
// every node on every change, so an operation that touches one row still hands
// the DOM the whole table.

const REPEATS = Number(process.env.REPEATS ?? 5);

interface Case {
  readonly name: string;
  // Operations to run before the one being timed, so it is measured against
  // the state the benchmark measures it against.
  readonly setup: readonly Op[];
  readonly op: Op;
}

type Op =
  | { readonly button: string }
  | { readonly row: number; readonly cell: "select" | "remove" };

const CASES: readonly Case[] = [
  { name: "create rows (1k)", setup: [], op: { button: "run" } },
  {
    name: "replace all rows (1k)",
    setup: [{ button: "run" }],
    op: { button: "run" },
  },
  {
    name: "partial update (every 10th of 1k)",
    setup: [{ button: "run" }],
    op: { button: "update" },
  },
  {
    name: "select row (of 1k)",
    setup: [{ button: "run" }],
    op: { row: 0, cell: "select" },
  },
  {
    name: "swap rows (of 1k)",
    setup: [{ button: "run" }],
    op: { button: "swaprows" },
  },
  {
    name: "remove row (of 1k)",
    setup: [{ button: "run" }],
    op: { row: 0, cell: "remove" },
  },
  { name: "create many rows (10k)", setup: [], op: { button: "runlots" } },
  {
    name: "append rows (1k to 10k)",
    setup: [{ button: "runlots" }],
    op: { button: "add" },
  },
  {
    name: "clear rows (10k)",
    setup: [{ button: "runlots" }],
    op: { button: "clear" },
  },
];

// Bundled as an element, not by calling `Main()`: a component's `state` needs
// the instance the element creates around it.
const payload = await bundle(<Main />);
const wire = JSON.stringify(payload);

const startup = measure(() => {
  evaluate(payload, () => {});
});

console.log("");
console.log(`bundle        ${kb(wire.length)} of JSON`);
console.log(
  `startup       ${ms(startup)} to evaluate, ${count(fresh())} elements`,
);
console.log("");
console.log(pad("operation", 36) + pad("interpreter", 14) + "elements rebuilt");
console.log("-".repeat(68));

for (const testCase of CASES) {
  const samples: number[] = [];
  let rebuilt = 0;
  for (let repeat = 0; repeat < REPEATS; repeat++) {
    const tree = fresh();
    for (const op of testCase.setup) {
      press(tree, op);
    }
    samples.push(measure(() => press(tree, testCase.op)));
    rebuilt = count(tree);
  }
  const median = samples.sort((a, b) => a - b)[Math.floor(samples.length / 2)];
  console.log(
    pad(testCase.name, 36) +
      pad(ms(median ?? 0), 14) +
      rebuilt.toLocaleString("en-US"),
  );
}
console.log("");

function fresh(): Element {
  // Re-evaluated per repeat: cells are per instance, so a fresh instance is a
  // fresh page — which is how the benchmark measures every operation.
  return evaluate(payload, () => {}) as Element;
}

function press(tree: Element, op: Op): void {
  const target = "button" in op ? button(tree, op.button) : cell(tree, op);
  if (typeof target !== "function") {
    throw new Error(`no handler for ${JSON.stringify(op)}`);
  }
  target();
}

function button(tree: Element, testID: string): unknown {
  const found = find(tree, (element) => element.props.testID === testID);
  if (found === null) {
    throw new Error(`no element with testID ${testID}`);
  }
  return found.props.onPress;
}

function cell(
  tree: Element,
  op: { readonly row: number; readonly cell: "select" | "remove" },
): unknown {
  const table = find(tree, (element) => element.props.testID === "table");
  if (table === null) {
    throw new Error("no table");
  }
  const rows = children(table);
  const row = rows[op.row];
  if (row === undefined) {
    throw new Error(`no row ${op.row} in a table of ${rows.length}`);
  }
  // The row's cells are id, label, remove: the label selects and the last
  // removes, which is the pair the benchmark's driver clicks.
  const cells = children(row);
  return cells[op.cell === "select" ? 1 : 2]?.props.onPress;
}

function children(element: Element): Element[] {
  const out: Element[] = [];
  const walk = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (isElement(value)) {
      out.push(value);
    }
  };
  walk(element.props.children);
  return out;
}

function find(
  element: Element,
  predicate: (element: Element) => boolean,
): Element | null {
  if (predicate(element)) {
    return element;
  }
  for (const child of children(element)) {
    const found = find(child, predicate);
    if (found !== null) {
      return found;
    }
  }
  return null;
}

function count(value: unknown): number {
  if (Array.isArray(value)) {
    return value.reduce<number>((total, item) => total + count(item), 0);
  }
  if (!isElement(value)) {
    return 0;
  }
  return 1 + count(value.props.children);
}

function measure(run: () => void): number {
  const started = process.hrtime.bigint();
  run();
  return Number(process.hrtime.bigint() - started) / 1e6;
}

function ms(value: number): string {
  return `${value.toFixed(2)} ms`;
}

function kb(bytes: number): string {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function pad(value: string, width: number): string {
  return value.padEnd(width, " ");
}
