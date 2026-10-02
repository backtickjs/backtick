import { cs } from "@backtickjs/core";

const Card = cs`(props: { title: string; children?: unknown }) => (
  <section>{props.title}</section>
)`;

export const selfClosing = cs`{
  // a comment above the tag
  return <Card title="Self-closing" />;
}`;

export const paired = cs`<Card title="Paired">text</Card>`;

async function Server({ title }: { title: string }) {
  return cs`<b>{$title}</b>`;
}

export const inScript = cs`<Server title="In a script" />`;
