import { cs } from "@backtickjs/core";

export default cs`{
  const message = "boom";
  try {
    throw message;
  } catch (error) {
    return "caught " + String(error);
  }
}`;
