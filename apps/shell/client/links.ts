import { Alert } from "react-native";
import { isSignedIn, signIn, signOut } from "../modules/backtick-session/src";

// The links into the phone that are the app's own commands; an app's
// (`backtick://<appId>/…`, `https://<appId>.backtickjs.app/…`) is the home's
// to follow, and sign-in's return (https://app.backtickjs.com/signed-in) is caught
// natively. Anything else is ignored.
//   backtick://sign-in?<params>      signs in, only while signed out: the
//                                    params go to auth.backtickjs.com as they
//                                    are (`provider=google` goes straight there)
//   backtick://sign-out              asks, then signs out
//   backtick://delete-account        asks, then deletes the account and signs
//                                    out
// `home` is the home's origin, whose server deletes the account.
export function followLink(url: string, home: string): void {
  if (!url.startsWith("backtick://")) {
    return;
  }
  const [path = "", query = ""] = url.slice("backtick://".length).split("?");
  const command = path.replace(/\/$/, "");
  if (command === "sign-in") {
    if (!isSignedIn()) {
      signIn(Object.fromEntries(new URLSearchParams(query))).catch(
        (error: Error) => Alert.alert("Couldn't sign in", error.message),
      );
    }
  } else if (command === "sign-out") {
    Alert.alert("Sign out of Backtick?", undefined, [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: () => void signOut() },
    ]);
  } else if (command === "delete-account" && isSignedIn()) {
    Alert.alert(
      "Delete your Backtick account?",
      "Your apps, their links and everything Backtick keeps for you are deleted now. This can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            void deleteAccount(home).catch((error: Error) =>
              Alert.alert("Couldn't delete your account", error.message),
            ),
        },
      ],
    );
  }
}

// The home's server deletes the account (the session attaches the home's
// token), then the phone signs out: its session would fail at its next refresh
// anyway, and the sign-in screen shows now.
async function deleteAccount(home: string): Promise<void> {
  const response = await fetch(`${home}/account/delete`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`The server answered ${response.status}. Try again.`);
  }
  await signOut();
}
