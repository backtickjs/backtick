import { cs, state } from "@backtickjs/core";
import {
  key,
  millis,
  screenWidth,
  screenHeight,
} from "@backtickjs/cardputer-schema";

// An app, as one is written for this device.
//
// A value script that answers with a drawing. It runs again whenever something
// it holds changes or a key arrives, and what it answers with is what the
// screen shows — so there is no place to put a redraw and nothing to remember
// to call.
//
// Input is read rather than delivered: `$key()` is what was pressed since the
// last drawing, and an app that wants to act on one does it here, while
// working out what to draw.
export default cs`{
  const count = $state(0);
  const pressed = $key();

  if (pressed === "up" || pressed === ";") {
    count.write(count.read() + 1);
  }
  if (pressed === "down" || pressed === ".") {
    count.write(count.read() - 1);
  }
  if (pressed === "enter") {
    count.write(0);
  }

  const width = $screenWidth();
  const height = $screenHeight();
  const beat = $millis() / 500;
  const bar = 20 + (count.read() * 6);

  return (
    <>
      <rect x={0} y={0} width={width} height={height} colour={0x101018} />
      <string x={width / 2} y={16} size={2} datum="middle-centre" colour={0x66ccff}>
        {"backtick"}
      </string>
      <string x={width / 2} y={52} size={4} datum="middle-centre">
        {count.read()}
      </string>
      <rect
        x={20}
        y={78}
        width={bar}
        height={10}
        colour={0x44dd88}
      />
      <rect x={20} y={78} width={width - 40} height={10} fill={false} colour={0x333344} />
      <string x={width / 2} y={110} size={1} datum="middle-centre" colour={0x8888aa}>
        {"; up   . down   enter zero"}
      </string>
      <circle x={width - 14} y={height - 14} radius={4} colour={0xff6688} />
    </>
  );
}`;
