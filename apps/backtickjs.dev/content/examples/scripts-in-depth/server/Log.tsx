import { cs } from "@backtickjs/core";
import { Text } from "react-native" with { backtick: "client" };

// Code that runs each time it's used is a function, called where it runs.
const logVisit = cs`() => console.log("visit")`;

// A function with a parameter: one function, whose body runs each call.
const logTap = cs`(what: string) => console.log("tap " + what)`;

export async function Home() {
  return cs`{
    $logVisit();
    $logVisit();
    $logTap("a");
    $logTap("b");
    return <$Text>Logged</$Text>;
  }`;
}
