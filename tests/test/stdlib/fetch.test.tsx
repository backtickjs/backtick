import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import type { Response } from "@backtickjs/web-sdk";
import { snapshotCase } from "../snapshotCase.ts";

// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("fetchRequests", async (t) => {
  await snapshotCase(
    t,
    "fetchRequests",
    cs`() => {
      const held = $state("waiting");

      $window.fetch(
        "/cases/built-ins/Math/trunc/Math.trunc_Success",
        (response: Response) => {
          if (response.status !== 200) {
            throw "answered " + response.status;
          }
          held.set(JSON.parse(response.text) === null ? "null" : "a value");
        },
        (message: string) => {
          held.set("failed — " + message);
        },
        { timeout: 3000 },
      );

      $window.fetch(
        "/cases",
        (response: Response) => {
          held.set(response.text);
        },
        (message: string) => {
          held.set(message);
        },
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: "Math.trunc", passed: true }),
        },
      );

      return held.get();
    }`,
  );
});
