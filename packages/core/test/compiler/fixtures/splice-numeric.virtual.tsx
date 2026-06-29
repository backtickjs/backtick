import { cs } from "@backtick/core";
import { print } from "../print.ts";

const script = cs.lift(cs.lower(1));

print(script);
