import { For, cs, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { window } from "@backtickjs/web";

// The same claim as `backtick-builds-once`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answer = ["one", "two"];

async function Waiting({ more }: { more: Prop<() => boolean> }) {
  return cs`{
    const items = $state<string[]>([]);

    const started = $window.setTimeout(() => {
      if ($more()) {
        items.write($answer);
      }
    }, 0);

    return <For each={items.read()}>{(item: string) => <em>{item}</em>}</For>;
  }`;
}

export default cs`{
  const asked = $state(0);

  return (
    <div>
      <span>{"asked " + asked.read()}</span>
      <Waiting
        more={() => {
          asked.write(asked.read() + 1);
          return asked.read() < 5;
        }}
      />
    </div>
  );
}`;
