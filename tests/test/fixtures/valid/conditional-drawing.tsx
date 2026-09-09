import { cs, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { window } from "@backtickjs/web-schema";

// A component whose whole drawing is a conditional on a cell of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a cell that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this fixture does not stop.
async function Held({ again }: { again: Prop<() => boolean> }) {
  return cs`{
    const shown = $state(false);

    const started = $window.setTimeout(() => {
      if ($again()) {
        shown.write(true);
      }
    }, 0);

    return <>{shown.read() ? <em>shown</em> : <i>waiting</i>}</>;
  }`;
}

export default cs`{
  const builds = $state(0);

  return (
    <div>
      <span>{"builds " + builds.read()}</span>
      <section>
        <Held
          again={() => {
            builds.write(builds.read() + 1);
            return builds.read() < 5;
          }}
        />
      </section>
    </div>
  );
}`;
