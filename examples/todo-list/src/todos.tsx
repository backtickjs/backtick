import { cs, state, type Client } from "@backtickjs/core";

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
const bare = "background: none; border: 0; padding: 0; cursor: pointer";

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

  const onPress = cs`(index: number) => {
    $tasks.update((tasks) =>
      tasks.map((task, at) =>
        index === at ? { label: task.label, isDone: !task.isDone } : task,
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
            key={value}
            id={`filter-${value}`}
            onclick={cs`() => $filter.write($value)`}
            // The style is a string here, so what changes with the filter is
            // written into it rather than set as a property.
            style={cs`$bare +
              "; font-size: 15px; font-weight: " +
              ($filter.read() === $value ? "700" : "400") +
              "; color: " +
              ($filter.read() === $value ? "#18181b" : "#71717a")`}
          >
            {value === "todo" ? "To do" : value === "done" ? "Done" : "All"}
          </button>
        ))}
      </div>

      <ul style="margin: 0; padding: 0; list-style: none; align-self: stretch">{cs`$showing.map(
        (task, index) =>
          ${(
            <Task
              label={cs`task.label`}
              isDone={cs`task.isDone`}
              onPress={cs`() => $onPress(index)`}
            />
          )},
      )`}</ul>
    </div>
  );
}

async function Task({
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
        style={`${bare}; display: flex; gap: 10px; padding: 6px 0; font: inherit`}
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
