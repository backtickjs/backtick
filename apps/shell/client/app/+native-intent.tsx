import { router } from "expo-router";
import { Alert } from "react-native";
import { currentApp, setOpenApp } from "../openApp";
import { apps, signInWithGoogle, supabase } from "../supabase";

// Every link into the phone: an app by its ID, as a browser follows a link to
// another site, and Backtick's own commands. An app's paths are left
// as they are, so expo-router works in its screens as its docs say.
//   https://<id>.<apps>/<path>       the app's <path>, its own link
//   …/--/<id>/<path>                 the app's <path>
//   …/--/sign-in, …/--/sign-out      from Backtick's home only
//   …/--/auth/callback?code=…        sign-in's return, which
//                                    signInWithGoogle's browser session has
// Anything else goes to expo-router as is.
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
  const [first, ...rest] = link.pathname.split("/");
  if (isAppId(first)) {
    setOpenApp(first);
    const opened = "/" + rest.join("/") + link.search;
    // Pushed, so an app's `/` stacks on the home's `/`, and back returns to it.
    if (initial) {
      return opened;
    }
    router.push(opened);
    return null;
  }
  if (!["sign-in", "sign-out", "auth/callback"].includes(link.pathname)) {
    return path;
  }
  try {
    if (currentApp() !== null || link.pathname === "auth/callback") {
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

type Link = { pathname: string; search: string };

// What a link names, after Expo Go's `/--/` (a scheme's `://` elsewhere, and
// an app's host for its own link): `<id>/day`, `sign-in`. Its query's channel
// is Expo Go's, not the link's.
function shellLink(url: string): Link | undefined {
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
