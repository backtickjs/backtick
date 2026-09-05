// Running one Test262 file, as `INTERPRETING.md` says a host must.
//
// Shared by the copy step and the suite so they can never disagree about what
// "passes" means: the copy keeps what this runs green, and the suite runs the
// same way over what was kept.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const harness = new Map();

/**
 * Ignores a promise a test left rejected.
 *
 * A test that makes a rejected promise and never handles it is doing its job;
 * Node's default is to take the process down for it, which would end a run
 * partway through and blame whatever came next. Call this once in a host.
 */
let stray = null;
export function absorbUnhandledRejections() {
  process.on("unhandledRejection", (reason) => {
    stray = reason;
  });
}

/** A harness file, read once. */
export function harnessFile(dir, name) {
  const key = join(dir, name);
  if (!harness.has(key)) harness.set(key, readFileSync(key, "utf8"));
  return harness.get(key);
}

/** The frontmatter keys a host has to act on. The rest is prose. */
export function frontmatter(source) {
  const block = /\/\*---([\s\S]*?)---\*\//.exec(source);
  if (!block) return { flags: [], includes: [], features: [], negative: null };
  const text = block[1];
  const list = (key) => {
    const flow = new RegExp(`^${key}:\\s*\\[(.*?)\\]`, "m").exec(text);
    if (flow) {
      return flow[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    // The block form: the key, then indented `- name` lines.
    const listed = new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.*\\n)+)`, "m").exec(
      text,
    );
    return listed
      ? listed[1]
          .split("\n")
          .map((line) => line.replace(/^\s*-\s*/, "").trim())
          .filter(Boolean)
      : [];
  };
  return {
    flags: list("flags"),
    includes: list("includes"),
    features: list("features"),
    negative: /^negative:/m.test(text)
      ? {
          phase: /^\s+phase:\s*(\S+)/m.exec(text)?.[1] ?? "",
          type: /^\s+type:\s*(\S+)/m.exec(text)?.[1] ?? "",
        }
      : null,
  };
}

/** Which modes a test must be run in. Absent both flags it runs in each. */
export function modes(flags) {
  if (flags.includes("raw") || flags.includes("noStrict")) return [false];
  if (flags.includes("onlyStrict")) return [true];
  return [false, true];
}

/** The source as it must be executed: the harness, then the test. */
export function assemble(harnessDir, source, meta) {
  if (meta.flags.includes("raw")) return source;
  const includes = [...meta.includes];
  // An async test signals completion through `$DONE`, which this file defines.
  // Most declare it; a few rely on the host adding it.
  if (
    meta.flags.includes("async") &&
    !includes.includes("doneprintHandle.js")
  ) {
    includes.push("doneprintHandle.js");
  }
  return [
    harnessFile(harnessDir, "assert.js"),
    harnessFile(harnessDir, "sta.js"),
    ...includes.map((name) => harnessFile(harnessDir, name)),
    source,
  ].join("\n");
}

/**
 * Runs one test in a realm of its own, so a test leaking a global cannot reach
 * the next. Throws what the test threw.
 *
 * An `async` test finishes when it calls `$DONE`, which `doneprintHandle.js`
 * writes through `print` — so the host supplies `print` and waits. Returns the
 * promise that settles when it does, or `null` for a synchronous test.
 */
export function execute(source, strict, meta) {
  // Seeded from a null prototype: a sandbox inheriting `Object.prototype` makes
  // a global `var __proto__` reach the inherited setter instead of defining an
  // own property, which is this runner's artefact rather than the engine's.
  const sandbox = Object.create(null);
  sandbox.console = console;

  // `$DONE` reports through `print`, in two strings `INTERPRETING.md` fixes.
  let settle = null;
  const done = meta?.flags?.includes("async")
    ? new Promise((resolve, reject) => {
        settle = { resolve, reject };
      })
    : null;
  sandbox.print = (message) => {
    if (!settle) return;
    const text = String(message);
    if (text === "Test262:AsyncTestComplete") settle.resolve();
    else if (text.startsWith("Test262:AsyncTestFailure")) {
      settle.reject(new Error(text));
    }
  };

  const context = vm.createContext(sandbox);
  context.$262 = {
    global: context,
    createRealm: () => {
      throw new Error("$262.createRealm is not provided");
    },
    detachArrayBuffer: () => {
      throw new Error("$262.detachArrayBuffer is not provided");
    },
    evalScript: (text) => vm.runInContext(text, context),
    gc: () => {},
  };
  vm.runInContext(strict ? `"use strict";\n${source}` : source, context, {
    timeout: 10_000,
    // Needs `--experimental-vm-modules` to be honoured; without the flag Node
    // rejects the import itself, asynchronously, past every `catch` here — and
    // an error nothing can catch ends the run rather than the test.
    importModuleDynamically: () => {
      throw new Error("dynamic import is not provided");
    },
  });
  return done;
}

/**
 * Whether a test passes, and what went wrong if not. A `negative:` test passes
 * by throwing.
 */
export async function check(source, strict, meta) {
  stray = null;
  try {
    const done = execute(source, strict, meta);
    if (done) {
      // A test that never calls `$DONE` would otherwise hold the run open.
      let timer;
      await Promise.race([
        done,
        new Promise((_, reject) => {
          timer = setTimeout(
            () => reject(new Error("$DONE was never called")),
            10_000,
          );
        }),
      ]).finally(() => clearTimeout(timer));
    }
  } catch (error) {
    if (meta.negative) return { ok: true };
    return { ok: false, why: `${error?.constructor?.name}: ${error?.message}` };
  }
  if (meta.negative) {
    return {
      ok: false,
      why: `expected a ${meta.negative.type}, nothing was thrown`,
    };
  }
  // A test can call `$DONE` and leave work still running — a dangling
  // `import()`, a timer — which then throws with nothing left to catch it. That
  // is not a test that passed, and letting it through means the run reports the
  // leak against whatever came next. One turn of the loop is enough to see it.
  await new Promise((resolve) => setImmediate(resolve));
  if (stray !== null) {
    const reason = stray;
    stray = null;
    return {
      ok: false,
      why: `left work running that threw: ${reason?.message ?? String(reason)}`,
    };
  }
  return { ok: true };
}
