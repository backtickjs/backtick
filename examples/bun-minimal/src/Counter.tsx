import { cs, state } from "@backtickjs/core";

// A server component: this function runs once, on the server, while bundling.
// Never again, and never on the client.
export async function Counter({ from }: { from: number }) {
  // `cs` does not run here. It is bundled as data for the client, which
  // evaluates it — and re-evaluates what reads `count` every time it changes.
  return cs`{
    const count = $state($from);

    return (
      <div style="padding: 48px; font-family: system-ui">
        <h1>{"Pressed " + count.read() + " times"}</h1>

        <button
          id="press"
          style="font: inherit; padding: 8px 16px; cursor: pointer; border: 0; border-radius: 8px; background: black; color: white"
          onclick={() => count.write(count.read() + 1)}
        >
          Press me
        </button>
      </div>
    );
  }`;
}
