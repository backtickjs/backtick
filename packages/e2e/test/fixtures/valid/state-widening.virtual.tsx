import { cs, state } from "@backtickjs/core";

// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// The three kinds here are the ones nothing else pins: a boolean, a string enum
// — which widens to its enum and not to the `string` under it — and a function,
// whose answer widens so the cell takes another of the same shape rather than
// only the one it was built from. `local-state` covers a number,
// `script-element` a string, and `state-enum` a numeric enum.
enum Tone {
  Warm = "warm",
  Cool = "cool",
}

async function Widened() {
  return cs.lift((() => {
    const __cs_flag = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(true));
    const __cs_tone = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(cs.splice(Tone.Warm) satisfies import("@backtickjs/core").ClientUnknown));
    const __cs_step = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(() => 0));
    return cs.const(<span onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_flag).write(false));
        cs.statement(cs.receiver(__cs_tone).write(cs.splice(Tone.Cool) satisfies import("@backtickjs/core").ClientUnknown));
        cs.statement(cs.receiver(__cs_step).write(() => 1));
    })}>{cs.lift(cs.receiver(__cs_flag).read() + " " + cs.receiver(__cs_tone).read() + " " + cs.receiver(__cs_step).read()())}</span>);
})());
}

export default <Widened />;
