import { useInk, usePaper } from "./screens";
import { SplashView } from "./SplashView";

// Backtick's own, while its home is fetched.
export function ShellSplash() {
  return (
    <SplashView
      paper={usePaper()}
      ink={useInk()}
      name="Backtick"
      icon={require("../assets/icon.png")}
    />
  );
}
