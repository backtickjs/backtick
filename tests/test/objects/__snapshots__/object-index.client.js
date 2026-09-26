// 15:5
($splice0) => (currency) => {
    const table = $splice0();
    const asked = table[currency] ?? 0;
    const usd = table["usd"] ?? 0;
    return asked + usd;
}
