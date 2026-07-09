import { cs } from "@backtickjs/core";

const color = cs`{
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

const script = cs`{
  const c = ${color};
  return ${cs`c.brightness()`};
}`;
