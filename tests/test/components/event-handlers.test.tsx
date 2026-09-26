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
    cs`{
      const said = $createSignal("");

      return (
        <form
          onsubmit={(event) => {
            event.preventDefault();
            said[1](event.type + " " + event.cancelable);
          }}
        >
          <textarea oninput={(event) => said[1](event.currentTarget.value)} />
          <input oninput={(event) => said[1](event.currentTarget.value)} />
          <button
            onclick={(event) =>
              said[1](event.clientX + " " + event.currentTarget.tagName)
            }
          >
            {said[0]()}
          </button>
        </form>
      );
    }`,
  );
});
