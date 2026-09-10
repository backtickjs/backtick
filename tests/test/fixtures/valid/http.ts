import { cs, http, state, type HttpResponse } from "@backtickjs/core";

// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
export default cs`() => {
  const held = $state("waiting");

  $http.get(
    "/cases/built-ins/Math/trunc/Math.trunc_Success",
    (response: HttpResponse) => {
      if (response.status !== 200) {
        throw "answered " + response.status;
      }
      held.write(JSON.parse(response.data) === null ? "null" : "a value");
    },
    (message: string) => {
      held.write("failed — " + message);
    },
    { timeout: 3000 },
  );

  $http.post(
    "/cases",
    JSON.stringify({ name: "Math.trunc", passed: true }),
    (response: HttpResponse) => {
      held.write(response.data);
    },
    (message: string) => {
      held.write(message);
    },
    { headers: { "content-type": "application/json" } },
  );

  return held.read();
}`;
