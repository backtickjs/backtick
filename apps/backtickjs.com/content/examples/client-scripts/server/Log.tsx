import { cs } from "@backtickjs/core";
import { Text } from "@backtickjs/react-native";

// A block: its code runs each time it's read.
const logVisit = cs`{
  console.log("visit");
}`;

// A function: one function, whose body runs each time it's called.
const logTap = cs`(what: string) => console.log("tap " + what)`;

export async function Home() {
  return cs`{
    $logVisit;
    $logVisit;
    $logTap("a");
    $logTap("b");
    return <$Text>Logged</$Text>;
  }`;
}
