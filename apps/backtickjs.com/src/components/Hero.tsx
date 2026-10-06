import { cs } from "@backtickjs/core";
import { Button } from "./Button.js";
import { QuickStart } from "./QuickStart.js";

export const Hero = cs`() => (
  <div class="pt-12">
    <h1 class="max-w-[12.5em] text-[clamp(40px,7.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.045em]">
      {"A "}
      <span class="text-shine">delightful</span>
      {" programming model for "}
      <span class="text-shine">{"React\u00a0Native."}</span>
    </h1>
    <p class="mt-[26px] max-w-[720px] text-xl leading-[1.55] text-muted">
      Build your entire app in React and TypeScript, with your data, logic, and
      UI living together in one place. Everything is type-checked end to end,
      and your server and client ship as one.
    </p>
    <div class="mt-[34px] flex flex-wrap gap-3">
      <$Button href="/docs" solid label="Read the docs" event="read-docs" />
      <$Button
        href="https://github.com/backtickjs/backtick"
        github
        label="GitHub"
        event="github"
      />
      <$QuickStart />
    </div>
  </div>
)`;
