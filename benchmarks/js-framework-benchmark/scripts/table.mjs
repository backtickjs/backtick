import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The table of runs, as a page a browser opens.
//
// One column per run of the driver against `keyed/backtick`, named by the commit
// it measured, plus the two implementations it is read against. Adding a column
// is a `runs/manifest.json` entry and a directory of results beside it — see the
// footer this writes.
//
// Coloured the way the official table colours: a cell is compared against the
// best in its row, green at 1×, yellow at 2×, red at 4× and beyond. The ramp is
// `computeColor` from `webdriver-ts-results/src/Common.ts`, so a number here
// reads the way the same number reads there.
const here = new URL("../", import.meta.url).pathname;
const runs = join(here, "runs");
const manifest = JSON.parse(readFileSync(join(runs, "manifest.json"), "utf8"));

const groups = [
  {
    title: "Duration",
    unit: "milliseconds, median of the total time",
    benchmarks: {
      "01_run1k": "create 1,000 rows",
      "02_replace1k": "replace all 1,000 rows",
      "03_update10th1k_x16": "partial update, every 10th row (×16)",
      "04_select1k": "select row",
      "05_swap1k": "swap two rows",
      "06_remove-one-1k": "remove row",
      "07_create10k": "create 10,000 rows",
      "08_create1k-after1k_x2": "append 1,000 to a table of 1,000 (×2)",
      "09_clear1k_x8": "clear 1,000 rows (×8)",
    },
  },
  {
    title: "Memory",
    unit: "megabytes",
    benchmarks: {
      "21_ready-memory": "ready",
      "22_run-memory": "after 1,000 rows",
      "25_run-clear-memory": "after 1,000 rows and clear",
    },
  },
  {
    title: "Size and startup",
    unit: "kilobytes transferred, and milliseconds to first paint",
    benchmarks: {
      "41_size-uncompressed": "uncompressed",
      "42_size-compressed": "compressed",
      "43_first-paint": "first paint",
    },
  },
];

// A median out of one result file, or out of the medians a column recorded when
// its files weren't kept.
function median(column, benchmark) {
  if (column.medians) {
    return column.medians[benchmark] ?? null;
  }
  const file = join(runs, column.dir, `${column.file}_${benchmark}.json`);
  try {
    const { values } = JSON.parse(readFileSync(file, "utf8"));
    return (values.total ?? values.DEFAULT).median;
  } catch {
    return null;
  }
}

function reference(framework, benchmark) {
  const file = join(
    runs,
    manifest.reference.dir,
    `${framework.file}_${benchmark}.json`,
  );
  try {
    const { values } = JSON.parse(readFileSync(file, "utf8"));
    return (values.total ?? values.DEFAULT).median;
  } catch {
    return null;
  }
}

// `computeColor` from the official results table, kept to the digit so a colour
// means the same thing in both.
function colour(factor) {
  if (factor < 2) {
    const a = factor - 1;
    return `rgb(${((1 - a) * 99 + a * 255).toFixed(0)}, ${((1 - a) * 191 + a * 236).toFixed(0)}, ${((1 - a) * 124 + a * 132).toFixed(0)})`;
  }
  const a = Math.min((factor - 2) / 2, 1);
  return `rgb(${((1 - a) * 255 + a * 249).toFixed(0)}, ${((1 - a) * 236 + a * 105).toFixed(0)}, ${((1 - a) * 132 + a * 108).toFixed(0)})`;
}

const columns = [
  ...manifest.reference.frameworks.map((framework) => ({
    label: framework.label,
    sub: manifest.reference.date,
    read: (benchmark) => reference(framework, benchmark),
  })),
  ...manifest.columns.map((column) => ({
    label: column.label ?? `backtick`,
    sub: column.commit,
    keyed: column.keyed,
    read: (benchmark) => median(column, benchmark),
  })),
];

const newest = manifest.columns[manifest.columns.length - 1];
const escape = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function cell(value, best) {
  if (value === null) {
    return `<td class="none">—</td>`;
  }
  const factor = best === 0 ? 1 : value / best;
  const shown = value < 10 ? value.toFixed(2) : value.toFixed(1);
  return `<td style="background:${colour(factor)}"><span class="value">${shown}</span><span class="factor">${factor.toFixed(2)}</span></td>`;
}

function table(group) {
  const rows = Object.entries(group.benchmarks)
    .map(([benchmark, label]) => {
      const values = columns.map((column) => column.read(benchmark));
      if (values[values.length - 1] === null) {
        return "";
      }
      const best = Math.min(...values.filter((value) => value !== null));
      return `<tr><th class="benchmark">${escape(label)}</th>${values
        .map((value) => cell(value, best))
        .join("")}</tr>`;
    })
    .join("\n");

  // The geometric mean the official table carries: every benchmark's factor
  // against the best, multiplied and rooted, so one slow case can't dominate.
  const factors = columns.map(() => []);
  for (const benchmark of Object.keys(group.benchmarks)) {
    const values = columns.map((column) => column.read(benchmark));
    if (values.some((value) => value === null)) {
      continue;
    }
    const best = Math.min(...values);
    values.forEach((value, at) =>
      factors[at].push(best === 0 ? 1 : value / best),
    );
  }
  const means = factors.map((each) =>
    each.length === 0
      ? null
      : Math.pow(
          each.reduce((product, factor) => product * factor, 1),
          1 / each.length,
        ),
  );
  const bestMean = Math.min(...means.filter((mean) => mean !== null));
  const mean = `<tr class="mean"><th class="benchmark">geometric mean of the factors</th>${means
    .map((value) =>
      value === null
        ? `<td class="none">—</td>`
        : `<td style="background:${colour(value / bestMean)}"><span class="value">${value.toFixed(2)}</span></td>`,
    )
    .join("")}</tr>`;

  return `<section>
  <h2>${escape(group.title)}</h2>
  <p class="unit">${escape(group.unit)}</p>
  <table>
    <thead>
      <tr>
        <th class="benchmark"></th>
        ${columns
          .map(
            (column) =>
              `<th><span class="name">${escape(column.label)}</span><span class="sub">${escape(column.sub)}</span>${
                column.keyed === undefined
                  ? ""
                  : `<span class="keyed ${column.keyed ? "yes" : "no"}">${column.keyed ? "keyed" : "non-keyed"}</span>`
              }</th>`,
          )
          .join("\n        ")}
      </tr>
    </thead>
    <tbody>
${rows}
${mean}
    </tbody>
  </table>
</section>`;
}

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>backtick — js-framework-benchmark runs</title>
    <style>
      body { margin: 0; padding: 1rem 1.25rem 3rem; font: 14px/1.4 Helvetica, Arial, sans-serif; color: #222; }
      h1 { font-size: 20px; margin: 0 0 .25rem; }
      h2 { font-size: 15px; margin: 2rem 0 .1rem; }
      .lede, .unit { color: #666; font-size: 12px; margin: 0 0 .6rem; }
      table { border-collapse: collapse; table-layout: fixed; font-size: 12px; }
      th, td { border: 1px solid #ccc; text-align: center; padding: 4px 6px; width: 108px; }
      th.benchmark { width: 300px; text-align: left; font-weight: normal; background: #fafafa; }
      thead th { background: #fafafa; vertical-align: bottom; padding-bottom: 6px; }
      thead .name { display: block; font-weight: bold; }
      thead .sub { display: block; color: #666; font-weight: normal; font-family: ui-monospace, Menlo, monospace; font-size: 11px; }
      .keyed { display: inline-block; margin-top: 3px; padding: 0 5px; border-radius: 8px; font-size: 10px; font-weight: normal; }
      .keyed.yes { background: #dff3e3; color: #1d6b33; }
      .keyed.no { background: #fde2e2; color: #8b1d1d; }
      td .value { display: block; font-variant-numeric: tabular-nums; }
      td .factor { display: block; font-size: 10px; opacity: .65; font-variant-numeric: tabular-nums; }
      td.none { background: #fff; color: #999; }
      tr.mean th, tr.mean td { border-top: 2px solid #999; }
      footer { margin-top: 2.5rem; color: #666; font-size: 12px; }
      code { font-family: ui-monospace, Menlo, monospace; background: #f4f4f4; padding: 1px 4px; border-radius: 3px; }
      pre { background: #f4f4f4; padding: .6rem .8rem; border-radius: 4px; overflow-x: auto; font-size: 11px; }
    </style>
  </head>
  <body>
    <h1>backtick — js-framework-benchmark runs</h1>
    <p class="lede">
      One column per run against <code>keyed/backtick</code>, named by the commit it measured;
      the reference implementations were measured ${escape(manifest.reference.date)}.
      Each cell is coloured against the best in its row — green at 1×, yellow at 2×, red at 4× —
      and carries that factor beneath the value, as the official table does.
    </p>
${groups.map(table).join("\n")}
    <footer>
      <p>Adding a column:</p>
      <pre>pnpm start                       # upstream's server, on :8080
pnpm run bench keyed/backtick    # ~6 minutes for the fifteen benchmarks
pnpm isKeyed keyed/backtick      # the classification

commit=$(git rev-parse --short HEAD)
mkdir -p runs/$commit
cp ../../../js-framework-benchmark/webdriver-ts/results/backtick-*.json runs/$commit/
# add it to runs/manifest.json, then:
pnpm table</pre>
    </footer>
  </body>
</html>
`;

writeFileSync(join(here, "runs.html"), page);
console.log(
  `runs.html  ${columns.length} columns, newest \`${newest.commit}\``,
);
