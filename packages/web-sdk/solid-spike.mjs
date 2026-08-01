// Our runtime's shape, with Solid owning the graph:
//   instance → an owner, cell → a signal, prop → a render effect,
//   children → mapArray (keyed, one owner per row).
// Nothing below tracks dependencies, subscriptions, or lifetimes by hand.
import {
  createSignal,
  createRenderEffect,
  createRoot,
  createMemo,
  mapArray,
  batch,
} from "solid-js/dist/solid.js"; // the browser build: Node resolves the inert server one

const log = [];
const say = (what) => log.push(what);

const app = createRoot((dispose) => {
  const [selected, setSelected] = createSignal(0);
  const [rows, setRows] = createSignal([{ id: 1 }, { id: 2 }, { id: 3 }]);

  // A child handed the cell, reading it in a prop *and* in a branch — the case
  // that broke us. Nothing here says it depends on `selected`.
  const Row = (row) => {
    const cls = createMemo(() => (selected() === row.id ? "danger" : ""));
    createRenderEffect(() =>
      say(`  row ${row.id} class=${JSON.stringify(cls())}`),
    );
    createRenderEffect(() =>
      say(`  row ${row.id} branch=${selected() === row.id ? "on" : "off"}`),
    );
    return row;
  };
  const drawn = createMemo(mapArray(rows, Row));
  createRenderEffect(() =>
    say(
      `  list = [${drawn()
        .map((r) => r.id)
        .join(",")}]`,
    ),
  );
  return { setSelected, setRows, dispose };
});

say("--- select row 2 ---");
batch(() => app.setSelected(2));
say("--- remove row 2 ---");
batch(() => app.setRows((was) => was.filter((r) => r.id !== 2)));
say("--- select row 3 ---");
batch(() => app.setSelected(3));
app.dispose();
say("--- disposed, then write again ---");
batch(() => app.setSelected(1));
console.log(log.join("\n"));
