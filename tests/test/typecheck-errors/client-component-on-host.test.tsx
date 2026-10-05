import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";

// A client component is client code, a tag in a script. On the host it isn't
// callable, so TypeScript refuses it as a tag: a client import, and a script
// answering a component alike.
const Badge = cs`(props: { n: number }) => <b>{props.n}</b>`;

// @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
export const forOnHost = <For each={[1, 2]}>{(n: number) => n}</For>;

// @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
export const badgeOnHost = <Badge n={1} />;

// In a script, both are what they are on the client.
export const inScript = cs`(
  <$For each={[1, 2]}>{(n) => <$Badge n={n} />}</$For>
)`;
