const MANGLE_RE = /\$0client_/g;

// Strip the compiler's virtual `$0client_` identifier prefix, which the
// backtick compiler adds to names inside virtualized `cs` code. Without this
// the prefix leaks into editor UI (hovers, completion details, diagnostics).
//
// NOTE: this is a deliberate local copy of the language-server's `unmangle`.
// The two run in different processes (this one inside the editor's tsserver,
// the other inside the Volar LSP) and are intentionally NOT shared.
export function unmangle(text: string): string {
  return text.replace(MANGLE_RE, "");
}
