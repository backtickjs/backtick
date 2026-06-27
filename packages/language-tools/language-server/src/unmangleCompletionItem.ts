import type { CompletionItem } from "@volar/language-server";
import { unmangle, unmangleValue } from "./unmangle.js";

export default function unmangleCompletionItem(
  item: CompletionItem,
): CompletionItem {
  // Every field below either shows in the editor (label/detail/documentation)
  // or is inserted/filtered against the user's document (insert/filter/textEdit)
  // — all places a mangled name would leak. `data` is intentionally left alone:
  // it's LSP's opaque round-trip handle and the TS service stores the *mangled*
  // name in it to re-find the entry on resolve; scrubbing it breaks resolve.
  const next: CompletionItem = { ...item, label: unmangle(item.label) };
  if (item.labelDetails) {
    const { detail, description } = item.labelDetails;
    next.labelDetails = {
      ...item.labelDetails,
      ...(detail !== undefined ? { detail: unmangle(detail) } : {}),
      ...(description !== undefined
        ? { description: unmangle(description) }
        : {}),
    };
  }
  if (item.detail !== undefined) {
    next.detail = unmangle(item.detail);
  }
  if (item.documentation !== undefined) {
    next.documentation =
      typeof item.documentation === "string"
        ? unmangle(item.documentation)
        : unmangleValue(item.documentation);
  }
  if (item.insertText !== undefined) {
    next.insertText = unmangle(item.insertText);
  }
  if (item.filterText !== undefined) {
    next.filterText = unmangle(item.filterText);
  }
  if (item.sortText !== undefined) {
    next.sortText = unmangle(item.sortText);
  }
  if (item.textEdit) {
    next.textEdit = {
      ...item.textEdit,
      newText: unmangle(item.textEdit.newText),
    };
  }
  if (item.additionalTextEdits) {
    next.additionalTextEdits = item.additionalTextEdits.map((edit) => ({
      ...edit,
      newText: unmangle(edit.newText),
    }));
  }
  return next;
}
