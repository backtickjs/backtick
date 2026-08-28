import { cs, state } from "@backtickjs/core";

// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM rather than from the sound of the name: `click` is a `PointerEvent`,
// `dblclick` a `MouseEvent`, `input` an `InputEvent`.
//
// The parameters are left to be inferred. Writing the type out reaches the
// browser's own `PointerEvent` instead of this schema's — the DOM's globals are
// in scope here and shadow it — so annotating one is a thing that does not work
// yet, and this fixture is where that will be noticed when it does.
export default cs`{
  const said = $state("");

  return (
    <form
      onsubmit={(event) => {
        // The three every event carries, which is what stopping one takes.
        event.preventDefault();
        event.stopPropagation();
        said.write(event.type + " " + event.cancelable + " " + event.defaultPrevented);
      }}
    >
      <button
        onclick={(event) => {
          said.write(event.clientX + " " + event.pointerType + " " + event.altKey);
        }}
        onkeydown={(event) => {
          said.write(event.key + " " + event.repeat + " " + event.ctrlKey);
        }}
      >
        {said.read()}
      </button>
      <input oninput={(event) => said.write(event.inputType)} />
    </form>
  );
}`;
