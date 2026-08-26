import { cs, state } from "@backtickjs/core";

// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// The two kinds here are the ones nothing else pins: a boolean, and a string
// enum, which widens to its enum and not to the `string` under it. A function
// is the one initial that does not widen — `state-holds-function` pins that.
// `local-state` covers a number, `script-element` a string, and `state-enum` a
// numeric enum handed to a function typed as it.
enum Tone {
  Warm = "warm",
  Cool = "cool",
}

async function Widened() {
  return cs.lift((() => {
    const __cs_flag = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(true));
    const __cs_tone = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(cs.splice(Tone.Warm) satisfies import("@backtickjs/core").ClientUnknown));
    return cs.const(<span onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_flag).write(false));
        cs.statement(cs.receiver(__cs_tone).write(cs.splice(Tone.Cool) satisfies import("@backtickjs/core").ClientUnknown));
    })}>{cs.lift(cs.receiver(__cs_flag).read() + " " + cs.receiver(__cs_tone).read())}</span>);
})());
}

export default <Widened />;
