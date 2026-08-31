import { cs, state } from "@backtickjs/core";

// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs`(initial: number) => {
  const count = $state(initial);
  return {
    read: () => count.read(),
    add: (n: number) => {
      count.write(count.read() + n);
    },
  };
}`;

export default cs`{
  const c = $counter(10);
  return (
    <button
      onclick={() => {
        c.add(5);
      }}
    >
      {c.read()}
    </button>
  );
}`;
