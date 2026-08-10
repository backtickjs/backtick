import { cs, type Client } from "@backtickjs/core";

// One row of the list. Everything it draws is a client value, so pressing it
// redraws this row and nothing else — the list around it never re-renders.
export async function Task({
  label,
  isDone,
  onPress,
}: {
  label: Client<string>;
  isDone: Client<boolean>;
  onPress: Client<() => void>;
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
