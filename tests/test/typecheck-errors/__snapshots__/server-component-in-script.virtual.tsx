import { type Client, cs } from "@backtickjs/core";

// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
// A host function isn't `Spliceable`, which is what the tag is checked as.
async function Row({ label }: { label: Client<string> }) {
  return cs.lift((() => <li>{cs.splice((label))}</li>)());
}

function Title({ text }: { text: string | Client<string> }) {
  return cs.lift((() => <h1>{cs.splice((text))}</h1>)());
}

function Rule() {
  return cs.lift((() => <hr />)());
}

// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const clientOnly = cs.lift((() => (void <cs.tag />, cs.splice((Row))({ label: "a", })))());

// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const hybrid = cs.lift((() => (void <cs.tag />, cs.splice((Title))({ text: "Week", })))());

// @ts-expect-error: not assignable to parameter of type 'Spliceable'.
export const noProps = cs.lift((() => (void <cs.tag />, cs.splice((Rule))({ })))());
