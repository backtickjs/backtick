import { expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const watcher = join(import.meta.dir, "..", "dist", "watch.js");

// Waits until what the process wrote so far says `text`.
async function until(output: () => string, text: string): Promise<void> {
  for (let tries = 0; tries < 100; tries++) {
    if (output().includes(text)) {
      return;
    }
    await Bun.sleep(50);
  }
  throw new Error(`never said "${text}", only:\n${output()}`);
}

test("runs the entry again when a module it imports changes", async () => {
  const project = mkdtempSync(join(tmpdir(), "backtick-watch-"));
  writeFileSync(join(project, "value.ts"), "export const value = 1;\n");
  writeFileSync(
    join(project, "main.ts"),
    'import { value } from "./value.ts";\nconsole.log(`started ${value}`);\nsetInterval(() => {}, 1000);\n',
  );
  const child = Bun.spawn([process.execPath, watcher, "main.ts"], {
    cwd: project,
    stdout: "pipe",
  });
  let output = "";
  (async () => {
    for await (const chunk of child.stdout) {
      output += new TextDecoder().decode(chunk);
    }
  })();
  try {
    await until(() => output, "started 1");
    writeFileSync(join(project, "value.ts"), "export const value = 2;\n");
    await until(() => output, "started 2");
    expect(output).toContain("value.ts changed, restarting");
  } finally {
    child.kill();
    await child.exited;
    rmSync(project, { recursive: true, force: true });
  }
});
