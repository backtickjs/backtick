import type { ClientState, SpliceableValue } from "@backtickjs/cs-runtime";
import type { AstInstance, AstState } from "./Ast.js";
import { lowerSpliceable } from "./lowerSpliceable.js";

// One node per cell, ever: identity is the cell object, so a cell spliced
// into a display and into a handler lowers to the same node and both reach
// the same storage.
const nodeByCell = new WeakMap<
  ClientState<SpliceableValue>,
  Promise<AstState>
>();

export function lowerClientState(
  value: ClientState<SpliceableValue>,
): Promise<AstState> {
  const shared = nodeByCell.get(value);
  if (shared) {
    return shared;
  }
  // memoized before the first await, so one cell lowers once even if two
  // splices reach it concurrently
  const node = buildClientState(value);
  nodeByCell.set(value, node);
  return node;
}

// The initial lowers in value position: it is data the declaring entry
// carries, not something a script evaluates.
async function buildClientState(
  value: ClientState<SpliceableValue>,
): Promise<AstState> {
  return {
    kind: "AstState",
    initial: await lowerSpliceable(value.initial, "ClientValue"),
    declaredIn: value.declaredIn as AstInstance,
  };
}
