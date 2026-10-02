import { readdirSync } from "node:fs";

// The test files to run: every `*.test.ts(x)`, but the typecheck suite's
// fixtures, which hold no tests and may not even run (`await` where it isn't
// allowed).
console.log(
  readdirSync(import.meta.dirname, { recursive: true, encoding: "utf8" })
    .filter(
      (file) =>
        /\.test\.tsx?$/.test(file) &&
        !file.includes("__snapshots__") &&
        !file.startsWith("typecheck-errors/"),
    )
    .sort()
    .map((file) => `test/${file}`)
    .join(" "),
);
