import type { NavigationState, useNavigationContainerRef } from "expo-router";
import { Alert, Linking } from "react-native";
import { reloadShownScreen } from "../reload";
import {
  isSignedIn,
  signIn,
  signOut,
} from "../../modules/backtick-session/src";
import { apps, home } from "../hosts";

// Every link into the phone: an app by its ID, and Backtick's own commands.
// An app's paths are left as they are, so expo-router works in its screens as
// its docs say.
//   https://<id>.<apps>/<path>       the app's <path>, its own link
//   backtick://<id>/<path>           the app's <path>
//   backtick://sign-in?<params>      signs in, only while signed out: the
//                                    params go to auth.backtickjs.com as they
//                                    are (`provider=google` goes straight there)
//   backtick://sign-out              asks, then signs out
//   backtick://delete-account        asks, then deletes the account and signs
//                                    out
//   backtick://reload                loads the screen on top again, in place
//   backtick://<path>                Backtick's <path>
// Sign-in's return (https://<home>/signed-in) is the session module's own,
// caught natively: never followed here. Anything else is ignored.
export async function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): Promise<string | null> {
  // The shell always starts at the home: followStartingLink follows the link
  // from there, so back from an app returns to the home. Named by its group:
  // an app's navigator has a `/` too.
  if (initial) {
    return "/(home)";
  }
  if (path.startsWith(`https://${home}/signed-in`)) {
    return null;
  }
  const link = shellLink(path);
  if (link === undefined) {
    return null;
  }
  const [first, ...rest] = link.pathname.split("/");
  if (isAppId(first)) {
    openOverHome(rest, link.search, first);
    return null;
  }
  if (link.pathname === "reload") {
    void reloadShownScreen();
    return null;
  }
  if (!["sign-in", "sign-out", "delete-account"].includes(link.pathname)) {
    openOverHome(link.pathname.split("/"), link.search);
    return null;
  }
  // Links that ask, never act on their own: any page or app can open one.
  // Sign-in does something only while signed out, when no app can run;
  // signing out and deleting the account are confirmed first.
  if (link.pathname === "sign-in") {
    if (!isSignedIn()) {
      signIn(Object.fromEntries(new URLSearchParams(link.search))).catch(
        (error: Error) => Alert.alert("Couldn't sign in", error.message),
      );
    }
  } else if (link.pathname === "sign-out") {
    Alert.alert("Sign out of Backtick?", undefined, [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => void signOut() },
    ]);
  } else if (isSignedIn()) {
    Alert.alert(
      "Delete your Backtick account?",
      "Your apps, their links and everything Backtick keeps for you are deleted now. This can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            void deleteAccount().catch((error: Error) =>
              Alert.alert("Couldn't delete your account", error.message),
            ),
        },
      ],
    );
  }
  return null;
}

// The home's server deletes the account (the session attaches the home's
// token), then the phone signs out: its session would fail at its next refresh
// anyway, and the sign-in screen shows now.
async function deleteAccount(): Promise<void> {
  const response = await fetch(`https://${home}/account/delete`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`The server answered ${response.status}. Try again.`);
  }
  await signOut();
}

let root: ReturnType<typeof useNavigationContainerRef>;

export function followRoot(ref: typeof root): void {
  root = ref;
}

// One thing open at a time: the stack becomes the home and what the link
// opens, new each time, so what's open closes with its navigator and an app's
// is its own. Backtick's own path is a screen on the home's navigator; an
// app's, the first of a navigator of its own. Under expo-router's own root
// route.
function openOverHome(path: string[], query: string, app?: string): void {
  const state = root.getRootState().routes[0]!.state as NavigationState;
  const home = state.routes[0]!;
  // A route's params are decoded, as a push leaves them.
  const screen = {
    name: "[...backtickPath]",
    params: {
      ...queryParams(query),
      backtickPath: path.map(decodeURIComponent),
    },
  };
  const routes = app
    ? [
        home,
        {
          name: "(app)",
          key: `(app):${Date.now()}`,
          params: { __backtick: app },
          state: { index: 0, routes: [screen] },
        },
      ]
    : [
        {
          ...home,
          state: {
            index: 1,
            routes: [
              (home.state as NavigationState).routes[0],
              { ...screen, key: `screen:${Date.now()}` },
            ],
          },
        },
      ];
  root.dispatch({
    type: "RESET",
    target: state.key,
    payload: { ...state, index: routes.length - 1, routes },
  });
}

// A repeated name keeps all its values, as a route's params hold them.
function queryParams(query: string): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};
  for (const [name, value] of new URLSearchParams(query)) {
    const held = params[name];
    params[name] = held === undefined ? value : [held, value].flat();
  }
  return params;
}

// The link that started the shell, once the home is on top. Read from React
// Native: in Expo Go on iOS, expo-router's own read of it was null; not yet
// checked in the Backtick app.
let followed = false;
export async function followStartingLink(): Promise<void> {
  if (!followed) {
    followed = true;
    const url = await Linking.getInitialURL();
    if (url) {
      await redirectSystemPath({ path: url, initial: false });
    }
  }
}

type Link = { pathname: string; search: string };

// What a link names, after the scheme's `://`, or an app's host for its own
// link: `<id>/day`, `sign-in`.
function shellLink(url: string): Link | undefined {
  let rest: string;
  if (url.startsWith("backtick://")) {
    rest = url.slice("backtick://".length);
  } else {
    // https://<id>.<apps>/day reads as <id>/day.
    const match = new RegExp(
      `^https://([0-9a-f-]{36})\\.${apps.replaceAll(".", "\\.")}(/.*)?$`,
    ).exec(url);
    if (match === null) {
      return undefined;
    }
    rest = match[1] + (match[2] ?? "");
  }
  const [pathname, query = ""] = rest.split("?");
  return {
    pathname: pathname!.replace(/\/$/, ""),
    search: query === "" ? "" : "?" + query,
  };
}

function isAppId(host: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
    host,
  );
}
