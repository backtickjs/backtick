// Stands in for your reviews service.
export type Review = { id: string; author: string; text: string };

export async function reviewsFor(productId: string): Promise<Review[]> {
  return [
    { id: "r1", author: "Sam", text: "Even extraction, every time." },
    { id: "r2", author: "Ada", text: "Worth it for the pour alone." },
  ];
}
