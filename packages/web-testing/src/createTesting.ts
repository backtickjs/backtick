import type {
  Bundle,
  BacktickElement,
  Spliceable,
} from "@backtickjs/core";
import type { Queries, queries } from "@testing-library/dom";
import {
  type BundleClient,
  type Compile,
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
  evaluate<T>(value: Spliceable<T>): Promise<T>;
  evaluateBundle<T>(code: Bundle<T>): Promise<T>;
}

/**
 * `render` and `evaluate` bound to an adapter's client and compiler: what an
 * adapter's own testing entry exports, as `@testing-library/react` binds
 * `@testing-library/dom` to React.
 */
export function createTesting(
  client: BundleClient,
  compile: Compile,
): Testing {
  return {
    render: <
      Q extends Queries = typeof queries,
      Container extends Element = HTMLElement,
      BaseElement extends Element = Container,
    >(
      value: Spliceable<BacktickElement>,
      options?: RenderOptions<Q, Container, BaseElement>,
    ) => renderWith(client, compile, value, options),
    evaluate: <T>(value: Spliceable<T>) =>
      evaluateWith(client, compile, value),
    evaluateBundle: <T>(code: Bundle<T>) =>
      evaluateBundleWith(client, code),
  };
}
