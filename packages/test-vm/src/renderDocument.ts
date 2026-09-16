import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import { createInterpreter, renderer } from "@backtickjs/web-vm";
import { Window as Page } from "happy-dom";
import { windowOf } from "./window.js";

/** What a test changes about the page a bundle is drawn into. */
export interface DocumentOptions {
  /** Names beside the client's own, for a test about a target adding one. */
  readonly compileBuiltin?: (name: string) => ClientValue;
}

/** A page a bundle was drawn into, and what closes it again. */
export interface Drawn {
  /** The document the bundle drew into, to read and to dispatch events on. */
  readonly document: Page["document"];
  /** The page's own window: the one a script reached through `$window`. */
  readonly page: Page;
  /** Takes the drawing down and stops what the page had running. */
  close(): void;
}

/**
 * Draws a bundle into a document of its own, through the same renderer a page
 * uses, so a test reads what it drew the way a browser would: `querySelector`,
 * `textContent`, `click`.
 *
 * One page behind both the document and `$window`: a timer a script started is
 * the document's own, and closing the page stops it.
 */
export function renderDocument(
  bundle: Bundle<ClientUnknown>,
  options: DocumentOptions = {},
): Drawn {
  const page = new Page();
  const document = page.document;
  const { render } = createInterpreter(renderer(document as never), {
    window: windowOf(page),
    compileBuiltin: options.compileBuiltin,
  });
  const dispose = render(bundle, document.body as never);
  return {
    document,
    page,
    close: () => {
      dispose();
      void page.happyDOM.close();
    },
  };
}
