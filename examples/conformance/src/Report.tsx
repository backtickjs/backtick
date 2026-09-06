import { cs, state } from "@backtickjs/core";

// A server component: this function runs once, on the server, while bundling.
// Never again, and never on the client.
//
// What it will draw is one row per conformance case. What it draws today is a
// placeholder, so that the package is a working app before it is a suite.
export async function Report({ of }: { of: string }) {
  // `cs` does not run here. It is bundled as data for the client, which
  // evaluates it — so what a client makes of the language is what this draws.
  return cs`{
    const shown = $state(false);

    return (
      <div style="padding: 48px; font-family: system-ui">
        <h1>{$of}</h1>

        <p>{shown.read() ? "nothing to report yet" : ""}</p>

        <button
          id="show"
          style="font: inherit; padding: 8px 16px; cursor: pointer; border: 0; border-radius: 8px; background: black; color: white"
          onclick={() => shown.write(!shown.read())}
        >
          Show
        </button>
      </div>
    );
  }`;
}
