import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import type { BacktickElement, Prop } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";

// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props: { body: Prop<BacktickElement> }) {
  return cs`{
    const Badge = (p: { n: number }) => <i>{"panel " + p.n}</i>;
    return (
      <section>
        <Badge n={0} />
        {$props.body}
      </section>
    );
  }`;
}

// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs`{
  const count = $state(0);
  const Badge = (p: { n: number; children: BacktickElement }) => (
    <b>
      {"outer " + p.n}
      {p.children}
    </b>
  );

  return (
    <div>
      <Panel
        body={
          ${cs`<Badge n={count.get()}>
            <u>{"kid " + count.get()}</u>
          </Badge>`}
        }
      />
      <button onclick={() => count.set(count.get() + 1)}>more</button>
    </div>
  );
}`;

it("scriptBoundTagCarried", async (t) => {
  await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
});

describe("a tag naming a function the script holds", () => {
  it("calls the one it was written under, drawn where another is in scope", async () => {
    await render(scriptBoundTagCarried);
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");

    await userEvent.click(screen.getByRole("button", { name: "more" }));

    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});
