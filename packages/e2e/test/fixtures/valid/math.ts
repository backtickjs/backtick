import { cs } from "@backtickjs/core";

// The one global. What it is, is the host's to answer; which members exist and
// what each means is the format's, which is why the list is short — only the
// members every host can agree on to the last bit are here.
export default cs`{
  const rounded =
    Math.round(2.5) + "," + Math.round(-2.5) + "," + Math.round(-0.5);
  const edges =
    Math.floor(-1.5) + "," + Math.ceil(-1.5) + "," + Math.trunc(-1.5);
  const picks =
    Math.min(3, 1, 2) + "," + Math.max(3, 1, 2) + "," + Math.abs(-4);
  return (
    rounded +
    "|" +
    edges +
    "|" +
    picks +
    "|" +
    Math.sqrt(9) +
    "," +
    Math.sign(-8) +
    "," +
    Math.fround(1.5) +
    "|" +
    (Math.PI > 3.14) +
    "," +
    (Math.E > 2.71)
  );
}`;
