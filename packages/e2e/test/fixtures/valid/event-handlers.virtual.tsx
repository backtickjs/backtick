import { cs, state } from "@backtickjs/core";

// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM rather than from the sound of the name: `click` is a `PointerEvent`,
// `dblclick` a `MouseEvent`, `input` an `InputEvent`.
//
// The parameters are left to be inferred. Writing the type out reaches the
// browser's own `PointerEvent` instead of this schema's — the DOM's globals are
// in scope here and shadow it — so annotating one is a thing that does not work
// yet, and this fixture is where that will be noticed when it does.
export default cs.lift((() => {
    const __cs_said = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(""));
    return cs.const(<form onsubmit={cs.lift(__cs_event => {
        cs.statement(cs.receiver(__cs_event).preventDefault());
        cs.statement(cs.receiver(__cs_event).stopPropagation());
        cs.statement(cs.receiver(__cs_said).write(cs.receiver(__cs_event).type + " " + cs.receiver(__cs_event).cancelable + " " + cs.receiver(__cs_event).defaultPrevented));
    })}>{cs.lift(<button onclick={cs.lift(__cs_event => {
        cs.statement(cs.receiver(__cs_said).write(cs.receiver(__cs_event).clientX + " " + cs.receiver(__cs_event).pointerType + " " + cs.receiver(__cs_event).altKey));
    })} onkeydown={cs.lift(__cs_event => {
        cs.statement(cs.receiver(__cs_said).write(cs.receiver(__cs_event).key + " " + cs.receiver(__cs_event).repeat + " " + cs.receiver(__cs_event).ctrlKey));
    })}>{cs.lift(cs.receiver(__cs_said).read())}</button>)}{cs.lift(<input oninput={cs.lift(__cs_event => cs.receiver(__cs_said).write(cs.receiver(__cs_event).inputType))}/>)}</form>);
})());
