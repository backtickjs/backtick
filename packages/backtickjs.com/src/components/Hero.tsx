import { muted } from "../theme.js";
import { Button } from "./Button.js";
import { REPO } from "../links.js";

const HERO = "padding: 40px 0";

const TYPE =
  "margin: 0; font-size: clamp(38px, 8vw, 60px); line-height: 1.05;" +
  " letter-spacing: -0.035em; font-weight: 700";

const STANDFIRST = `margin: 24px 0 0; max-width: 34em; font-size: 19px; color: ${muted}`;

const ACTIONS = "display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px";

export async function Hero({ standfirst }: { standfirst: string }) {
  return (
    <div style={HERO}>
      <h1 style={TYPE}>
        {"Ship today."}
        <br />
        {"Not next release."}
      </h1>
      <p style={STANDFIRST}>{standfirst}</p>
      <div style={ACTIONS}>
        <Button href="#try" solid>
          Try it
        </Button>
        <Button href={REPO}>Read the source</Button>
      </div>
    </div>
  );
}
