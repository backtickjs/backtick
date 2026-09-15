import type { ClientValue } from "@backtickjs/core";
import type { Renderer } from "../Renderer.js";

/**
 * What a target hands this interpreter: how to build its nodes, the window a
 * script reaches through `$window`, and what it answers for beyond the names
 * the language provides itself.
 *
 * Apart rather than one, because they are answered by different things. A
 * renderer is how a host draws and a window is what it offers a script, and
 * every target has both. What a target adds beside them it answers for itself.
 */
export interface ClientOptions<NodeType extends object> {
  /** How this host builds, moves and reads its own nodes. */
  readonly renderer: Renderer<NodeType>;

  /**
   * The host's window, which the client reads from to answer `window`. Never
   * handed to a script itself: what a script reaches is the list the client
   * writes out, read through to this.
   */
  readonly window: HostWindow;

  /**
   * What this target answers for, beside the language's own names and the
   * window: asked by the whole name, as the schema writes it and as the wire
   * carries it, and answering with nothing for a name it does not have.
   *
   * Asked only after the client has not answered, so a name the client already
   * answers for is never reached here: what `state` means is not a target's to
   * redecide.
   */
  readonly compileBuiltin?: (name: string) => ClientValue;
}

/**
 * What the client reads off a host's window. Written out rather than the DOM's
 * `Window`, so a host with no DOM — a test under Node — can hand one over.
 */
export interface HostWindow {
  readonly performance: { now(): number };
  readonly console: {
    log(...values: unknown[]): void;
    warn(...values: unknown[]): void;
    error(...values: unknown[]): void;
  };
  addEventListener(type: string, listener: (event: unknown) => void): void;
  removeEventListener(type: string, listener: (event: unknown) => void): void;
  postMessage(message: unknown, targetOrigin: string): void;
  readonly location: {
    readonly href: string;
    readonly origin: string;
    readonly protocol: string;
    readonly host: string;
    readonly hostname: string;
    readonly port: string;
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    assign(url: string): void;
    replace(url: string): void;
    reload(): void;
  };
  setTimeout(handler: () => void, timeout?: number): number;
  clearTimeout(id: number): void;
  setInterval(handler: () => void, timeout?: number): number;
  clearInterval(id: number): void;
}
