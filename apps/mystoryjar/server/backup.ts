import { createRequire } from "node:module";
import PDFDocument from "pdfkit";
import { bucket } from "./firebase.js";
import { storiesOf } from "./stories.js";
import { palettes } from "./ui/theme.js";

// The website's print view as a file: every story, oldest first, with its
// photo, its date (with its year, which the website left out), its heart,
// place and tags. Set in Noto Sans JP, whole, so Japanese prints too: the
// PDF keeps only the glyphs it uses.

const require = createRequire(import.meta.url);
const font = (family: string) =>
  require.resolve(
    `@expo-google-fonts/noto-sans-jp/${family.slice("NotoSansJP_".length)}/${family}.ttf`,
  );

const colors = palettes.light;

// "2026-10-05" as "October 5, 2026"
const longDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

/** `uid`'s stories as a PDF, dated where they are. */
export async function backupPdf(
  uid: string,
  timeZone: string,
): Promise<Buffer> {
  const stories = (await storiesOf(uid, timeZone)).reverse();
  const doc = new PDFDocument({
    size: "LETTER",
    margin: 54,
    info: { Title: "MyStoryJar" },
  });
  doc.registerFont("medium", font("NotoSansJP_500Medium"));
  doc.registerFont("bold", font("NotoSansJP_700Bold"));
  const chunks: Buffer[] = [];
  doc.on("data", (chunk: Buffer) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve) =>
    doc.on("end", () => resolve(Buffer.concat(chunks))),
  );
  const width = doc.page.width - 108;

  doc.font("bold").fontSize(24).fillColor(colors.accent).text("MyStoryJar");
  doc
    .font("medium")
    .fontSize(12)
    .fillColor(colors.secondaryText)
    .text(
      stories.length === 0
        ? "No stories yet."
        : `${stories.length} ${stories.length === 1 ? "story" : "stories"}, ` +
            `${longDate(stories[0]!.date)} to ${longDate(stories.at(-1)!.date)}`,
    )
    .moveDown(2);

  for (const story of stories) {
    const photo =
      story.photo === null
        ? null
        : await bucket
            .file(`story_photos/${uid}/large/${story.photo.id}`)
            .download()
            .then(([bytes]) => bytes)
            .catch(() => null);
    const details = [story.location, story.tags.join(", ")]
      .filter((detail) => detail !== "")
      .join("  ·  ");
    // kept on one page with its photo, when it fits on one
    doc.font("medium").fontSize(12);
    const needed =
      (photo ? 300 : 0) + 40 + doc.heightOfString(story.text, { width });
    if (doc.y + needed > doc.page.height - 54 && doc.y > 120) {
      doc.addPage();
    }
    if (photo) {
      doc.image(photo, { fit: [width, 280], align: "center" });
      doc.moveDown(0.5);
    }
    doc
      .font("bold")
      .fontSize(13)
      .fillColor(colors.primaryText)
      .text(longDate(story.date), { continued: story.favorite });
    if (story.favorite) {
      doc.fillColor(colors.accent).text("  ♥");
    }
    if (details !== "") {
      doc
        .font("medium")
        .fontSize(11)
        .fillColor(colors.secondaryText)
        .text(details);
    }
    doc
      .moveDown(0.25)
      .font("medium")
      .fontSize(12)
      .fillColor(colors.primaryText)
      .text(story.text, { width })
      .moveDown(1.5);
  }
  doc.end();
  return done;
}
