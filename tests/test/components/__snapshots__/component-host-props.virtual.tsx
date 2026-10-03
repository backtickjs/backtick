import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A component's props are the host's own. It runs while bundling and consumes
// them there, so they never cross and need not be able to: a class instance and
// a host function are both fine here, where either would be refused in a
// script.
//
// This is why a drawing's props are `unknown` rather than what a client value
// may be — crossing is a tag's requirement, checked where a tag lowers.
class Palette {
  accent: string;
  constructor(accent: string) {
    this.accent = accent;
  }
}

async function Swatch(props: { palette: Palette; label: () => string }) {
  const accent = props.palette.accent;
  const label = props.label();
  return cs.lift((() => <span class={cs.splice((accent))}>{cs.splice((label))}</span>)());
}

it("componentHostProps", async (t) => {
  await snapshotCase(
    t,
    "componentHostProps",
    cs.lift((() => <div>
      {cs.splice((<Swatch palette={new Palette("danger")} label={() => "one"} />))}
    </div>)()),
  );
});
