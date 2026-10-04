#!/usr/bin/env bun
// `bun --watch` for a project Backtick compiles. Bun's own watch mode follows
// only the files it loads itself, and this plugin loads every `.ts` and `.tsx`
// file, so it would restart for none of them. This restarts for any source
// file in the project instead:
//
//     backtick-bun-watch src/index.tsx
//
// Everything after the command is Bun's, as `bun src/index.tsx` takes it.
import { watch } from "node:fs";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: backtick-bun-watch <entry> [arguments for bun…]");
  process.exit(1);
}

// A file whose change restarts the process: a module, or the JSON that
// configures one. Not what is installed or built, nor a hidden file, as an
// editor's temporary copy is while it saves.
const source = /\.(?:[mc]?[jt]sx?|json)$/;
const ignored =
  /(?:^|[/\\])(?:node_modules|\.git|dist|\.turbo)(?:[/\\]|$)|(?:^|[/\\])\.[^/\\]*$/;

const run = () =>
  Bun.spawn([process.execPath, ...args], {
    stdio: ["inherit", "inherit", "inherit"],
  });

let child = run();
let pending: ReturnType<typeof setTimeout> | undefined;

watch(".", { recursive: true }, (_event, file) => {
  if (file === null || ignored.test(file) || !source.test(file)) {
    return;
  }
  // An editor's save can be several writes: restart once, when they settle.
  clearTimeout(pending);
  pending = setTimeout(async () => {
    child.kill();
    // Gone before the next starts, so what it listened on is free again.
    await child.exited;
    console.log(`\n${file} changed, restarting\n`);
    child = run();
  }, 100);
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    child.kill();
    process.exit(0);
  });
}
