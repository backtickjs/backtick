import type { BacktickElement } from "./declarations.generated.js";
import type { Prop } from "@backtickjs/language";

/**
 * A component built from other components. It runs on the host while bundling,
 * so it may await, and never reaches the client: the payload carries only what
 * it resolved to.
 */
export type ServerComponent<Props extends object> = (
  props: Props,
) => Promise<Prop<BacktickElement | null>>;
