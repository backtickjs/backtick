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

  const word = cs`(list: string[]) => {
    return list[Math.round(Math.random() * 1000) % list.length];
  }`;

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
  }`;

  const runLots = cs`() => {
    const from = $rowId.read();
    $data.write($buildData(10000, from));
    $rowId.write(from + 10000);
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
  }`;

  const swapRows = cs`() => {
    const rows = $data.read();
    if (rows.length > 998) {
      $data.write(rows.with(1, rows[998]).with(998, rows[1]));
    }
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
              <div class="col-sm-6 smallpad">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  id="run"
                  onclick={run}
                >
                  Create 1,000 rows
                </button>
              </div>
              <div class="col-sm-6 smallpad">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  id="runlots"
                  onclick={runLots}
                >
                  Create 10,000 rows
                </button>
              </div>
              <div class="col-sm-6 smallpad">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  id="add"
                  onclick={add}
                >
                  Append 1,000 rows
                </button>
              </div>
              <div class="col-sm-6 smallpad">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  id="update"
                  onclick={partialUpdate}
                >
                  Update every 10th row
                </button>
              </div>
              <div class="col-sm-6 smallpad">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  id="clear"
                  onclick={clear}
                >
                  Clear
                </button>
              </div>
              <div class="col-sm-6 smallpad">
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  id="swaprows"
                  onclick={swapRows}
                >
                  Swap Rows
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-striped test-data">
        <tbody>
          {cs`$data.read().map(
            (row) =>
              ${(
                <tr
                  key={cs`row.id`}
                  class={cs`$selected.read() === row.id ? "danger" : ""`}
                >
                  <td class="col-md-1">{cs`row.id`}</td>
                  <td class="col-md-4">
                    <a onclick={cs`() => $select(row.id)`}>{cs`row.label`}</a>
                  </td>
                  <td class="col-md-1">
                    <a onclick={cs`() => $remove(row.id)`}>
                      <span
                        class="glyphicon glyphicon-remove"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </td>
                  <td class="col-md-6"></td>
                </tr>
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
