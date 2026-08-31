import { cs } from "@backtickjs/core";

// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs`{
    const positive = Number.EPSILON > 0;
    const whole = Number.isInteger(2);
    const fractional = Number.isInteger(2.5);
    // Unconverted, so a string that reads as a number is still not one.
    const written = Number.isFinite("2");
    return (
      <span>{whole + " " + fractional + " " + written + " " + positive}</span>
    );
  }`;
}

export default <Checked />;
