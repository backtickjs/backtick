import type {
  Bundle,
  BacktickElement,
  ClientUnknown,
  Spliceable,
} from "@backtickjs/core";
import type { CodeTransform } from "@backtickjs/bundler";
import type { Queries, queries } from "@testing-library/dom";
import {
  type BundleClient,
  evaluateBundleWith,
  evaluateWith,
} from "./evaluate.js";
import { type RenderOptions, type RenderResult, renderWith } from "./render.js";

/** `render`, `evaluate` and `evaluateBundle`, bound to one client. */
export interface Testing {
  render<
    Q extends Queries = typeof queries,
    Container extends Element = HTMLElement,
    BaseElement extends Element = Container,
  >(
    value: Spliceable<BacktickElement>,
    options?: RenderOptions<Q, Container, BaseElement>,
  ): Promise<RenderResult<Q, Container, BaseElement>>;
  evaluate<T extends ClientUnknown>(value: Spliceable<T>): Promise<T>;
  evaluateBundle<T extends ClientUnknown>(code: Bundle<T>): T;
}

/**
 * `render` and `evaluate` bound to an adapter's client and transform: what an
 * adapter's own testing entry exports, as `@testing-library/react` binds
 * `@testing-library/dom` to React.
 */
export function createTesting(
  client: BundleClient,
  transform: CodeTransform,
): Testing {
  return {
    render: <
      Q extends Queries = typeof queries,
      Container extends Element = HTMLElement,
      BaseElement extends Element = Container,
    >(
      value: Spliceable<BacktickElement>,
      options?: RenderOptions<Q, Container, BaseElement>,
    ) => renderWith(client, transform, value, options),
    evaluate: <T extends ClientUnknown>(value: Spliceable<T>) =>
      evaluateWith(client, transform, value),
    evaluateBundle: <T extends ClientUnknown>(code: Bundle<T>) =>
      evaluateBundleWith(client, code),
  };
}
