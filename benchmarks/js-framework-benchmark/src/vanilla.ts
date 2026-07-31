import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import {
  createDocument,
  element,
  type DomEvent,
  type ElementNode,
} from "./dom.js";
import { SEED, seeded } from "./random.js";

const SOURCE = new URL("../vendor/vanillajs/Main.js", import.meta.url);

export interface Snapshot {
  readonly ids: number[];
  readonly labels: string[];
  // Which row carries `class="danger"`, or -1. The benchmark's own marker for
  // a selected row.
  readonly selected: number;
}

// Only the parts of the reference's own bookkeeping the cross-check reads.
interface VanillaMain {
  readonly store: {
    readonly data: { readonly id: number; readonly label: string }[];
    readonly selected: number | null;
  };
}

export interface Reference {
  clickButton(id: string): void;
  clickRow(index: number, cell: "select" | "remove"): void;
  snapshot(): Snapshot;
  // What `Main.js` believes it rendered, read from its own store rather than
  // from the DOM. Comparing the two is what proves the modelled DOM is not
  // quietly lying — see `verify.tsx`.
  believed(): Snapshot;
}

// The reference implementation, running. The page is built to match the
// benchmark's `index.html`: `#main` around the six buttons, and a table whose
// `tbody` carries the rows.
export function start(): Reference {
  const root = element("div");
  root.id = "main";
  for (const id of ["run", "runlots", "add", "update", "clear", "swaprows"]) {
    const button = element("button");
    button.id = id;
    root.appendChild(button);
  }
  const table = element("table");
  const tbody = element("tbody");
  tbody.id = "tbody";
  table.appendChild(tbody);
  root.appendChild(table);

  const document = createDocument(root);
  const draw = seeded(SEED);
  const context: {
    document: unknown;
    Math: Math;
    console: unknown;
    __main?: VanillaMain;
  } = {
    document,
    // Inherits every other member of `Math`; only `random` is replaced.
    Math: Object.assign(Object.create(Math) as typeof Math, { random: draw }),
    console: { log: () => {} },
  };

  // `Main.js` constructs its instance and keeps no handle on it, and a class
  // declaration is lexical rather than a property of the global, so there is
  // nothing to reach afterwards. The one construction is bound to a name
  // instead — not a second instance, which would attach a second set of
  // listeners. If the reference stops ending this way the replacement fails
  // loudly here rather than skipping the cross-check in silence.
  const source = readFileSync(SOURCE, "utf8");
  const bound = source.replace(
    /\nnew Main\(\);\s*$/,
    "\nglobalThis.__main = new Main();\n",
  );
  if (bound === source) {
    throw new Error(
      "vendored vanillajs no longer ends in `new Main();` — update src/vanilla.ts",
    );
  }
  runInNewContext(bound, context, { filename: SOURCE.pathname });

  const main = context.__main;
  if (main === undefined) {
    throw new Error("vendored vanillajs did not construct");
  }

  const dispatch = (host: ElementNode, target: ElementNode): void => {
    const listeners = host.listeners.get("click") ?? [];
    if (listeners.length === 0) {
      throw new Error(`nothing listening for clicks on #${host.id}`);
    }
    const event: DomEvent = { target, stopPropagation: () => {} };
    for (const listener of listeners) {
      listener(event);
    }
  };

  const byId = (id: string): ElementNode => {
    const found = document.getElementById(id);
    if (found === null) {
      throw new Error(`no #${id}`);
    }
    return found;
  };

  const rows = (): ElementNode[] =>
    byId("tbody").childNodes.filter(
      (node): node is ElementNode => node.kind === "element",
    );

  return {
    clickButton(id) {
      dispatch(byId("main"), byId(id));
    },

    clickRow(index, cell) {
      const row = rows()[index];
      if (row === undefined) {
        throw new Error(`no row ${index} of ${rows().length}`);
      }
      // The label cell is the second, the remove cell the third — and the
      // click lands on the anchor inside, as a real one would.
      const td = row.childNodes[cell === "select" ? 1 : 2];
      if (td === undefined || td.kind !== "element") {
        throw new Error(`row ${index} has no ${cell} cell`);
      }
      const anchor = td.firstChild;
      dispatch(byId("tbody"), anchor?.kind === "element" ? anchor : td);
    },

    snapshot() {
      const drawn = rows();
      return {
        ids: drawn.map((row) => Number(cellText(row, 0))),
        labels: drawn.map((row) => cellText(row, 1)),
        selected: drawn.findIndex((row) => row.className === "danger"),
      };
    },

    believed() {
      const data = main.store.data;
      const chosen = main.store.selected;
      return {
        ids: data.map((row) => row.id),
        labels: data.map((row) => row.label),
        selected:
          chosen === null ? -1 : data.findIndex((row) => row.id === chosen),
      };
    },
  };
}

function cellText(row: ElementNode, index: number): string {
  const cell = row.childNodes[index];
  if (cell === undefined || cell.kind !== "element") {
    throw new Error(`row has no cell ${index}`);
  }
  return cell.textContent;
}
