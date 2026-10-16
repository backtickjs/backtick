import { createImport } from "@backtickjs/core";
import type * as GoogleSignIn from "@react-native-google-signin/google-signin";

// Google Sign-In's API as a script splices it — `$GoogleSignin.signIn()`,
// `<$GoogleSigninButton>` — each typed with its own declarations, and each
// required from `@react-native-google-signin/google-signin` by the app that
// runs the bundle. Internal: the adapter mirrors it, name for name.

// The @react-native-google-signin/google-signin every name is typed against:
// the adapter's version, and its `@react-native-google- signin/google-signin`
// dependency.
const version = "16.1.5";

export const googleSignin = <Name extends keyof typeof GoogleSignIn>(
  name: Name,
) =>
  createImport<(typeof GoogleSignIn)[Name]>({
    name,
    from: "@react-native-google-signin/google-signin",
    version,
  });
