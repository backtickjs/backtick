import { cs, state } from "@backtickjs/core";

// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's opaque
// `EventTarget`, which is what makes reading a field's value sayable — the DOM
// expects a cast there, and this language has none.
export default cs.lift((() => {
    const __cs_said = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(""));
    return cs.const(<form onsubmit={cs.lift(__cs_event => {
        cs.statement(cs.receiver(__cs_event).preventDefault());
        cs.statement(cs.receiver(__cs_said).write(cs.receiver(__cs_event).type + " " + cs.receiver(__cs_event).cancelable));
    })}>{cs.lift(<textarea oninput={cs.lift(__cs_event => cs.receiver(__cs_said).write(cs.receiver(cs.receiver(__cs_event).currentTarget).value))}/>)}{cs.lift(<input oninput={cs.lift(__cs_event => cs.receiver(__cs_said).write(cs.receiver(cs.receiver(__cs_event).currentTarget).value))}/>)}{cs.lift(<button onclick={cs.lift(__cs_event => cs.receiver(__cs_said).write(cs.receiver(__cs_event).clientX + " " + cs.receiver(cs.receiver(__cs_event).currentTarget).tagName))}>{cs.lift(cs.receiver(__cs_said).read())}</button>)}</form>);
})());
