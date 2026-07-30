import {
  cs,
  state,
  Pressable,
  Text,
  View,
  type Client,
} from "@backtickjs/core";

const TASKS = [
  "Water the plants",
  "Reply to Dana",
  "Book the dentist",
  "Renew the parking permit",
  "Return the library books",
  "Buy stamps",
];

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
    <View
      style={{
        gap: 16,
        padding: 24,
        alignItems: "flex-start",
        maxWidth: 420,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Today</Text>

      <Text style={{ fontSize: 16, color: "#71717a" }}>
        {cs`$done + " of " + $total + " done"`}
      </Text>

      <View style={{ flexDirection: "row", gap: 16 }}>
        {["all", "todo", "done"].map((value) => (
          <Text
            key={value}
            testID={`filter-${value}`}
            onPress={cs`() => $filter.write($value)`}
            style={{
              fontSize: 15,
              fontWeight: cs`$filter.read() === $value ? "700" : "400"`,
              color: cs`$filter.read() === $value ? "#18181b" : "#71717a"`,
            }}
          >
            {value === "todo" ? "To do" : value === "done" ? "Done" : "All"}
          </Text>
        ))}
      </View>

      <View style={{ alignSelf: "stretch" }}>{cs`$showing.map(
        (task, index) =>
          ${(
            <Task
              label={cs`task.label`}
              isDone={cs`task.isDone`}
              onPress={cs`() => $onPress(index)`}
            />
          )},
      )`}</View>
    </View>
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
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 10,
        paddingTop: 6,
        paddingBottom: 6,
      }}
    >
      <Text style={{ fontSize: 17 }}>{cs`$isDone ? "☑" : "☐"`}</Text>
      <Text
        style={{
          fontSize: 17,
          color: cs`$isDone ? "#a1a1aa" : "#18181b"`,
          textDecorationLine: cs`$isDone ? "line-through" : "none"`,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
