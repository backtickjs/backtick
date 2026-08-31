import type { ClientValue } from "./ClientValue.js";
import type { Children } from "./Children.js";

/**
 * Children with no element of their own: what it holds goes where it stands.
 *
 * A component, and nothing but — it answers with its children, which is what
 * "goes where it stands" means. So there is nothing to recognise it by and no
 * rule that reads it: a tag naming one is a tag naming a component, wherever it
 * was written.
 *
 * Each target still makes its own, since what a fragment may hold is whatever
 * that target draws, and `Props` is where it says so.
 */
export interface Fragment<Props extends object = object> {
  <ClientNode extends ClientValue>(props: Props): Promise<Children<ClientNode>>;
}

export function createFragment<Props extends object>(): Fragment<Props> {
  return (async (props: { children?: unknown }) =>
    props.children) as unknown as Fragment<Props>;
}
