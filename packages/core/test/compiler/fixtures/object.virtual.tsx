import { cs } from "@backtickjs/core";

const color = cs.lift((() => {
    const __cs_color = { r: 1, g: 2, b: 3, brightness: () => {
            return __cs_color.r + __cs_color.g + __cs_color.b;
        } };
    return __cs_color;
})());

const script = cs.lift((() => {
    const __cs_c = cs.lower(color);
    return cs.lower(cs.lift(__cs_c.brightness()));
})());
