import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
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
      const said = $state("");

      return (
        <form
          onsubmit={(event) => {
            event.preventDefault();
            said.write(event.type + " " + event.cancelable);
          }}
        >
          <textarea
            oninput={(event) => said.write(event.currentTarget.value)}
          />
          <input oninput={(event) => said.write(event.currentTarget.value)} />
          <button
            onclick={(event) =>
              said.write(event.clientX + " " + event.currentTarget.tagName)
            }
          >
            {said.read()}
          </button>
        </form>
      );
    }`,
  );
});
