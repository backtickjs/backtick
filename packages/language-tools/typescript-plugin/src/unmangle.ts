import type * as ts from "typescript";

// Backtick's compiler emits identifiers written inside a `cs` client script into
// the virtual code with this prefix so they can't collide with names in the
// surrounding host scope (e.g. `obj` becomes `$0client_obj`). The prefix is an
// implementation detail of virtualization and must never reach the user, so this
// plugin strips it from everything the TypeScript language service reports
// against the virtual code.
export const CLIENT_PREFIX = "$0client_";

const CLIENT_PREFIX_PATTERN = /\$0client_/g;

// Restore the identifier the user actually wrote by removing the virtualization
// prefix from text the language service produced in terms of the virtual code.
export function unmangle(text: string): string {
  return text.replace(CLIENT_PREFIX_PATTERN, "");
}

// Unmangle the text of a symbol display part, the unit both quick-info hovers and
// completion details are built from.
export function unmangleDisplayPart(
  part: ts.SymbolDisplayPart,
): ts.SymbolDisplayPart {
  return { ...part, text: unmangle(part.text) };
}
