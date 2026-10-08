import { type Client, cs, type Spliced } from "@backtickjs/core";

type Item = {
  name: string;
  price: number;
  // Computed on the phone, from its own clock.
  available: Client<boolean>;
};

export const menu: Item[] = [
  { name: "Flat white", price: 4.5, available: cs`true` },
  { name: "Croissant", price: 3, available: cs`new Date().getHours() < 11` },
];

// On the phone, each `available` is the boolean its script computes.
export type MenuOnPhone = Spliced<Item[]>;
// { name: string; price: number; available: boolean }[]

export const names = cs`$menu
  .filter((item) => item.available)
  .map((item) => item.name)`;
