import type { NavigationState, useNavigationContainerRef } from "expo-router";
import { Alert, Linking } from "react-native";
import { loadRoots } from "../screens";
import { backtickShown, reloadShownScreen } from "../shown";
import { apps, signInWithGoogle, supabase } from "../supabase";

// Every link into the phone: an app by its ID, as a browser follows a link to
// another site, and Backtick's own commands. An app's paths are left
// as they are, so expo-router works in its screens as its docs say.
//   https://<id>.<apps>/<path>       the app's <path>, its own link
//   …/--/<id>/<path>                 the app's <path>
//   …/--/sign-in, …/--/sign-out      from Backtick's home only
//   …/--/delete/<id>                 deletes the app, from the home only
//   …/--/reload                      loads the screen on top again, in place,
//                                    as location.reload() does
//   …/--/auth/callback?code=…        sign-in's return, which
//                                    signInWithGoogle's browser session has
//   …/--/<path>                      Backtick's <path>
// Expo Go's own link to the shell, naming no path, goes to expo-router as is.
export async function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): Promise<string | null> {
  const link = shellLink(path);
  if (link === undefined) {
    return path;
  }
  // The shell always starts at the home: followStartingLink follows it from
  // there, so back from an app returns to the home.
  if (initial) {
    return "/";
  }
  const [first, ...rest] = link.pathname.split("/");
  if (isAppId(first)) {
    await loadRoots(first);
    openOverHome(rest, link.search, first);
    return null;
  }
  if (link.pathname === "reload") {
    reloadShownScreen();
    return null;
  }
  if (first === "delete" && isAppId(rest[0] ?? "") && rest.length === 1) {
    await deleteApp(rest[0]!);
    return null;
  }
  if (!["sign-in", "sign-out", "auth/callback"].includes(link.pathname)) {
    openOverHome(link.pathname.split("/"), link.search);
    return null;
  }
  try {
    if (!backtickShown() || link.pathname === "auth/callback") {
      // An app can't sign the user in or out.
    } else if (link.pathname === "sign-in") {
      await signInWithGoogle();
    } else if (link.pathname === "sign-out") {
      await supabase.auth.signOut();
    }
  } catch (error) {
    Alert.alert("Couldn't sign in", (error as Error).message);
  }
  return null;
}

let root: ReturnType<typeof useNavigationContainerRef>;

export function followRoot(ref: typeof root): void {
  root = ref;
}

// One thing open at a time: the stack becomes the home and the link's route,
// new each time, so what's open closes with its navigator and an app's is its
// own. Under expo-router's own root route.
function openOverHome(path: string[], query: string, app?: string): void {
  const state = root.getRootState().routes[0]!.state as NavigationState;
  const params = { ...Object.fromEntries(new URLSearchParams(query)), path };
  const screen = { name: "[...path]", params };
  const route = app
    ? {
        name: "(app)",
        params: { backtickApp: app },
        state: { index: 0, routes: [screen] },
      }
    : screen;
  root.dispatch({
    type: "RESET",
    target: state.key,
    payload: {
      ...state,
      index: 1,
      routes: [
        state.routes[0],
        { ...route, key: `${route.name}:${Date.now()}` },
      ],
    },
  });
}

// The link that started the shell, once the home is on top. Read from React
// Native: on iOS in Expo Go, expo-router's own read of it is null.
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

// The home asked first: the app goes from its list, and its link stops
// working. An open app can't delete one.
async function deleteApp(id: string): Promise<void> {
  if (!backtickShown()) {
    return;
  }
  const { data, error } = await supabase.rpc("delete_app", { app: id });
  if (error || data !== true) {
    Alert.alert(
      "Couldn't delete the app",
      error?.message ?? "It's already gone.",
    );
  }
  // The home, on top, loaded again in place without the app.
  reloadShownScreen();
}

type Link = { pathname: string; search: string };

// What a link names, after Expo Go's `/--/` (a scheme's `://` elsewhere, and
// an app's host for its own link): `<id>/day`, `sign-in`. Its query's channel
// is Expo Go's, not the link's.
function shellLink(url: string): Link | undefined {
  if (url.startsWith("exp://") && !url.includes("/--/")) {
    return undefined;
  }
  // https://<id>.<apps>/day reads as https://<id>/day.
  const host = url.startsWith("https://") ? url.indexOf(`.${apps}`) : -1;
  if (host > 0) {
    url = url.slice(0, host) + url.slice(host + apps.length + 1);
  }
  const start = url.includes("/--/")
    ? url.indexOf("/--/") + 4
    : url.indexOf("://") + 3;
  if (start < 3) {
    return undefined;
  }
  const [pathname, query = ""] = url.slice(start).split("?");
  const params = new URLSearchParams(query);
  params.delete("channel-name");
  const search = params.size === 0 ? "" : "?" + params;
  return { pathname: pathname.replace(/\/$/, ""), search };
}

function isAppId(host: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
    host,
  );
}
