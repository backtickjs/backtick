import { App } from "../../App";
import { ShellSplash } from "../../ShellSplash";

// Backtick's own screens, as an app's: from its server, root layout included.
export default function HomeLayout() {
  return <App app={null} splash={<ShellSplash />} />;
}
