import { cs } from "@backtickjs/core";

// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates: { [currency: string]: number } = { usd: 3, eur: 4 };

export default cs`(currency: string) => {
  const table = $rates;
  const asked = table[currency] ?? 0;
  const usd = table["usd"] ?? 0;
  return asked + usd;
}`;
