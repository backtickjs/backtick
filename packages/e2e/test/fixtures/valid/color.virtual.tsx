import { cs } from "@backtickjs/core";

const color = cs.liftValue((() => {
    const __cs_color = { r: 1, g: 2, b: 3, brightness: () => {
            return cs.virtualize(__cs_color).r + cs.virtualize(__cs_color).g + cs.virtualize(__cs_color).b;
        } };
    return __cs_color;
})());

export default cs.liftValue((() => {
    const __cs_c = cs.spliceValue((color));
    return cs.spliceValue(cs.liftValue(cs.virtualize(__cs_c).brightness()));
})());
