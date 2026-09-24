import type { BacktickElement, Spliceable } from "@backtickjs/core";
import { getQueriesForElement, prettyDOM } from "@testing-library/dom";
import type {
  BoundFunctions,
  PrettyDOMOptions,
  Queries,
  queries,
} from "@testing-library/dom";
import { mounted } from "./cleanup.js";
import type { EvaluateOptions } from "./evaluate.js";
import { prepare } from "./client.js";

/** Where and how a value is drawn. */
export interface RenderOptions<
  Q extends Queries = typeof queries,
  Container extends Element = HTMLElement,
  BaseElement extends Element = Container,
> extends EvaluateOptions {
  /**
   * The element to draw into. A new `<div>` appended to `baseElement` where
   * none is given. Drawing into a container again replaces what was drawn
   * there.
   */
  readonly container?: Container;
  /**
   * What the queries and `debug` read: `container` where one is given, the
   * body otherwise.
   */
  readonly baseElement?: BaseElement;
  /** The queries to bind, in place of Testing Library's own. */
  readonly queries?: Q;
}

/** What `render` drew, and the queries over the element it reads. */
export type RenderResult<
  Q extends Queries = typeof queries,
  Container extends Element = HTMLElement,
  BaseElement extends Element = Container,
> = BoundFunctions<Q> & {
  /** The element the value was drawn into. */
  readonly container: Container;
  /** The element the queries read. */
  readonly baseElement: BaseElement;
  /** Prints an element, `baseElement` where none is given. */
  debug(
    element?: Element | Element[],
    maxLength?: number,
    options?: PrettyDOMOptions,
  ): void;
  /** Draws another value in place of this one, in the same container. */
  rerender(value: Spliceable<BacktickElement>): Promise<void>;
  /** Takes this drawing down, leaving the container. */
  unmount(): void;
  /** What the container holds now, as a fragment. */
  asFragment(): DocumentFragment;
};

/**
 * Bundles a value and draws it into the global document, as Testing Library's
 * `render` mounts a component.
 *
 * The document is the test environment's: jsdom through `global-jsdom`, Jest's
 * or Vitest's `jsdom` environment, or a browser.
 */
export async function render<
  Q extends Queries = typeof queries,
  Container extends Element = HTMLElement,
  BaseElement extends Element = Container,
>(
  value: Spliceable<BacktickElement>,
  options: RenderOptions<Q, Container, BaseElement> = {},
): Promise<RenderResult<Q, Container, BaseElement>> {
  const baseElement = (options.baseElement ??
    options.container ??
    document.body) as BaseElement;
  const container = (options.container ??
    baseElement.appendChild(document.createElement("div"))) as Container;

  // Taken down between drawings, and kept for `cleanup` even when a drawing
  // throws, so its container still leaves the body.
  const takeDown = (): void => {
    mounted.get(container)?.();
    mounted.set(container, () => {});
  };
  takeDown();

  const draw = async (value: Spliceable<BacktickElement>): Promise<void> => {
    const prepared = await prepare(value, options.globals);
    takeDown();
    const dispose = prepared.render(container);
    // The interpreter stops what it drew but leaves the nodes, so the
    // container is emptied here, as React's `unmount` and Solid's own `render`
    // do.
    mounted.set(container, () => {
      dispose();
      container.replaceChildren();
    });
  };

  await draw(value);

  const bound = getQueriesForElement<Q>(
    baseElement as unknown as HTMLElement,
    options.queries,
  );
  return {
    ...bound,
    container,
    baseElement,
    debug: (element = baseElement, maxLength, prettyOptions) => {
      for (const each of Array.isArray(element) ? element : [element]) {
        console.log(prettyDOM(each, maxLength, prettyOptions));
      }
    },
    rerender: draw,
    unmount: takeDown,
    asFragment: () => {
      const template = document.createElement("template");
      template.innerHTML = container.innerHTML;
      return template.content;
    },
  };
}
