import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
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
    cs`() => {
      const held = $state("waiting");

      $window
        .fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {
          signal: $window.AbortSignal.timeout(3000),
        })
        .then((response: Response) => {
          if (response.status !== 200) {
            throw "answered " + response.status;
          }
          return response.json();
        })
        .then((value: unknown) => {
          held.set(value === null ? "null" : "a value");
        })
        .catch((error: unknown) => {
          held.set("failed — " + String(error));
        });

      $window
        .fetch("/cases", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: "Math.trunc", passed: true }),
        })
        .then((response: Response) => response.text())
        .then(
          (text: string) => {
            held.set(text);
          },
          (error: unknown) => {
            held.set(String(error));
          },
        );

      return held.get();
    }`,
  );
});
