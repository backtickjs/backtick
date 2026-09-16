import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import type {
  BacktickElement,
  Client,
  ReadonlyState,
  State,
} from "@backtickjs/core";
import { render } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "./snapshotCase.ts";

// The behavior side of per-instance state: a write has to persist, move
// everything that read the cell, and leave every other instance alone.
//
// The nodes are built once and never rebuilt, so the ones these tests hold are
// the ones a write moves: reading a prop again after a write is reading what
// the host was told, which is the whole of what a host would have drawn.

// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs`{
    const size = $state(16);
    return (
      <span
        style={"font-size: " + size.read() + "px"}
        onclick={() => {
          size.write(size.read() + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a cell of its own.
async function OwnCounter() {
  return cs`{
    const size = $state(16);
    return (
      <span
        style={"font-size: " + size.read() + "px"}
        onclick={() => {
          size.write(size.read() + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

const instances = (
  <div>
    <OwnCounter />
    <OwnCounter />
  </div>
);

// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }: { size: Client<State<number>> }) => (
  <span
    style={cs`"font-size: " + $size.read() + "px"`}
    onclick={cs`() => {
      $size.write($size.read() + 1);
    }`}
  >
    press
  </span>
);

async function SharingPanel() {
  return cs`{
    const size = $state(16);
    return (
      <div>
        <SharedCounter size={size} />
        <SharedCounter size={size} />
      </div>
    );
  }`;
}

// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function UpdatingStepper() {
  return cs`{
    const size = $state(16);
    return (
      <span
        style={"font-size: " + size.read() + "px"}
        onclick={() => {
          size.update((current: number) => current + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs`{
    const ids = $state<number[]>([1, 2, 3]);
    const swap = () => {
      ids.update((held) => held.with(0, held[2]).with(2, held[0]));
    };
    const drop = () => {
      ids.update((held) => held.filter((id) => id !== 2));
    };
    return (
      <div>
        <span onclick={swap}>swap</span>
        <span onclick={drop}>drop</span>
        <div>
          <For each={ids.read()}>
            {(id: number) => <span>{"row " + id}</span>}
          </For>
        </div>
      </div>
    );
  }`;
}

// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs`{
    const names = $state<string[]>(["a", "b", "c"]);
    const rotate = () => {
      names.update((held) => [held[2], held[0], held[1]]);
    };
    return (
      <div>
        <span onclick={rotate}>rotate</span>
        <div>
          <For each={names.read()}>
            {(name: string, index: ReadonlyState<number>) => (
              <span>{name + " at " + index.read()}</span>
            )}
          </For>
        </div>
      </div>
    );
  }`;
}

// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the cell never reads it, so a write reaches each `ReadingRow` with
// the arguments it already had — the same handle object, the same id.
//
// Nothing a row was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale: a handle is one object
// whatever its cell holds. The branch is the half no amount of recomputing a
// prop can answer for.
const ReadingRow = async ({
  id,
  selected,
}: {
  id: Client<number>;
  selected: Client<State<number>>;
}) => (
  <div>
    <span
      style={cs`"font-size: " + ($selected.read() === $id ? 20 : 16) + "px"`}
    >
      {cs`"row " + $id + " of " + $selected.read()`}
    </span>
    {cs`$selected.read() === $id ? ${(<span>marker</span>)} : null`}
  </div>
);

async function ReadingPanel() {
  return cs`{
    const selected = $state(0);
    return (
      <div>
        <span onclick={() => selected.write(1)}>select</span>
        <ReadingRow id={0} selected={selected} />
        <ReadingRow id={1} selected={selected} />
      </div>
    );
  }`;
}

// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had, and the host must not hear about it.
async function SelectableRows() {
  return cs`{
    const selected = $state(0);
    return (
      <div>
        <span onclick={() => selected.write(1)}>select</span>
        <div>
          <For each={[0, 1, 2]}>
            {(id: number) => (
              <a href={selected.read() === id ? "#open" : "#closed"}>
                {"row " + id}
              </a>
            )}
          </For>
        </div>
      </div>
    );
  }`;
}

type Row = {
  readonly id: number;
  readonly label: State<string>;
};

// A list whose members carry storage of their own: `build` declares a cell per
// row, and the cell the list reads holds those cells along with the rows. A
// press writes into one row's cell, so only what read that cell runs again —
// the array is the array it was, and no other row moves.
//
// What a cell starts at is the other half of this: the initial is a call here,
// not data, which is what a cell declared where it is evaluated allows.
async function MemberRows() {
  return cs`{
    const build = (from: number) => {
      return Array.from({ length: 3 }, (_, at) => {
        return { id: from + at, label: $state("row " + (from + at)) };
      });
    };

    const held = $state(build(1));

    return (
      <div>
        <ul class="rows">
          <For each={held.read()}>
            {(row: Row) => (
              <li onclick={() => row.label.write("pressed")}>
                {row.label.read()}
              </li>
            )}
          </For>
        </ul>
      </div>
    );
  }`;
}

// Storage a script declares for itself, rather than one a component owns and
// splices in. `$state(...)` is an ordinary call of an imported value, and the
// cell is what the call answers with: each time it is evaluated there is
// another cell, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs`(label: string) => {
    return { label: $state(label) };
  }`;

  return (
    <span
      style={cs`"font-size: 16px"`}
      onclick={cs`() => {
        const row = $build("one");
        row.label.write(row.label.read() + " !!!");
      }`}
    >
      {cs`$build("one").label.read()`}
    </span>
  );
}

// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the cell holds `Color` rather than
// `Color.Red`, so the other member is a value it takes. What a splice hands
// over keeps the width the host gave it: `cs.splice` reads it back unbound, and
// the binding it lands in decides the width the way TypeScript decides every
// other one — a member to its enum, as a `let` would.
enum Color {
  Red = 0,
  Blue = 1,
}

const colorName: Client<(c: Color) => string> = cs`(c: Color) => {
  return c === ${Color.Blue} ? "blue" : "red";
}`;

async function Swatch() {
  return cs`{
    const held = $state(${Color.Red});
    return (
      <span onclick={() => held.write(${Color.Blue})}>
        {$colorName(held.read())}
      </span>
    );
  }`;
}

// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type, and `$state` takes its
// initial unbound so that every other kind does widen. Written out, the type
// argument is the contextual type — `$state<() => number>` holds a function
// answering with any number rather than only the one it was built from.
//
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
enum Tone {
  Warm = "warm",
  Cool = "cool",
}

async function Widened() {
  return cs`{
    const flag = $state(true);
    const tone = $state(${Tone.Warm});
    const step = $state<() => number>(() => 0);
    return (
      <span
        onclick={() => {
          flag.write(false);
          tone.write(${Tone.Cool});
          step.write(() => 1);
        }}
      >
        {flag.read() + " " + tone.read() + " " + step.read()()}
      </span>
    );
  }`;
}

// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs`(initial: number) => {
  const count = $state(initial);
  return {
    read: () => count.read(),
    add: (n: number) => {
      count.write(count.read() + n);
    },
  };
}`;

const statefulObject = cs`{
  const c = $counter(10);
  return (
    <button
      onclick={() => {
        c.add(5);
      }}
    >
      {c.read()}
    </button>
  );
}`;

// What an element drew, as the one element it put in the page.
async function drawn(value: BacktickElement): Promise<Element> {
  const { container } = await render(value);
  const node = container.firstElementChild;
  assert.ok(node !== null, "expected a rendered element");
  return node;
}

// The size a node's style names. The web's `style` is the attribute HTML has —
// a string — so what a cell holds is read back out of the CSS rather than off
// a member.
function fontSize(node: Element): unknown {
  const style = node.getAttribute("style");
  assert.equal(typeof style, "string", "expected a style");
  const found = /font-size:\s*(\d+)px/.exec(style as string);
  return found === null ? undefined : Number(found[1]);
}

// What a node says, as the document holds it.
function text(node: Node): unknown {
  return node.firstChild?.nodeValue;
}

function children(node: Element): Element[] {
  const held = [...node.children];
  assert.ok(held.length > 0, "expected several children");
  return held;
}

// What one `ReadingRow` draws, in the three positions it read the cell from: a
// prop, a text child, and a branch.
function readRow(row: Element): {
  size: unknown;
  text: unknown;
  marked: boolean;
} {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.firstChild?.nodeValue,
    marked: marker !== undefined,
  };
}

describe("local state", () => {
  it("renders the cell's initial value", async () => {
    const text = await drawn(<Stepper />);
    assert.equal(fontSize(text), 16);
  });

  it("a write persists and re-renders the instance", async () => {
    const text = await drawn(<Stepper />);
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
  });

  it("the display and the handler share one cell", async () => {
    const text = await drawn(<Stepper />);
    // Each write reads the value the previous one stored — the handler's
    // `read()` and the display's are the same cell, not two snapshots.
    await userEvent.click(text);
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 19);
  });

  it("a handle captured before a write keeps working after it", async () => {
    const text = await drawn(<Stepper />);
    // The host holds the handler across re-renders; the handle resolves its
    // cell by name at call time, so the stale closure still writes the
    // instance's live storage. One registration per event, reading whatever
    // the prop holds now — so the click after a write runs the handler the
    // write left behind, not the one that was registered first.
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });

  it("two invocations of one component hold independent cells", async () => {
    const view = await drawn(instances);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });

  it("a cell passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(<SharingPanel />);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the cell and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });

  it("`update` derives the next value from the current one", async () => {
    const text = await drawn(<UpdatingStepper />);
    assert.equal(fontSize(text), 16);
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });

  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await drawn(<SwappableRows />);
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = [...list.children];
    await userEvent.click(swap);
    assert.deepEqual([...list.children].map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal([...list.children][0], third);
    assert.equal([...list.children][2], first);
  });

  it("a list a row was dropped from draws the rest", async () => {
    const view = await drawn(<SwappableRows />);
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = [...list.children];
    await userEvent.click(drop);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual([...list.children], [first, third]);
  });

  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn(<RotatingRows />);
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });

  it("a child redraws everything it read of a cell it was handed", async () => {
    const view = await drawn(<ReadingPanel />);
    const [button, ...rows] = children(view);
    assert.ok(button !== undefined && rows.length === 2);
    // Nothing either row was given changes across the write — the same handle
    // object and the same id — so every assertion here is one the arguments
    // alone cannot answer. A prop, a text child, and a branch, per row.
    assert.deepEqual(rows.map(readRow), [
      { size: 20, text: "row 0 of 0", marked: true },
      { size: 16, text: "row 1 of 0", marked: false },
    ]);
    await userEvent.click(button);
    assert.deepEqual(rows.map(readRow), [
      { size: 16, text: "row 0 of 1", marked: false },
      { size: 20, text: "row 1 of 1", marked: true },
    ]);
  });

  // A prop re-runs when something it read was written, which is not the same as
  // holding anything new: a cell a whole list reads decides one row's prop, and
  // every other row recomputes the value it already had. The host hears about
  // the two that moved and nothing else — a write per row per selection is what
  // a list of any size would otherwise cost.
  it("a prop that recomputed to what it held is not set again", async () => {
    const view = await drawn(<SelectableRows />);
    const [select, list] = children(view);
    assert.ok(select !== undefined && list !== undefined);

    // What the drawing wrote, watched the way a page watches itself: an
    // observer reports a write even where what it wrote is what the attribute
    // already held, which is the whole question here. Records are kept as
    // they arrive, since a click is awaited and the observer reports meanwhile.
    const records: MutationRecord[] = [];
    const watching = new MutationObserver((arrived) =>
      records.push(...arrived),
    );
    watching.observe(view, { attributes: true, subtree: true });
    const written = (): unknown[][] =>
      [...records.splice(0), ...watching.takeRecords()].map((record) => [
        [...list.children].indexOf(record.target as Element),
        record.attributeName,
        (record.target as Element).getAttribute(record.attributeName!),
      ]);

    const href = (): unknown[] =>
      [...list.children].map((row) => row.getAttribute("href"));
    assert.deepEqual(href(), ["#open", "#closed", "#closed"]);
    written();
    await userEvent.click(select);
    assert.deepEqual(href(), ["#closed", "#open", "#closed"]);
    // The row that was selected and the row now selected, in the order they
    // were built. The third row read the cell too, and had nothing to say.
    assert.deepEqual(written(), [
      [0, "href", "#closed"],
      [1, "href", "#open"],
    ]);
  });
});

describe("what each case compiles and bundles to", () => {
  it("Stepper", async (t) => {
    await snapshotCase(t, "Stepper", <Stepper />);
  });

  it("instances", async (t) => {
    await snapshotCase(t, "instances", instances);
  });

  it("SharingPanel", async (t) => {
    await snapshotCase(t, "SharingPanel", <SharingPanel />);
  });

  it("UpdatingStepper", async (t) => {
    await snapshotCase(t, "UpdatingStepper", <UpdatingStepper />);
  });

  it("SwappableRows", async (t) => {
    await snapshotCase(t, "SwappableRows", <SwappableRows />);
  });

  it("RotatingRows", async (t) => {
    await snapshotCase(t, "RotatingRows", <RotatingRows />);
  });

  it("ReadingPanel", async (t) => {
    await snapshotCase(t, "ReadingPanel", <ReadingPanel />);
  });

  it("SelectableRows", async (t) => {
    await snapshotCase(t, "SelectableRows", <SelectableRows />);
  });

  it("MemberRows", async (t) => {
    await snapshotCase(t, "MemberRows", <MemberRows />);
  });

  it("ScriptRows", async (t) => {
    await snapshotCase(t, "ScriptRows", <ScriptRows />);
  });

  it("Swatch", async (t) => {
    await snapshotCase(t, "Swatch", <Swatch />);
  });

  it("Widened", async (t) => {
    await snapshotCase(t, "Widened", <Widened />);
  });

  it("statefulObject", async (t) => {
    await snapshotCase(t, "statefulObject", statefulObject);
  });
});
