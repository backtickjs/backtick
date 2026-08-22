/**
 * Children with no element of their own: what it holds goes where it stands.
 *
 * Branded because it is not an element — it draws no node, and lowers to its
 * children rather than to a tag the client would need an id for. Each target
 * makes its own, since what a fragment may hold is whatever that target draws,
 * and the brand is what lets one rule read them all.
 */
export interface Fragment<Props extends object = object> {
  (props: Props): unknown;
  readonly "@backtickjs": "Fragment";
}

export function createFragment<Props extends object>(): Fragment<Props> {
  return { "@backtickjs": "Fragment" } as unknown as Fragment<Props>;
}

export function isFragment(value: unknown): value is Fragment<never> {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "Fragment"
  );
}
