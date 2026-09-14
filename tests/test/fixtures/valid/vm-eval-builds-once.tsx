import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";
import { window } from "@backtickjs/web-client";

// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs`<em>{"answered"}</em>`;
}

const answer = await bundler.run(<Answer />);

async function Waiting({
  ask,
}: {
  ask: Prop<() => Bundle<BacktickElement> | null>;
}) {
  return cs`{
    const drawn = $state<Bundle<BacktickElement> | null>(null);
    const started = $window.setTimeout(() => drawn.write($ask()), 0);
    return (
      <>
        {drawn.read() === null
          ? null
          : $vm.eval(drawn.read() as Bundle<BacktickElement>)}
      </>
    );
  }`;
}

export default cs`{
  const asked = $state(0);

  return (
    <div>
      <span>{"asked " + asked.read()}</span>
      <Waiting
        ask={() => {
          asked.write(asked.read() + 1);
          return asked.read() > 4 ? null : $answer;
        }}
      />
    </div>
  );
}`;
