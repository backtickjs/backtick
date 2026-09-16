import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import { createInterpreter } from "@backtickjs/web-vm";
import { Window as Page } from "happy-dom";
import type { Element, Node } from "happy-dom";
import { windowOf } from "./window.js";

/** What a test changes about the page a bundle is drawn into. */
export interface DocumentOptions {
  /** Names beside the client's own, for a test about a target adding one. */
  readonly builtinOf?: (name: string) => ClientValue;
}

/** A page a bundle was drawn into, and what closes it again. */
export interface Drawn {
  /** The document the bundle drew into, to read and to dispatch events on. */
  readonly document: Page["document"];
  /** The page's own window: the one a script reached through `$window`. */
  readonly page: Page;
  /** Takes every drawing down and stops what the page had running. */
  close(): void;
}

/** A page to draw into, which a test may draw into more than once. */
export interface OpenPage extends Drawn {
  /**
   * Draws a bundle into `parent`, or into the body where none is named, and
   * answers with what takes that drawing down again.
   *
   * An anchor is one of the parent's children to draw in front of, as a page's
   * own script element is for a bundle it carries.
   */
  render(
    bundle: Bundle<ClientUnknown>,
    parent?: Element,
    anchor?: Node,
  ): () => void;
}

/**
 * A page of its own, drawn into through the same renderer a browser page uses:
 * a test reads what a bundle drew the way a browser would — `querySelector`,
 * `textContent`, `click` — and what it reads is a real DOM.
 *
 * One page behind both the document and `$window`: a timer a script started is
 * this page's, and closing it stops them.
 */
export function openPage(options: DocumentOptions = {}): OpenPage {
  const page = new Page();
  const document = page.document;
  const { render } = createInterpreter(document as never, {
    window: windowOf(page),
    builtinOf: options.builtinOf,
  });
  const drawn: (() => void)[] = [];
  return {
    document,
    page,
    render: (bundle, parent = document.body as never, anchor) => {
      const dispose = render(bundle, parent as never, anchor as never);
      drawn.push(dispose);
      return dispose;
    },
    close: () => {
      for (const dispose of drawn) {
        dispose();
      }
      void page.happyDOM.close();
    },
  };
}

/**
 * A bundle drawn into the body of a page of its own — {@link openPage} for the
 * one drawing a test usually wants.
 */
export function renderDocument(
  bundle: Bundle<ClientUnknown>,
  options: DocumentOptions = {},
): Drawn {
  const opened = openPage(options);
  opened.render(bundle);
  return opened;
}
