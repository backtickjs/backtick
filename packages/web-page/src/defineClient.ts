import type { ClientValue } from "@backtickjs/core";
import { createRuntime } from "@backtickjs/web-interpreter";
import type { ClientOptions } from "@backtickjs/web-interpreter";

// What a page's script queues: see `renderToString`.
type Queued = readonly [script: Node, run: () => ClientValue];

/**
 * Draws every bundle a page carries, where its script stands, and every one
 * queued after.
 *
 * Defining a client is defining its globals: the web's, and the app's own
 * `globals` beside them. A tag an app adds is one it registers with the
 * browser, which the document then builds itself.
 */
export function defineClient(options: ClientOptions): void {
  const { render } = createRuntime(options);
  const page = options.window as unknown as { __backtick?: Queued[] };
  const queue = (page.__backtick ??= []);

  const draw = ([script, run]: Queued): void => {
    const parent = script.parentNode;
    if (parent !== null) {
      render(run, parent, script);
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
