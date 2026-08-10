import { cs, state } from "@backtickjs/core";
import { Page } from "./Page.js";

// Client state: the count lives on the client, so pressing re-renders without
// asking the server for anything. The bundle for this page carries the handler
// as a script, not a round trip — and the title is that same script, which is
// why `Page` takes one where a string would do.
//
// `from` arrives from the path, which is what makes `/counter/7` a different
// page from `/counter` without being a different component.
export async function Counter({ from }: { from: number }) {
  const count = state(from);
  return (
    <Page title={cs`"Pressed " + $count.read() + " times"`}>
      <button
        id="press"
        style="font: inherit; font-size: 16px; color: royalblue; background: none; border: 0; padding: 0; cursor: pointer"
        onclick={cs`() => $count.write($count.read() + 1)`}
      >
        Press me
      </button>
      <a href="/" style="font-size: 16px; color: royalblue">
        Home
      </a>
    </Page>
  );
}
