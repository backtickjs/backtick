// Stands in for your database client.
export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  // What you paid for it: not for the phone.
  cost: number;
};

export class Catalog {
  #products: Product[] = [
    { id: "p1", name: "Ceramic dripper", price: 28, stock: 4, cost: 9 },
    { id: "p2", name: "Paper filters", price: 6, stock: 0, cost: 1.5 },
  ];

  async find(id: string): Promise<Product | undefined> {
    return this.#products.find((product) => product.id === id);
  }
}
