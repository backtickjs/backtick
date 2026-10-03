// Runs test262 through Backtick: each test a client script, compiled, bundled
// and run in a fresh realm, judged by test262's own metadata.
//
//   pnpm conformance                   every test, against the baseline
//   pnpm conformance built-ins/Array   only the tests under a path
//   pnpm conformance --update          a full run, written as the baseline
import { fork } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { join } from "node:path";
import vm from "node:vm";
import { type Compiled, compile } from "./compile.ts";
import { realm, test262Module } from "./realm.ts";
import { notApplicable, type Test, tests } from "./tests.ts";

interface Result {
  path: string;
  // `engine`: the test fails run plainly too, so it says nothing of Backtick
  status: "pass" | "fail" | "engine" | "skip";
  reason?: string;
}

// How long a test may run, and an async one wait for `$DONE`.
const TIMEOUT = 5000;

// The name of what was thrown, from whichever realm threw it.
const nameOf = (error: unknown): string =>
  (error as { constructor?: { name?: string } } | null)?.constructor?.name ??
  typeof error;

// How a test went, run one way: null where it passed, why it failed where not.
// `load` builds what runs, so a parse error is its; `run` runs it.
async function outcome(
  test: Test,
  load: (context: vm.Context) => () => Promise<unknown>,
): Promise<string | null> {
  const negative = test.negative;
  const early = negative?.phase === "parse" || negative?.phase === "early";
  let reported: (line: string) => void = () => {};
  const done = new Promise<string>((resolve) => (reported = resolve));
  const context = realm(test, (line) => reported(String(line)));
  let run: () => Promise<unknown>;
  try {
    run = load(context);
  } catch (error) {
    return early && nameOf(error) === negative!.type
      ? null
      : `doesn't parse: ${String(error)}`;
  }
  if (early) {
    return `parses, where it should throw ${negative!.type}`;
  }
  try {
    await run();
  } catch (error) {
    return negative?.phase === "runtime" && nameOf(error) === negative.type
      ? null
      : String(error);
  }
  if (negative !== undefined) {
    return `ran, where it should throw ${negative.type}`;
  }
  if (test.flags.includes("async")) {
    const line = await Promise.race([
      done,
      new Promise<string>((resolve) =>
        setTimeout(() => resolve("no $DONE"), TIMEOUT),
      ),
    ]);
    return line === "Test262:AsyncTestComplete" ? null : line;
  }
  return null;
}

// Plainly, as test262's own runners do: the test's text as a strict script
// in its realm.
const plainly = (test: Test) =>
  outcome(test, (context) => {
    const script = new vm.Script(`"use strict";\n${test.source}`, {
      filename: test.path,
    });
    // Its completion value dropped: a test ending in a promise that never
    // settles isn't waited on.
    return async () => {
      script.runInContext(context, { timeout: TIMEOUT });
    };
  });

// Through Backtick: the test as a client script, compiled, bundled, and its
// bundle run as the module a client loads.
async function throughBacktick(
  test: Test,
  compiled: Compiled,
): Promise<string | null> {
  const early = test.negative?.phase === "parse";
  if ("refused" in compiled) {
    return early ? null : `refused: ${compiled.refused[0]}`;
  }
  return outcome(test, (context) => {
    const module = new vm.SourceTextModule(compiled.bundle, {
      context,
      identifier: test.path,
    });
    return async () => {
      await module.link(() => test262Module(context, compiled.imports));
      // Node awaits the realm's promise from outside the realm, which calls
      // its `then`: a test replacing `then` and counting calls sees one more.
      await module.evaluate({ timeout: TIMEOUT });
    };
  });
}

async function judge(test: Test): Promise<Result> {
  const result = (status: Result["status"], reason?: string): Result => ({
    path: test.path,
    status,
    ...(reason !== undefined && { reason }),
  });
  const skip = notApplicable(test);
  if (skip !== null) {
    return result("skip", skip);
  }
  // A test declaring its own `$` name, as some declare `$DONE`, can't be a
  // script: every `$` name is a splice. The compiler says which do.
  const compiled = await compile(test);
  if (
    "refused" in compiled &&
    compiled.refused.every((message) => message.startsWith("`$`-prefixed"))
  ) {
    return result("skip", "declares a `$` name: a script splices every one");
  }
  const plain = await plainly(test);
  if (plain !== null) {
    return result("engine", plain);
  }
  const backtick = await throughBacktick(test, compiled);
  return backtick === null ? result("pass") : result("fail", backtick);
}

// A promise a test rejects and leaves is the test's own business, not a
// failure: test262 judges a test by what it reports.
process.on("unhandledRejection", () => {});

const args = process.argv.slice(2);
const update = args.includes("--update");
const filter = args.find((arg) => !arg.startsWith("--")) ?? "";
if (update && filter !== "") {
  throw new Error("--update writes the baseline from a full run only");
}

// A worker, forked below: it judges the tests the parent sends it, one at a
// time, by their index in `filter`'s tests.
if (args.includes("--worker")) {
  const mine = tests(filter);
  process.on("message", async (index: number) => {
    const test = mine[index]!;
    let result: Result;
    try {
      result = await judge(test);
    } catch (error) {
      result = { path: test.path, status: "fail", reason: String(error) };
    }
    process.send!(result);
  });
} else {
  await main();
}

async function main() {
  // One worker per core, each handed the next test as it finishes one. A test
  // that kills its worker fails, and a fresh worker takes its place.
  const all = tests(filter);
  let next = 0;
  const results: Result[] = [];
  const record = (result: Result) => {
    results.push(result);
    if (results.length % 1000 === 0) {
      process.stderr.write(`${results.length} of ${all.length}\n`);
    }
  };
  const work = (): Promise<void> =>
    new Promise((resolve) => {
      const worker = fork(import.meta.filename, [filter, "--worker"], {
        execArgv: process.execArgv,
      });
      let running = -1;
      const give = () => {
        running = next++;
        if (running < all.length) {
          worker.send(running);
        } else {
          running = -1;
          worker.kill();
        }
      };
      worker.on("message", (result: Result) => {
        record(result);
        give();
      });
      worker.on("exit", (code, signal) => {
        if (running === -1) {
          resolve();
          return;
        }
        record({
          path: all[running]!.path,
          status: "fail",
          reason: `killed its worker: ${signal ?? code}`,
        });
        resolve(work());
      });
      give();
    });
  await Promise.all(Array.from({ length: availableParallelism() }, work));
  report(results);
}

function report(results: Result[]) {
  results.sort((a, b) => (a.path < b.path ? -1 : 1));

  // Per directory, two levels deep (`built-ins/Array`); `passing` is of what
  // the engine passes.
  const byDirectory = new Map<string, Record<Result["status"], number>>();
  for (const { path, status } of results) {
    const key = path.split("/").slice(0, 2).join("/");
    const counts = byDirectory.get(key) ?? {
      pass: 0,
      fail: 0,
      engine: 0,
      skip: 0,
    };
    counts[status]++;
    byDirectory.set(key, counts);
  }
  const row = (
    name: string,
    { pass, fail, engine, skip }: Record<string, number>,
  ) =>
    `${name.padEnd(40)} ${String(pass).padStart(6)} ${String(fail).padStart(6)} ${String(engine).padStart(6)} ${String(skip).padStart(6)}   ${
      pass + fail === 0 ? "" : `${((100 * pass) / (pass + fail)).toFixed(1)}%`
    }`;
  console.log(`${"".padEnd(40)}   pass   fail engine   skip   passing`);
  for (const [name, counts] of [...byDirectory].sort()) {
    console.log(row(name, counts));
  }
  const total = { pass: 0, fail: 0, engine: 0, skip: 0 };
  for (const counts of byDirectory.values()) {
    for (const status of ["pass", "fail", "engine", "skip"] as const) {
      total[status] += counts[status];
    }
  }
  console.log(row("total", total));

  const cache = join(import.meta.dirname, "../.cache");
  mkdirSync(cache, { recursive: true });
  writeFileSync(
    join(cache, "results.json"),
    `${JSON.stringify(results, null, 2)}\n`,
  );

  // What fails and why, committed: a run says what it fixed, what it broke,
  // and what now fails another way. A reason's first line only, as the rest
  // is a stack or a long message.
  const baselineFile = join(import.meta.dirname, "../baseline.json");
  const failing = Object.fromEntries(
    results
      .filter(({ status }) => status === "fail")
      .map(({ path, reason = "" }) => [path, reason.split("\n")[0]!]),
  );
  if (update) {
    writeFileSync(baselineFile, `${JSON.stringify(failing, null, 2)}\n`);
    console.log(`baseline: ${Object.keys(failing).length} failing`);
  } else if (existsSync(baselineFile)) {
    const baseline = Object.entries(
      JSON.parse(readFileSync(baselineFile, "utf8")) as Record<string, string>,
    ).filter(([path]) => path.startsWith(filter));
    const before = new Map(baseline);
    const ran = new Map(results.map(({ path, status }) => [path, status]));
    const broke = Object.keys(failing).filter((path) => !before.has(path));
    const changed = Object.keys(failing).filter(
      (path) => before.has(path) && before.get(path) !== failing[path],
    );
    const fixed = baseline.filter(([path]) => ran.get(path) === "pass");
    console.log(
      `\n${fixed.length} fixed, ${broke.length} newly failing, ${changed.length} failing differently`,
    );
    for (const path of broke) {
      console.log(`  failing: ${path}\n    ${failing[path]}`);
    }
    for (const path of changed) {
      console.log(
        `  differently: ${path}\n    was ${before.get(path)}\n    now ${failing[path]}`,
      );
    }
    process.exitCode = broke.length > 0 ? 1 : 0;
  }
}
