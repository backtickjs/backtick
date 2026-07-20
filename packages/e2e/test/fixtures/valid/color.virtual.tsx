import { cs } from "@backtickjs/core";

const color = cs.value((() => {
    const __cs_color = { r: 1, g: 2, b: 3, brightness: () => {
            return cs.virtualize(__cs_color).r + cs.virtualize(__cs_color).g + cs.virtualize(__cs_color).b;
        } };
    return __cs_color;
})());

export default cs.value((() => {
    const __cs_c = cs.splice((color));
    return cs.splice(cs.value(cs.virtualize(__cs_c).brightness()));
})());
