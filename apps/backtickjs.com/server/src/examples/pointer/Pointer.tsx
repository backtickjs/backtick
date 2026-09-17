import { cs, state } from "@backtickjs/core";

const pad =
  "display: grid; place-items: center; gap: 6px; width: 100%; height: 190px;" +
  " border-radius: 22px; background: #111; color: #fff; cursor: crosshair;" +
  " font: 600 14px ui-monospace, SFMono-Regular, Menlo, monospace";

export default async function Pointer() {
  return cs`{
    const at = $state("tap the pad");

    // The handler is handed the event the DOM sends — which for a click is a
    // \`PointerEvent\`, whatever the name suggests. Everything read here is read
    // off it: nothing crossed the wire to answer where the tap was.
    return (
      <div
        style={$pad}
        onclick={(e) =>
          at.set(
            e.clientX +
              " , " +
              e.clientY +
              (e.shiftKey ? "   shift" : "") +
              (e.altKey ? "   alt" : "") +
              "   " +
              e.pointerType,
          )
        }
      >
        {at.get()}
      </div>
    );
  }`;
}
