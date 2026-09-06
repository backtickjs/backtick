import { cs, fetch, state, type Response } from "@backtickjs/core";

// Reading the body is a second turn, the way it is on the web: `fetch` answers
// with a response, and the response is asked for its body.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
export default cs`() => {
  const held = $state("waiting");

  $fetch(
    "/cases/built-ins/Math/trunc/Math.trunc_Success",
    (response: Response) => {
      if (!response.ok) {
        held.write("answered " + response.status);
      } else {
        response.text(
          (text: string) => {
            held.write(text);
          },
          (reason: string) => {
            held.write("the body stopped — " + reason);
          },
        );
      }
    },
    (reason: string) => {
      held.write("nothing answered — " + reason);
    },
    { method: "GET" },
  );

  return held.read();
}`;
