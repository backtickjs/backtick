import { Backtick, cs } from "@backtickjs/core";
import type { BacktickElement, SerializedBundle } from "@backtickjs/core";

// What `<Backtick />` checks, and the one thing it does not.
//
// The type travels with the text: a `SerializedBundle<T>` says what the bundle
// takes and what it draws, so nothing here writes a type argument.
type Rows = (props: { count: number }) => BacktickElement;
type Empty = () => BacktickElement;

const rows = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "rows"]] },
  root: ["()", ["fn", "0"], []],
}) as SerializedBundle<Rows>;

const empty = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "nothing to hand it"]] },
  root: ["()", ["fn", "0"], []],
}) as SerializedBundle<Empty>;

// Right: what the bundle takes, and what it takes nothing of.
export const drawn = <Backtick bundle={rows} props={{ count: 1 }} />;
export const bare = <Backtick bundle={empty} props={{}} />;

// Wrong: the wrong type, a name it hasn't got, and none at all.
export const wrongType = <Backtick bundle={rows} props={{ count: "one" }} />;
export const wrongName = <Backtick bundle={rows} props={{ nope: 1 }} />;
export const missing = <Backtick bundle={rows} />;

// A plain string is not a claim about anything, so it is not a bundle.
export const text = <Backtick bundle={JSON.stringify({})} props={{}} />;

// A bundle that takes nothing, handed something anyway. The empty case is a
// record whose values are `never`, so `{}` goes in and nothing else does.
export const handedAnyway = <Backtick bundle={empty} props={{ count: 1 }} />;

export default cs`1`;
