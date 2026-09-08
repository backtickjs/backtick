import { bundler } from "@backtickjs/bundler";
import { Backtick, BacktickWithProps, cs } from "@backtickjs/core";
import type {
  BacktickElement,
  Prop,
  SerializedBundle,
} from "@backtickjs/core";

// What `<Backtick />` checks, and the one thing it does not.
//
// The type travels with the text: a `SerializedBundle<T>` says what the bundle
// evaluates to — a drawing, or a function of what it takes — so nothing here
// writes a type argument.
type Rows = (props: { count: number }) => BacktickElement;

// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }: { count: Prop<number> }) {
  return cs.lift(cs.const(<em>{cs.lift("rows " + (cs.splice((count)) satisfies import("@backtickjs/core").ClientUnknown))}</em>));
}

async function Nothing() {
  return cs.lift(cs.const(<em>{cs.lift("nothing to hand it")}</em>));
}

const rows = JSON.stringify(
  await bundler.run(cs.lift(cs.const((__cs_props: {
    count: number;
}) => cs.splice((
    <Row count={cs.lift(cs.const(cs.receiver(__cs_props).count))} />
  )) satisfies import("@backtickjs/core").ClientUnknown))),
) as SerializedBundle<Rows>;

const empty = JSON.stringify(
  await bundler.run(<Nothing />),
) as SerializedBundle<BacktickElement>;

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

export default cs.lift(cs.const(1));
