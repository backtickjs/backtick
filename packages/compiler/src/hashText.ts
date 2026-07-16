// 64-bit FNV-1a over the file's text: the per-file content hash that makes
// compiler output globally distinguishable. The compiler runs one file at a
// time and cannot hand out coordinated identifiers, and a file's path alone
// can recur across codebases (two packages each compiled against their own
// root), so both binding keys and script locations carry this hash. At 64
// bits an accidental collision between different files is out of reach
// (the birthday bound sits around four billion files), so a collision
// implies identical file content, where sharing is correct rather than a
// mixup.
export function hashText(input: string): string {
  let hash = 0xcbf29ce484222325n;
  for (let i = 0; i < input.length; i++) {
    hash ^= BigInt(input.charCodeAt(i));
    hash = (hash * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return hash.toString(36);
}
