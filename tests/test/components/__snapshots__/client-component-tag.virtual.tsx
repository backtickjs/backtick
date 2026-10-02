import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";

// A client component defined on the host as a script, and used as a tag in
// another: typed by its own signature, and drawn by the client.
const Badge = cs.lift((() => (__cs_props: {
    n: number;
}) => <b>{"badge " + __cs_props.n}</b>)());

const badges = cs.lift((() => {
    const __cs_scale = cs.splice((createSignal))(1);
    return (<div>{(void For, cs.splice(For)({ each: [1, 2], children: __cs_n => cs.splice(Badge)({ n: __cs_n * __cs_scale[0]() }) }))}{<button onclick={() => __cs_scale[1](__cs_scale[0]() * 2)}>double</button>}</div>);
})());

it("clientComponentTag", async (t) => {
  await snapshotCase(t, "clientComponentTag", badges);
});

describe("a client component defined as a script", () => {
  it("is drawn as a tag, with what the script hands it", async () => {
    render(await evaluate(() => badges));
    assert.ok(screen.getByText("badge 1"));
    assert.ok(screen.getByText("badge 2"));
    await userEvent.click(screen.getByText("double"));
    assert.ok(screen.getByText("badge 2"));
    assert.ok(screen.getByText("badge 4"));
  });
});
