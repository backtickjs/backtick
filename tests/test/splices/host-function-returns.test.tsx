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
const returnsScript = (n: Client<number>) => cs`$n + 1`;
const returnsFunction = (n: Client<number>) => (m: Client<number>) =>
  cs`$n * $m`;
const returnsElement = (n: Client<number>): JSX.Element => <b>{n}</b>;

it("hostFunctionReturns", async (t) => {
  await snapshotCase(
    t,
    "hostFunctionReturns",
    cs`{
      const none: null = $returnsNull(1);
      const missing: undefined = $returnsUndefined(1);
      const number: number = $returnsNumber(1);
      const boolean: boolean = $returnsBoolean(1);
      const string: string = $returnsString(1);
      const array: number[] = $returnsArray(3);
      const object: { value: number; label: string } = $returnsObject(4);
      const script: number = $returnsScript(5);
      const called: number = $returnsFunction(6)(7);
      const element = $returnsElement(8);
      return {
        none: none,
        missing: missing,
        number: number,
        boolean: boolean,
        string: string,
        array: array,
        object: object,
        script: script,
        called: called,
        element: element,
      };
    }`,
  );
});
