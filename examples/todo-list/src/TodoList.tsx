import { cs, state, For } from "@backtickjs/core";
import { Task } from "./Task.js";

const TASKS = [
  "Water the plants",
  "Reply to Dana",
  "Book the dentist",
  "Renew the parking permit",
  "Return the library books",
  "Buy stamps",
];

const page =
  "display: grid; gap: 16px; padding: 24px; justify-items: start;" +
  " max-width: 420px";

export async function TodoList() {
  const filter = state("all");
  const tasks = state(TASKS.map((label) => ({ label: label, isDone: false })));

  const showing = cs`$tasks.read().filter((task) => {
    if ($filter.read() === "all") {
      return true;
    } else if ($filter.read() === "done") {
      return task.isDone;
    } else {
      return !task.isDone;
    }
  })`;

  // By label rather than by position: the list draws the filtered array, so a
  // task's place in what is shown is not its place in `tasks`.
  const onPress = cs`(label: string) => {
    $tasks.update((tasks) =>
      tasks.map((task) =>
        task.label === label
          ? { label: task.label, isDone: !task.isDone }
          : task,
      ),
    );
  }`;

  const done = cs`$tasks.read().filter((task) => task.isDone).length`;
  const total = cs`$tasks.read().length`;

  return (
    <div style={page}>
      <h1 style="margin: 0; font-size: 24px">Today</h1>

      <p style="margin: 0; font-size: 16px; color: #71717a">
        {cs`$done + " of " + $total + " done"`}
      </p>

      <div style="display: flex; gap: 16px">
        {["all", "todo", "done"].map((value) => (
          <button
            id={`filter-${value}`}
            onclick={cs`() => $filter.write($value)`}
            // The style is a string here, so what changes with the filter is
            // written into it rather than set as a property.
            style={cs`"background: none; border: 0; padding: 0;" +
              " cursor: pointer; font-size: 15px; font-weight: " +
              ($filter.read() === $value ? "700" : "400") +
              "; color: " +
              ($filter.read() === $value ? "#18181b" : "#71717a")`}
          >
            {value === "todo" ? "To do" : value === "done" ? "Done" : "All"}
          </button>
        ))}
      </div>

      <ul style="margin: 0; padding: 0; list-style: none; align-self: stretch">
        <For each={cs`$showing`}>
          {cs`(task: { label: string; isDone: boolean }) =>
            ${(
              <Task
                label={cs`task.label`}
                isDone={cs`task.isDone`}
                onPress={cs`() => $onPress(task.label)`}
              />
            )}`}
        </For>
      </ul>
    </div>
  );
}
