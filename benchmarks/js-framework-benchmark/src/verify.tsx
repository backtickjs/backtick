import { bundle } from "@backtickjs/core";
import { evaluate, isElement } from "@backtickjs/js-interpreter";
import type { Element } from "@backtickjs/js-interpreter";
import { Main } from "./Main.js";
import { start, type Reference, type Snapshot } from "./vanilla.js";

// Does backtick's app do what the reference does?
//
// The vendored vanillajs runs against a modelled DOM (`dom.ts`), backtick's app
// runs in the interpreter, and both draw their rows from the same seeded stream
// — so a difference in what comes out is a difference in what an operation did,
// not in what it was given.
//
// The modelled DOM is load-bearing, so it is checked too: the reference keeps
// its own record of what it rendered, and `believed` reads that record while
// `snapshot` reads the DOM. Those two disagreeing means the model is wrong, and
// is reported separately from the two implementations disagreeing.

type Op =
  | { readonly button: string }
  | { readonly row: number; readonly cell: "select" | "remove" };

interface Case {
  readonly name: string;
  readonly setup: readonly Op[];
  readonly op: Op;
  // Set where the pool deviation (GAPS.md) makes the rows themselves
  // incomparable, leaving the shape of the operation to compare instead.
  readonly countOnly?: string;
}

const CASES: readonly Case[] = [
  { name: "create rows (1k)", setup: [], op: { button: "run" } },
  {
    name: "replace all rows (1k)",
    setup: [{ button: "run" }],
    op: { button: "run" },
    countOnly:
      "the reference generates fresh rows; this app re-slices the same pool",
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

const payload = await bundle(<Main />);

console.log("");
console.log(
  pad("operation", 36) + pad("rows", 9) + pad("model", 8) + "vs vanillajs",
);
console.log("-".repeat(75));

let failed = 0;
for (const testCase of CASES) {
  const reference = start();
  const tree = evaluate(payload, () => {}) as Element;
  for (const op of [...testCase.setup, testCase.op]) {
    pressReference(reference, op);
    pressBacktick(tree, op);
  }

  const rendered = reference.snapshot();
  const model = same(rendered, reference.believed());
  const ours = readBacktick(tree);
  const verdict = testCase.countOnly
    ? ours.labels.length === rendered.labels.length &&
      ours.selected === rendered.selected
      ? `count only — ${testCase.countOnly}`
      : "DIFFERS"
    : same(ours, rendered)
      ? "match"
      : `DIFFERS — ${difference(ours, rendered)}`;

  if (!model || verdict.startsWith("DIFFERS")) {
    failed++;
  }
  console.log(
    pad(testCase.name, 36) +
      pad(rendered.labels.length.toLocaleString("en-US"), 9) +
      pad(model ? "ok" : "WRONG", 8) +
      verdict,
  );
}
console.log("");

if (failed > 0) {
  console.log(`${failed} of ${CASES.length} cases need attention`);
  process.exitCode = 1;
}

function same(left: Snapshot, right: Snapshot): boolean {
  return (
    left.selected === right.selected &&
    left.ids.length === right.ids.length &&
    left.ids.every((id, at) => id === right.ids[at]) &&
    left.labels.every((label, at) => label === right.labels[at])
  );
}

function difference(ours: Snapshot, theirs: Snapshot): string {
  if (ours.labels.length !== theirs.labels.length) {
    return `${ours.labels.length} rows against ${theirs.labels.length}`;
  }
  if (ours.selected !== theirs.selected) {
    return `selected row ${ours.selected} against ${theirs.selected}`;
  }
  const at = ours.labels.findIndex(
    (label, index) => label !== theirs.labels[index],
  );
  if (at >= 0) {
    return `row ${at} is "${ours.labels[at]}" against "${theirs.labels[at]}"`;
  }
  const id = ours.ids.findIndex((value, index) => value !== theirs.ids[index]);
  return id >= 0
    ? `row ${id} has id ${ours.ids[id]} against ${theirs.ids[id]}`
    : "?";
}

function pressReference(reference: Reference, op: Op): void {
  if ("button" in op) {
    reference.clickButton(op.button);
  } else {
    reference.clickRow(op.row, op.cell);
  }
}

function pressBacktick(tree: Element, op: Op): void {
  const target =
    "button" in op ? handler(tree, op.button) : rowHandler(tree, op);
  if (typeof target !== "function") {
    throw new Error(`no handler for ${JSON.stringify(op)}`);
  }
  target();
}

function handler(tree: Element, testID: string): unknown {
  const found = find(tree, (element) => element.props.testID === testID);
  if (found === null) {
    throw new Error(`no element with testID ${testID}`);
  }
  return found.props.onPress;
}

function rowHandler(
  tree: Element,
  op: { readonly row: number; readonly cell: "select" | "remove" },
): unknown {
  const row = rowsOf(tree)[op.row];
  if (row === undefined) {
    throw new Error(`no row ${op.row}`);
  }
  return children(row)[op.cell === "select" ? 1 : 2]?.props.onPress;
}

function readBacktick(tree: Element): Snapshot {
  const rows = rowsOf(tree);
  return {
    ids: rows.map((row) => Number(textOf(children(row)[0]))),
    labels: rows.map((row) => textOf(children(row)[1])),
    // The row drawn in the reference's `danger` colour, which is how this app
    // spells a selection — there is no `class` to compare (GAPS.md, gap G).
    selected: rows.findIndex(
      (row) =>
        (row.props.style as { backgroundColor?: string })?.backgroundColor ===
        "#d9534f",
    ),
  };
}

function rowsOf(tree: Element): Element[] {
  const table = find(tree, (element) => element.props.testID === "table");
  if (table === null) {
    throw new Error("no table");
  }
  return children(table);
}

function textOf(element: Element | undefined): string {
  if (element === undefined) {
    return "";
  }
  const collect = (value: unknown): string => {
    if (Array.isArray(value)) {
      return value.map(collect).join("");
    }
    if (isElement(value)) {
      return collect(value.props.children);
    }
    return value === null || value === undefined ? "" : String(value);
  };
  return collect(element.props.children);
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

function pad(value: string, width: number): string {
  return value.padEnd(width, " ");
}
