// Stands in for your database.
export type User = { id: string; name: string };
export type Order = { id: string; name: string };

export const db = {
  async userFor(token: string | undefined): Promise<User> {
    return { id: token ?? "guest", name: "Sam" };
  },
  async usualOrder(userId: string): Promise<Order> {
    return { id: "o-1042", name: "Flat white" };
  },
};
