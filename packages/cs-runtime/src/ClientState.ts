import type { SpliceableValue } from "@backtickjs/language-schema";

export interface ClientState<T extends SpliceableValue> {
  readonly "@backtickjs": "ClientState";
  readonly initial: T;
  // The bundler's node for the component invocation that declared this cell.
  // Opaque here — what an instance is, and which one was running, are the
  // bundler's, and it reads this back as its own `AstInstance`.
  readonly declaredIn: object;
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
