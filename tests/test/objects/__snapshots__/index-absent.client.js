// 14:5
($0) => {
    const names = ["zero", "one"];
    const missing = $0()["nowhere"] ?? "gone";
    return names[1] + "/" + missing;
}
