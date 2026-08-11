import { cs, state } from "@backtickjs/core";

// A server component: this function runs once, on the server, while bundling.
// Never again, and never on the client.
export async function Counter({ from }: { from: number }) {
  // A value the client owns. All the server does is say what it starts at.
  const count = state(from);

  // `cs` does not run here. It is bundled as data for the client, which
  // evaluates it — again every time `count` changes.
  const label = cs`"Pressed " + $count.read() + " times"`;

  return (
    <div style="padding: 48px; font-family: system-ui">
      <h1>{label}</h1>

      <button
        id="press"
        style={
          "font: inherit; padding: 8px 16px; cursor: pointer;" +
          " border: 0; border-radius: 8px; background: black; color: white"
        }
        onclick={cs`() => $count.write($count.read() + 1)`}
      >
        Press me
      </button>
    </div>
  );
}
