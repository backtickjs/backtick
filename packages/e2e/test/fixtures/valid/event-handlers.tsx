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
export default cs`{
  const said = $state("");

  return (
    <form
      onsubmit={(event: SubmitEvent) => {
        // The three every event carries, which is what stopping one takes.
        event.preventDefault();
        event.stopPropagation();
        said.write(event.type + " " + event.cancelable + " " + event.defaultPrevented);
      }}
    >
      <button
        onclick={(event: PointerEvent) => {
          said.write(event.clientX + " " + event.pointerType + " " + event.altKey);
        }}
        onkeydown={(event: KeyboardEvent) => {
          said.write(event.key + " " + event.repeat + " " + event.ctrlKey);
        }}
      >
        {said.read()}
      </button>
      <input oninput={(event: InputEvent) => said.write(event.inputType)} />
    </form>
  );
}`;
