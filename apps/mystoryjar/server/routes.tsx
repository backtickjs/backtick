import type { JSX } from "@backtickjs/react/jsx-runtime";
import type { ScreenRequest } from "./request.js";
import { Landing } from "./screens/Landing.js";
import { SignIn } from "./screens/SignIn.js";
import { SignUp } from "./screens/SignUp.js";

// The app's screens by path: the app holds a stack of these paths, and asks
// for the one on top.
export const routes: Record<string, (request: ScreenRequest) => JSX.Element> = {
  "/": (request) => <Landing request={request} />,
  "/signin": (request) => <SignIn request={request} />,
  "/signup": (request) => <SignUp request={request} />,
};
