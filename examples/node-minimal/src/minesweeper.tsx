import { cs, state, Link, Text, View, type Client } from "@backtickjs/core";
import type { State } from "@backtickjs/core";

const SIZE = 8;
const MINES = 10;

// The board, decided here when the route is asked for. `labels` is what each
// square shows once turned over — "*", "" for empty, or how many mines it
// touches — and `clears` is the neighbours an empty square opens.
//
// All of it ships: a square's label is in the bundle, so reading the JSON reads
// the mines. That is the trade for a game that needs no round trip to play.
interface Board {
  readonly labels: string[];
  readonly clears: number[][];
}

function deal(): Board {
  const mines = new Set<number>();
  while (mines.size < MINES) {
    mines.add(Math.floor(Math.random() * SIZE * SIZE));
  }
  const around = (index: number): number[] => {
    const row = Math.floor(index / SIZE);
    const column = index % SIZE;
    const out: number[] = [];
    for (const dr of [-1, 0, 1]) {
      for (const dc of [-1, 0, 1]) {
        const r = row + dr;
        const c = column + dc;
        if (
          (dr !== 0 || dc !== 0) &&
          r >= 0 &&
          r < SIZE &&
          c >= 0 &&
          c < SIZE
        ) {
          out.push(r * SIZE + c);
        }
      }
    }
    return out;
  };
  const labels: string[] = [];
  const clears: number[][] = [];
  for (let index = 0; index < SIZE * SIZE; index++) {
    const touching = around(index).filter((each) => mines.has(each)).length;
    labels.push(
      mines.has(index) ? "*" : touching === 0 ? "" : String(touching),
    );
    clears.push(mines.has(index) || touching > 0 ? [] : around(index));
  }
  return { labels, clears };
}

// Turning over a square, as a flood fill: a work list drained by a `while`,
// where each empty square adds its neighbours. That needs both of the things
// the language just gained — indexing, to read `clears[here]`, and a loop,
// because the list grows as it is drained.
//
// One handler for the whole board rather than one per square: `at` is the only
// thing that differs between squares, so it is an argument.
function press(
  open: Client<State<readonly boolean[]>>,
  dead: Client<State<boolean>>,
  labels: Client<State<readonly string[]>>,
  clears: Client<State<readonly (readonly number[])[]>>,
  at: number,
): Client<() => void> {
  return cs`() => {
    if ($labels.read()[$at] === "*") {
      $dead.write(true);
    }
    let opened = $open.read();
    let queue = [$at];
    let head = 0;
    while (head < queue.length) {
      const here = queue[head];
      head = head + 1;
      if (opened[here] === false) {
        opened = opened.map((was, index) => was || index === here);
        const spread = $clears.read()[here];
        let step = 0;
        while (step < spread.length) {
          queue = queue.concat([spread[step]]);
          step = step + 1;
        }
      }
    }
    $open.write(opened);
  }`;
}

// What a square shows, and how it is shaded — one script each for the whole
// board, with the square's position as an argument.
const shows = (
  open: Client<State<readonly boolean[]>>,
  dead: Client<State<boolean>>,
  labels: Client<State<readonly string[]>>,
  at: number,
): Client<string> =>
  cs`$open.read()[$at] === true || $dead.read() ? $labels.read()[$at] : ""`;

const shade = (
  open: Client<State<readonly boolean[]>>,
  dead: Client<State<boolean>>,
  at: number,
): Client<string> =>
  cs`$open.read()[$at] === true || $dead.read() ? "#f4f4f5" : "#a1a1aa"`;

const square = {
  width: 34,
  height: 34,
  borderWidth: 1,
  borderColor: "#71717a",
  textAlign: "center",
  lineHeight: 34,
  fontSize: 18,
  fontWeight: "bold",
  userSelect: "none",
} as const;

export async function Minesweeper() {
  const board = deal();
  // One cell for the whole board, where there used to be one per square. The
  // board's data goes in cells too — not because it changes, but because a
  // cell's initial is written once in the tree, while a splice is written at
  // every script that reads it, and every square reads these.
  const open = state(board.labels.map(() => false));
  const labels = state<readonly string[]>(board.labels);
  const clears = state<readonly (readonly number[])[]>(board.clears);
  const dead = state(false);

  const rows = [];
  for (let row = 0; row < SIZE; row++) {
    const cells = [];
    for (let column = 0; column < SIZE; column++) {
      const at = row * SIZE + column;
      cells.push(
        <Text
          key={at}
          testID={`square-${at}`}
          style={{ ...square, backgroundColor: shade(open, dead, at) }}
          onPress={press(open, dead, labels, clears, at)}
        >
          {shows(open, dead, labels, at)}
        </Text>,
      );
    }
    rows.push(
      <View key={row} style={{ flexDirection: "row" }}>
        {cells}
      </View>,
    );
  }

  return (
    <View style={{ gap: 12, padding: 24, alignItems: "flex-start" }}>
      <Text style={{ fontSize: 24 }}>Minesweeper</Text>
      <Text style={{ fontSize: 16 }}>
        {cs`$dead.read()
          ? "You hit a mine."
          : "8x8, 10 mines. Empty squares clear outward."`}
      </Text>
      <View style={{ borderWidth: 1, borderColor: "#71717a" }}>{rows}</View>
      <Link href="/minesweeper" style={{ fontSize: 16, color: "royalblue" }}>
        New board
      </Link>
      <Link href="/" style={{ fontSize: 16, color: "royalblue" }}>
        Home
      </Link>
    </View>
  );
}
