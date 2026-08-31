import { cs } from "@backtickjs/core";

// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const table: { [key: string]: string } = { here: "yes" };

export default cs`{
  const names = ["zero", "one"];
  const missing = $table["nowhere"] ?? "gone";
  return names[1] + "/" + missing;
}`;
