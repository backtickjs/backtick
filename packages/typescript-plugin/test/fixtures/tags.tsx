import { cs } from "@backtickjs/core";

const Card = cs`(props: { title: string; children?: unknown }) => (
  <section>{props.title}</section>
)`;

export const selfClosing = cs`{
  // a comment above the tag
  return <$Card title="Self-closing" />;
}`;

export const paired = cs`<$Card title="Paired">text</$Card>`;

async function Server({ title }: { title: string }) {
  return cs`<b>{$title}</b>`;
}

export const inScript = cs`<$Server title="In a script" />`;

const Box = cs`(props: { children?: unknown }) => <div />`;

export const nested = cs`<$Box>
  <$Box />
</$Box>`;

const ui = {
  Badge: cs`(props: { n: number; children?: unknown }) => <b>{props.n}</b>`,
};

export const member = cs`<$ui.Badge n={1}>{2}</$ui.Badge>`;
