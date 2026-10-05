import { cs } from "@backtickjs/core";
import { Button } from "./Button.js";

export async function Hero() {
  return cs`(
    <div class="pt-12 pb-14">
      <h1 class="max-w-[12.5em] text-[clamp(40px,7.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.045em]">
        {"Ship React\u00a0Native screens "}
        <span class="text-shine">from your server.</span>
      </h1>
      <p class="mt-[26px] max-w-[36em] text-xl leading-[1.55] text-muted">
        Backtick brings server components to React Native. Each screen,
        including client components, is assembled on your server per request and
        rendered natively in your app.
      </p>
      <div class="mt-[34px] flex flex-wrap gap-3">
        {${(<Button href="/docs" solid label="Get started →" />)}}
        {
          ${(
            <Button
              href="https://github.com/backtickjs/backtick"
              github
              label="GitHub"
            />
          )}
        }
      </div>
    </div>
  )`;
}
