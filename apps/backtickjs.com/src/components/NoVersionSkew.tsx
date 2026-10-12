import { cs } from "@backtickjs/core";
import { Pair } from "./Pair.js";

// Version skew: four builds of the app still installed when a new feature
// ships. Without Backtick, only the build with the feature has it; with it,
// every build that has the screen's packages does.

type State = "has" | "waits" | "caught";
type Build = { version: string; state: State; result: string };

const FEATURE = "You ship a one-tap reorder button, with haptics";

const WITHOUT: Build[] = [
  { version: "2.4.0", state: "has", result: "built with it" },
  { version: "2.3.1", state: "waits", result: "after the user updates" },
  { version: "2.1.0", state: "waits", result: "after the user updates" },
  { version: "1.9.0", state: "waits", result: "after the user updates" },
];

const BACKTICK: Build[] = [
  { version: "2.4.0", state: "has", result: "next time the screen opens" },
  { version: "2.3.1", state: "has", result: "next time the screen opens" },
  { version: "2.1.0", state: "has", result: "next time the screen opens" },
  {
    version: "1.9.0",
    state: "caught",
    result: "built without expo-haptics: refused by the bundler",
  },
];

// Each state's mark and ink, written out whole so the stylesheet generator
// finds the classes.
const STATES: Record<State, { mark: string; ink: string }> = {
  has: { mark: "✓", ink: "text-added" },
  waits: { mark: "–", ink: "text-muted" },
  caught: { mark: "!", ink: "text-warn" },
};

const Builds = cs`(props: { builds: Build[] }) => (
  <div class="grid gap-3">
    <span class="font-mono text-xs text-muted">{$FEATURE}</span>
    <div class="grid gap-2">
      {props.builds.map((build) => (
        <div class="flex items-center gap-3 rounded-xl border border-line bg-paper px-3.5 py-2.5 text-[14.5px]">
          <span class="w-20 shrink-0 font-mono text-xs text-muted">
            {"app " + build.version}
          </span>
          <span class={$STATES[build.state].ink}>
            {$STATES[build.state].mark}
          </span>
          <span class={build.state === "has" ? "" : $STATES[build.state].ink}>
            {build.result}
          </span>
        </div>
      ))}
    </div>
  </div>
)`;

export const NoVersionSkewVisual = cs`() => (
  <$Pair
    without={<$Builds builds={$WITHOUT} />}
    withoutCaption="A new feature lives in the new build. Everyone else gets it when they update, and your API keeps serving every older build until then."
    backtick={<$Builds builds={$BACKTICK} />}
    backtickCaption="A screen ships to every build that has the packages it uses. The bundler checks their versions on every request, so a build that can't run the screen never receives it."
  />
)`;
