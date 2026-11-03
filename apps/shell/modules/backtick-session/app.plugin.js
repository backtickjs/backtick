// The session's settings, written into the native build so JavaScript can't
// change them: where the authorization server is, and the sign-in callback,
// with the associated domains (iOS) and verified App Link (Android) that let
// only this app receive it.
const {
  AndroidConfig,
  withAndroidManifest,
  withEntitlementsPlist,
  withInfoPlist,
} = require("expo/config-plugins");

module.exports = function withBacktickSession(config, options) {
  const { authorizationServer, signInCallback } = options;
  const callback = new URL(signInCallback);

  config = withInfoPlist(config, (config) => {
    config.modResults.BacktickAuthorizationServer = authorizationServer;
    config.modResults.BacktickSignInCallback = signInCallback;
    return config;
  });

  config = withEntitlementsPlist(config, (config) => {
    const key = "com.apple.developer.associated-domains";
    const domains = new Set(config.modResults[key] ?? []);
    domains.add(`webcredentials:${callback.host}`);
    domains.add(`applinks:${callback.host}`);
    config.modResults[key] = [...domains];
    return config;
  });

  config = withAndroidManifest(config, (config) => {
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults,
    );
    for (const [name, value] of [
      ["backtick.authorizationServer", authorizationServer],
      ["backtick.signInCallback", signInCallback],
    ]) {
      AndroidConfig.Manifest.addMetaDataItemToMainApplication(
        application,
        name,
        value,
      );
    }
    const activity = AndroidConfig.Manifest.getMainActivityOrThrow(
      config.modResults,
    );
    activity["intent-filter"] = activity["intent-filter"] ?? [];
    activity["intent-filter"].push({
      $: { "android:autoVerify": "true" },
      action: [{ $: { "android:name": "android.intent.action.VIEW" } }],
      category: [
        { $: { "android:name": "android.intent.category.DEFAULT" } },
        { $: { "android:name": "android.intent.category.BROWSABLE" } },
      ],
      data: [
        {
          $: {
            "android:scheme": "https",
            "android:host": callback.host,
            "android:path": callback.pathname,
          },
        },
      ],
    });
    return config;
  });

  return config;
};
