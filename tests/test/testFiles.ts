import { readdirSync } from "node:fs";
import { isPorted } from "./unported.ts";

// The test files to run: every `*.test.ts(x)` outside an unported directory.
console.log(
  readdirSync(import.meta.dirname, { recursive: true, encoding: "utf8" })
    .filter(
      (file) =>
        /\.test\.tsx?$/.test(file) &&
        !file.includes("__snapshots__") &&
        isPorted(file),
    )
    .sort()
    .map((file) => `test/${file}`)
    .join(" "),
);
