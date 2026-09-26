// 8:25
export default () => true;

// 10:72
export default ($0) => (text, upper) => {
    if (upper && text !== null) {
        return text.toUpperCase();
    }
    if ($0() && text !== null && text.charAt(0) === "!") {
        return text.concat("?");
    }
    return "none";
};

// 27:5
export default ($0) => ({
    missing: $0()(null, true),
    loud: $0()("!hi", true),
    quiet: $0()("!hi", false),
    plain: $0()("zz", false),
});
