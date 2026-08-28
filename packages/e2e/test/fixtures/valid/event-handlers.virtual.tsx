import { cs, state } from "@backtickjs/core";
import type {
  InputEvent,
  KeyboardEvent,
  PointerEvent,
  SubmitEvent,
} from "@backtickjs/web-sdk";

// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM rather than from the sound of the name: `click` is a `PointerEvent`,
// `dblclick` a `MouseEvent`, `input` an `InputEvent`.
//
// The types are imported rather than named bare. The names are the DOM's on
// purpose, so a bare one reaches the browser's global instead — an import is
// what shadows it, and without one the two read as unrelated types with the
// same name.
export default cs.lift((() => {
    const __cs_said = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(""));
    return cs.const(<form onsubmit={cs.lift((__cs_event: SubmitEvent) => {
        cs.statement(cs.receiver(__cs_event).preventDefault());
        cs.statement(cs.receiver(__cs_event).stopPropagation());
        cs.statement(cs.receiver(__cs_said).write(cs.receiver(__cs_event).type + " " + cs.receiver(__cs_event).cancelable + " " + cs.receiver(__cs_event).defaultPrevented));
    })}>{cs.lift(<button onclick={cs.lift((__cs_event: PointerEvent) => {
        cs.statement(cs.receiver(__cs_said).write(cs.receiver(__cs_event).clientX + " " + cs.receiver(__cs_event).pointerType + " " + cs.receiver(__cs_event).altKey));
    })} onkeydown={cs.lift((__cs_event: KeyboardEvent) => {
        cs.statement(cs.receiver(__cs_said).write(cs.receiver(__cs_event).key + " " + cs.receiver(__cs_event).repeat + " " + cs.receiver(__cs_event).ctrlKey));
    })}>{cs.lift(cs.receiver(__cs_said).read())}</button>)}{cs.lift(<input oninput={cs.lift((__cs_event: InputEvent) => cs.receiver(__cs_said).write(cs.receiver(__cs_event).inputType))}/>)}</form>);
})());
