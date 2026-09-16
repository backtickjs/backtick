import { cs, state } from "@backtickjs/core";

// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type, and `$state` takes its
// initial unbound so that every other kind does widen. Written out, the type
// argument is the contextual type — `$state<() => number>` holds a function
// answering with any number rather than only the one it was built from.
//
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
enum Tone {
  Warm = "warm",
  Cool = "cool",
}

async function Widened() {
  return cs.lift((() => {
    const __cs_flag = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(true));
    const __cs_tone = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(cs.splice(Tone.Warm) satisfies typeof cs.ClientUnknown));
    const __cs_step = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)<() => number>(() => 0));
    return cs.const(<span onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_flag).write(false));
        cs.statement(cs.receiver(__cs_tone).write(cs.splice(Tone.Cool) satisfies typeof cs.ClientUnknown));
        cs.statement(cs.receiver(__cs_step).write(() => 1));
    })}>{cs.lift(cs.receiver(__cs_flag).read() + " " + cs.receiver(__cs_tone).read() + " " + cs.receiver(__cs_step).read()())}</span>);
})());
}
