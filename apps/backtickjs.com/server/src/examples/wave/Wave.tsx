import { cs, For, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-client";

export default async function Wave() {
  return cs`{
    const card =
      "display: flex; align-items: center; gap: 5px; width: 280px;" +
      " height: 170px; padding: 20px; cursor: pointer;" +
      " box-sizing: border-box; border-radius: 22px;" +
      " background: linear-gradient(#1e1b4b,#0f172a)";
    const bar =
      "flex: 1; border-radius: 99px; transition: height 90ms linear;" +
      " background: linear-gradient(#f472b6,#7c3aed); height: ";
    const t = $state(0);
    const id = $state(0);
    const tick = () => t.update((v) => v + 1);
    const run = () => {
      $window.clearInterval(id.read());
      id.write(id.read() === 0 ? $window.setInterval(tick, 90) : 0);
    };
    return (
      <div style={card} onclick={run}>
        <For each={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5]}>
          {(p: number) => (
            <div style={bar + (65 + 55 * Math.sin(t.read() / 3 + p)) + "px"} />
          )}
        </For>
      </div>
    );
  }`;
}
