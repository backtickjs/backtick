import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

// Sizes — tuned to produce a genuinely large source file (many DISTINCT `cs`
// literals, since the compiler dedups by source location) that still bundles.
const N = (name, def) => Number(process.env[name] ?? def);
const COMPOSED = N("COMPOSED", 250); // rich scripts, each splicing two earlier ones
const SHADE = N("SHADE", 30); // depth of the capture-threading / shadow-rename chain
const OBJECT_FIELDS = N("OBJECT_FIELDS", 150); // one giant object literal
const ARITH_TERMS = N("ARITH_TERMS", 200); // one long arithmetic chain
const METHOD_LINKS = N("METHOD_LINKS", 60); // one long method-call chain

const out = [];
const w = (line = "") => out.push(line);

w(`// AUTO-GENERATED pressure-test input for the @backtickjs compiler + JIT`);
w(`// bundler. It packs many distinct client scripts and deep splice/capture`);
w(`// nesting into one file, then bundles the composed root and prints it.`);
w(`//`);
w(`// Do not hand-edit. Regenerate (and tune the sizes) with:`);
w(`//   node scripts/generate.mjs src/index.ts`);
w(``);
w(`import { bundle, cs, type Client } from "@backtickjs/core";`);
w(``);

// --- Leaf constants -------------------------------------------------------
w(`// Leaf constants: the base of the composition DAG.`);
w(`const c0 = cs\`0\`;`);
w(``);

// --- Deep shadow / capture-threading chain --------------------------------
// Each `shade{k}` shadows `acc` with its own binding and threads the captured
// value down through `${inner}`. Composed root-to-leaf, this forces the
// serializer to rename one threaded capture past `SHADE` same-named locals.
w(`// A ${SHADE}-deep capture-threading chain: every frame shadows \`acc\`, so the`);
w(`// one value captured from the root must be renamed past all of them.`);
for (let k = 0; k < SHADE; k++) {
  w(`function shade${k}(inner: Client<number>): Client<number> {`);
  w(`  return cs\`{`);
  w(`    const acc = ${k + 1};`);
  w(`    return acc + \${inner};`);
  w(`  }\`;`);
  w(`}`);
}
w(``);

// --- Rich composed scripts ------------------------------------------------
w(`// ${COMPOSED} rich scripts. Each declares locals, an arrow held as an object`);
w(`// method, a method call, and branches, then splices the previous script and`);
w(`// the shared leaf — a ${COMPOSED}-deep composition the bundler inlines.`);
w(`//`);
w(`// Each spliced script appears EXACTLY ONCE (bound to a local, then reused):`);
w(`// \`buildAst\` re-expands every textual \`\${...}\`, and the IR is a tree with no`);
w(`// DAG sharing, so splicing the same deep script twice per level would fan out`);
w(`// 2^depth nodes and exhaust memory. One deep parent + one leaf, each spliced`);
w(`// once, keeps the whole thing linear.`);
for (let i = 0; i < COMPOSED; i++) {
  const a = i >= 1 ? `r${i - 1}` : `c0`;
  const b = `c0`;
  const t = i % 50;
  // `scale` is an arrow held as an object method — a property-access call keeps
  // its real (number) type, whereas a bare `scale(x)` would type as
  // `Client<unknown>`. Its `x` param collides with every other script's `x`,
  // exercising the serializer's parameter renaming when these all inline.
  w(`const r${i} = cs\`{`);
  w(`  const seed${i} = ${i};`);
  w(`  const info${i} = { id: seed${i}, scale: (x: number) => x * 3 + seed${i}, tag: "r${i}".concat("-", "tag") };`);
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

// --- One giant object literal ---------------------------------------------
w(`// A single object literal with ${OBJECT_FIELDS} fields.`);
{
  const fields = [];
  for (let i = 0; i < OBJECT_FIELDS; i++) fields.push(`k${i}: ${i}`);
  w(`const giantObject = cs\`({ ${fields.join(", ")} })\`;`);
}
w(``);

// --- One long arithmetic chain --------------------------------------------
w(`// A single long arithmetic chain (${ARITH_TERMS} terms).`);
{
  const terms = [];
  for (let i = 0; i < ARITH_TERMS; i++) terms.push(String(i));
  w(`const longSum = cs\`{`);
  w(`  return ${terms.join(" + ")};`);
  w(`}\`;`);
}
w(``);

// --- One long method-call chain -------------------------------------------
w(`// A single long method-call chain (${METHOD_LINKS} links).`);
{
  let chain = `"start"`;
  for (let i = 0; i < METHOD_LINKS; i++) chain += `.concat("-${i}")`;
  w(`const longChain = cs\`{`);
  w(`  return ${chain}.toUpperCase();`);
  w(`}\`;`);
}
w(``);

// --- Root: compose everything and bundle ----------------------------------
// The deep shadow chain is written lexically inside the root's splice so the
// leaf `cs`acc`` captures the root's `acc`.
let shadeChain = "cs`acc`";
for (let k = 0; k < SHADE; k++) shadeChain = `shade${k}(${shadeChain})`;

w(`// The root ties every branch together. \`cs\\\`acc\\\`\` sits lexically inside this`);
w(`// splice, so it captures the root's \`acc\` and threads it down the chain.`);
w(`const root = cs\`{`);
w(`  const acc = 1000;`);
w(`  const shadowed = \${${shadeChain}};`);
w(`  const total = \${r${COMPOSED - 1}};`);
w(`  const big = \${longSum};`);
w(`  const obj = \${giantObject};`);
w(`  const text = \${longChain};`);
w(`  return { shadowed: shadowed, total: total, big: big, obj: obj, text: text, combined: shadowed + total + big };`);
w(`}\`;`);
w(``);
w(`console.log(bundle(root));`);
w(``);

const target = process.argv[2];
writeFileSync(target, out.join("\n"));
console.error(`wrote ${out.length} lines to ${target}`);

// Format in place so the committed output is prettier-clean and regeneration is
// reproducible (this example's CI runs `format:check`).
const prettier = spawnSync("npx", ["prettier", "--write", target], {
  stdio: "inherit",
});
if (prettier.status !== 0) {
  process.exit(prettier.status ?? 1);
}
