// FNV-1a over the file's text: the per-file content hash that makes compiler
// output globally distinguishable. The compiler runs one file at a time and
// cannot hand out coordinated identifiers, and a file's path alone can recur
// across codebases (two packages each compiled against their own root), so
// both binding keys and script locations carry this hash. A full hash
// collision therefore implies identical file content, where sharing is
// correct rather than a mixup.
export function hashText(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}
