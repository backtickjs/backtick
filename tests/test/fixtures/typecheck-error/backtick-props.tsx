import { Backtick, BacktickWithProps, cs } from "@backtickjs/core";
import type { BacktickElement, SerializedBundle } from "@backtickjs/core";

// What `<Backtick />` checks, and the one thing it does not.
//
// The type travels with the text: a `SerializedBundle<T>` says what the bundle
// evaluates to — a drawing, or a function of what it takes — so nothing here
// writes a type argument.
type Rows = (props: { count: number }) => BacktickElement;

const rows = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "rows"]] },
  root: ["()", ["fn", "0"], []],
}) as SerializedBundle<Rows>;

const empty = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "nothing to hand it"]] },
  root: ["()", ["fn", "0"], []],
}) as SerializedBundle<BacktickElement>;

// Right: what the bundle takes, and a drawing, which takes nothing.
export const drawn = <BacktickWithProps bundle={rows} props={{ count: 1 }} />;
export const bare = <Backtick bundle={empty} />;

// Wrong: the wrong type, a name it hasn't got, and none at all.
export const wrongType = (
  <BacktickWithProps bundle={rows} props={{ count: "one" }} />
);
export const wrongName = <BacktickWithProps bundle={rows} props={{ nope: 1 }} />;
export const missing = <BacktickWithProps bundle={rows} />;

// Null draws nothing, and a plain string is not a claim, so it is not a bundle.
export const nothing = <Backtick bundle={null} />;

export const text = <Backtick bundle={JSON.stringify({})} />;

// A drawing, handed props anyway. A drawing is finished — there is no call for
// arguments to reach, so the component that takes them does not take it.
export const handedAnyway = (
  <BacktickWithProps bundle={empty} props={{ count: 1 }} />
);

export default cs`1`;
