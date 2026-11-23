// The app the tests check: new_app's starter, as every app begins.
export { starter } from "../../src/function/starter.ts";

// Where `needle` starts in `source`, as TypeScript prints a position:
// `(line,column)`, from 1.
export function positionOf(source: string, needle: string): string {
  const before = source.slice(0, source.indexOf(needle)).split("\n");
  return `(${before.length},${before.at(-1)!.length + 1})`;
}
