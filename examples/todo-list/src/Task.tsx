import { type Client, cs } from "@backtickjs/core";

// One row of the list, drawn by a script: the list hands it the task as a
// client value, so pressing it redraws this row and nothing else.
export async function Task({
  task,
  onPress,
}: {
  task: Client<{ label: string; isDone: boolean }>;
  onPress: Client<() => void>;
}) {
  return cs`<li>
    <button
      onclick={$onPress}
      style="background: none; border: 0; cursor: pointer; display: flex; gap: 10px; padding: 6px 0; font: inherit"
    >
      <span style="font-size: 17px">{$task.isDone ? "☑" : "☐"}</span>
      <span
        style={
          "font-size: 17px; color: " +
          ($task.isDone ? "#a1a1aa" : "#18181b") +
          "; text-decoration: " +
          ($task.isDone ? "line-through" : "none")
        }
      >
        {$task.label}
      </span>
    </button>
  </li>`;
}
