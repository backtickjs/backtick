// Stands in for your database.
export type User = { id: string; name: string; email: string };

export const account = {
  async ordersFor(userId: string): Promise<{ id: string }[]> {
    return [{ id: "o1" }, { id: "o2" }, { id: "o3" }];
  },
  async pointsFor(userId: string): Promise<number> {
    return 120;
  },
};
