import type { Bundle } from "@backtickjs/core";
import { type ReactNode, Suspense, use, useEffect, useState } from "react";
import { Linking } from "react-native";
import { ErrorBoundary } from "react-error-boundary";
import { onSessionChange } from "../modules/backtick-session/src";
import { backtick } from "./backtick";
import { HomeFallback } from "./HomeFallback";
import { followLink } from "./links";
import { Splash } from "./Splash";

// Where Backtick's home is: its server, which apps are opened from.
const homeOrigin = "https://app.backtickjs.com";

// Backtick's home, as its server answers at `/`, with a runtime of its own
// each time it loads, so nothing of a signed-out user is kept. The session's
// token is attached below JavaScript.
async function openHome(): Promise<ReactNode> {
  const runtime = backtick.create();
  const response = await runtime.fetch(`${homeOrigin}/`);
  return runtime.exec((await response.text()) as Bundle<ReactNode>);
}

// The Backtick app: its home, drawn from its server afresh at each sign-in
// or sign-out, with Backtick's splash until it's in, or a screen saying it
// couldn't open, with Retry; and the links that are its own commands.
export function Home() {
  // Each sign-in or sign-out, counted, so the home is drawn afresh.
  const [sessions, setSessions] = useState(0);
  useEffect(() => {
    const subscription = onSessionChange(() => setSessions((n) => n + 1));
    return () => subscription.remove();
  }, []);
  useEffect(() => {
    void Linking.getInitialURL().then(
      (url) => url && followLink(url, homeOrigin),
    );
    const subscription = Linking.addEventListener("url", ({ url }) =>
      followLink(url, homeOrigin),
    );
    return () => subscription.remove();
  }, []);
  return <Session key={sessions} />;
}

function Session() {
  // Opened from an effect, never in render: React may throw a render away
  // and run it again, which would open the home twice.
  const [home, setHome] = useState<Promise<ReactNode>>();
  useEffect(() => {
    setHome(openHome());
  }, []);
  if (home === undefined) {
    return <Splash />;
  }
  return (
    <Suspense fallback={<Splash />}>
      <ErrorBoundary
        resetKeys={[home]}
        onError={(error) => console.warn("The home didn't open:", error)}
        fallbackRender={() => (
          <HomeFallback retry={() => setHome(openHome())} />
        )}
      >
        <HomeScreen home={home} />
      </ErrorBoundary>
    </Suspense>
  );
}

// The home, once its bundle has run.
function HomeScreen({ home }: { home: Promise<ReactNode> }) {
  return use(home);
}
