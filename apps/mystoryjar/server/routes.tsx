import type { JSX } from "@backtickjs/react/jsx-runtime";
import { Landing } from "./Landing.js";
import { SignIn } from "./SignIn.js";

// The app's screens by path: the app holds a stack of these paths, and asks
// for the one on top.
export const routes: Record<string, () => JSX.Element> = {
  "/": () => <Landing />,
  "/signin": () => <SignIn />,
};
