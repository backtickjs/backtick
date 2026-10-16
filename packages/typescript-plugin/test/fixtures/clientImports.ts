import { cs } from "@backtickjs/core";
import { createProgram, version as tsVersion } from "typescript" with {
  backtick: "client",
};

export const program = cs`$createProgram`;
export const named = cs`$tsVersion`;
