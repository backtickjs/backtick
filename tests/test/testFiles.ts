import { readdirSync } from "node:fs";

// The test files to run: every `*.test.ts(x)`.
console.log(
  readdirSync(import.meta.dirname, { recursive: true, encoding: "utf8" })
    .filter(
      (file) => /\.test\.tsx?$/.test(file) && !file.includes("__snapshots__"),
    )
    .sort()
    .map((file) => `test/${file}`)
    .join(" "),
);
