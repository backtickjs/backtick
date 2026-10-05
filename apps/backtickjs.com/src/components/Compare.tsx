import { cs } from "@backtickjs/core";
import { COMPONENT, SCHEMA } from "../samples.js";
import { Code } from "./Code.js";

export async function Compare() {
  return cs`(
    <div class="flex flex-wrap gap-5">
      <div class="grid min-w-0 flex-[1_1_420px] content-start gap-3.5">
        <p class="text-[17px] font-bold">Server-driven UI, as usually built</p>
        <p class="text-[15px] text-muted">
          A schema you invent, a renderer to keep in sync on every platform, and
          an action language that grows until it is a worse JavaScript.
        </p>
        {${(<Code file="reorder-button.json" source={SCHEMA} lang="json" />)}}
      </div>
      <div class="grid min-w-0 flex-[1_1_420px] content-start gap-3.5">
        <p class="text-[17px] font-bold">Server-driven UI, with Backtick</p>
        <p class="text-[15px] text-muted">
          The component model you already ship. Logic is code, it is typed, and
          it runs on the device.
        </p>
        {${(<Code file="ReorderButton.tsx" source={COMPONENT} />)}}
      </div>
    </div>
  )`;
}
