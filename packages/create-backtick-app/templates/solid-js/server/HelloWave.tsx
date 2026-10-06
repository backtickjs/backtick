import { cs } from "@backtickjs/core";
import { onMount } from "@backtickjs/solid-js";

// A client component: it runs in the browser, so its animation does too. It
// waves when it appears, and again when you click it.
export const HelloWave = cs`() => {
  let hand!: HTMLSpanElement;
  const wave = () => {
    hand.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(25deg)" },
        { transform: "rotate(0deg)" },
      ],
      { duration: 300, iterations: 4 },
    );
  };

  $onMount(wave);

  return (
    <span
      ref={hand}
      onClick={wave}
      style={{
        display: "inline-block",
        cursor: "pointer",
        "font-size": "28px",
      }}
    >
      👋
    </span>
  );
}`;
