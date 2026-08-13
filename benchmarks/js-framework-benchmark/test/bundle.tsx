import { bundler } from "@backtickjs/core";
import { Main } from "../frameworks/keyed/backtick/dist/Main.js";

// The app's `Main`, bundled here rather than in the app: what is submitted to
// the benchmark upstream is an app, and nothing this suite needs belongs in it.
//
// From `dist` and not from `src`, because a component holds `cs` scripts that
// only the app's own compiler knows what to do with.
export const bundle = await bundler.run(<Main />);
