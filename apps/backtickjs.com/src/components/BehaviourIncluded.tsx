import { cs } from "@backtickjs/core";

// What a screen is made of, and, for each way of building an app, which
// parts come from the server on each request and which are built into the
// app. Behaviour first, since it's the part only Backtick sends.

type Layer = { name: string; server: boolean; note: string };
type Approach = { name: string; detail: string; layers: Layer[] };

const APPROACHES: Approach[] = [
  {
    name: "A typical app",
    detail: "Screens in the app, data from an API",
    layers: [
      { name: "Behaviour", server: false, note: "in the app" },
      { name: "Layout", server: false, note: "in the app" },
      { name: "Data", server: true, note: "JSON from your API" },
    ],
  },
  {
    name: "Server-driven UI",
    detail: "A JSON schema and a renderer in the app",
    layers: [
      { name: "Behaviour", server: false, note: "a fixed set, in the app" },
      { name: "Layout", server: true, note: "if the schema has it" },
      { name: "Data", server: true, note: "from your server" },
    ],
  },
  {
    name: "React Server Components",
    detail: "On native with Expo, experimental",
    layers: [
      {
        name: "Behaviour",
        server: false,
        note: "client components, in the app",
      },
      { name: "Layout", server: true, note: "rendered on your server" },
      { name: "Data", server: true, note: "from your server" },
    ],
  },
  {
    name: "Backtick",
    detail: "React Native, written on your server",
    layers: [
      { name: "Behaviour", server: true, note: "state, handlers, hooks" },
      { name: "Layout", server: true, note: "any component you ship" },
      { name: "Data", server: true, note: "read where it lives" },
    ],
  },
];

export const BehaviourIncludedVisual = cs`() => (
  <div class="grid gap-5">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {$APPROACHES.map((approach, index) => {
        const ours = index === $APPROACHES.length - 1;
        return (
          <figure
            class={
              "m-0 grid content-start gap-4 rounded-[20px] border p-5 " +
              (ours
                ? "border-react/50 bg-react/5 shadow-[0_30px_80px_-50px_var(--color-react)]"
                : "border-line bg-wash")
            }
          >
            <div>
              <p
                class={
                  "font-mono text-xs tracking-[0.12em] uppercase " +
                  (ours ? "text-react" : "text-muted")
                }
              >
                {approach.name}
              </p>
              <p class="mt-1 min-h-[2lh] text-[14px] text-muted">
                {approach.detail}
              </p>
            </div>
            <div class="grid gap-2">
              {approach.layers.map((layer) => (
                <div
                  class={
                    "rounded-xl border px-3.5 py-2.5 " +
                    (layer.server
                      ? "border-react/40 bg-react/15"
                      : "border-dashed border-line bg-paper")
                  }
                >
                  <p class="flex items-center justify-between gap-2 text-[15px] font-semibold">
                    {layer.name}
                    <span
                      class={
                        "font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase " +
                        (layer.server ? "text-react" : "text-muted")
                      }
                    >
                      {layer.server ? "server" : "app"}
                    </span>
                  </p>
                  <p class="text-[13px] text-muted">{layer.note}</p>
                </div>
              ))}
            </div>
          </figure>
        );
      })}
    </div>
    <div class="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted">
      <span class="flex items-center gap-2">
        <span class="size-2.5 rounded-sm border border-react/40 bg-react/15" />
        From your server, on every request
      </span>
      <span class="flex items-center gap-2">
        <span class="size-2.5 rounded-sm border border-dashed border-muted" />
        Built into the app: changing it takes a release
      </span>
    </div>
  </div>
)`;
