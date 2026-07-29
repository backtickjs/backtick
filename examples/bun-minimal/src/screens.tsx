import { cs, Link, state, Text, View } from "@backtickjs/core";

const page = { gap: 8, padding: 24 } as const;
const heading = { fontSize: 24 } as const;
const body = { fontSize: 16 } as const;
const link = { fontSize: 16, color: "royalblue" } as const;

// Every screen is an ordinary server component. Nothing about it knows which
// path reached it, or which client asked — that is the router's business, and
// the same screen answers a browser and a phone.
export async function Home() {
  return (
    <View style={page}>
      <Text style={heading}>Backtick</Text>
      <Text style={body}>Three routes, one bundle each.</Text>
      <Link href="/counter" style={link} testID="to-counter">
        Counter
      </Link>
      <Link href="/about" style={link} testID="to-about">
        About
      </Link>
    </View>
  );
}

// Client state: the count lives on the client, so pressing re-renders without
// asking the server for anything. The bundle for this route carries the
// handler as a script, not a round trip.
export async function Counter() {
  const count = state(0);
  return (
    <View style={page}>
      <Text style={heading}>{cs`"Pressed " + $count.read() + " times"`}</Text>
      <Text
        testID="press"
        style={{ fontSize: 16, color: "royalblue" }}
        onPress={cs`() => $count.write($count.read() + 1)`}
      >
        Press me
      </Text>
      <Link href="/" style={link}>
        Home
      </Link>
    </View>
  );
}

// Built per request, so what it reports is the moment it was asked for — the
// simplest demonstration that a route is a function, not a constant.
export async function About({ started }: { started: Date }) {
  const uptime = Math.round((Date.now() - started.getTime()) / 1000);
  return (
    <View style={page}>
      <Text style={heading}>About</Text>
      <Text style={body}>Rendered on the server, drawn by the client.</Text>
      <Text style={body}>{`Server up ${uptime}s.`}</Text>
      <Link href="/" style={link}>
        Home
      </Link>
    </View>
  );
}
