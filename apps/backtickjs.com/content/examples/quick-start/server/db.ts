// Stands in for your database.
export type User = { id: string; name: string };
export type Pick = { id: number; name: string };

export const db = {
  async userFor(token: string | undefined): Promise<User> {
    return { id: token ?? "guest", name: "Sam" };
  },
  async picksFor(userId: string): Promise<Pick[]> {
    return [
      { id: 1, name: "Ethiopia Guji" },
      { id: 2, name: "Colombia Huila" },
    ];
  },
};
