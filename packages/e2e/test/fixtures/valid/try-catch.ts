import { cs } from "@backtickjs/core";

export default cs`{
  const message = "boom";
  try {
    throw message;
  } catch (error) {
    if (error === message) {
      return "caught boom";
    }
    return "caught something else";
  }
}`;
