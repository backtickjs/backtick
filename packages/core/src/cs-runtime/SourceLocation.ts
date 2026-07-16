// A node's place in its source file, as a flat tuple to keep the emitted
// runtime code small; the file itself is named once, by the script's
// `filePath`. Emitted values are 1-based.
export type SourceLocation = readonly [
  startLine: number,
  startCharacter: number,
  endLine: number,
  endCharacter: number,
];
