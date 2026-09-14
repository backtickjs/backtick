import { cs, For, state } from "@backtickjs/core";

// Drawn after the first pass: a row the list adds on a write, and a `title` a
// condition shows, are SVG's because of where they stand, and the `title` after
// the `svg` is HTML's again.
export default cs`{
  const xs = $state([10]);
  const shown = $state(false);

  return (
    <div>
      <svg viewBox="0 0 30 10">
        <For each={xs.read()}>{(x: number) => <title>{"dot " + x}</title>}</For>
        {shown.read() ? <title>{"shown"}</title> : null}
      </svg>
      <title>{"after"}</title>
      <button onclick={() => xs.write([10, 20])}>add</button>
      <button onclick={() => shown.write(true)}>show</button>
    </div>
  );
}`;
