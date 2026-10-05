import { cs } from "@backtickjs/core";
import { Button } from "./Button.js";

export async function Hero() {
  return cs`(
    <div class="pt-12 pb-14">
      <h1 class="max-w-[12em] text-[clamp(40px,7.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.045em]">
        {"Ship React Native screens "}
        <span class="text-shine">without shipping the app.</span>
      </h1>
      <p class="mt-[26px] max-w-[36em] text-xl leading-[1.55] text-muted">
        Write screens with View, Text, Pressable and useState — on your server.
        Your app fetches them at runtime and React Native draws them, natively.
        No JSON schema to invent. No store release to wait on.
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
