import { cs, state } from "@backtickjs/core";

// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  const count = state(0);
  return (
    <button
      id="row"
      style="display: flex; gap: 8px"
      onclick={cs`() => $count.write($count.read() + 1)`}
    >
      <span style="font-weight: 700">{cs`$count.read() > 0 ? "☑" : "☐"`}</span>
      <span>{cs`"pressed " + $count.read() + " times"`}</span>
    </button>
  );
}

export default <Row />;
