// Replaces the welcome page with a blank one, so you start fresh.
import { rmSync, writeFileSync } from "node:fs";

writeFileSync(
  "server/Home.tsx",
  `import { cs } from "@backtickjs/core";

export async function Home() {
  return cs\`(
    <main style={{ padding: "24px", "font-family": "system-ui, sans-serif" }}>
      <p>Edit server/Home.tsx to edit this page.</p>
    </main>
  )\`;
}
`,
);
rmSync("server/HelloWave.tsx", { force: true });

console.log(
  "✅ Project reset. server/Home.tsx is now a blank page, and the welcome example is gone.",
);
