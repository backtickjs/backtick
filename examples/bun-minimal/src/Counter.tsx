import { cs, state } from "@backtickjs/core";

// Client state: the count lives on the client, so pressing re-renders without
// asking the server for anything. The bundle for this page carries the handler
// as a script, not a round trip — and so is the heading, which is why it counts
// up along with the button.
//
// `from` is the server's, read once while bundling. What a page starts as is
// the server's to say; what it does next is the client's.
export async function Counter({ from }: { from: number }) {
  const count = state(from);
  return (
    <div style="display: grid; gap: 8px; padding: 24px; justify-items: start">
      <h1 style="margin: 0; font-size: 24px">
        {cs`"Pressed " + $count.read() + " times"`}
      </h1>
      <button
        id="press"
        style="font: inherit; font-size: 16px; color: royalblue; background: none; border: 0; padding: 0; cursor: pointer"
        onclick={cs`() => $count.write($count.read() + 1)`}
      >
        Press me
      </button>
    </div>
  );
}
