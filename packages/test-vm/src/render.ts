import type { ClientValue, Spliceable } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { createInterpreter } from "@backtickjs/web-interpreter";
import { getQueriesForElement, queries } from "@testing-library/dom";
import type { BoundFunctions } from "@testing-library/dom";
import { Window as Page } from "happy-dom";
import { afterEach } from "node:test";
import { windowOf } from "./window.js";

/** What a test changes about the page a script is drawn into. */
export interface RenderOptions extends DrawOptions {
  /** Names beside the client's own, for a test about a target adding one. */
  readonly builtinOf?: (name: string) => ClientValue;
  /** Markup the body holds before anything is drawn, as a page's own does. */
  readonly html?: string;
}

/** Where in the page a drawing goes. */
export interface DrawOptions {
  /** A selector for the element drawn into; the body where none is given. */
  readonly container?: string;
  /**
   * A selector for one of the container's children to draw in front of, as a
   * page's own script element is for a bundle it carries.
   */
  readonly anchor?: string;
}

/** A script drawn into a page. */
export interface Rendered {
  /** The element the script was drawn into. */
  readonly container: Element;
  /** Takes this drawing down, leaving the rest of the page. */
  unmount(): void;
  /** Draws another script into the same page. */
  render(script: Spliceable, options?: DrawOptions): Promise<Rendered>;
}

// Every page `render` opened, closed after each test the way Testing Library
// cleans up: a timer a drawing started never outlives its test.
const opened: Page[] = [];

afterEach(() => {
  for (const page of opened.splice(0)) {
    void page.happyDOM.close();
  }
});

/**
 * Bundles a script and draws it into a page of its own, which {@link screen}
 * then reads.
 *
 * One page behind both the document and `$window`: a timer a script started is
 * this page's, and the page is closed after the test.
 */
export async function render(
  script: Spliceable,
  { builtinOf, html, ...options }: RenderOptions = {},
): Promise<Rendered> {
  const page = new Page();
  opened.push(page);
  const document = page.document as unknown as Document;
  if (html !== undefined) {
    document.body.innerHTML = html;
  }
  const interpreter = createInterpreter(document, {
    window: windowOf(page),
    builtinOf,
  });

  const draw = async (
    script: Spliceable,
    { container, anchor }: DrawOptions = {},
  ): Promise<Rendered> => {
    const bundle = await bundler.run(script);
    const parent = container === undefined ? document.body : find(container);
    const unmount = interpreter.render(
      bundle,
      parent,
      anchor === undefined ? undefined : find(anchor),
    );
    return { container: parent, unmount, render: draw };
  };

  const find = (selector: string): Element => {
    const found = document.querySelector(selector);
    if (found === null) {
      throw new Error(`backtick: nothing in the page matches \`${selector}\``);
    }
    return found;
  };

  return draw(script, options);
}

/**
 * Testing Library's queries over the body of the page `render` opened last.
 *
 * Resolved on each call rather than bound once, so the one `screen` follows
 * every test's own page.
 */
export const screen = Object.fromEntries(
  Object.keys(queries).map((name) => [
    name,
    (...args: unknown[]) => {
      const page = opened.at(-1);
      if (page === undefined) {
        throw new Error("backtick: `screen` read before anything was rendered");
      }
      const bound = getQueriesForElement(
        page.document.body as unknown as HTMLElement,
      );
      return (bound[name as keyof typeof bound] as Function)(...args);
    },
  ]),
) as BoundFunctions<typeof queries>;
