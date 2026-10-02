import { type Client, cs } from "@backtickjs/core";

// A script's tags are client components. A server component is host code, used
// in a splice (`{${<Row label={cs`"a"`} />}}`), and refused as a tag in a
// script whatever its props take: even where they'd take the script's values.
async function Row({ label }: { label: Client<string> }) {
  return cs.lift((() => <li>{cs.splice((label))}</li>)());
}

function Title({ text }: { text: string | Client<string> }) {
  return cs.lift((() => <h1>{cs.splice((text))}</h1>)());
}

function Rule() {
  return cs.lift((() => <hr />)());
}

// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const clientOnly = cs.lift(((__cs_Row = cs.splice(Row)) => <ul>{<__cs_Row label={"a"}/>}</ul>)());

// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const hybrid = cs.lift(((__cs_Title = cs.splice(Title)) => <__cs_Title text={"Week"}/>)());

// @ts-expect-error: not assignable to parameter of type 'Client<any>'.
export const noProps = cs.lift(((__cs_Rule = cs.splice(Rule)) => <div>{<__cs_Rule />}</div>)());
