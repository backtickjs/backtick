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
 * Nor does it follow a label into the table, and it cannot need to: an entry's
 * body holds no application at all. Nothing a call site supplies is inlined, so
 * a body reaches what encloses it through its own thunk parameters, and
 * invoking one is a call; an expansion named in a body is the function itself,
 * and using that is a call as well. Whatever an entry can reach while it is
 * being evaluated, it reaches by calling.
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
  if (kind === NodeKind.ArrowFunction) {
    return false;
  }
  // After it, not before: a function written where it is called is still
  // called, and the call is the node reached first. What the stop above means
  // is a function this expression only makes.
  if (kind === NodeKind.CallExpression) {
    return true;
  }
  // An application runs another entry's body, which this has not read — and
  // whatever that body reads, it reads by invoking the thunks supplied here,
  // which are the arguments the stop above walks past. A body holds no
  // application today, so this says no about nothing; it is here so that a
  // lowering which put one in a body would be conservative rather than wrong.
  if (kind === NodeKind.ApplyFunction) {
    return true;
  }
  return Object.values(node).some(calls);
}
