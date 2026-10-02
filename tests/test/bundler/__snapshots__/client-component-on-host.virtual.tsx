import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";

// A client component written as a tag on the host, past the typechecker:
// refused when bundling, as it is a tag in a script.
const Badge = cs.lift((() => (__cs_props: {
    n: number;
}) => <b>{__cs_props.n}</b>)());

it("refuses a client import as a tag on the host", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: JSX element type 'For' does not have any construct or call signatures.
      input: <For each={[1]}>{(n: number) => n}</For>,
      external: {},
    }),
    {
      message:
        "`<For>` is a client component, so it can't be a tag on the host. Use it as a tag in a script.",
    },
  );
});

it("refuses a script as a tag on the host", async () => {
  await assert.rejects(
    bundler.build({
      // @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
      input: <Badge n={1} />,
      external: {},
    }),
    {
      message:
        "A script is a client component, so it can't be a tag on the host. Use it as a tag in a script.",
    },
  );
});
