import { NodeField, NodeKind } from "./Bundle.js";
import type { BundleFunction, FunctionLabel } from "./Bundle.js";

/**
 * Marks every entry whose value cannot change.
 *
 * Evaluating a bundle is deterministic, so an entry yields something different
 * only if one of its inputs did. Storage is what moves — a cell, or the
 * position of a member of a list — and storage is read by calling `read()` on a
 * handle. So an entry that calls nothing reads nothing that moves, whatever it
 * holds.
 *
 * That is the whole test, and it needs no vocabulary: a call is a call, and
 * every other node is walked through rather than understood. What it does need
 * is to stop where evaluation stops. A function is made here, not run — its
 * body is read by whoever calls it, in whatever computation that is — so a call
 * written inside one is not this entry's reading.
 *
 * Nor does it follow a label into the table, and it doesn't have to. An entry
 * reaches another only by splicing it, a splice is a thunk the body invokes at
 * the hole, and invoking a thunk is a call — so an entry that could reach a
 * cell through another entry has a call of its own to be caught by.
 */
export function markFixed(
  functions: Record<FunctionLabel, BundleFunction>,
): void {
  for (const entry of Object.values(functions)) {
    if (!calls(entry[NodeField.content][NodeField.body])) {
      entry[NodeField.fixed] = true;
    }
  }
}

function calls(node: unknown): boolean {
  if (node === null || typeof node !== "object") {
    return false;
  }
  if (Array.isArray(node)) {
    return node.some(calls);
  }
  const kind = (node as Record<string, unknown>)["#"];
  // Made, not run.
  if (kind === NodeKind.ArrowFunction || kind === NodeKind.Thunk) {
    return false;
  }
  if (kind === NodeKind.CallExpression) {
    return true;
  }
  return Object.values(node).some(calls);
}
