import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";

// A client component: its state is React's, kept on the client.
export const Counter = cs`(props: { label: string }) => {
  const [count, setCount] = $useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      {props.label}: {count}
    </button>
  );
}`;
