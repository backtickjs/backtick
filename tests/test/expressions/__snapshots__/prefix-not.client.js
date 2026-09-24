// 10:5
() => (ready, count) => {
    if (!ready) {
        return "waiting";
    }
    return !(count > 3) ? "room left" : "full";
}
