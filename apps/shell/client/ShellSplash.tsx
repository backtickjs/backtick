import { useInk, usePaper } from "./theme";
import { SplashView } from "./SplashView";

// Backtick's own, while its home or an app it opens is fetched.
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
