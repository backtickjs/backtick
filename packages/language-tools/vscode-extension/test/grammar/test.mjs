import { spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const grammarDir = resolve(__dirname, "../../syntaxes");
const grammars = [
  // The base TSX grammar our injection grammar is injected into. Provided by
  // VS Code at runtime; vendored here so the snapshot tests have a base scope.
  resolve(__dirname, "../../vendor/tsx.json"),
  ...readdirSync(grammarDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => join(grammarDir, file)),
];

/**
 * @param  {Parameters<typeof spawn>} arg
 * @returns {Promise<number | null>}
 */
function promisifySpawn(...arg) {
  const childProcess = spawn(...arg);
  return new Promise((cb) => {
    childProcess.on("exit", (code) => {
      cb(code);
    });

    childProcess.on("error", (err) => {
      console.error(err);
      cb(1);
    });
  });
}

async function snapShotTest() {
  const extraArgs = process.argv.slice(2);
  const isWindows = process.platform === "win32";

  const args = [
    "vscode-tmgrammar-snap",
    "-s",
    "source.tsx",
    "./test/grammar/fixtures/**/*.tsx",
    ...grammars.flatMap((path) => ["-g", path]),
    ...extraArgs,
  ].map((arg) => (isWindows && arg.includes(" ") ? `"${arg}"` : arg));

  const code = await promisifySpawn(isWindows ? "pnpm.cmd" : "pnpm", args, {
    stdio: "inherit",
    shell: isWindows,
  });

  if (code && code > 0) {
    process.exit(code);
  }
}

void snapShotTest();
