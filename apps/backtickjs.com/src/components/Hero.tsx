import { cs } from "@backtickjs/core";
import { Button } from "./Button.js";

export async function Hero() {
  return cs`(
    <div class="pt-12 pb-8">
      <h1 class="max-w-[12em] text-[clamp(40px,7.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.045em]">
        {"Ship React Native screens "}
        <span class="text-shine">without shipping the app.</span>
      </h1>
      <p class="mt-[26px] max-w-[36em] text-xl leading-[1.55] text-muted">
        Backtick brings server components to React Native. Each screen is built
        on your server per request, with the user's data inlined, then renders
        natively. No API or GraphQL round trip.
      </p>
      <div class="mt-[34px] flex flex-wrap gap-3">
        {
          ${(
            <Button
              href="https://github.com/backtickjs/backtick/tree/main/examples/react-native-server"
              solid
              label="Run the example →"
            />
          )}
        }
        {${(<Button href="#how" label="See how it works" />)}}
      </div>
      <p class="mt-[26px] font-mono text-[12.5px] text-muted">
        Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript
      </p>
    </div>
  )`;
}
