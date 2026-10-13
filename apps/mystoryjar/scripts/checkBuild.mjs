// Fails an EAS build the server wouldn't know: one whose packages for its
// platform aren't in server/builds/, as after a package change no one ran
// `pnpm register-build` for. Its users would only ever see the update screen.
// Development builds are let through: they run against `pnpm start`'s
// server, which knows this code's own builds.
import { unregistered } from "../server/builds.ts";
import { platforms } from "../server/packages.ts";

const profile = process.env.EAS_BUILD_PROFILE;
const platform = process.env.EAS_BUILD_PLATFORM;
if (profile !== "development") {
  const problems = (platform ? [platform] : platforms)
    .map((each) => unregistered(each))
    .filter((problem) => problem !== null);
  if (problems.length > 0) {
    for (const problem of problems) console.error(problem);
    process.exit(1);
  }
  console.log("The server knows this build.");
}
