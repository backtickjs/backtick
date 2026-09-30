import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// A handler is handed what the DOM hands it, and which event that is comes
// from the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's
// opaque `EventTarget`, which is what makes reading a field's value sayable —
// the DOM expects a cast there, and this language has none.
it("eventHandlers", async (t) => {
  await snapshotCase(
    t,
    "eventHandlers",
    cs.lift((() => {
    const __cs_said = cs.splice((createSignal))("");
    return <form onsubmit={cs.lift(__cs_event => {
        __cs_event.preventDefault();
        __cs_said[1](__cs_event.type + " " + __cs_event.cancelable);
    })}>{cs.lift(<textarea oninput={cs.lift(__cs_event => __cs_said[1](__cs_event.currentTarget.value))}/>)}{cs.lift(<input oninput={cs.lift(__cs_event => __cs_said[1](__cs_event.currentTarget.value))}/>)}{cs.lift(<button onclick={cs.lift(__cs_event => __cs_said[1](__cs_event.clientX + " " + __cs_event.currentTarget.tagName))}>{cs.lift(__cs_said[0]())}</button>)}</form>;
})()),
  );
});
