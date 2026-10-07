import { type Client, cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";

// An expression: a value the phone computes, with the phone's own clock.
const greeting: Client<string> = cs`new Date().getHours() < 12
  ? "Good morning"
  : "Good afternoon"`;

// A function the phone calls.
const formatPrice: Client<(price: number) => string> = cs`(price: number) =>
  price.toLocaleString("en-US", { style: "currency", currency: "USD" })`;

export async function Home() {
  const total = 13.5;

  // Statements, ending in what the script is: here, the screen.
  return cs`{
    const label = $formatPrice($total);
    return (
      <$View style={{ padding: 24, gap: 8 }}>
        <$Text>{$greeting}</$Text>
        <$Text>Your total is {label}.</$Text>
      </$View>
    );
  }`;
}
