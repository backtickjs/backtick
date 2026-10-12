// `@react-native-google-signin/google-signin`, name for name, in alphabetical
// order: a value where it both exports and declares it, with the instance type
// of each class it names; a type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as GoogleSignIn from "@react-native-google-signin/google-signin";
import { googleSignin } from "./imports.js";

export const GoogleSignin: Client<typeof GoogleSignIn.GoogleSignin> =
  googleSignin("GoogleSignin");
export const GoogleSigninButton: Client<
  typeof GoogleSignIn.GoogleSigninButton
> = googleSignin("GoogleSigninButton");
export const statusCodes: Client<typeof GoogleSignIn.statusCodes> =
  googleSignin("statusCodes");

export type {
  GoogleSigninButtonProps,
  SignInResponse,
  SignInSilentlyResponse,
  SignInSuccessResponse,
} from "@react-native-google-signin/google-signin";
