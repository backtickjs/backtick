import { cs } from "@backtickjs/core";
import { Button } from "./Button.js";
import { QuickStart } from "./QuickStart.js";

export const Hero = cs`() => (
  <div class="pt-12">
    <h1 class="max-w-[12.5em] text-[clamp(40px,7.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.045em]">
      {"Fully "}
      <span class="text-shine">server-driven</span>
      {" React\u00a0Native."}
    </h1>
    <p class="mt-[26px] max-w-[720px] text-xl leading-[1.55] text-muted">
      Write every screen on your server, with its layout, data and behaviour.
      Every change ships with your next deploy, not your next app release.
    </p>
    <div class="mt-[34px] flex flex-wrap gap-3">
      <$QuickStart />
      <$Button href="/docs" solid label="Read the docs" event="read-docs" />
    </div>
  </div>
)`;
