import { cs } from "@backtickjs/core";

// A record read as pairs and built back from them: how a script makes a record
// whose keys it only learns when it runs.
export default cs`{
  const held = { n: 1, q: "ada" };
  const written = Object.fromEntries(
    Object.entries(held).map((pair) => [pair[0], JSON.stringify(pair[1])]),
  );
  return written.n + " " + written.q;
}`;
