import { cs } from "@backtickjs/core";
import { CodePanel, marked } from "./CodePanel.js";
import { Pair } from "./Pair.js";

// Data: one feature, from database to screen. Without Backtick, an endpoint
// and a fetch move the data; with it, one query in the screen's own file.

const ROUTE = await marked(`
!app.get("/offers", async (req, res) => {
!  res.json(await db.offersFor(req.user.id));
!});
`);
const SCREEN = await marked(`
export function Offers() {
!  const { data } = useSuspenseQuery<Offer[]>({
!    queryKey: ["offers"],
!    queryFn: () => fetch(\`\${API}/offers\`).then((r) => r.json()),
!  });
  return (
    <ScrollView>
      {data.map((o) => <Text key={o.id}>{o.title}</Text>)}
    </ScrollView>
  );
}
`);
const SERVER = await marked(`
export async function Offers({ user }: { user: User }) {
*  const offers = await db.offersFor(user.id);
  return cs\`(
    <$ScrollView>
      {$offers.map((o) => <$Text key={o.id}>{o.title}</$Text>)}
    </$ScrollView>
  )\`;
}
`);

export const DataVisual = cs`() => (
  <$Pair
    without={
      <div class="grid gap-3">
        <$CodePanel file="api/routes/offers.ts" lines={$ROUTE} />
        <$CodePanel file="app/screens/Offers.tsx" lines={$SCREEN} />
      </div>
    }
    withoutCaption="Seven of these lines are boilerplate: a route, a query key, a fetch, a hand-copied type, only to move data to the screen. Then the screen waits for it."
    backtick={<$CodePanel file="server/Offers.tsx" lines={$SERVER} />}
    backtickCaption="One query, on your server. Keys and secrets stay there; the screen arrives with its data, type-checked to the phone."
  />
)`;
