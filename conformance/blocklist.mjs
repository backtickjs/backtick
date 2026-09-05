// Reading `blocklist.txt`: what Test262 covers that client script has not got.
//
// A line is a path prefix under Test262's `test/`, two or more spaces, then the
// reason. A prefix ending in `*` matches by leading text, which is how a family
// of files sharing a stem is named without listing all of them.
import { readFileSync } from "node:fs";

const HERE = new URL(".", import.meta.url).pathname;

export function blocklist(path = `${HERE}blocklist.txt`) {
  const entries = [];
  for (const [at, line] of readFileSync(path, "utf8").split("\n").entries()) {
    const text = line.trim();
    if (!text || text.startsWith("#")) continue;
    const match = /^(\S+)\s\s+(\S.*)$/.exec(line);
    if (!match) {
      throw new Error(
        `blocklist.txt:${at + 1}: a line is a prefix, two spaces, then why — got: ${text}`,
      );
    }
    entries.push({ prefix: match[1], why: match[2].trim(), line: at + 1 });
  }
  return entries;
}

/** The entry that blocks this path, or null. */
export function blocks(entries, file) {
  for (const entry of entries) {
    const { prefix } = entry;
    if (prefix.endsWith("*")) {
      if (file.startsWith(prefix.slice(0, -1))) return entry;
    } else if (prefix.endsWith("/")) {
      if (file.startsWith(prefix)) return entry;
    } else if (file === prefix || file.startsWith(`${prefix}/`)) {
      return entry;
    }
  }
  return null;
}
