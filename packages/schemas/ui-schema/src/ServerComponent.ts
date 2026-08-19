import type { ClientElement } from "./schema.generated.js";

/**
 * A component built from other components. It runs on the host while bundling,
 * so it may await, and never reaches the client: the payload carries only what
 * it resolved to.
 *
 * Each invocation is still a tree entry, because that entry is the instance —
 * it owns the state the component declares and is what a re-render re-runs.
 * Answering `null` draws nothing and leaves the instance standing.
 */
export type ServerComponent<P extends object = object> = ((
  props: P,
) => Promise<ClientElement | null>) & {
  // What a component is *not*: optional, so an ordinary function satisfies it
  // unwrapped, and it rules out `Fragment`, which is callable and returns
  // `never` — assignable to every return type, so it would otherwise pass.
  readonly "@backtickjs"?: "ServerComponent";
};
