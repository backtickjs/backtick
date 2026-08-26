import { cs, type Prop } from "@backtickjs/core";

// One row of the list. Its props are `Prop<T>`, so each takes what the server
// wrote or a script standing in for it — and what this draws is whichever
// arrived. Pressing it redraws this row and nothing else, because a script is
// what the list hands down: the list around it never re-renders.
export async function Task({
  label,
  isDone,
  onPress,
}: {
  label: Prop<string>;
  isDone: Prop<boolean>;
  onPress: Prop<() => void>;
}) {
  return (
    <li>
      <button
        onclick={onPress}
        style="background: none; border: 0; cursor: pointer; display: flex; gap: 10px; padding: 6px 0; font: inherit"
      >
        <span style="font-size: 17px">{cs`$isDone ? "☑" : "☐"`}</span>
        <span
          style={cs`"font-size: 17px; color: " +
            ($isDone ? "#a1a1aa" : "#18181b") +
            "; text-decoration: " +
            ($isDone ? "line-through" : "none")`}
        >
          {label}
        </span>
      </button>
    </li>
  );
}
