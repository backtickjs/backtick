import { cs } from "@backtickjs/core";

const Counter = cs`(props: { label: string }) => <b>{props.label}</b>`;
const List = cs`<T,>(props: {
  each: readonly T[];
  render: (item: T) => string;
}) => (
  <ul>
    {props.each.map((item) => (
      <li>{props.render(item)}</li>
    ))}
  </ul>
)`;

// `key`, as React's JSX allows on any tag
export const keyed = cs`<$Counter key="a" label="Apples" />`;

// a generic component stays generic: `row` is typed from `each`
export const generic = cs`(
  <$List each={[{ name: "a" }]} render={(row) => row.name} />
)`;

// @ts-expect-error: a key is a string or a number
export const badKey = cs`<$Counter key={{}} label="Apples" />`;

// @ts-expect-error: `labl` is no prop of `Counter`
export const typo = cs`<$Counter labl="Apples" />`;
