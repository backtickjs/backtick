// The menu. Yours could come from a database or an API: anything your server
// can read.
export type Coffee = { id: string; name: string; price: number };

export async function getMenu(): Promise<Coffee[]> {
  return [
    { id: "flat-white", name: "Flat white", price: 4.5 },
    { id: "cortado", name: "Cortado", price: 4 },
    { id: "cold-brew", name: "Cold brew", price: 5 },
  ];
}
