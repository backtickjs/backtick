import { usePaper } from "./screens";
import { SplashView } from "./SplashView";

// Backtick's own, while its home is fetched.
export function ShellSplash() {
  return (
    <SplashView
      paper={usePaper()}
      name="Backtick"
      icon={require("../assets/icon.png")}
    />
  );
}
