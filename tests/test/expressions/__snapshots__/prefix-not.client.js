// 10:5
export default () => (ready, count) => {
    if (!ready) {
        return "waiting";
    }
    return !(count > 3) ? "room left" : "full";
};
