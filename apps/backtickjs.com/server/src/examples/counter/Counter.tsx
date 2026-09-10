import { cs, state } from "@backtickjs/core";

const card =
  "display: grid; gap: 14px; justify-items: center; padding: 26px;" +
  " border-radius: 22px; background: #f4f4f5; font-family: system-ui";
const press =
  "padding: 10px 18px; border: 0; border-radius: 999px; cursor: pointer;" +
  " background: #111; color: #fff; font: 600 14px system-ui";

export default async function Counter() {
  return cs`{
    const count = $state(0);
    return (
      <div style={$card}>
        <p style="margin: 0; font-size: 34px; font-weight: 700">
          {count.read()}
        </p>
        <button style={$press} onclick={() => count.write(count.read() + 1)}>
          {"Press me"}
        </button>
      </div>
    );
  }`;
}
