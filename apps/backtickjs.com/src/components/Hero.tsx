import { cs } from "@backtickjs/core";
import { Button } from "./Button.js";
import { accentEdge, accentFill, gradient, mono, muted } from "./theme.js";

const HERO = "padding: 48px 0 56px";

const PILL =
  "display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px;" +
  ` border-radius: 999px; background: ${accentFill}; border: 1px solid ${accentEdge};` +
  ` font-family: ${mono}; font-size: 12px; letter-spacing: 0.04em`;

const TYPE =
  "margin: 22px 0 0; font-size: clamp(40px, 7.4vw, 76px); line-height: 1.02;" +
  " letter-spacing: -0.045em; font-weight: 800; max-width: 12em";

const SHINE =
  `background: ${gradient}; -webkit-background-clip: text; background-clip: text;` +
  " color: transparent";

const STANDFIRST = `margin: 26px 0 0; max-width: 36em; font-size: 20px; line-height: 1.55; color: ${muted}`;

const ACTIONS = "display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px";

const STACK = `margin: 26px 0 0; font-family: ${mono}; font-size: 12.5px; color: ${muted}`;

export async function Hero() {
  return cs`(
    <div style={$HERO}>
      <span style={$PILL}>{"⚛ Server-driven React Native"}</span>
      <h1 style={$TYPE}>
        {"Ship React Native screens "}
        <span style={$SHINE}>without shipping the app.</span>
      </h1>
      <p style={$STANDFIRST}>
        Write screens with View, Text, Pressable and useState — on your server.
        Your app fetches them at runtime and React Native draws them, natively.
        No JSON schema to invent. No store release to wait on.
      </p>
      <div style={$ACTIONS}>
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
      <p style={$STACK}>
        Expo SDK 57 · React Native 0.86 · React 19.2 · TypeScript
      </p>
    </div>
  )`;
}
