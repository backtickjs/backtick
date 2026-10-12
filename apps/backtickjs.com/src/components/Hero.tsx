import { cs } from "@backtickjs/core";
import { Button } from "./Button.js";
import { GitHubMark } from "./GitHubMark.js";
import { QuickStart } from "./QuickStart.js";

export const Hero = cs`() => (
  <div class="pt-12">
    <h1 class="max-w-[12.5em] text-[clamp(34px,7.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.045em]">
      {"Fully "}
      <span class="text-shine whitespace-nowrap">server-driven</span>
      {" React\u00a0Native."}
    </h1>
    <p class="mt-[26px] max-w-[720px] text-xl leading-[1.55] text-muted">
      Write every screen in React, on your server: layout, data and behaviour.
      Changes ship with your next deploy, not your next app store release.
    </p>
    <div class="mt-[34px] flex flex-wrap gap-3">
      <$QuickStart />
      <$Button href="/docs" solid label="Read the docs" event="read-docs" />
    </div>
    <p class="mt-3 pl-5 text-sm">
      <a
        href="https://github.com/backtickjs/backtick"
        data-umami-event="github"
        class="inline-flex items-center gap-1.5 text-muted no-underline transition-colors hover:text-ink"
      >
        <$GitHubMark size={14} />
        Open source · MIT license
      </a>
    </p>
  </div>
)`;
