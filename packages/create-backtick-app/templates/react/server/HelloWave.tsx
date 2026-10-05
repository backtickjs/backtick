import { cs } from "@backtickjs/core";
import { useEffect, useRef } from "@backtickjs/react";

// A client component: it runs in the browser, so its animation does too. It
// waves when it appears, and again when you click it.
export const HelloWave = cs`() => {
  const hand = $useRef<HTMLSpanElement>(null);
  const wave = () => {
    hand.current?.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(25deg)" },
        { transform: "rotate(0deg)" },
      ],
      { duration: 300, iterations: 4 },
    );
  };

  $useEffect(wave, []);

  return (
    <span
      ref={hand}
      onClick={wave}
      style={{ display: "inline-block", cursor: "pointer", fontSize: 28 }}
    >
      👋
    </span>
  );
}`;
