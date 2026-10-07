import { cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";
import type { Catalog } from "./catalog.js";

// A server component: a function of its props, run on your server for every
// request. Its props stay on your server, so they can be anything.
export async function ProductScreen({
  id,
  catalog,
}: {
  id: string;
  catalog: Catalog;
}) {
  const product = await catalog.find(id);

  if (product === undefined) {
    return cs`<$Text>This product is gone.</$Text>`;
  }

  const name = product.name;
  const inStock = product.stock > 0;

  return cs`(
    <$View style={{ padding: 24, gap: 8 }}>
      <$Text style={{ fontSize: 28, fontWeight: "bold" }}>{$name}</$Text>
      <$Text>{$inStock ? "In stock" : "Sold out"}</$Text>
    </$View>
  )`;
}
