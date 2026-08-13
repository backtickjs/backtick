import { bundler } from "@backtickjs/core";
import { Main } from "./Main.js";

export const bundle = await bundler.run(<Main />);
