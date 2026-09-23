import type { ClientValue } from "@backtickjs/core";
import { createRuntime } from "@backtickjs/web-interpreter";
import type { InterpreterOptions } from "@backtickjs/web-interpreter";

// What a page's script queues: see `renderToString`.
type Queued = readonly [
  script: Node,
  globals: readonly string[],
  run: () => ClientValue,
];

/**
 * Draws every bundle a page carries, where its script stands, and every one
 * queued after.
 *
 * A window is all a page hands over: its document is what is drawn into, and a
 * script reaches the window itself through `$window`. `builtinOf` answers
 * for what an app adds to the web's own names, asked after them, so an app may
 * add and may not replace. A tag an app adds is one it registers with the
 * browser, which the document then builds itself.
 */
export function defineClient(options: InterpreterOptions): void {
  const { render } = createRuntime(options);
  const page = options.window as unknown as { __backtick?: Queued[] };
  const queue = (page.__backtick ??= []);

  const draw = ([script, globals, run]: Queued): void => {
    const parent = script.parentNode;
    if (parent !== null) {
      render({ globals, run }, parent, script);
    }
  };

  if (options.window.document.readyState === "loading") {
    throw new Error(
      "backtick: the client has to run after the document is parsed — load " +
        'it with `defer`, or inline it as `type="module"`.',
    );
  }

  // Taken off the queue as it is drawn, so a second client finds nothing.
  for (const queued of queue.splice(0)) {
    draw(queued);
  }
  queue.push = (...queued: Queued[]): number => {
    queued.forEach(draw);
    return queue.length;
  };
}
