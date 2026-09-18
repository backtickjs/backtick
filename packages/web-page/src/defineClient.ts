import { createInterpreter } from "@backtickjs/web-interpreter";
import type { InterpreterOptions } from "@backtickjs/web-interpreter";

/**
 * Draws every bundle a page carries, where its script stands.
 *
 * A window is all a page hands over: its document is what is drawn into, and a
 * script reaches the window itself through `$window`. `builtinOf` answers
 * for what an app adds to the web's own names, asked after them, so an app may
 * add and may not replace. A tag an app adds is one it registers with the
 * browser, which the document then builds itself.
 */
export function defineClient(options: InterpreterOptions): void {
  // A window carries the document it is of, so a page hands over one thing.
  const document = options.window.document;
  const { render } = createInterpreter(options);

  // Every bundle the document carried, drawn where its script stands.
  //
  // Found here rather than announced from the page: a document that carried a
  // line of its own to start this would need that line allowed by its
  // `script-src`, and a bundle is data. So the client does the finding, and a
  // page carrying one carries no code.
  const drawEach = (): void => {
    for (const script of document.querySelectorAll("script[data-backtick]")) {
      const parent = script.parentNode;
      if (parent === null) {
        continue;
      }
      // Taken, so a second client on the page leaves it to this one.
      script.removeAttribute("data-backtick");
      // In front of the script, which stays: a drawing goes on inserting after
      // it is first made and needs something that holds still to insert in
      // front of. The script is that, and shows nothing.
      render(JSON.parse(script.textContent), parent, script);
    }
  };

  if (document.readyState === "loading") {
    throw new Error(
      "backtick: the client has to run after the document is parsed — load " +
        'it with `defer`, or inline it as `type="module"`.',
    );
  }

  drawEach();
}
