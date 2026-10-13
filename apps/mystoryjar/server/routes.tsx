import type { JSX } from "@backtickjs/react/jsx-runtime";
import type { ScreenRequest } from "./request.js";
import { Account } from "./screens/Account.js";
import { Edit } from "./screens/Edit.js";
import { Feedback } from "./screens/Feedback.js";
import { Landing } from "./screens/Landing.js";
import { Read } from "./screens/Read.js";
import { Redirect } from "./screens/Redirect.js";
import { SignIn } from "./screens/SignIn.js";
import { SignUp } from "./screens/SignUp.js";
import { Write } from "./screens/Write.js";

type Route = {
  // who it's for: anyone signed in, or anyone not, who are sent to the other
  // side's first screen
  for: "signedIn" | "signedOut";
  draw: (request: ScreenRequest) => JSX.Element;
};

// The app's screens by path: the app holds a stack of these paths, and asks
// for the one on top.
const routes: Record<string, Route> = {
  "/": { for: "signedOut", draw: (request) => <Landing request={request} /> },
  "/signin": {
    for: "signedOut",
    draw: (request) => <SignIn request={request} />,
  },
  "/signup": {
    for: "signedOut",
    draw: (request) => <SignUp request={request} />,
  },
  "/write": { for: "signedIn", draw: (request) => <Write request={request} /> },
  "/read": { for: "signedIn", draw: (request) => <Read request={request} /> },
  "/account": {
    for: "signedIn",
    draw: (request) => <Account request={request} />,
  },
  "/edit": { for: "signedIn", draw: (request) => <Edit request={request} /> },
  "/feedback": {
    for: "signedIn",
    draw: (request) => <Feedback request={request} />,
  },
};

/** Whether there's a screen at `path`, whoever asks. */
export function isScreen(path: string): boolean {
  return Object.hasOwn(routes, path);
}

/** The screen at `path` for this request, or undefined for no such path. */
export function screenAt(
  path: string,
  request: ScreenRequest,
): JSX.Element | undefined {
  const route = routes[path];
  if (route === undefined) {
    return undefined;
  }
  const signedIn = request.user !== null;
  if (route.for === "signedIn" && !signedIn) {
    return <Redirect to="/signin" />;
  }
  if (route.for === "signedOut" && signedIn) {
    return <Redirect to="/write" />;
  }
  return route.draw(request);
}
