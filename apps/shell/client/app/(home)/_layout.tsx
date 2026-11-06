import { AppLayout } from "../../AppLayout";
import { ShellSplash } from "../../ShellSplash";

// Backtick's own screens, as an app's: from its server, root layout included.
export default function HomeLayout() {
  return <AppLayout app={null} splash={<ShellSplash />} />;
}
