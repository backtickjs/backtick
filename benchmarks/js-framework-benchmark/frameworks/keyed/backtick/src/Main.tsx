import { cs, state, type Client, type State } from "@backtickjs/core";

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

  // A word for a row, drawn the way the reference draws one:
  // `Math.round(Math.random() * 1000) % max`, down to the redundant `* 1000`
  // and the modulo of a number already smaller than the list.
  //
  // Every run now builds different labels, which is what the reference does
  // and so what this has to do to be measured against it.
  const word = cs`(list: string[]) => {
    return list[Math.round(Math.random() * 1000) % list.length];
  }`;

  // The reference sizes an array and fills it by index — `new Array(count)`,
  // then a `for`. `Array.from` is the same thing without an assignment into a
  // slot, which this language has no node for.
  const buildData = cs`(count: number, from: number) => {
    return Array.from({ length: count }, (_, index) => {
      return {
        id: from + index,
        label: $word($ADJECTIVES) + " " + $word($COLOURS) + " " + $word($NOUNS),
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
    $data.write([...$data.read(), ...$buildData(1000, from)]);
    $rowId.write(from + 1000);
  }`;

  const partialUpdate = cs`() => {
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

  const swapRows = cs`() => {
    let clone = $data.read().slice();
    const tmp = clone[1];
    clone = clone.with(1, clone[998]);
    clone = clone.with(998, tmp);
    $data.write(clone);
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
                onclick={partialUpdate}
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
                  selected={selected}
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
//
// The row is handed the cell rather than an answer computed from it. A prop
// that reads a cell is recomputed on its own when that cell is written, so
// selecting a row changes two class attributes; a boolean computed out here
// would make selecting one row a re-render of all of them.
async function TableRow({
  id,
  label,
  selected,
  onSelect,
  onRemove,
}: {
  id: Client<number>;
  label: Client<string>;
  selected: Client<State<number>>;
  onSelect: Client<() => void>;
  onRemove: Client<() => void>;
}) {
  return (
    <tr class={cs`$selected.read() === $id ? "danger" : ""`}>
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
