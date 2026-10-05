// A comment first, as most files start: the source map must still apply.
import { cs } from "@backtickjs/core";
export const script = cs`{
  return 1;
}`;
export const throwsOnLine6 = () => { throw new Error("6"); };
export const throwsOnLine7 = () => { throw new Error("7"); };
