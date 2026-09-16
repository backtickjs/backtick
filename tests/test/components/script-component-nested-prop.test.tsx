import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

type Person = { readonly firstName: string };

// A component reading two levels deep. The hole is named for the path the
// component read, so `props.person.firstName` is `$0.person.firstName` — and
// only the first step off the parameter is a prop, which the tag hands over as
// a thunk. What that thunk answers with is an ordinary value, so reading a
// field of it is an ordinary read: `$0.person().firstName`.
//
// The cast is the gap this pins. A prop written at a tag inside a script is
// client code, so it types as `Prop<T>` — and a `Prop` may be a script, which
// has no fields to read. The bundler hands the component a hole either way, and
// a hole answers a field with a field of itself, so the read is meaningful
// where the type says it is not.
async function Greeting(props: { readonly person: Prop<Person> }) {
  return <h2>{(props.person as Person).firstName}</h2>;
}

it("scriptComponentNestedProp", async (t) => {
  await snapshotCase(
    t,
    "scriptComponentNestedProp",
    cs`<Greeting person={{ firstName: "ada" }} />`,
  );
});
