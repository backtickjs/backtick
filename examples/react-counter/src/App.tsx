import { cs } from "@backtickjs/core";
import { Counter } from "./Counter.js";

// A server component: it runs on the host, and hands the client its data and
// its client components.
export async function App() {
  const counters = ["Apples", "Pears", "Plums"];
  return cs`(
    <main>
      <h1>Hello from Backtick and React</h1>
      {$counters.map((label) => (
        <$Counter key={label} label={label} />
      ))}
    </main>
  )`;
}
