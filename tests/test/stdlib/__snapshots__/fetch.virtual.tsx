import { it } from "node:test";
import { cs } from "@backtickjs/core";
declare const createSignal: import("@backtickjs/core").Client<(typeof import("solid-js"))["createSignal"]>;
import { snapshotCase } from "../snapshotCase.ts";

// The platform's own `fetch`: a status is failed on by throwing, and so is a
// body that is not JSON, and either reaches the `catch`.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("fetchRequests", async (t) => {
  await snapshotCase(
    t,
    "fetchRequests",
    cs.lift((() => () => {
      const [__cs_held, __cs_setHeld] = (cs.splice((createSignal)))("waiting");

      window
        .fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {
          signal: window.AbortSignal.timeout(3000),
        })
        .then((__cs_response: Response) => {
          if (__cs_response.status !== 200) {
            throw "answered " + __cs_response.status;
          }
          return __cs_response.json();
        })
        .then((__cs_value: unknown) => {
          __cs_setHeld(__cs_value === null ? "null" : "a value");
        })
        .catch((__cs_error: unknown) => {
          __cs_setHeld("failed — " + String(__cs_error));
        });

      window
        .fetch("/cases", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: "Math.trunc", passed: true }),
        })
        .then((__cs_response: Response) => __cs_response.text())
        .then(
          (__cs_text: string) => {
            __cs_setHeld(__cs_text);
          },
          (__cs_error: unknown) => {
            __cs_setHeld(String(__cs_error));
          },
        );

      return __cs_held();
    })()),
  );
});
