/**
 * A tag that is an element, under a type the element cannot state itself.
 * `<For />` is `<for />` with `T` bound at the call site, which a tag has
 * nowhere to do.
 *
 * Branded for the reason `Fragment` is, and lowered beside it: it draws no node
 * of its own because it *is* one, so it lowers where it stands rather than
 * through an instance. A component would be a tree entry — the thing that owns
 * what it declares and that a re-render re-runs — and an alias declares
 * nothing.
 */
export interface ElementAlias {
  (props: never): unknown;
  readonly "@backtickjs": "ElementAlias";
  readonly id: string;
}

export function createElementAlias<T extends ElementAlias>(id: string): T {
  return { "@backtickjs": "ElementAlias", id } as unknown as T;
}

export function isElementAlias(value: unknown): value is ElementAlias {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ElementAlias"
  );
}
