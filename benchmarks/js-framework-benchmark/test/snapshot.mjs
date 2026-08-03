import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";

// A recorded case, as a file to read and to diff.
//
// The stream is folded rather than written out: a thousand rows are a thousand
// turns of the same handful of operations, and what is worth reading is the turn
// and how many of them there were. A change in either is a change in what the
// app costs — a longer block is more work per row, a bigger multiplier is more
// rows touched — and both show up as a line.

// The ten operations a host answers, in the order a snapshot lists them, so a
// count that moves is the only thing that moves.
const OPERATIONS = [
  "createElement",
  "createTextNode",
  "setProperty",
  "insertNode",
  "removeNode",
  "replaceText",
  "isTextNode",
  "getParentNode",
  "getFirstChild",
  "getNextSibling",
];

// The longest block a run of lines is, repeated. A block of `period` lines
// starting at `at`, and how many times it runs — the widest coverage wins, so a
// row's whole cycle is preferred to the two identical lines inside it, and the
// shortest period wins a tie, so a run of one line is that line and not half
// the run twice.
//
// Nothing is a repetition until it has happened twice, and a period is looked
// for only up to `WIDEST`: a cycle here is an element or a row, and searching
// for one the length of the stream is what makes a stream that doesn't repeat
// cost the square of itself.
const WIDEST = 512;

function repetition(lines, at) {
  let best = null;
  const widest = Math.min(WIDEST, (lines.length - at) >> 1);
  for (let period = 1; period <= widest; period++) {
    // A repetition has to start with the same line, which is most periods gone
    // for the cost of one comparison.
    if (lines[at] !== lines[at + period]) continue;
    let times = 1;
    while (same(lines, at, at + times * period, period)) times++;
    if (times < 2) continue;
    if (best === null || times * period > best.times * best.period) {
      best = { period, times };
    }
  }
  return best;
}

function same(lines, left, right, length) {
  if (right + length > lines.length) return false;
  for (let at = 0; at < length; at++) {
    if (lines[left + at] !== lines[right + at]) return false;
  }
  return true;
}

/**
 * The stream with its repetitions folded, innermost first: a block that repeats
 * is written once, under how many times it ran.
 */
export function fold(lines, indent = "") {
  const folded = [];
  let at = 0;
  while (at < lines.length) {
    const found = repetition(lines, at);
    if (found === null) {
      folded.push(indent + lines[at]);
      at += 1;
      continue;
    }
    const { period, times } = found;
    if (period === 1) {
      folded.push(`${indent}${times} × ${lines[at]}`);
    } else {
      folded.push(`${indent}${times} × [`);
      folded.push(...fold(lines.slice(at, at + period), `${indent}  `));
      folded.push(`${indent}]`);
    }
    at += period * times;
  }
  return folded;
}

/**
 * One case, as its snapshot: what was measured, what the host was told to do,
 * and in what order.
 */
export function render(each, events) {
  const counted = new Map();
  for (const event of events) {
    const operation = event.split(" ")[0];
    counted.set(operation, (counted.get(operation) ?? 0) + 1);
  }
  const tally = OPERATIONS.filter((operation) => counted.has(operation)).map(
    (operation) => `  ${operation.padEnd(16)}${counted.get(operation)}`,
  );
  return `${[
    `${each.id} — ${each.label}`,
    `measured: ${each.measured}`,
    "",
    "host operations",
    ...tally,
    `  ${"total".padEnd(16)}${events.length}`,
    "",
    "in order, repetition folded",
    ...fold(events).map((line) => `  ${line}`),
  ].join("\n")}\n`;
}

/**
 * Compares against the snapshot at `file`, or writes it when the suite is run
 * with `UPDATE_SNAPSHOTS=1`.
 */
export function matchFileSnapshot(actual, file) {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }
  assert.strictEqual(actual, readFileSync(file, "utf8"));
}
