import { cs } from "@backtickjs/core";

// Text in, value out, and back again. What round-trips is the format's to say —
// so what is here is what every host spells the same way, and a value a host
// could not hand back is not a value this admits.
export default cs`{
  const numbers = JSON.stringify([1, 2, 3]);
  const text = JSON.stringify("hi");
  const flag = JSON.stringify(true);
  const held = JSON.stringify({ a: 1, b: "two" });
  const back = JSON.parse(numbers);
  return (
    numbers +
    "|" +
    text +
    "|" +
    flag +
    "|" +
    held +
    "|" +
    JSON.stringify(back) +
    "|" +
    JSON.stringify(JSON.parse(held))
  );
}`;
