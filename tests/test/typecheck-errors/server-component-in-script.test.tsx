import { type Client, cs } from "@backtickjs/core";

// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
async function Row({ label }: { label: Client<string> }) {
  return cs`<li>{$label}</li>`;
}

function Title({ text }: { text: string | Client<string> }) {
  return cs`<h1>{$text}</h1>`;
}

function Rule() {
  return cs`<hr />`;
}

// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const clientOnly = cs`<ul><Row label="a" /></ul>`;

// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const hybrid = cs`<Title text="Week" />`;

// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const noProps = cs`<div><Rule /></div>`;
