import {
  cs,
  state,
  Pressable,
  Text,
  View,
  type Client,
} from "@backtickjs/core";
import { generate, type Row } from "./rows.js";

// The seed the client draws rows from, and the only deliberate departure from
// the benchmark's app: there, `run` generates its 1,000 rows on the spot. A
// script here reaches no globals, so it has neither `Math.random()` nor a way
// to grow an array, and the pool is generated on the server instead. Slicing it
// still builds a real array of the right size and renders it, so what the
// operations cost to draw is measured; what generating them costs is not.
//
// 11,000 rather than 10,000 so that appending 1,000 to a table of 10,000 — the
// benchmark's append case — still draws rows the table doesn't already hold.
const POOL = generate(11_000);

const NONE = 0;

export async function Main() {
  const pool = state(POOL);
  const rows = state(POOL.slice(0, 0));
  const selected = state(NONE);

  const run = cs`() => {
    $rows.write($pool.read().slice(0, 1000));
    $selected.write($NONE);
  }`;

  const runLots = cs`() => {
    $rows.write($pool.read().slice(0, 10000));
    $selected.write($NONE);
  }`;

  // Appends the next slice of the pool, so the ids stay unique the way freshly
  // generated ones would. The pool runs dry after ten appends.
  const add = cs`() => {
    $rows.update((rows) =>
      rows.concat($pool.read().slice(rows.length, rows.length + 1000)),
    );
  }`;

  const update = cs`() => {
    $rows.update((rows) =>
      rows.map((row, index) =>
        index % 10 === 0
          ? { id: row.id, label: row.label + " !!!" }
          : row,
      ),
    );
  }`;

  const clear = cs`() => {
    $rows.write([]);
    $selected.write($NONE);
  }`;

  // The benchmark swaps two rows by index. With no index assignment and no
  // `splice` on the client array, the swap is a rebuild of the whole array —
  // O(n) where every other framework pays O(1).
  const swapRows = cs`() => {
    $rows.update((rows) => {
      if (rows.length < 999) {
        return rows;
      }
      return rows.map((row, index) =>
        index === 1 ? rows[998] : index === 998 ? rows[1] : row,
      );
    });
  }`;

  const select = cs`(id: number) => $selected.write(id)`;

  const remove = cs`(id: number) => {
    $rows.update((rows) => rows.filter((row) => row.id !== id));
  }`;

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Button testID="run" label="Create 1,000 rows" onPress={run} />
        <Button testID="runlots" label="Create 10,000 rows" onPress={runLots} />
        <Button testID="add" label="Append 1,000 rows" onPress={add} />
        <Button
          testID="update"
          label="Update every 10th row"
          onPress={update}
        />
        <Button testID="clear" label="Clear" onPress={clear} />
        <Button testID="swaprows" label="Swap Rows" onPress={swapRows} />
      </View>

      <View
        testID="table"
        style={{ alignSelf: "stretch" }}
      >{cs`$rows.read().map(
        (row) =>
          ${(
            <TableRow
              id={cs`row.id`}
              label={cs`row.label`}
              isSelected={cs`$selected.read() === row.id`}
              onSelect={cs`() => $select(row.id)`}
              onRemove={cs`() => $remove(row.id)`}
            />
          )},
      )`}</View>
    </View>
  );
}

async function Button({
  testID,
  label,
  onPress,
}: {
  testID: string;
  label: string;
  onPress: Client<() => void>;
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={{
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: "#337ab7",
        borderRadius: 4,
      }}
    >
      <Text style={{ fontSize: 14, color: "#ffffff" }}>{label}</Text>
    </Pressable>
  );
}

async function TableRow({
  id,
  label,
  isSelected,
  onSelect,
  onRemove,
}: {
  id: Client<number>;
  label: Client<string>;
  isSelected: Client<boolean>;
  onSelect: Client<() => void>;
  onRemove: Client<() => void>;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: cs`$isSelected ? "#d9534f" : "transparent"`,
      }}
    >
      <Text style={{ width: 60, fontSize: 14, color: "#777777" }}>
        {cs`$id.toString()`}
      </Text>
      <Text
        onPress={onSelect}
        style={{
          flexGrow: 1,
          fontSize: 14,
          color: cs`$isSelected ? "#ffffff" : "#337ab7"`,
        }}
      >
        {label}
      </Text>
      <Text onPress={onRemove} style={{ width: 20, fontSize: 14 }}>
        ✗
      </Text>
    </View>
  );
}
