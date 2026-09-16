import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs`{
  const count = $state(0);
  const Badge = (props: { n: number }) => <b>{"n " + props.n}</b>;

  return (
    <div>
      {${cs`<Badge n={count.read()} />`}}
      {
        ${cs`{
          const skipped = 10;
          return ${cs`<Badge n={count.read() + 100} />`};
        }`}
      }
      {${(<section>{cs`<Badge n={count.read() + 1000} />`}</section>)}}
      {
        ${cs`<For each={[1, 2]}>
          {(m: number) => <Badge n={m * count.read()} />}
        </For>`}
      }
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;

it("scriptBoundTagCapture", async (t) => {
  await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
});

describe("a tag naming a function the script holds", () => {
  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = await render(scriptBoundTagCapture);
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });
});
