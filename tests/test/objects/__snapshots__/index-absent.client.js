// 14:5
($splice0) => {
    const names = ["zero", "one"];
    const missing = $splice0()["nowhere"] ?? "gone";
    return names[1] + "/" + missing;
}
