import { cs } from "@backtickjs/core";

const script = cs`{
  try {
    return 1;
  } catch (_error) {
    return 2;
  } finally {
    return 3;
  }
}`;
