import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Text, View } from "@backtickjs/react-native";
import type { ReactNode } from "react";
import { Stepper } from "./Stepper.js";

type Line = { id: string; name: string };

// A client component that draws what it's given, as `children`.
const Card = cs`(props: { title: string; children: ReactNode }) => (
  <$View
    style={{
      padding: 16,
      gap: 8,
      borderRadius: 12,
      backgroundColor: "#f4f4f5",
    }}
  >
    <$Text style={{ fontWeight: "600" }}>{props.title}</$Text>
    {props.children}
  </$View>
)`;

// State on the phone, handed to each row's stepper.
const CartLines = cs`(props: { lines: Line[] }) => {
  const [quantities, setQuantities] = $useState<Record<string, number>>({});
  return (
    <$View style={{ gap: 12 }}>
      {props.lines.map((line) => (
        <$Card key={line.id} title={line.name}>
          <$Stepper
            value={quantities[line.id] ?? 1}
            onChange={(value) =>
              setQuantities({ ...quantities, [line.id]: value })
            }
            min={1}
          />
        </$Card>
      ))}
    </$View>
  );
}`;

export async function Cart() {
  const lines: Line[] = [
    { id: "l1", name: "Flat white" },
    { id: "l2", name: "Croissant" },
  ];
  return cs`<$CartLines lines={$lines} />`;
}
