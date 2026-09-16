import { cs } from "@backtickjs/core";

const mixed = cs`(o: { inner: { z: number } | null } | null) => {
  return o?.inner.z;
}`;
