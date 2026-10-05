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

// How long each deploy stays up while the demo plays itself. As long as
// `--animate-progress` in styles.css.
const DWELL_MS = 4500;

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
      <div class="relative rounded-[28px] border border-code-line bg-[#0a0c10] p-5 text-code-ink shadow-[0_40px_120px_-40px_rgb(97_218_251/0.35),0_30px_80px_-50px_rgb(167_139_250/0.6)]">
        <div class="flex flex-wrap items-stretch gap-5">
          <div class="grid min-w-0 flex-[1_1_520px] content-start gap-3.5">
            <div class="grid grid-cols-3 gap-2">
              <$For each={$deploys}>
                {(commit, index) => (
                  <button
                    class={
                      "relative cursor-pointer overflow-hidden rounded-xl border px-3 py-2.5 text-left transition-colors " +
                      (step() === index()
                        ? "border-[#3d444d] bg-[#161b22]"
                        : "border-code-line")
                    }
                    onclick={() => {
                      setPlaying(false);
                      deploy(index());
                    }}
                  >
                    <span class="block font-mono text-[11px] text-code-muted">
                      {commit.id + " · " + commit.file}
                    </span>
                    <span class="mt-0.5 block text-[13.5px] font-medium">
                      {commit.message}
                    </span>
                    <$Show when={playing() && step() === index()}>
                      <$For each={[pushes()]}>
                        {() => (
                          <span class="absolute bottom-0 left-0 h-0.5 w-full origin-left animate-progress bg-linear-to-r from-[#61dafb] to-[#a78bfa]" />
                        )}
                      </$For>
                    </$Show>
                  </button>
                )}
              </$For>
            </div>

            <div class="overflow-hidden rounded-2xl border border-code-line bg-code">
              <div class="flex items-center justify-between gap-3 border-b border-code-line px-4 py-2.5 font-mono text-xs text-code-muted">
                <span>{"server/" + $deploys[step()].file}</span>
                <span class="text-added">
                  {"● deployed " + $deploys[step()].id}
                </span>
              </div>
              <pre class="m-0 box-border h-[460px] overflow-auto py-4 font-mono text-[13px] leading-[1.7]">
                <$For each={$deploys[step()].lines}>
                  {(line) => (
                    <div
                      class={
                        line.added
                          ? "code-line code-added animate-flash"
                          : "code-line"
                      }
                    >
                      {line.tokens.map((token) => (
                        <span style={{ color: token.color }}>{token.text}</span>
                      ))}
                    </div>
                  )}
                </$For>
              </pre>
            </div>
          </div>

          <div class="grid flex-[1_1_316px] content-center justify-items-center">
            {/* The device. 316 by 660 with the bezel taken off both sides is
                a screen close to an iPhone's 19.5:9. */}
            <div class="relative box-border h-[660px] w-[316px] max-w-full rounded-[52px] bg-[#1c1c1f] p-[11px] shadow-[inset_0_0_0_1px_#3f3f46,inset_0_0_0_5px_#0b0b0d,0_30px_60px_-20px_rgb(0_0_0/0.7)]">
              <div class="absolute top-[22px] left-1/2 z-[3] h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
              <div class="relative h-full overflow-hidden rounded-[41px] bg-[#f6f5f2] font-ios text-[#111]">
                <div class="flex h-8 items-center justify-between px-7 pt-4 text-sm font-semibold">
                  <span>9:41</span>
                  <span>●●● ▮</span>
                </div>

                <$For each={pushes() > 0 ? [pushes()] : []}>
                  {() => (
                    <div class="absolute top-[58px] left-1/2 z-[2] -ml-24 w-48 animate-toast rounded-full bg-[#111]/90 px-3 py-2 text-center text-xs font-semibold text-white shadow-lg">
                      {"↓ New screen from server · " + $deploys[step()].id}
                    </div>
                  )}
                </$For>

                <div class="grid gap-3 px-[18px] pt-[18px]">
                  <div>
                    <p class="text-[13px] font-medium text-[#8a8a8e]">
                      Good morning,
                    </p>
                    <p class="text-[28px] font-bold tracking-[-0.02em]">Sam</p>
                  </div>

                  <$Show when={step() >= 1}>
                    <div class="animate-enter rounded-[18px] bg-linear-135 from-[#ff7a18] to-[#af002d] to-75% px-4 py-3.5 text-white">
                      <p class="text-[10.5px] font-bold tracking-[0.12em] opacity-85">
                        AUTUMN SALE
                      </p>
                      <p class="mt-1 mb-0.5 text-lg leading-tight font-bold">
                        20% off every single origin
                      </p>
                      <p class="text-[12.5px] opacity-90">
                        Ends Sunday · applied at checkout
                      </p>
                    </div>
                  </$Show>

                  <$Show when={step() >= 2}>
                    <div class="grid animate-enter gap-2.5 rounded-[18px] bg-white p-3.5 shadow-sm">
                      <div class="flex items-center gap-3">
                        <span
                          class="size-[42px] flex-none rounded-xl"
                          style={{ background: $PRODUCTS[0].swatch }}
                        />
                        <div class="min-w-0 flex-1">
                          <p class="text-[14.5px] font-semibold">Your usual</p>
                          <p class="mt-px text-xs text-[#8a8a8e]">
                            Ethiopia Guji · 250 g · whole bean
                          </p>
                        </div>
                      </div>
                      <button
                        class={
                          "cursor-pointer rounded-xl p-[11px] text-sm font-semibold text-white transition active:scale-[0.98] " +
                          (added() ? "bg-green-600" : "bg-[#111]")
                        }
                        onclick={() => {
                          setPlaying(false);
                          setAdded(true);
                        }}
                      >
                        {added() ? "Added to cart ✓" : "Reorder Ethiopia Guji"}
                      </button>
                    </div>
                  </$Show>

                  <p class="mt-1.5 text-[15px] font-bold">Picked for you</p>
                  <$For each={$PRODUCTS}>
                    {(product) => (
                      <div class="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
                        <span
                          class="size-[42px] flex-none rounded-xl"
                          style={{ background: product.swatch }}
                        />
                        <div class="min-w-0 flex-1">
                          <p class="text-[14.5px] font-semibold">
                            {product.name}
                          </p>
                          <p class="mt-px text-xs text-[#8a8a8e]">
                            {product.notes}
                          </p>
                        </div>
                        <span class="text-[14.5px] font-semibold">
                          {product.price}
                        </span>
                      </div>
                    )}
                  </$For>
                </div>

                <div class="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#e7e5e0] bg-[#f6f5f2]/90 px-3 pt-2.5 pb-[26px] text-[10.5px] font-semibold text-[#a1a1a6]">
                  <$For each={$TAB_NAMES}>
                    {(name, index) => (
                      <div class="grid justify-items-center gap-1">
                        <span
                          class={
                            "size-5 rounded-md " +
                            (index() === 0 ? "bg-[#111]" : "bg-[#d4d4d8]")
                          }
                        />
                        <span class={index() === 0 ? "text-[#111]" : ""}>
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

        <div class="mt-[18px] flex flex-wrap items-center gap-x-[22px] gap-y-2.5 border-t border-code-line px-1.5 pt-3.5 pb-0.5 font-mono text-xs text-code-muted">
          <span class="inline-flex items-center gap-2 whitespace-nowrap">
            <span class="size-2 rounded-full bg-[#6e7681]" />
            {"App Store build "}
            <span class="text-code-ink">2.4.0 (112)</span>
            {" · unchanged"}
          </span>
          <span class="inline-flex items-center gap-2 whitespace-nowrap">
            <span class="size-2 animate-live rounded-full bg-added" />
            {"Screen "}
            <span class="text-code-ink">{$deploys[step()].id}</span>
            {" · live on next open"}
          </span>
          <button
            class="ml-auto cursor-pointer rounded-full border border-code-line px-3 py-1.5 font-mono text-[11.5px] text-code-ink"
            onclick={() => setPlaying(!playing())}
          >
            {playing() ? "❚❚ Pause" : "▶ Play"}
          </button>
        </div>
      </div>
    );
  }`;
}
