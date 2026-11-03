// The phone's session: signing in and out. The key,
// the refresh token and every access token stay in native code, which attaches
// tokens to requests to Backtick's own origins; nothing here can read them.
import { type EventSubscription, requireNativeModule } from "expo-modules-core";

type Native = {
  isSignedIn(): boolean;
  signIn(): Promise<boolean>;
  signOut(): Promise<void>;
  addListener(
    event: "onChange",
    listener: (event: { signedIn: boolean }) => void,
  ): EventSubscription;
};

const native = requireNativeModule<Native>("BacktickSession");

export const isSignedIn = (): boolean => native.isSignedIn();

// Opens the sign-in page in the system's sign-in browser. Resolves false if the
// user closed it.
export const signIn = (): Promise<boolean> => native.signIn();

export const signOut = (): Promise<void> => native.signOut();

export function onSessionChange(
  listener: (signedIn: boolean) => void,
): EventSubscription {
  return native.addListener("onChange", (event) => listener(event.signedIn));
}
