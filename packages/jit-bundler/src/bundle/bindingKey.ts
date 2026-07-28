// A binding key as the compiler writes it, `<name>$<fileHash>$<n>`, plus the
// reserved form a state cell travels under. Shared by the two halves of the
// bundler because both have to agree on what a key means, and neither owns it.

// A state cell threads into entries exactly like a capture — an entry that
// reads a cell receives its handle in its environment — so a cell travels as a
// capture key. `#` starts the key because it can't appear in a binding key (or
// in a JS identifier), so the two namespaces can't collide.
export function cellKey(index: number): string {
  return `#s${index}`;
}

export function isCellKey(key: string): boolean {
  return key.startsWith("#s");
}

export function cellIndex(key: string): number {
  return Number(key.slice(2));
}

// The source name a key was written under, with the uniqueness suffix dropped.
// Printing it is the caller's job: two distinct keys can share a source name,
// and whether that matters depends on whether they can meet in one scope.
export function sourceName(key: string): string {
  if (isCellKey(key)) {
    return key.slice(1);
  }
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
}
