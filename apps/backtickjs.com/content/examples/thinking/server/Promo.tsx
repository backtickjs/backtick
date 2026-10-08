import { cs } from "@backtickjs/core";
import { Text } from "@backtickjs/react-native";

type Offer = { title: string };

// Not every user has an offer.
async function offerFor(userId: string): Promise<Offer | null> {
  return userId === "u-7" ? { title: "2 for 1 cold brew" } : null;
}

const Banner = cs`(props: { offer: Offer }) => (
  <$Text>{props.offer.title}</$Text>
)`;

export async function Promo({ userId }: { userId: string }) {
  const offer = await offerFor(userId);

  return cs`{
    const offer = $offer;
    return offer && <$Banner offer={offer} />;
  }`;
}
