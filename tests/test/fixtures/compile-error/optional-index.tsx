import { cs } from "@backtickjs/core";

const script = cs`(names: readonly string[]) => {
  return names?.[0];
}`;
