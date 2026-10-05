import { cs } from "@backtickjs/core";
import { APP, SERVER } from "../samples.js";
import { Code } from "./Code.js";

// Two equal columns where both samples fit unscrolled, stacked below that.
export async function Setup() {
  return cs`(
    <div class="grid gap-5 xl:grid-cols-2">
      <div class="grid min-w-0 grid-rows-[auto_1fr] gap-3">
        <p class="font-mono text-xs tracking-[0.08em] text-react">
          ON YOUR SERVER
        </p>
        {${(<Code file="server/index.tsx" source={SERVER} compact />)}}
      </div>
      <div class="grid min-w-0 grid-rows-[auto_1fr] gap-3">
        <p class="font-mono text-xs tracking-[0.08em] text-react">
          IN YOUR APP
        </p>
        {${(<Code file="app/App.tsx" source={APP} compact />)}}
      </div>
    </div>
  )`;
}
