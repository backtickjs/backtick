import type { WebBuiltins } from "@backtickjs/web-client";
import type { RendererOptions } from "./RendererOptions.js";

/**
 * What a target hands this interpreter: how to build its nodes, and what it
 * answers for beyond the names the language provides itself.
 *
 * Two halves rather than one, because they are answered by different things. A
 * renderer is how a host draws, and every target has one. A table of builtins
 * is what a target offers a script that the language does not — storage, a
 * clock, a way out to the network.
 */
export interface ClientOptions<
  NodeType extends object,
  Builtins extends WebBuiltins = WebBuiltins,
> {
  /** How this host builds, moves and reads its own nodes. */
  readonly renderer: RendererOptions<NodeType>;

  /**
   * What this client answers for, beside the language's own.
   *
   * Keyed by the whole name, as the schema writes it and as the wire carries
   * it: a bundle reaches a builtin by its name alone, and there is one lookup
   * for the language's names and a target's alike.
   *
   * At least the web's, because a bundle written against the web schema splices
   * `window` wherever it is drawn. A target whose schema extends the web's hands
   * over its own generated contract as it is.
   *
   * A name the language already answers for is refused rather than replaced:
   * what `state` means is not a target's to redecide, and a client where it
   * meant something else is a bundle that means something else everywhere it
   * runs.
   */
  readonly builtins: Builtins;
}
