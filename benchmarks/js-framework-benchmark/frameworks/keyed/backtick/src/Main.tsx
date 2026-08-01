import { cs, state, type Client } from "@backtickjs/core";

type Row = {
  readonly id: number;
  readonly label: string;
};

const ADJECTIVES = [
  "pretty",
  "large",
  "big",
  "small",
  "tall",
  "short",
  "long",
  "handsome",
  "plain",
  "quaint",
  "clean",
  "elegant",
  "easy",
  "angry",
  "crazy",
  "helpful",
  "mushy",
  "odd",
  "unsightly",
  "adorable",
  "important",
  "inexpensive",
  "cheap",
  "expensive",
  "fancy",
];

const COLOURS = [
  "red",
  "yellow",
  "blue",
  "green",
  "pink",
  "brown",
  "purple",
  "brown",
  "white",
  "black",
  "orange",
];

const NOUNS = [
  "table",
  "chair",
  "house",
  "bbq",
  "desk",
  "car",
  "pony",
  "cookie",
  "sandwich",
  "burger",
  "pizza",
  "mouse",
  "keyboard",
];

export async function Main() {
  const data = state<Row[]>([]);
  const selected = state(0);
  const rowId = state(1);

  // A word for a row, drawn from the row's own number rather than from a
  // generator. The reference calls `Math.round(Math.random() * 1000) % max`; a
  // script reaches no globals, so there is no `Math.random` to call and this
  // mixes the number instead — the same shape of label, chosen the same way
  // every run. Multiplication stays exact: the largest product here is well
  // under 2^53.
  const word = cs`(list: string[], at: number) => {
    return list[((at * 2654435761 + 12345) % 2147483647) % list.length];
  }`;

  // Built by doubling a throwaway array to the right length and mapping over
  // it. Growing one element at a time — `data = data.concat([row])` — copies
  // what is already there on every step, which is 30ms at 10,000 rows against
  // 4ms for this. The language can transform a sequence but cannot produce one
  // of a given length, which is what makes the doubling necessary.
  const buildData = cs`(count: number, from: number) => {
    let slots = [0];
    while (slots.length < count) {
      slots = slots.concat(slots);
    }
    return slots.slice(0, count).map((_, index) => {
      const at = (from + index) * 3;
      return {
        id: from + index,
        label:
          $word($ADJECTIVES, at) +
          " " +
          $word($COLOURS, at + 1) +
          " " +
          $word($NOUNS, at + 2),
      };
    });
  }`;

  const run = cs`() => {
    const from = $rowId.read();
    $data.write($buildData(1000, from));
    $rowId.write(from + 1000);
    $selected.write(0);
  }`;

  const runLots = cs`() => {
    const from = $rowId.read();
    $data.write($buildData(10000, from));
    $rowId.write(from + 10000);
    $selected.write(0);
  }`;

  const add = cs`() => {
    const from = $rowId.read();
    $data.update((data) => data.concat($buildData(1000, from)));
    $rowId.write(from + 1000);
  }`;

  // Every tenth row gets ` !!!`, as the reference does — but by rebuilding the
  // row rather than assigning to its label, because an object is a value here.
  const update = cs`() => {
    $data.update((data) =>
      data.map((row, index) =>
        index % 10 === 0 ? { id: row.id, label: row.label + " !!!" } : row,
      ),
    );
  }`;

  const clear = cs`() => {
    $data.write([]);
    $selected.write(0);
  }`;

  // The reference swaps by index assignment. With no way to write into a slot,
  // this rebuilds the array and reads the two rows out of the one it was given
  // — the same result, at O(n) where the reference pays O(1).
  const swapRows = cs`() => {
    $data.update((data) =>
      data.length > 998
        ? data.map((row, index) =>
            index === 1 ? data[998] : index === 998 ? data[1] : row,
          )
        : data,
    );
  }`;

  const select = cs`(id: number) => {
    $selected.write(id);
  }`;

  const remove = cs`(id: number) => {
    $data.update((data) => data.filter((row) => row.id !== id));
  }`;

  return (
    <>
      <div class="jumbotron">
        <div class="row">
          <div class="col-md-6">
            <h1>Backtick-"keyed"</h1>
          </div>
          <div class="col-md-6">
            <div class="row">
              <Button id="run" label="Create 1,000 rows" onclick={run} />
              <Button
                id="runlots"
                label="Create 10,000 rows"
                onclick={runLots}
              />
              <Button id="add" label="Append 1,000 rows" onclick={add} />
              <Button
                id="update"
                label="Update every 10th row"
                onclick={update}
              />
              <Button id="clear" label="Clear" onclick={clear} />
              <Button id="swaprows" label="Swap Rows" onclick={swapRows} />
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-striped test-data">
        <tbody>
          {cs`$data.read().map(
            (row) =>
              ${(
                // Keyed by the row's own id, which is what makes this a keyed
                // implementation: the key rides the apply that instantiates the
                // row, so two renders of the same list name the same rows.
                <TableRow
                  key={cs`row.id`}
                  id={cs`row.id`}
                  label={cs`row.label`}
                  selected={cs`$selected.read() === row.id`}
                  onSelect={cs`() => $select(row.id)`}
                  onRemove={cs`() => $remove(row.id)`}
                />
              )},
          )`}
        </tbody>
      </table>
      <span
        class="preloadicon glyphicon glyphicon-remove"
        aria-hidden="true"
      ></span>
    </>
  );
}

async function Button({
  id,
  label,
  onclick,
}: {
  id: string;
  label: string;
  onclick: Client<() => void>;
}) {
  return (
    <div class="col-sm-6 smallpad">
      <button
        type="button"
        class="btn btn-primary btn-block"
        id={id}
        onclick={onclick}
      >
        {label}
      </button>
    </div>
  );
}

// The row shape the driver asserts, node for node: four cells, the label in an
// anchor, and the remove glyph in an anchor of its own.
async function TableRow({
  id,
  label,
  selected,
  onSelect,
  onRemove,
}: {
  id: Client<number>;
  label: Client<string>;
  selected: Client<boolean>;
  onSelect: Client<() => void>;
  onRemove: Client<() => void>;
}) {
  return (
    <tr class={cs`$selected ? "danger" : ""`}>
      <td class="col-md-1">{id}</td>
      <td class="col-md-4">
        <a onclick={onSelect}>{label}</a>
      </td>
      <td class="col-md-1">
        <a onclick={onRemove}>
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </a>
      </td>
      <td class="col-md-6"></td>
    </tr>
  );
}
