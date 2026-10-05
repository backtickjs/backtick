import { cs } from "@backtickjs/core";
import { HelloWave } from "./HelloWave.js";

// A server component: it runs on your server for every request, and hands the
// browser its data and its client components.
export async function Home() {
  // Read here, on your server, and sent to the browser as plain values.
  const node = process.version;
  const assembledAt = new Date().toLocaleTimeString();

  return cs`{
    const styles = {
      page: {
        maxWidth: 640,
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        display: "grid",
        gap: 24,
      },
      titleRow: { display: "flex", alignItems: "center", gap: 8 },
      title: { margin: 0, fontSize: 32, lineHeight: 1 },
      step: { display: "grid", gap: 8 },
      subtitle: { margin: 0, fontSize: 20 },
      body: { margin: 0, fontSize: 16, lineHeight: 1.5 },
      link: { fontSize: 16, color: "#0a7ea4" },
    };

    return (
      <main style={styles.page}>
        <div style={styles.titleRow}>
          <h1 style={styles.title}>Welcome!</h1>
          <$HelloWave />
        </div>

        <section style={styles.step}>
          <h2 style={styles.subtitle}>Step 1: Try it</h2>
          <p style={styles.body}>
            Edit <b>server/Home.tsx</b> and save. This page redraws on its own.
          </p>
        </section>

        <section style={styles.step}>
          <h2 style={styles.subtitle}>Step 2: Server and client</h2>
          <p style={styles.body}>
            Your server assembled this page with Node {$node} at {$assembledAt}.
            The waving hand is a client component: its animation runs in your
            browser. Click it.
          </p>
        </section>

        <section style={styles.step}>
          <h2 style={styles.subtitle}>Step 3: Get a fresh start</h2>
          <p style={styles.body}>
            When you're ready, run <b>npm run reset-project</b> for a blank{" "}
            <b>server/Home.tsx</b>.
          </p>
        </section>

        <a style={styles.link} href="https://backtickjs.com/docs">
          Read the docs →
        </a>
      </main>
    );
  }`;
}
