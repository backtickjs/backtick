// A binding key as the compiler writes it, `<name>$<fileHash>$<n>`. Shared by
// the two halves of the bundler because both have to agree on what a key means,
// and neither owns it.

// The source name a key was written under, with the uniqueness suffix dropped.
// Printing it is the caller's job: two distinct keys can share a source name,
// and whether that matters depends on whether they can meet in one scope.
export function sourceName(key: string): string {
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
}
