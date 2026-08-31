import { cs } from "@backtickjs/core";

const script = cs`{
  try {
    return 1;
  } catch ({ message }) {
    return 2;
  }
}`;
