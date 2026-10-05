import { cs } from "@backtickjs/core";
import { RUN } from "../samples.js";
import { Button } from "./Button.js";
import { Code } from "./Code.js";

export async function Cta() {
  return cs`(
    <section class="relative mt-28 overflow-hidden rounded-[32px] border border-line bg-[radial-gradient(120%_120%_at_0%_0%,rgb(97_218_251/0.14),transparent_50%),radial-gradient(120%_120%_at_100%_100%,rgb(167_139_250/0.18),transparent_50%)] p-[clamp(28px,6vw,64px)]">
      <h2 class="max-w-[14em] text-[clamp(32px,5vw,52px)] leading-[1.05] font-extrabold tracking-[-0.04em]">
        {"Your next screen doesn't need "}
        <span class="text-shine">a release.</span>
      </h2>
      <p class="mt-[18px] mb-7 max-w-[34em] text-lg text-muted">
        Run the example server and the Expo app side by side, then change the
        server and watch the phone redraw.
      </p>
      {${(<Code file="terminal" source={RUN} lang="bash" />)}}
      <div class="mt-7 flex flex-wrap gap-3">
        {
          ${(
            <Button
              href="https://github.com/backtickjs/backtick"
              solid
              label="Star on GitHub"
            />
          )}
        }
        {
          ${(
            <Button
              href="https://github.com/backtickjs/backtick/tree/main/examples/react-native-app"
              label="Read the app example"
            />
          )}
        }
      </div>
    </section>
  )`;
}
