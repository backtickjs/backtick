// The apps Google and Facebook know MyStoryJar by. All of them are public:
// they name the app, and ship in it. Empty until registered, which hides
// that provider's button.
export const google: { webClientId: string; iosClientId?: string } = {
  // the OAuth client Firebase checks ID tokens against: Firebase console →
  // Authentication → Google → Web SDK configuration
  webClientId:
    "239132102423-nqdlr47uo6h6atec0f9jr5e431nff6r7.apps.googleusercontent.com",
  // iOS's own OAuth client, for the bundle ID com.mystoryjar.app, comes with
  // the iOS app's registration; Android needs none, its signing key is
  // registered instead.
};

export const facebook = {
  // also in app.json, with the client token, which the SDK is built with
  appId: "575486299994058",
};
