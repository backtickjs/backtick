import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

// Generates a pressure-test input for the @backtickjs compiler + JIT bundler:
// many DISTINCT `cs` literals (the compiler dedups by source location), deep
// splice/capture nesting, and a large JSX page exercising the tree table —
// script props, shared subtrees, slot threading, and polymorphic thunks.
//
// Two modes:
//
//   node scripts/generate.mjs <target.tsx>
//     Write one file at the env-tuned sizes below and prettier-format it. The
//     target package needs the test-only intrinsics (`button`, `label`) — see
//     e2e/jit-bundler/test/jsx.d.ts — or its typecheck will reject the JSX.
//
//   node scripts/generate.mjs --sweep
//     Pressure-test at doubling scales: generate into e2e/jit-bundler (which
//     has the bun plugin, the jsx tsconfig, and the intrinsics), run each
//     file under bun, and print a results table.
const N = (name, def) => Number(process.env[name] ?? def);
const BASE = {
  composed: N("COMPOSED", 100), // rich scripts, each splicing two earlier ones
  shade: N("SHADE", 20), // depth of the capture-threading / shadow-rename chain
  objectFields: N("OBJECT_FIELDS", 100), // one giant object literal
  arithTerms: N("ARITH_TERMS", 100), // one long arithmetic chain
  methodLinks: N("METHOD_LINKS", 40), // one long method-call chain
  widgets: N("WIDGETS", 100), // elements with a distinct script prop each
  rows: N("ROWS", 40), // page rows; adjacent rows share a widget (hoisting)
  treeDepth: N("TREE_DEPTH", 20), // scripts-in-trees-in-scripts tower
};

function generate(sizes) {
  const {
    composed,
    shade,
    objectFields,
    arithTerms,
    methodLinks,
    widgets,
    rows,
    treeDepth,
  } = sizes;
  const out = [];
  const w = (line = "") => out.push(line);

  w(`// AUTO-GENERATED pressure-test input for the @backtickjs compiler + JIT`);
  w(`// bundler. It packs many distinct client scripts, deep splice/capture`);
  w(`// nesting, and a large JSX page into one file, then bundles the composed`);
  w(`// root and prints it.`);
  w(`//`);
  w(`// Do not hand-edit. Regenerate (and tune the sizes) with:`);
  w(`//   node scripts/generate.mjs <target.tsx>`);
  w(``);
  w(`import { bundle, cs, type Client } from "@backtickjs/core";`);
  w(``);

  // --- Leaf constants -----------------------------------------------------
  w(`// Leaf constants: the base of the composition DAG.`);
  w(`const c0 = cs\`0\`;`);
  w(``);

  // --- Deep shadow / capture-threading chain ------------------------------
  // Each `shade{k}` shadows `acc` with its own binding and threads the
  // captured value down through `${inner}`. Composed root-to-leaf, this forces
  // the serializer to rename one threaded capture past `shade` same-named
  // locals.
  w(`// A ${shade}-deep capture-threading chain: every frame shadows \`acc\`, so`);
  w(`// the one value captured from the root must be renamed past all of them.`);
  for (let k = 0; k < shade; k++) {
    w(`function shade${k}(inner: Client<number>): Client<number> {`);
    w(`  return cs\`{`);
    w(`    const acc = ${k + 1};`);
    w(`    return acc + \${inner};`);
    w(`  }\`;`);
    w(`}`);
  }
  w(``);

  // --- Rich composed scripts ----------------------------------------------
  w(`// ${composed} rich scripts. Each declares locals, an arrow held as an`);
  w(`// object method, a method call, and branches, then splices the previous`);
  w(`// script and the shared leaf — a ${composed}-deep composition the bundler`);
  w(`// inlines.`);
  w(`//`);
  w(`// Each spliced script appears EXACTLY ONCE (bound to a local, then`);
  w(`// reused): \`buildAst\` re-expands every textual \`\${...}\`, and the IR is a`);
  w(`// tree with no DAG sharing, so splicing the same deep script twice per`);
  w(`// level would fan out 2^depth nodes and exhaust memory. One deep parent +`);
  w(`// one leaf, each spliced once, keeps the whole thing linear.`);
  for (let i = 0; i < composed; i++) {
    const a = i >= 1 ? `r${i - 1}` : `c0`;
    const b = `c0`;
    const t = i % 50;
    // `scale` is an arrow held as an object method — a property-access call
    // keeps its real (number) type, whereas a bare `scale(x)` would type as
    // `Client<unknown>`. Its `x` param collides with every other script's `x`,
    // exercising the serializer's parameter renaming when these all inline.
    w(`const r${i} = cs\`{`);
    w(`  const seed${i} = ${i};`);
    w(
      `  const info${i} = { id: seed${i}, scale: (x: number) => x * 3 + seed${i}, tag: "r${i}".concat("-", "tag") };`,
    );
    w(`  const big${i} = info${i}.scale(seed${i});`);
    w(`  const prev${i} = \${${a}};`);
    w(`  const leaf${i} = \${${b}};`);
    w(`  if (big${i} > ${t}) {`);
    w(`    return big${i} + prev${i} + leaf${i};`);
    w(`  }`);
    w(`  return prev${i} + info${i}.id;`);
    w(`}\`;`);
  }
  w(``);

  // --- One giant object literal -------------------------------------------
  w(`// A single object literal with ${objectFields} fields.`);
  {
    const fields = [];
    for (let i = 0; i < objectFields; i++) fields.push(`k${i}: ${i}`);
    w(`const giantObject = cs\`({ ${fields.join(", ")} })\`;`);
  }
  w(``);

  // --- One long arithmetic chain ------------------------------------------
  w(`// A single long arithmetic chain (${arithTerms} terms).`);
  {
    const terms = [];
    for (let i = 0; i < arithTerms; i++) terms.push(String(i));
    w(`const longSum = cs\`{`);
    w(`  return ${terms.join(" + ")};`);
    w(`}\`;`);
  }
  w(``);

  // --- One long method-call chain -----------------------------------------
  w(`// A single long method-call chain (${methodLinks} links).`);
  {
    let chain = `"start"`;
    for (let i = 0; i < methodLinks; i++) chain += `.concat("-${i}")`;
    w(`const longChain = cs\`{`);
    w(`  return ${chain}.toUpperCase();`);
    w(`}\`;`);
  }
  w(``);

  // --- Widgets: one distinct script prop each -----------------------------
  w(`// ${widgets} widgets, each with a DISTINCT handler script (a distinct`);
  w(`// source location), so the function table gets one \`#call\`ed entry per`);
  w(`// widget.`);
  for (let i = 0; i < widgets; i++) {
    w(
      `const widget${i} = <button key="w${i}" label="w${i}" onClick={cs\`() => ${i * 7}\`} />;`,
    );
  }
  w(``);

  // --- Polymorphic handler ------------------------------------------------
  w(`// One handler body instantiated with a different splice per call site:`);
  w(`// a single polymorphic entry, every reference passing a \`#thunk\`.`);
  w(`function mk(n: number): Client<() => number> {`);
  w(`  return cs\`() => \${n}\`;`);
  w(`}`);
  w(``);

  // --- Shared subtrees ----------------------------------------------------
  w(`// Shared by every row, and adjacent rows overlap by one widget: both`);
  w(`// hoist into their own tree entries instead of inlining per use.`);
  w(`const sharedBadge = <label text="shared" />;`);
  w(``);

  // --- Free host reference ------------------------------------------------
  w(`// A free host reference renders as a \`#global\` leaf in the tree JSON.`);
  w(`// @ts-expect-error -- the compiler transform supports free host`);
  w(`// references, but its typechecker can't resolve them inside a script`);
  w(`// body yet; drop this once it can.`);
  w(
    `const globalWidget = <button label="log" onClick={cs\`() => console.log("pressure")\`} />;`,
  );
  w(``);

  // --- Rows ----------------------------------------------------------------
  // Row j owns a contiguous widget slice and also references the FIRST widget
  // of the next row: singly-referenced widgets inline into the page entry,
  // doubly-referenced ones hoist, so both paths run at scale.
  w(`// ${rows} rows. Interior widgets are referenced once (inline); each row`);
  w(`// also borrows the next row's first widget (shared, hoisted). The inline`);
  w(`// button gives every row two \`#thunk\` call sites on the one polymorphic`);
  w(`// handler.`);
  const perRow = Math.max(1, Math.floor(widgets / rows));
  const rowNames = [];
  for (let j = 0; j < rows; j++) {
    const own = [];
    for (let i = j * perRow; i < (j + 1) * perRow && i < widgets; i++) {
      own.push(`widget${i}`);
    }
    const borrowed = `widget${(((j + 1) * perRow) % widgets + widgets) % widgets}`;
    const children = [
      ...own,
      borrowed,
      `sharedBadge`,
      `<button key="b${j}" label="row${j}" onA={mk(${j})} onB={mk(${j + 1})} />`,
    ];
    rowNames.push(`row${j}`);
    w(`const row${j} = (`);
    w(`  <flexbox direction="row" key="row${j}">`);
    w(`    {[${children.join(", ")}]}`);
    w(`  </flexbox>`);
    w(`);`);
  }
  w(``);

  // --- Scripts-in-trees-in-scripts tower ----------------------------------
  // Each tier's script splices a tree whose handler captures the tier's own
  // binding — the capture threads through the tree's slot signature — and the
  // handler also splices the tier below, alternating source and JSON position
  // all the way down.
  w(`// A ${treeDepth}-deep tower alternating script → tree → script: every`);
  w(`// tier's handler captures the tier's local through a tree slot and`);
  w(`// splices the tier below.`);
  for (let k = 0; k < treeDepth; k++) {
    w(`function tier${k}(below: Client<number>): Client<number> {`);
    w(`  return cs\`{`);
    w(`    const v${k} = ${k};`);
    w(
      `    const el${k} = \${(<button label="t${k}" onClick={cs\`() => v${k} + \${below}\`} />)};`,
    );
    w(`    return v${k} + ${k};`);
    w(`  }\`;`);
    w(`}`);
  }
  w(``);

  // --- Page ----------------------------------------------------------------
  w(`// The page inlines every row into one large tree entry; the hoisted`);
  w(`// widgets and the badge become \`#call\`s into their own entries.`);
  w(`const page = (`);
  w(`  <flexbox direction="column">`);
  w(`    {[globalWidget, ${rowNames.join(", ")}]}`);
  w(`  </flexbox>`);
  w(`);`);
  w(``);

  // --- Root: compose everything and bundle ---------------------------------
  // The deep chains are written lexically inside the root's splices so the
  // leaf `cs`acc`` captures the root's `acc`.
  let shadeChain = "cs`acc`";
  for (let k = 0; k < shade; k++) shadeChain = `shade${k}(${shadeChain})`;
  let tierChain = "c0";
  for (let k = 0; k < treeDepth; k++) tierChain = `tier${k}(${tierChain})`;

  w(`// The root ties every branch together. \`cs\\\`acc\\\`\` sits lexically inside`);
  w(`// this splice, so it captures the root's \`acc\` and threads it down the`);
  w(`// chain.`);
  w(`const root = cs\`{`);
  w(`  const acc = 1000;`);
  w(`  const shadowed = \${${shadeChain}};`);
  w(`  const total = \${r${composed - 1}};`);
  w(`  const towers = \${${tierChain}};`);
  w(`  const ui = \${page};`);
  w(`  const big = \${longSum};`);
  w(`  const obj = \${giantObject};`);
  w(`  const text = \${longChain};`);
  w(
    `  return { shadowed: shadowed, total: total, towers: towers, ui: ui, big: big, obj: obj, text: text, combined: shadowed + total + towers + big };`,
  );
  w(`}\`;`);
  w(``);
  w(`const t0 = performance.now();`);
  w(`const payload = bundle(root);`);
  w(`const t1 = performance.now();`);
  w(`console.log(payload);`);
  w(`console.error(JSON.stringify({ bundleMs: +(t1 - t0).toFixed(1) }));`);
  w(``);

  return out.join("\n");
}

// --- Sweep mode -------------------------------------------------------------

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const bundlerDir = join(scriptsDir, "..", "jit-bundler");

// Knobs that deepen a single expression or composition chain rather than
// widening the file. They grow with sqrt(scale) in the sweep: past a few
// thousand levels the pipeline overflows the stack — TypeScript's emitter
// recurses per nested expression node (arithmetic/method chains at ~2-3k),
// and the serializer's monomorphic inlining recurses per composition level
// (`materialize` → `renderValue` → `materialize`, at ~5k levels) — so depth
// is bounded pressure while breadth is the dimension that scales.
const DEPTH_KEYS = new Set([
  "composed",
  "shade",
  "treeDepth",
  "arithTerms",
  "methodLinks",
]);

function sweep() {
  const scales = (process.env.SCALES ?? "1,2,4,8,16")
    .split(",")
    .map((s) => Number(s.trim()));
  const pressureDir = join(bundlerDir, "test", "pressure");
  const file = join(pressureDir, "pressure.tsx");
  const results = [];
  mkdirSync(pressureDir, { recursive: true });
  try {
    for (const scale of scales) {
      const depthScale = Math.round(Math.sqrt(scale));
      const sizes = Object.fromEntries(
        Object.entries(BASE).map(([key, value]) => [
          key,
          value * (DEPTH_KEYS.has(key) ? depthScale : scale),
        ]),
      );
      const source = generate(sizes);
      writeFileSync(file, source);

      const started = performance.now();
      const run = spawnSync("bun", [relative(bundlerDir, file)], {
        cwd: bundlerDir,
        encoding: "utf8",
        maxBuffer: 1024 * 1024 * 1024,
      });
      const totalMs = performance.now() - started;
      if (run.status !== 0) {
        console.error(run.stderr);
        throw new Error(`scale ${scale} failed with status ${run.status}`);
      }

      const payload = run.stdout;
      const envelope = JSON.parse(payload);
      const stats = JSON.parse(
        run.stderr
          .trim()
          .split("\n")
          .findLast((line) => line.startsWith("{")),
      );
      results.push({
        scale,
        "src lines": source.split("\n").length,
        "src KB": Math.round(source.length / 1024),
        functions: Object.keys(envelope.functions).length,
        trees: Object.keys(envelope.trees).length,
        "bundle KB": Math.round(payload.length / 1024),
        "gzip KB": Math.round(gzipSync(payload).length / 1024),
        "bundle ms": stats.bundleMs,
        "total ms": Math.round(totalMs),
      });
      console.error(`scale ${scale}: ok`);
    }
  } finally {
    rmSync(pressureDir, { recursive: true, force: true });
  }
  console.log(renderTable(results));
}

function renderTable(rows) {
  const columns = Object.keys(rows[0]);
  const widths = columns.map((column) =>
    Math.max(column.length, ...rows.map((row) => String(row[column]).length)),
  );
  const line = (cells) =>
    `| ${cells.map((cell, i) => String(cell).padStart(widths[i])).join(" | ")} |`;
  return [
    line(columns),
    line(widths.map((width) => "-".repeat(width))),
    ...rows.map((row) => line(columns.map((column) => row[column]))),
  ].join("\n");
}

// --- Entry point --------------------------------------------------------------

if (process.argv[2] === "--sweep") {
  sweep();
} else {
  const target = process.argv[2];
  if (!target) {
    console.error("usage: node scripts/generate.mjs <target.tsx> | --sweep");
    process.exit(1);
  }
  const source = generate(BASE);
  writeFileSync(target, source);
  console.error(`wrote ${source.split("\n").length} lines to ${target}`);

  // Format in place so the committed output is prettier-clean and regeneration
  // is reproducible (this example's CI runs `format:check`).
  const prettier = spawnSync("npx", ["prettier", "--write", target], {
    stdio: "inherit",
  });
  if (prettier.status !== 0) {
    process.exit(prettier.status ?? 1);
  }
}
