import { cs } from "@backtickjs/core";
import { APP, SERVER } from "../samples.js";
import { Code } from "./Code.js";

export async function Setup() {
  return cs`(
    <div class="flex flex-wrap gap-5">
      <div class="grid min-w-0 flex-[1_1_440px] content-start gap-3">
        <p class="font-mono text-xs tracking-[0.08em] text-react">
          ON YOUR SERVER
        </p>
        {${(<Code file="server/index.tsx" source={SERVER} />)}}
      </div>
      <div class="grid min-w-0 flex-[1_1_440px] content-start gap-3">
        <p class="font-mono text-xs tracking-[0.08em] text-react">
          IN YOUR APP
        </p>
        {${(<Code file="app/App.tsx" source={APP} />)}}
      </div>
    </div>
  )`;
}
