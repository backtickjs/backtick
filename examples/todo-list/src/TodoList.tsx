import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { Task } from "./Task.js";

const TASKS = [
  "Water the plants",
  "Reply to Dana",
  "Book the dentist",
  "Renew the parking permit",
  "Return the library books",
  "Buy stamps",
];

const initial = TASKS.map((label) => ({ label: label, isDone: false }));

const page =
  "display: grid; gap: 16px; padding: 24px; justify-items: start;" +
  " max-width: 420px";

export async function TodoList() {
  return cs`{
    const filter = $createSignal("all");
    const tasks = $createSignal($initial);

    // A function rather than a value: what a prop holds is re-read whenever
    // what it names changes, and a value computed here would be computed once.
    const showing = () => {
      return tasks[0]().filter((task) => {
        if (filter[0]() === "all") {
          return true;
        } else if (filter[0]() === "done") {
          return task.isDone;
        } else {
          return !task.isDone;
        }
      });
    };

    // By label rather than by position: the list draws the filtered array, so a
    // task's place in what is shown is not its place in \`tasks\`.
    const onPress = (label: string) => {
      tasks[1](
        tasks[0]().map((task) =>
          task.label === label
            ? { label: task.label, isDone: !task.isDone }
            : task,
        ),
      );
    };

    return (
      <div style={$page}>
        <h1 style="margin: 0; font-size: 24px">Today</h1>

        <p style="margin: 0; font-size: 16px; color: #71717a">
          {tasks[0]().filter((task) => task.isDone).length +
            " of " +
            tasks[0]().length +
            " done"}
        </p>

        <div style="display: flex; gap: 16px">
          <For each={["all", "todo", "done"]}>
            {(value: string) => (
              <button
                id={"filter-" + value}
                onclick={() => filter[1](value)}
                // The style is a string here, so what changes with the filter is
                // written into it rather than set as a property.
                style={
                  "background: none; border: 0; padding: 0;" +
                  " cursor: pointer; font-size: 15px; font-weight: " +
                  (filter[0]() === value ? "700" : "400") +
                  "; color: " +
                  (filter[0]() === value ? "#18181b" : "#71717a")
                }
              >
                {value === "todo" ? "To do" : value === "done" ? "Done" : "All"}
              </button>
            )}
          </For>
        </div>

        <ul style="margin: 0; padding: 0; list-style: none; align-self: stretch">
          <For each={showing()}>
            {(task) =>
              ${(
                <Task task={cs`task`} onPress={cs`() => onPress(task.label)`} />
              )}
            }
          </For>
        </ul>
      </div>
    );
  }`;
}
