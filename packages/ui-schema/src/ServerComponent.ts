import type { ClientValue } from "@backtickjs/language-schema";
import type { Children } from "./Children.js";

/**
 * A component built from other components. It runs on the host while bundling,
 * so it may await, and never reaches the client: the payload carries only what
 * it resolved to.
 */
export type ServerComponent<
  Props extends object,
  ClientNode extends ClientValue,
> = (props: Props) => Promise<Children<ClientNode>>;
