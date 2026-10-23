import { router } from "expo-router";
import { Alert } from "react-native";
import { currentApp, setOpenApp } from "../openApp";
import { finishSignIn, server, signInWithGoogle, supabase } from "../supabase";

// Every link into the phone: an app by its address, as a browser follows a
// link to another site, and Backtick's own commands. An app's paths are left
// as they are, so expo-router works in its screens as its docs say.
//   backtick://<id>/<path>                    the app's <path>
//   https://backtickjs.app/apps/<id>/<path>   the same, from the web
//   backtick://sign-in, backtick://sign-out   from Backtick's home only
//   backtick://auth/callback?code=…           sign-in's fallback (supabase.ts)
// Anything else (a development build's own links) goes to expo-router as is.
export async function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}): Promise<string | null> {
  const opened = appLink(path);
  if (opened !== undefined) {
    setOpenApp(opened.app);
    // Pushed, so an app's `/` stacks on the home's `/`, and back returns to it.
    if (initial) {
      return opened.path;
    }
    router.push(opened.path);
    return null;
  }
  const url = parse(path);
  // Google's sign-in returning by its App Link: the browser session waiting
  // in signInWithGoogle has it.
  if (url?.origin === server) {
    return null;
  }
  if (url?.protocol !== "backtick:") {
    return path;
  }
  try {
    if (url.hostname === "auth" && url.pathname === "/callback") {
      await finishSignIn(url.searchParams.get("code"));
    } else if (currentApp() !== null) {
      // An app can't sign the user in or out.
    } else if (url.hostname === "sign-in") {
      await signInWithGoogle();
    } else if (url.hostname === "sign-out") {
      await supabase.auth.signOut();
    }
  } catch (error) {
    Alert.alert("Couldn't sign in", (error as Error).message);
  }
  return null;
}

// The app and path a link opens, if it's a link to an app.
function appLink(path: string): { app: string; path: string } | undefined {
  const url = parse(path);
  if (url === undefined) {
    return undefined;
  }
  const web = /^\/apps\/([^/]+)(\/.*)?$/.exec(url.pathname);
  if (url.origin === server && web !== null) {
    return { app: web[1], path: (web[2] ?? "/") + url.search };
  }
  if (url.protocol === "backtick:" && isAppId(url.hostname)) {
    return { app: url.hostname, path: (url.pathname || "/") + url.search };
  }
  return undefined;
}

function isAppId(host: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
    host,
  );
}

function parse(path: string): URL | undefined {
  try {
    return new URL(path);
  } catch {
    return undefined;
  }
}
