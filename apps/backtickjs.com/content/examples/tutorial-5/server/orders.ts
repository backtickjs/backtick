// Orders, kept in memory while the server runs. Yours would go to a database.
export type Counts = Record<string, number>;

let last: Counts | null = null;

export async function saveOrder(counts: Counts): Promise<void> {
  last = counts;
}

export async function lastOrder(): Promise<Counts | null> {
  return last;
}
