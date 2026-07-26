import type { Instance } from "./Instance.js";
import type { SpliceableValue } from "./Spliceable.js";

export interface ClientState<T extends SpliceableValue> {
  readonly "@backtickjs": "ClientState";
  readonly initial: T;
  readonly declaredIn: Instance;
}

export function isClientState(
  value: unknown,
): value is ClientState<SpliceableValue> {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientState"
  );
}
