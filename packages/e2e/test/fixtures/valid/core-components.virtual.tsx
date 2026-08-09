import { cs } from "@backtickjs/core";

export default (
  <div style="padding: 8px">
    <span style="font-size: 12px" onclick={cs.lift(cs.const(() => {
}))}>
      hi
    </span>
    <img src="https://example.com/a.png" />
  </div>
);
