import { cs, state } from "@backtickjs/core";
import {
  key,
  keyCode,
  screenWidth,
  screenHeight,
} from "@backtickjs/cardputer-schema";

// The keyboard, said back.
//
// What a key is on this device is two things that have to agree: the number
// the scanner reports for where it sits, and the name the client's table gives
// that number. This shows both, so a key that comes out wrong says which of
// the two is wrong — a name that is not the key pressed is a table to fix, and
// no number at all is a scanner that never answered.
//
// Written wide rather than deep on purpose. A label and its value are two
// elements side by side instead of one string joined out of six, because the
// interpreter recurses down an expression and the device has a stack to spend.
export default cs`{
  const name = $state("-");
  const code = $state(0);
  const seen = $state(0);
  const trail = $state("");

  const pressed = $key();
  const number = $keyCode();

  if (number !== 0) {
    // A key the table has no name for arrives as a number and nothing else,
    // which is exactly the case worth seeing.
    const said = pressed === "" ? "?" : pressed;
    name.write(said === " " ? "space" : said);
    code.write(number);
    seen.write(seen.read() + 1);
    const kept = trail.read() + (said === " " ? "_" : said);
    trail.write(kept.slice(kept.length > 28 ? kept.length - 28 : 0));
  }

  // Ten numbers to a scanner line whatever it has wired to it, and a line
  // carries two keyboard columns: its first four keys one column top to
  // bottom, its next four the column beside it.
  const at = code.read() - 1;
  const line = Math.floor(at / 10);
  const along = at % 10;

  const width = $screenWidth();
  const height = $screenHeight();
  const dim = 0x8888aa;

  return (
    <>
      <rect x={0} y={0} width={width} height={height} colour={0x101018} />

      <string x={6} y={4} size={1} datum="top-left" colour={0x66ccff}>
        {"keys"}
      </string>
      <string x={width - 6} y={4} size={1} datum="top-right" colour={dim}>
        {seen.read()}
      </string>

      <string x={width / 2} y={40} size={4} datum="middle-centre">
        {name.read()}
      </string>

      <string x={54} y={70} size={1} datum="middle-right" colour={dim}>
        {"code"}
      </string>
      <string x={60} y={70} size={1} datum="middle-left" colour={0x44dd88}>
        {code.read()}
      </string>
      <string x={130} y={70} size={1} datum="middle-right" colour={dim}>
        {"row"}
      </string>
      <string x={136} y={70} size={1} datum="middle-left" colour={0x44dd88}>
        {along % 4}
      </string>
      <string x={196} y={70} size={1} datum="middle-right" colour={dim}>
        {"col"}
      </string>
      <string x={202} y={70} size={1} datum="middle-left" colour={0x44dd88}>
        {line * 2 + Math.floor(along / 4)}
      </string>

      <string x={54} y={88} size={1} datum="middle-right" colour={dim}>
        {"line"}
      </string>
      <string x={60} y={88} size={1} datum="middle-left" colour={0xffcc66}>
        {line}
      </string>
      <string x={130} y={88} size={1} datum="middle-right" colour={dim}>
        {"along"}
      </string>
      <string x={136} y={88} size={1} datum="middle-left" colour={0xffcc66}>
        {along}
      </string>

      <rect x={0} y={108} width={width} height={height - 108} colour={0x181826} />
      <string x={width / 2} y={121} size={1} datum="middle-centre" colour={0xffcc66}>
        {trail.read()}
      </string>
    </>
  );
}`;
