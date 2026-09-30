import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { snapshotCase } from "../snapshotCase.ts";

// A host function may answer with anything spliceable: it is expanded once
// against a hole per parameter, and what it answered is written as the arrow's
// body. Each call binds the hole to what the script passed, and what comes back
// is typed as what the answer becomes on the client.
const returnsNull = (_n: Client<number>) => null;
const returnsUndefined = (_n: Client<number>) => undefined;
const returnsNumber = (_n: Client<number>) => 1;
const returnsBoolean = (_n: Client<number>) => true;
const returnsString = (_n: Client<number>) => "text";
const returnsArray = (n: Client<number>) => [n, 2];
const returnsObject = (n: Client<number>) => ({ value: n, label: "n" });
const returnsScript = (n: Client<number>) => cs.lift(cs.splice((n)) + 1);
const returnsFunction = (n: Client<number>) => (m: Client<number>) =>
  cs.lift(cs.splice((n)) * cs.splice((m)));
const returnsElement = (n: Client<number>): JSX.Element => <b>{n}</b>;

it("hostFunctionReturns", async (t) => {
  await snapshotCase(
    t,
    "hostFunctionReturns",
    cs.lift((() => {
    const __cs_none: null = cs.splice((returnsNull))(1);
    const __cs_missing: undefined = cs.splice((returnsUndefined))(1);
    const __cs_number: number = cs.splice((returnsNumber))(1);
    const __cs_boolean: boolean = cs.splice((returnsBoolean))(1);
    const __cs_string: string = cs.splice((returnsString))(1);
    const __cs_array: number[] = cs.splice((returnsArray))(3);
    const __cs_object: {
        value: number;
        label: string;
    } = cs.splice((returnsObject))(4);
    const __cs_script: number = cs.splice((returnsScript))(5);
    const __cs_called: number = cs.splice((returnsFunction))(6)(7);
    const __cs_element = cs.splice((returnsElement))(8);
    return { none: __cs_none, missing: __cs_missing, number: __cs_number, boolean: __cs_boolean, string: __cs_string, array: __cs_array, object: __cs_object, script: __cs_script, called: __cs_called, element: __cs_element };
})()),
  );
});
