/**
 * Children with no element of their own: what one holds goes where it stands.
 *
 * Branded, because this is not an element — it draws no node, and it lowers to
 * its children rather than to one a client would have to know the id of.
 *
 * Made per target, because what a fragment may hold is what that target's
 * elements are. What they share is this brand, so one rule reads them all.
 */
export interface Fragment<P extends object = object> {
  (props: P): never;
  readonly "@backtickjs": "Fragment";
}

export function createFragment<P extends object>(): Fragment<P> {
  return { "@backtickjs": "Fragment" } as unknown as Fragment<P>;
}

export function isFragment(value: unknown): value is Fragment {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "Fragment"
  );
}
