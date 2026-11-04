import { AppLayout } from "../../AppLayout";
import { usePaper } from "../../screens";
import { ShellSplash } from "../../ShellSplash";

// Backtick's own screens, as an app's: from its server, headers its own.
export default function HomeLayout() {
  const paper = usePaper();
  return (
    <AppLayout
      app={null}
      splash={<ShellSplash />}
      screenOptions={{
        title: "",
        headerShown: false,
        contentStyle: { backgroundColor: paper },
      }}
    />
  );
}
