import { cs, For, state } from "@backtickjs/core";

// The one interactive thing on the page, and the one thing on it that ships as
// a bundle. `start` is a server value: the script below never receives a number
// to read, it is compiled with this one already in it.
export async function Counter({ start }: { start: number }) {
  return cs`{
    const count = $state($start);
    const step = $state(1);

    const nudge = (direction: number) => {
      count.update((total) => total + direction * step.read());
    };

    return (
      <div class="demo">
        <p class="tally">{count.read()}</p>

        <div class="row">
          <button class="key" onclick={() => nudge(-1)}>
            {"−"}
          </button>
          <button class="key" onclick={() => nudge(1)}>
            {"+"}
          </button>
        </div>

        <div class="row">
          <span class="label">step</span>
          <For each={[1, 5, 10]}>
            {(size: number) => (
              <button
                class={step.read() === size ? "key key-on" : "key"}
                onclick={() => step.write(size)}
              >
                {size}
              </button>
            )}
          </For>
        </div>
      </div>
    );
  }`;
}
