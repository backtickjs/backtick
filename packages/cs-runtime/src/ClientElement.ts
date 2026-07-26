import type { SpliceableValue } from "./Spliceable.js";

// A component's props: an object whose every value the bundler can lower.
type Props = { [key: string]: SpliceableValue };

export interface ClientElement<P extends Props = Props> {
  (props: P): never;
  readonly "@backtickjs": "ClientElement";
  readonly id: string;
}

export function isClientElement(value: unknown): value is ClientElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientElement"
  );
}

export function createClientElement<P extends Props>(
  id: string,
): ClientElement<P> {
  return {
    "@backtickjs": "ClientElement",
    id,
  } as unknown as ClientElement<P>;
}
