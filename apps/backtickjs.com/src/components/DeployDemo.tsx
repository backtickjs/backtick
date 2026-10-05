import { cs } from "@backtickjs/core";
import {
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "@backtickjs/solid-js";
import { highlight } from "../highlight.js";
import { DEPLOYS } from "../samples.js";
import { ADDED, LINE, PRE } from "./Code.js";
import { codeBg, codeLine, codeMuted, mono } from "./theme.js";

// How long each deploy stays up while the demo plays itself.
const DWELL_MS = 4500;

const PANEL =
  "position: relative; border-radius: 28px; padding: 20px;" +
  ` background: #0a0c10; border: 1px solid ${codeLine}; color: #e6edf3;` +
  " box-shadow: 0 40px 120px -40px rgba(97, 218, 251, 0.35)," +
  " 0 30px 80px -50px rgba(167, 139, 250, 0.6)";

const SPLIT = "display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch";
const LEFT =
  "flex: 1 1 520px; min-width: 0; display: grid; gap: 14px; align-content: start";
const RIGHT =
  "flex: 1 1 316px; display: grid; justify-items: center; align-content: center";

const COMMITS =
  "display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px";

const COMMIT =
  "position: relative; overflow: hidden; text-align: left; cursor: pointer;" +
  " padding: 10px 12px; border-radius: 12px; font: inherit; color: inherit;" +
  ` border: 1px solid ${codeLine}; background: transparent;` +
  " transition: background .2s, border-color .2s";

const COMMIT_ON = `${COMMIT}; background: #161b22; border-color: #3d444d`;

const COMMIT_ID = `display: block; font-family: ${mono}; font-size: 11px; color: ${codeMuted}`;
const COMMIT_MESSAGE =
  "display: block; font-size: 13.5px; font-weight: 500; margin-top: 2px";

const PROGRESS =
  "position: absolute; left: 0; bottom: 0; height: 2px; width: 100%;" +
  " background: linear-gradient(90deg, #61dafb, #a78bfa);" +
  ` transform-origin: left; animation: bt-progress ${DWELL_MS}ms linear both`;

const EDITOR = `background: ${codeBg}; border: 1px solid ${codeLine}; border-radius: 16px; overflow: hidden`;

const EDITOR_BAR =
  "display: flex; align-items: center; justify-content: space-between;" +
  ` gap: 12px; padding: 10px 16px; border-bottom: 1px solid ${codeLine};` +
  ` font-family: ${mono}; font-size: 12px; color: ${codeMuted}`;

const EDITOR_CODE = `${PRE}; height: 460px; box-sizing: border-box; overflow: auto`;

const SAVED =
  "display: inline-flex; align-items: center; gap: 6px; color: #3fb950";

// The device. 316 by 660 with the bezel taken off both sides is a screen
// close to an iPhone's 19.5:9.
const PHONE =
  "position: relative; width: 316px; max-width: 100%; height: 660px;" +
  " box-sizing: border-box; padding: 11px; border-radius: 52px;" +
  " background: #1c1c1f; box-shadow: inset 0 0 0 1px #3f3f46," +
  " inset 0 0 0 5px #0b0b0d, 0 30px 60px -20px rgba(0,0,0,.7)";

const ISLAND =
  "position: absolute; top: 22px; left: 50%; width: 92px; height: 26px;" +
  " margin-left: -46px; border-radius: 999px; background: #000; z-index: 3";

const SCREEN =
  "position: relative; height: 100%; border-radius: 41px; overflow: hidden;" +
  " background: #f6f5f2; color: #111;" +
  " font-family: -apple-system, 'SF Pro Text', 'Inter', system-ui, sans-serif";

const STATUS_BAR =
  "display: flex; justify-content: space-between; align-items: center;" +
  " padding: 16px 28px 0; height: 32px; font-size: 14px; font-weight: 600";

const TOAST =
  "position: absolute; top: 58px; left: 50%; margin-left: -96px; width: 192px;" +
  " z-index: 2; padding: 8px 12px; border-radius: 999px; text-align: center;" +
  " background: rgba(17,17,17,.88); color: #fff; font-size: 12px; font-weight: 600;" +
  " box-shadow: 0 8px 24px rgba(0,0,0,.25)";

const CONTENT = "padding: 18px 18px 0; display: grid; gap: 12px";

const HELLO = "margin: 0; font-size: 13px; color: #8a8a8e; font-weight: 500";
const NAME =
  "margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.02em";

const PROMO =
  "border-radius: 18px; padding: 14px 16px; color: #fff;" +
  " background: linear-gradient(135deg, #ff7a18, #af002d 75%)";

const PROMO_EYEBROW =
  "margin: 0; font-size: 10.5px; font-weight: 700; letter-spacing: .12em; opacity: .85";
const PROMO_TITLE =
  "margin: 4px 0 2px; font-size: 18px; font-weight: 700; line-height: 1.2";
const PROMO_DETAIL = "margin: 0; font-size: 12.5px; opacity: .9";

const USUAL =
  "border-radius: 18px; padding: 14px; background: #fff;" +
  " box-shadow: 0 1px 2px rgba(0,0,0,.06); display: grid; gap: 10px";

const USUAL_ROW = "display: flex; align-items: center; gap: 12px";

const REORDER =
  "border: 0; border-radius: 12px; padding: 11px; font: inherit;" +
  " font-size: 14px; font-weight: 600; cursor: pointer; color: #fff;" +
  " transition: background .25s, transform .1s";

const REORDER_IDLE = `${REORDER}; background: #111`;
const REORDER_DONE = `${REORDER}; background: #16a34a`;

const LABEL = "margin: 6px 0 0; font-size: 15px; font-weight: 700";

const PRODUCT =
  "display: flex; align-items: center; gap: 12px; padding: 10px;" +
  " border-radius: 16px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.06)";

const SWATCH =
  "flex: none; width: 42px; height: 42px; border-radius: 12px; background: ";
const PRODUCT_TEXT = "flex: 1; min-width: 0";
const PRODUCT_NAME = "margin: 0; font-size: 14.5px; font-weight: 600";
const PRODUCT_NOTES = "margin: 1px 0 0; font-size: 12px; color: #8a8a8e";
const PRICE = "font-size: 14.5px; font-weight: 600";

const TABS =
  "position: absolute; left: 0; right: 0; bottom: 0; display: flex;" +
  " justify-content: space-around; padding: 10px 12px 26px;" +
  " background: rgba(246,245,242,.92); border-top: 1px solid #e7e5e0;" +
  " font-size: 10.5px; font-weight: 600; color: #a1a1a6";

const TAB = "display: grid; justify-items: center; gap: 4px";
const TAB_ICON =
  "width: 20px; height: 20px; border-radius: 6px; background: #d4d4d8";
const TAB_ICON_ON =
  "width: 20px; height: 20px; border-radius: 6px; background: #111";

const STRIP =
  "display: flex; flex-wrap: wrap; align-items: center; gap: 10px 22px;" +
  ` margin-top: 18px; padding: 14px 6px 2px; border-top: 1px solid ${codeLine};` +
  ` font-family: ${mono}; font-size: 12px; color: ${codeMuted}`;

const CHIP =
  "display: inline-flex; align-items: center; gap: 8px; white-space: nowrap";
const DOT_IDLE =
  "width: 8px; height: 8px; border-radius: 50%; background: #6e7681";
const DOT_LIVE =
  "width: 8px; height: 8px; border-radius: 50%; background: #3fb950;" +
  " animation: bt-pulse 2s ease-out infinite";
const STRONG = "color: #e6edf3";

const PLAY =
  "margin-left: auto; padding: 6px 12px; border-radius: 999px; cursor: pointer;" +
  ` border: 1px solid ${codeLine}; background: transparent; color: #e6edf3;` +
  ` font-family: ${mono}; font-size: 11.5px`;

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
type Product = { name: string; notes: string; price: string; swatch: string };

const PRODUCTS: Product[] = [
  {
    name: "Ethiopia Guji",
    notes: "Peach · jasmine · light",
    price: "$18",
    swatch: "linear-gradient(135deg, #f6d365, #fda085)",
  },
  {
    name: "Colombia Huila",
    notes: "Cherry · cocoa · medium",
    price: "$16",
    swatch: "linear-gradient(135deg, #f093fb, #f5576c)",
  },
  {
    name: "House Espresso",
    notes: "Caramel · dark",
    price: "$15",
    swatch: "linear-gradient(135deg, #5ee7df, #b490ca)",
  },
];

const TAB_NAMES = ["Home", "Shop", "Orders", "You"];

// Three deploys to one server, and the phone that draws each. The app on it
// is the same build throughout, which is the point.
export async function DeployDemo() {
  const deploys = await Promise.all(
    DEPLOYS.map(async (deploy, index) => ({
      id: "v" + (index + 1),
      file: deploy.file,
      message: deploy.message,
      lines: await highlight(deploy.source, "tsx"),
    })),
  );

  return cs`{
    const [step, setStep] = $createSignal(0);
    // How many deploys have landed. Each one remounts the toast and the
    // progress bar, which restarts their animations.
    const [pushes, setPushes] = $createSignal(0);
    const [playing, setPlaying] = $createSignal(true);
    const [added, setAdded] = $createSignal(false);
    const [timer, setTimer] = $createSignal(0);

    const deploy = (next: number) => {
      setStep(next);
      setPushes(pushes() + 1);
      setAdded(false);
    };

    $onMount(() =>
      setTimer(
        window.setInterval(() => {
          if (playing()) {
            deploy((step() + 1) % $deploys.length);
          }
        }, $DWELL_MS),
      ),
    );
    $onCleanup(() => window.clearInterval(timer()));

    return (
      <div style={$PANEL}>
        <div style={$SPLIT}>
          <div style={$LEFT}>
            <div style={$COMMITS}>
              <$For each={$deploys}>
                {(commit, index) => (
                  <button
                    style={step() === index() ? $COMMIT_ON : $COMMIT}
                    onclick={() => {
                      setPlaying(false);
                      deploy(index());
                    }}
                  >
                    <span style={$COMMIT_ID}>
                      {commit.id + " · " + commit.file}
                    </span>
                    <span style={$COMMIT_MESSAGE}>{commit.message}</span>
                    <$Show when={playing() && step() === index()}>
                      <$For each={[pushes()]}>
                        {() => <span style={$PROGRESS} />}
                      </$For>
                    </$Show>
                  </button>
                )}
              </$For>
            </div>

            <div style={$EDITOR}>
              <div style={$EDITOR_BAR}>
                <span>{"server/" + $deploys[step()].file}</span>
                <span style={$SAVED}>
                  {"● deployed " + $deploys[step()].id}
                </span>
              </div>
              <pre style={$EDITOR_CODE}>
                <$For each={$deploys[step()].lines}>
                  {(line) => (
                    <div
                      class={line.added ? "bt-flash" : ""}
                      style={line.added ? $ADDED : $LINE}
                    >
                      {line.tokens.map((token) => (
                        <span style={"color: " + token.color}>
                          {token.text}
                        </span>
                      ))}
                    </div>
                  )}
                </$For>
              </pre>
            </div>
          </div>

          <div style={$RIGHT}>
            <div style={$PHONE}>
              <div style={$ISLAND} />
              <div style={$SCREEN}>
                <div style={$STATUS_BAR}>
                  <span>9:41</span>
                  <span>●●● ▮</span>
                </div>

                <$For each={pushes() > 0 ? [pushes()] : []}>
                  {() => (
                    <div class="bt-toast" style={$TOAST}>
                      {"↓ New screen from server · " + $deploys[step()].id}
                    </div>
                  )}
                </$For>

                <div style={$CONTENT}>
                  <div>
                    <p style={$HELLO}>Good morning,</p>
                    <p style={$NAME}>Sam</p>
                  </div>

                  <$Show when={step() >= 1}>
                    <div class="bt-enter" style={$PROMO}>
                      <p style={$PROMO_EYEBROW}>AUTUMN SALE</p>
                      <p style={$PROMO_TITLE}>20% off every single origin</p>
                      <p style={$PROMO_DETAIL}>
                        Ends Sunday · applied at checkout
                      </p>
                    </div>
                  </$Show>

                  <$Show when={step() >= 2}>
                    <div class="bt-enter" style={$USUAL}>
                      <div style={$USUAL_ROW}>
                        <span style={$SWATCH + $PRODUCTS[0].swatch} />
                        <div style={$PRODUCT_TEXT}>
                          <p style={$PRODUCT_NAME}>Your usual</p>
                          <p style={$PRODUCT_NOTES}>
                            Ethiopia Guji · 250 g · whole bean
                          </p>
                        </div>
                      </div>
                      <button
                        style={added() ? $REORDER_DONE : $REORDER_IDLE}
                        onclick={() => {
                          setPlaying(false);
                          setAdded(true);
                        }}
                      >
                        {added() ? "Added to cart ✓" : "Reorder Ethiopia Guji"}
                      </button>
                    </div>
                  </$Show>

                  <p style={$LABEL}>Picked for you</p>
                  <$For each={$PRODUCTS}>
                    {(product) => (
                      <div style={$PRODUCT}>
                        <span style={$SWATCH + product.swatch} />
                        <div style={$PRODUCT_TEXT}>
                          <p style={$PRODUCT_NAME}>{product.name}</p>
                          <p style={$PRODUCT_NOTES}>{product.notes}</p>
                        </div>
                        <span style={$PRICE}>{product.price}</span>
                      </div>
                    )}
                  </$For>
                </div>

                <div style={$TABS}>
                  <$For each={$TAB_NAMES}>
                    {(name, index) => (
                      <div style={$TAB}>
                        <span
                          style={index() === 0 ? $TAB_ICON_ON : $TAB_ICON}
                        />
                        <span style={index() === 0 ? "color: #111" : ""}>
                          {name}
                        </span>
                      </div>
                    )}
                  </$For>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={$STRIP}>
          <span style={$CHIP}>
            <span style={$DOT_IDLE} />
            {"App Store build "}
            <span style={$STRONG}>2.4.0 (112)</span>
            {" · unchanged"}
          </span>
          <span style={$CHIP}>
            <span style={$DOT_LIVE} />
            {"Screen "}
            <span style={$STRONG}>{$deploys[step()].id}</span>
            {" · live on next open"}
          </span>
          <button style={$PLAY} onclick={() => setPlaying(!playing())}>
            {playing() ? "❚❚ Pause" : "▶ Play"}
          </button>
        </div>
      </div>
    );
  }`;
}
