import type { Spliceable } from "@backtickjs/core";
import type { Queries, queries } from "@testing-library/dom";
import {
  type BundleClient,
  type Bundle,
  evaluateBundleWith,
  evaluateWith,
} from "./evaluate.js";
import { type RenderOptions, type RenderResult, renderWith } from "./render.js";

/**
 * `render`, `evaluate` and `evaluateBundle`, bound to one client. `T` is
 * what its adapter's JSX evaluates to.
 */
export interface Testing<T = unknown> {
  render<
    Q extends Queries = typeof queries,
    Container extends Element = HTMLElement,
    BaseElement extends Element = Container,
  >(
    value: Spliceable<T>,
    options?: RenderOptions<Q, Container, BaseElement>,
  ): Promise<RenderResult<Q, Container, BaseElement, T>>;
  evaluate<T>(value: Spliceable<T>): Promise<T>;
  evaluateBundle<T>(code: string): Promise<T>;
}

/**
 * `render` and `evaluate` bound to an adapter's client and `bundle`: what an
 * adapter's own testing entry exports, as `@testing-library/react` binds
 * `@testing-library/dom` to React.
 */
export function createTesting<T = unknown>(
  client: BundleClient,
  bundle: Bundle,
): Testing<T> {
  return {
    render: <
      Q extends Queries = typeof queries,
      Container extends Element = HTMLElement,
      BaseElement extends Element = Container,
    >(
      value: Spliceable<T>,
      options?: RenderOptions<Q, Container, BaseElement>,
    ) => renderWith(client, bundle, value, options),
    evaluate: <T>(value: Spliceable<T>) =>
      evaluateWith(client, bundle, value),
    evaluateBundle: <T>(code: string) =>
      evaluateBundleWith<T>(client, code),
  };
}
