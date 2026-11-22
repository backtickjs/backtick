// What the runtime version leaves out, so a change only JavaScript sees ships
// as an EAS Update, not a new build: the config's `extra`, and the
// package.json scripts and .gitignore, which don't touch the native app.
/** @type {import('expo/fingerprint').Config} */
const config = {
  sourceSkips: ["ExpoConfigExtraSection", "PackageJsonScriptsAll", "GitIgnore"],
};

module.exports = config;
