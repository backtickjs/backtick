import { cs } from "@backtickjs/core";

// An object whose methods read the object is spelled as a host
// `ClientObject` class instead.
const script = cs`{
  const color = {
    r: 1,
    g: 2,
    b: 3,
    brightness: () => {
      return color.r + color.g + color.b;
    },
  };
  return color;
}`;
