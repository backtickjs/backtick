import type { ClientComponent } from "./ClientComponent.js";
import type { ServerComponent } from "./ServerComponent.js";

/**
 * Every JSX tag is one of these: a client component names the element the
 * interpreter renders, a server component builds one. Bundling resolves it.
 */
export type Component = ClientComponent<never> | ServerComponent<never>;
