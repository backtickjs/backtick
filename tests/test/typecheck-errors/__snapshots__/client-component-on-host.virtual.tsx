import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";

// A client component is client code, a tag in a script. On the host it isn't
// callable, so TypeScript refuses it as a tag: a client import, and a script
// answering a component alike.
const Badge = cs.lift((() => (__cs_props: { n: number }) => <b>{__cs_props.n}</b>)());

// @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
export const forOnHost = <For each={[1, 2]}>{(n: number) => n}</For>;

// @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
export const badgeOnHost = <Badge n={1} />;

// In a script, both are what they are on the client.
export const inScript = cs.lift((() => (void For, cs.splice(For)({ each: [1, 2], children: (__cs_n) => cs.splice(Badge)({ n: __cs_n, }) })))());
